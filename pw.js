/* alisher.live — AI Taqdimot + obuna (Gemini)
   /gen (POST)        : taqdimot yaratish (ixtiyoriy Bearer token — obunachiga suv belgisisiz + cheksiz)
   /auth (POST)       : Telegram orqali kirish (Mini App initData yoki Login Widget) -> session token
   /sub-status (GET)  : Bearer token -> obuna holati
   /admin/grant (POST): egasi (ADMIN_ID) obunani qo'lda faollashtiradi
   /admin/subs (GET)  : obunachilar ro'yxati (egasi)
   D1: present_usage, web_sessions, subscriptions */

const LIMIT = 2; // bepul: bir IP uchun kunlik chegara (obunachilarga cheklov yo'q)
const MODELS = ['gemini-2.5-flash', 'gemini-flash-latest', 'gemini-3.8-flash', 'gemini-flash-lite-latest', 'gemini-2.5-flash-lite'];
const PRICE = 15000; // so'm / oy
const SESSION_DAYS = 60;

function cors(req) {
  const o = req.headers.get('origin') || '';
  const ok = /^https:\/\/(alisher\.live|www\.alisher\.live|abdurahimovalishera-blip\.github\.io)$/.test(o);
  return {
    'access-control-allow-origin': ok ? o : 'https://alisher.live',
    'access-control-allow-methods': 'POST, GET, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-max-age': '86400',
    'vary': 'origin'
  };
}
function J(obj, status, extra) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign({ 'content-type': 'application/json; charset=utf-8' }, extra || {})
  });
}
function now() { return Math.floor(Date.now() / 1000); }
function hex(buf) { return [...new Uint8Array(buf)].map(function (b) { return b.toString(16).padStart(2, '0'); }).join(''); }
async function sha256hex(str) { return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))); }
async function sha256bytes(bytes) { return new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)); }
async function hmac(keyBytes, msgStr) {
  const key = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(msgStr)));
}

// Telegram Mini App initData tekshiruvi
async function verifyInitData(initData, token) {
  try {
    const p = new URLSearchParams(initData);
    const hash = p.get('hash'); if (!hash) return null;
    p.delete('hash');
    const pairs = [];
    p.forEach(function (v, k) { pairs.push(k + '=' + v); });
    pairs.sort();
    const dcs = pairs.join('\n');
    const secret = await hmac(new TextEncoder().encode('WebAppData'), token); // key="WebAppData", msg=token
    const sig = hex(await hmac(secret, dcs));
    if (sig !== hash) return null;
    const authDate = parseInt(p.get('auth_date') || '0', 10);
    if (now() - authDate > 86400) return null; // 24 soatdan eski bo'lmasin
    const user = JSON.parse(p.get('user') || '{}');
    if (!user.id) return null;
    return { id: String(user.id), name: (user.first_name || '') + (user.last_name ? ' ' + user.last_name : ''), username: user.username || '' };
  } catch (e) { return null; }
}

// Telegram Login Widget tekshiruvi
async function verifyWidget(obj, token) {
  try {
    const hash = obj.hash; if (!hash) return null;
    const pairs = [];
    Object.keys(obj).forEach(function (k) { if (k !== 'hash') pairs.push(k + '=' + obj[k]); });
    pairs.sort();
    const dcs = pairs.join('\n');
    const secret = await sha256bytes(new TextEncoder().encode(token)); // secret = SHA256(token)
    const sig = hex(await hmac(secret, dcs));
    if (sig !== hash) return null;
    const authDate = parseInt(obj.auth_date || '0', 10);
    if (now() - authDate > 86400) return null;
    if (!obj.id) return null;
    return { id: String(obj.id), name: (obj.first_name || '') + (obj.last_name ? ' ' + obj.last_name : ''), username: obj.username || '' };
  } catch (e) { return null; }
}

async function sessionFromReq(req, env) {
  const a = req.headers.get('authorization') || '';
  const t = a.indexOf('Bearer ') === 0 ? a.slice(7) : '';
  if (!t || t.length < 20) return null;
  try {
    const th = await sha256hex(t);
    const row = await env.DB.prepare('SELECT tg_id, name, expires FROM web_sessions WHERE token_hash=?').bind(th).first();
    if (!row || row.expires < now()) return null;
    return { id: String(row.tg_id), name: row.name || '' };
  } catch (e) { return null; }
}
async function subState(env, tgId) {
  try {
    const row = await env.DB.prepare('SELECT active_until FROM subscriptions WHERE tg_id=?').bind(tgId).first();
    const until = row ? row.active_until : 0;
    return { subscribed: until > now(), until: until };
  } catch (e) { return { subscribed: false, until: 0 }; }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const p = url.pathname;
    const h = cors(req);
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: h });
    if (p === '/gen' && req.method === 'POST') return gen(req, env, h);
    if (p === '/auth' && req.method === 'POST') return auth(req, env, h);
    if (p === '/sub-status') return subStatus(req, env, h);
    if (p === '/admin/grant' && req.method === 'POST') return adminGrant(req, env, h);
    if (p === '/admin/subs') return adminSubs(req, env, h);
    if (p === '/health') return J({ ok: true, key: !!env.GEMINI_API_KEY, bot: !!env.BOT_TOKEN, models: MODELS, price: PRICE }, 200, h);
    if (p === '/models') {
      if (!env.GEMINI_API_KEY) return J({ error: 'no_key' }, 503, h);
      try {
        const mr = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + encodeURIComponent(env.GEMINI_API_KEY));
        const mj = await mr.json();
        return J({ ok: true, models: (mj.models || []).filter(function (m) { return (m.supportedGenerationMethods || []).indexOf('generateContent') > -1; }).map(function (m) { return m.name.replace('models/', ''); }) }, 200, h);
      } catch (e) { return J({ error: 'list_failed' }, 502, h); }
    }
    if (p === '/') return Response.redirect('https://alisher.live/taqdimot.html', 302);
    return new Response('not found', { status: 404, headers: h });
  }
};

async function auth(req, env, h) {
  if (!env.BOT_TOKEN) return J({ error: 'no_bot', message: 'Kirish hali sozlanmagan.' }, 503, h);
  let body; try { body = await req.json(); } catch (e) { return J({ error: 'bad_json' }, 400, h); }
  let user = null;
  if (body.initData) user = await verifyInitData(String(body.initData), env.BOT_TOKEN);
  else if (body.widget) user = await verifyWidget(body.widget, env.BOT_TOKEN);
  if (!user) return J({ error: 'bad_auth', message: 'Kirishni tasdiqlab boʻlmadi.' }, 401, h);

  const token = crypto.randomUUID() + crypto.randomUUID().replace(/-/g, '');
  const th = await sha256hex(token);
  const exp = now() + SESSION_DAYS * 86400;
  try {
    await env.DB.prepare('INSERT INTO web_sessions(token_hash,tg_id,name,created,expires) VALUES(?,?,?,?,?)')
      .bind(th, user.id, user.name, now(), exp).run();
  } catch (e) { return J({ error: 'db' }, 500, h); }
  const st = await subState(env, user.id);
  return J({ ok: true, token: token, name: user.name, admin: String(env.ADMIN_ID) === String(user.id), subscribed: st.subscribed, until: st.until }, 200, h);
}

async function subStatus(req, env, h) {
  const s = await sessionFromReq(req, env);
  if (!s) return J({ ok: true, logged: false }, 200, h);
  const st = await subState(env, s.id);
  return J({ ok: true, logged: true, name: s.name, admin: String(env.ADMIN_ID) === String(s.id), subscribed: st.subscribed, until: st.until, price: PRICE }, 200, h);
}

async function adminGrant(req, env, h) {
  const s = await sessionFromReq(req, env);
  if (!s || String(env.ADMIN_ID) !== String(s.id)) return J({ error: 'forbidden' }, 403, h);
  let body; try { body = await req.json(); } catch (e) { return J({ error: 'bad_json' }, 400, h); }
  const tgId = String(body.tg_id || '').replace(/[^0-9]/g, '');
  const days = Math.max(1, Math.min(3650, parseInt(body.days, 10) || 30));
  const name = String(body.name || '').slice(0, 80);
  if (!tgId) return J({ error: 'no_id' }, 400, h);
  try {
    const row = await env.DB.prepare('SELECT active_until FROM subscriptions WHERE tg_id=?').bind(tgId).first();
    const base = row && row.active_until > now() ? row.active_until : now();
    const until = base + days * 86400;
    await env.DB.prepare('INSERT INTO subscriptions(tg_id,name,active_until,updated) VALUES(?,?,?,?) ON CONFLICT(tg_id) DO UPDATE SET active_until=?, name=COALESCE(NULLIF(?,\'\'),name), updated=?')
      .bind(tgId, name, until, now(), until, name, now()).run();
    return J({ ok: true, tg_id: tgId, until: until }, 200, h);
  } catch (e) { return J({ error: 'db', detail: String(e).slice(0, 120) }, 500, h); }
}

async function adminSubs(req, env, h) {
  const s = await sessionFromReq(req, env);
  if (!s || String(env.ADMIN_ID) !== String(s.id)) return J({ error: 'forbidden' }, 403, h);
  try {
    const rs = await env.DB.prepare('SELECT tg_id,name,active_until FROM subscriptions ORDER BY active_until DESC LIMIT 200').all();
    return J({ ok: true, now: now(), items: rs.results || [] }, 200, h);
  } catch (e) { return J({ error: 'db' }, 500, h); }
}

async function gen(req, env, h) {
  if (!env.GEMINI_API_KEY) return J({ error: 'no_key', message: 'AI kaliti hali sozlanmagan.' }, 503, h);

  let body;
  try { body = await req.json(); } catch (e) { return J({ error: 'bad_json' }, 400, h); }

  const topic = String(body.topic || '').trim().slice(0, 200);
  const lang = ['uz', 'ru', 'en'].indexOf(body.lang) > -1 ? body.lang : 'uz';
  const n = Math.max(4, Math.min(14, parseInt(body.slides, 10) || 8));
  const level = String(body.level || '').slice(0, 40);
  if (topic.length < 2) return J({ error: 'empty_topic', message: 'Mavzu kiriting.' }, 400, h);

  // obunachi? (Bearer token)
  const sess = await sessionFromReq(req, env);
  let paid = false;
  if (sess) { const st = await subState(env, sess.id); paid = st.subscribed; }

  const ip = req.headers.get('cf-connecting-ip') || '0';
  const day = new Date(Date.now() + 5 * 3600 * 1000).toISOString().slice(0, 10);
  if (!paid) {
    try {
      const row = await env.DB.prepare('SELECT n FROM present_usage WHERE ip=? AND day=?').bind(ip, day).first();
      if (row && row.n >= LIMIT) return J({ error: 'limit', message: 'Bugungi bepul chegaraga (' + LIMIT + ' ta) yetdingiz. Cheksiz va suv belgisisiz taqdimotlar uchun obuna boʻling yoki ertaga qayta urinib koʻring.' }, 429, h);
    } catch (e) {}
  }

  const langName = lang === 'ru' ? 'ruscha (на русском языке)'
    : lang === 'en' ? 'inglizcha (in English)'
    : 'oʻzbekcha (lotin alifbosida, toza adabiy til)';

  const prompt =
`Sen tajribali oʻqituvchi va professional taqdimot (prezentatsiya) tuzuvchisisan. "${topic}" mavzusida ${n} ta slaydli taqdimot tayyorla.
Til: ${langName}.${level ? ' Daraja: ' + level + '.' : ''}
Talablar:
- 1-slayd — sarlavha slaydi: mavzu nomi (title) va bitta qisqa izoh (subtitle).
- Keyingi slaydlar mantiqiy tartibda boʻlsin: kirish, asosiy qismlar bosqichma-bosqich, misollar yoki faktlar, va xulosa.
- Har bir mazmunli slaydda 3-5 ta qisqa, aniq fikr (bullets). Uzun gaplar yozma — qisqa va tushunarli boʻlsin.
- Faktlar, sanalar va raqamlar toʻgʻri boʻlsin; notoʻgʻri maʼlumot toʻqib chiqarma.
- Har slaydga notiq uchun qisqa izoh (notes) qoʻsh (1-2 gap).
- Oxirgi slayd — qisqa xulosa yoki "Eʼtiboringiz uchun rahmat".
Faqat JSON qaytar.`;

  const schema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      subtitle: { type: 'string' },
      slides: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            bullets: { type: 'array', items: { type: 'string' } },
            notes: { type: 'string' }
          },
          required: ['title', 'bullets']
        }
      }
    },
    required: ['title', 'slides']
  };

  const payload = JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, responseMimeType: 'application/json', responseSchema: schema }
  });

  let out = null, lastDetail = '';
  for (let mi = 0; mi < MODELS.length && !out; mi++) {
    for (let attempt = 0; attempt < 2 && !out; attempt++) {
      let r;
      try {
        r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + MODELS[mi] + ':generateContent?key=' + encodeURIComponent(env.GEMINI_API_KEY),
          { method: 'POST', headers: { 'content-type': 'application/json' }, body: payload });
      } catch (e) { lastDetail = 'network'; break; }
      if (r.status === 503 || r.status === 429) { lastDetail = 'overload'; await new Promise(function (z) { setTimeout(z, 1200); }); continue; }
      if (!r.ok) { lastDetail = (await r.text()).slice(0, 180); break; }
      try {
        const j = await r.json();
        const parts = (((j.candidates || [])[0] || {}).content || {}).parts;
        const raw = parts && parts[0] && parts[0].text ? parts[0].text : '';
        out = JSON.parse(raw);
      } catch (e) { lastDetail = 'parse'; break; }
    }
  }
  if (!out) return J({ error: 'ai', message: 'AI hozir juda band. Bir ozdan soʻng qayta urinib koʻring.', detail: lastDetail }, 503, h);

  if (!out || !Array.isArray(out.slides) || !out.slides.length)
    return J({ error: 'empty_result', message: 'Natija boʻsh keldi. Mavzuni aniqroq yozib, qaytadan urinib koʻring.' }, 502, h);

  const slides = out.slides.slice(0, 16).map(function (s) {
    return {
      title: String(s.title || '').slice(0, 160),
      bullets: Array.isArray(s.bullets) ? s.bullets.map(function (b) { return String(b).slice(0, 300); }).slice(0, 8) : [],
      notes: String(s.notes || '').slice(0, 500)
    };
  });

  if (!paid) {
    try {
      await env.DB.prepare('INSERT INTO present_usage(ip,day,n) VALUES(?,?,1) ON CONFLICT(ip,day) DO UPDATE SET n=n+1')
        .bind(ip, day).run();
    } catch (e) {}
  }

  return J({ ok: true, title: String(out.title || topic).slice(0, 160), subtitle: String(out.subtitle || '').slice(0, 200), slides: slides, lang: lang, watermark: !paid, plan: paid ? 'paid' : 'free' }, 200, h);
}
