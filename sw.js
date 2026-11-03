const ADMIN = "<!DOCTYPE html><html lang=\"uz\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1,viewport-fit=cover\"><meta name=\"robots\" content=\"noindex,nofollow\">\n<title>Manbalar — boshqaruv</title>\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap\" rel=\"stylesheet\">\n<style>\n:root{--bg:#07080B;--panel:#0F1115;--p2:#141821;--line:rgba(160,200,230,.12);--line2:rgba(160,200,230,.2);--tx:#EAF2FB;--tx2:#A9BED0;--tx3:#6F8598;--sea:#38BDF8;--gold:#F4C430;--bad:#FB7185;--ok:#34D399;--f:'Onest',system-ui,sans-serif;--f-m:'Geist Mono',ui-monospace,monospace;color-scheme:dark}\n*{box-sizing:border-box}[hidden]{display:none!important}\nbody{margin:0;min-height:100vh;background:radial-gradient(900px 500px at 12% -10%,rgba(56,189,248,.1),transparent 60%),var(--bg);color:var(--tx);font:400 15px/1.55 var(--f)}\n.wrap{max-width:960px;margin:0 auto;padding:0 max(16px,env(safe-area-inset-left,0px)) 60px}\nheader{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 0}\n.brand{display:flex;align-items:center;gap:10px;font:600 13px var(--f-m);letter-spacing:.14em;text-transform:uppercase}\n.brand .mk{width:34px;height:34px;border-radius:9px;background:linear-gradient(135deg,#0E7490,#1E3A8A);display:grid;place-items:center;color:#fff;font:600 19px var(--f);padding-bottom:2px}\nh1{font:600 22px/1.2 var(--f);margin:0}\n.btn{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line2);background:var(--p2);color:var(--tx);border-radius:999px;padding:10px 16px;font:600 14px var(--f);cursor:pointer;text-decoration:none}\n.btn:hover{border-color:var(--sea)}\n.btn.pri{border-color:transparent;color:#04121a;background:linear-gradient(100deg,#38BDF8,#0E7490)}\n.btn.sm{padding:7px 12px;font-size:13px}.btn.del{color:var(--bad)}\n.card{background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:22px}\n.login{max-width:430px;margin:12vh auto 0;text-align:center;display:grid;gap:14px;justify-items:center}\n.login p{margin:0;color:var(--tx2)}.msg{font:500 13px var(--f-m);color:var(--sea);min-height:1.3em}\n.tabs{display:flex;gap:6px;padding:5px;border:1px solid var(--line);border-radius:999px;width:max-content;margin:4px 0 18px;background:var(--p2)}\n.tabs button{border:0;background:none;color:var(--tx2);padding:8px 16px;border-radius:999px;font:600 14px var(--f);cursor:pointer}\n.tabs button[aria-pressed=\"true\"]{background:var(--sea);color:#04121a}\n.head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}\n.items{display:grid;gap:10px}\n.item{display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:14px;border:1px solid var(--line);background:var(--panel)}\n.item.off{opacity:.55}.item .t{flex:1;min-width:0}.item b{display:block}.item small{display:block;color:var(--tx3);font:400 12.5px var(--f-m);overflow-wrap:anywhere}\n.pill{flex:none;font:600 11.5px var(--f-m);padding:3px 9px;border-radius:999px;border:1px solid var(--line);color:var(--tx2)}\n.pill.g{color:var(--gold);border-color:rgba(244,196,48,.4)}\n.pill.nofile{color:var(--bad);border-color:rgba(251,113,133,.4)}\n.acts{display:flex;gap:6px;flex-wrap:wrap}\n.empty{padding:22px;border:1px dashed var(--line);border-radius:14px;color:var(--tx3);text-align:center}\ndialog{border:1px solid var(--line);border-radius:20px;background:#0b0f16;color:var(--tx);padding:22px;width:min(560px,calc(100% - 20px))}\ndialog::backdrop{background:rgba(0,0,0,.6)}\nform{display:grid;gap:12px}label{display:grid;gap:5px;font:600 13px var(--f);color:var(--tx2)}label small{font-weight:400;color:var(--tx3)}\ninput,select,textarea{width:100%;border:1px solid var(--line2);background:#070a10;color:var(--tx);border-radius:11px;padding:10px 12px;font:400 15px var(--f)}\ntextarea{min-height:72px;resize:vertical}.row{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n.file{border:1px dashed var(--line2);border-radius:12px;padding:14px;text-align:center;color:var(--tx3);font-size:13.5px}\n.chk{display:flex;align-items:center;gap:8px;font-weight:600}\n.foot{display:flex;justify-content:flex-end;gap:8px;margin-top:4px}.err{color:var(--bad);font-size:13px;min-height:1.1em;margin:0}\n.toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:var(--p2);border:1px solid var(--line);padding:10px 16px;border-radius:999px;font-size:14px;z-index:9}\n.tbl{width:100%;border-collapse:collapse;font-size:14px}.tw{overflow-x:auto;border:1px solid var(--line);border-radius:14px}\n.tbl th,.tbl td{padding:10px 12px;text-align:left;border-bottom:1px solid rgba(160,200,230,.08);white-space:nowrap}\n.tbl th{font:600 12px var(--f-m);text-transform:uppercase;color:var(--tx3);background:var(--p2)}\n:focus-visible{outline:2px solid var(--sea);outline-offset:2px}\n@media(max-width:560px){.row{grid-template-columns:1fr}.item{flex-wrap:wrap}}\n</style></head><body>\n<div class=\"wrap\">\n  <header><div class=\"brand\"><span class=\"mk\">a</span>Manbalar · boshqaruv</div><button class=\"btn sm\" id=\"out\" hidden>Chiqish</button></header>\n  <main id=\"app\"></main>\n</div>\n<script>\n(function(){\n'use strict';\nvar app=document.getElementById('app'),T=null,tab='pdf',BOT='';\ntry{T=sessionStorage.getItem('shop_adm')}catch(e){}\nvar esc=function(s){return String(s==null?'':s).replace(/[&<>\"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})};\nfunction toast(m){var d=document.createElement('div');d.className='toast';d.textContent=m;document.body.appendChild(d);setTimeout(function(){d.remove()},2600)}\nfunction api(p,body,raw){return fetch('/api/'+p,{method:(body||raw)?'POST':'GET',headers:Object.assign(raw?{}:{'content-type':'application/json'},T?{authorization:'Bearer '+T}:{}),body:raw?raw:(body?JSON.stringify(body):undefined)}).then(function(r){return r.json().then(function(j){if(r.status===401){setT(null);render();throw new Error('auth')}return j})})}\nfunction setT(t){T=t;try{t?sessionStorage.setItem('shop_adm',t):sessionStorage.removeItem('shop_adm')}catch(e){}document.getElementById('out').hidden=!t}\ndocument.getElementById('out').onclick=function(){api('logout',{}).catch(function(){});setT(null);render()};\nfunction login(){\n  app.innerHTML='<div class=\"card login\"><h1>Manbalar boshqaruvi</h1><p>Kirish Telegram orqali. Faqat sayt egasi kira oladi.</p><button class=\"btn pri\" id=\"tgb\">Telegram orqali kirish</button><a class=\"btn\" id=\"tgl\" target=\"_blank\" rel=\"noopener\" hidden>Telegram\\'ni ochish</a><div class=\"msg\" id=\"lm\" role=\"status\"></div></div>';\n  var lm=document.getElementById('lm'),poll=null;\n  document.getElementById('tgb').onclick=function(){lm.textContent='…';\n    api('login',{}).then(function(j){\n      if(!j.code||!j.bot){lm.textContent=j.error==='too_many'?'Biroz kuting.':'Bot sozlanmagan (SHOP_BOT_TOKEN).';return}\n      var url='https://t.me/'+j.bot+'?start=adm_'+j.code,a=document.getElementById('tgl');a.href=url;a.hidden=false;\n      try{window.open(url,'_blank','noopener')}catch(e){}\n      lm.textContent='Telegram\\'da «Start»ni bosing, keyin qayting…';clearInterval(poll);var n=0;\n      poll=setInterval(function(){if(++n>150){clearInterval(poll);lm.textContent='Vaqt tugadi. Qaytadan bosing.';return}\n        fetch('/api/login?code='+j.code).then(function(r){return r.json()}).then(function(s){if(s.status==='ok'){clearInterval(poll);setT(s.token);render()}else if(s.status==='expired'){clearInterval(poll);lm.textContent='Havola eskirdi.'}}).catch(function(){})},2000)}).catch(function(){lm.textContent='Xatolik.'})}}\nfunction render(){if(!T)return login();document.getElementById('out').hidden=false;\n  app.innerHTML='<nav class=\"tabs\"><button data-t=\"pdf\" aria-pressed=\"'+(tab==='pdf')+'\">Manbalar</button><button data-t=\"sales\" aria-pressed=\"'+(tab==='sales')+'\">Sotuvlar</button></nav><section id=\"pane\"></section>';\n  app.querySelectorAll('[data-t]').forEach(function(b){b.onclick=function(){tab=b.dataset.t;render()}});\n  if(tab==='pdf')pdfs();else sales()}\nfunction pdfs(){var pane=document.getElementById('pane');pane.innerHTML='<div class=\"empty\">Yuklanmoqda…</div>';\n  api('pdfs').then(function(j){BOT=j.bot||'';var L=j.items||[];\n    pane.innerHTML='<div class=\"head\"><h1>Manbalar</h1><button class=\"btn pri\" id=\"add\">+ Yangi manba</button></div><div class=\"items\">'+\n      (L.length?L.map(function(p){return '<div class=\"item'+(p.active?'':' off')+'\"><div class=\"t\"><b>'+esc(p.title)+'</b><small>'+esc(p.subject)+' · '+(p.sales||0)+' sotuv · tartib '+p.sort+'</small></div><span class=\"pill g\">'+p.price+' ⭐</span>'+(p.file_id?'':'<span class=\"pill nofile\">fayl yoʻq</span>')+'<div class=\"acts\"><button class=\"btn sm\" data-e=\"'+p.id+'\">Tahrir</button><button class=\"btn sm del\" data-d=\"'+p.id+'\">Oʻchirish</button></div></div>'}).join(''):'<div class=\"empty\">Hali manba yoʻq. «Yangi manba» bilan qoʻshing.</div>')+'</div>'+\n      '<p style=\"color:var(--tx3);font-size:13px;margin-top:14px\">Har bir manba PDF fayli bilan boʻlishi kerak. Fayl yuklanmagan boʻlsa, saytda koʻrinmaydi va sotilmaydi.</p>';\n    document.getElementById('add').onclick=function(){form({price:20,sort:0,active:true})};\n    pane.querySelectorAll('[data-e]').forEach(function(b){b.onclick=function(){form(L.find(function(x){return x.id==b.dataset.e}))}});\n    pane.querySelectorAll('[data-d]').forEach(function(b){b.onclick=function(){if(b.dataset.s){api('pdf-del',{id:+b.dataset.d}).then(function(){toast('Oʻchirildi');pdfs()})}else{b.dataset.s=1;b.textContent='Rostdanmi?';setTimeout(function(){if(b.isConnected){delete b.dataset.s;b.textContent='Oʻchirish'}},3000)}}})}).catch(function(){})}\nfunction form(p){var d=document.createElement('dialog');p=p||{};\n  d.innerHTML='<h1 style=\"margin:0 0 14px;font:600 20px var(--f)\">'+(p.id?'Manbani tahrirlash':'Yangi manba')+'</h1><form id=\"f\" novalidate>'+\n    '<div class=\"row\"><label>Fan<input id=\"f_sub\" maxlength=\"40\" value=\"'+esc(p.subject)+'\" placeholder=\"Masalan: Tarix\"></label><label>Narx (⭐)<input id=\"f_price\" type=\"number\" min=\"1\" max=\"2500\" value=\"'+(p.price||20)+'\"></label></div>'+\n    '<label>Sarlavha<input id=\"f_title\" maxlength=\"90\" required value=\"'+esc(p.title)+'\" placeholder=\"Taqdimot nomi\"></label>'+\n    '<label>Qisqa tavsif<textarea id=\"f_desc\" maxlength=\"300\">'+esc(p.descr)+'</textarea></label>'+\n    '<div class=\"row\"><label>Tartib<input id=\"f_sort\" type=\"number\" value=\"'+(p.sort||0)+'\"></label><label class=\"chk\" style=\"align-self:end\"><input id=\"f_act\" type=\"checkbox\"'+(p.active===false?'':' checked')+'> Saytda koʻrsatish</label></div>'+\n    '<label>PDF fayl'+(p.file_id?' <small>(yuklangan — oʻzgartirish uchun yangisini tanlang)</small>':'')+'<input id=\"f_file\" type=\"file\" accept=\"application/pdf\"></label>'+\n    '<div class=\"file\" id=\"fst\">'+(p.file_id?'✓ Fayl yuklangan: '+esc(p.fname||'fayl')+((p.size)?' ('+Math.round(p.size/1024)+' KB)':''):'Fayl hali yuklanmagan')+'</div>'+\n    '<p class=\"err\" id=\"fe\"></p><div class=\"foot\"><button class=\"btn\" type=\"button\" id=\"fc\">Bekor</button><button class=\"btn pri\" type=\"submit\">Saqlash</button></div></form>';\n  document.body.appendChild(d);d.showModal();d.querySelector('#fc').onclick=function(){d.close()};d.addEventListener('close',function(){d.remove()});\n  d.querySelector('#f').onsubmit=function(e){e.preventDefault();var er=d.querySelector('#fe');\n    var v={id:p.id,subject:d.querySelector('#f_sub').value.trim(),title:d.querySelector('#f_title').value.trim(),descr:d.querySelector('#f_desc').value.trim(),price:Math.max(1,Math.min(2500,parseInt(d.querySelector('#f_price').value)||20)),sort:parseInt(d.querySelector('#f_sort').value)||0,active:d.querySelector('#f_act').checked};\n    if(!v.title){er.textContent='Sarlavhani kiriting.';return}if(!v.subject){er.textContent='Fan nomini kiriting.';return}\n    var file=d.querySelector('#f_file').files[0];var btn=d.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Saqlanmoqda…';\n    api('pdf',v).then(function(j){if(!j.ok){er.textContent='Saqlab boʻlmadi: '+(j.error||'');btn.disabled=false;btn.textContent='Saqlash';return null}\n      var id=j.id||p.id;if(file){if(file.size>19000000){er.textContent='Fayl 19 MB dan katta.';btn.disabled=false;btn.textContent='Saqlash';return null}\n        btn.textContent='Fayl yuklanmoqda…';var fd=new FormData();fd.append('id',id);fd.append('file',file,file.name);return fetch('/api/pdf-file',{method:'POST',headers:T?{authorization:'Bearer '+T}:{},body:fd}).then(function(r){return r.json()})}\n      return {ok:true}}).then(function(j){if(j===null)return;if(j&&j.ok){d.close();toast('Saqlandi');pdfs()}else{er.textContent='Fayl yuklanmadi: '+((j&&j.error)||'');btn.disabled=false;btn.textContent='Saqlash'}}).catch(function(){er.textContent='Xatolik.';btn.disabled=false;btn.textContent='Saqlash'})}}\nfunction sales(){var pane=document.getElementById('pane');pane.innerHTML='<div class=\"empty\">Yuklanmoqda…</div>';\n  api('sales').then(function(j){var L=j.sales||[],fmt=new Intl.DateTimeFormat('ru-RU',{timeZone:'Asia/Tashkent',dateStyle:'short',timeStyle:'short'});\n    var tot=L.reduce(function(a,s){return a+(s.stars||0)},0);\n    pane.innerHTML='<div class=\"head\"><h1>Sotuvlar</h1><span style=\"color:var(--gold);font:600 15px var(--f-m)\">Jami: '+tot+' ⭐</span></div>'+\n      (L.length?'<div class=\"tw\"><table class=\"tbl\"><thead><tr><th>Vaqt</th><th>Manba</th><th>Xaridor</th><th>Narx</th></tr></thead><tbody>'+L.map(function(s){return '<tr><td>'+fmt.format(new Date(s.created*1000))+'</td><td>'+esc(s.title||('#'+s.item_id))+'</td><td>'+esc(s.uname||('ID '+s.uid))+'</td><td>'+s.stars+' ⭐</td></tr>'}).join('')+'</tbody></table></div>':'<div class=\"empty\">Hali sotuv yoʻq.</div>')}).catch(function(){})}\nrender();\n})();\n</script></body></html>\n";
const now = () => Math.floor(Date.now() / 1000);
const hex = buf => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha = async s => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
const rid = n => hex(crypto.getRandomValues(new Uint8Array(n)));
const S = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const esc = v => String(v == null ? '' : v).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

function cors(req) {
  const o = req.headers.get('origin') || '';
  const ok = /^https:\/\/(alisher\.live|www\.alisher\.live|abdurahimovalishera-blip\.github\.io)$/.test(o) || /^http:\/\/localhost(:\d+)?$/.test(o);
  return { 'access-control-allow-origin': ok ? o : 'https://alisher.live', 'access-control-allow-methods': 'GET,POST,OPTIONS', 'access-control-allow-headers': 'content-type,authorization', 'vary': 'origin' };
}
const J = (o, st, c) => new Response(JSON.stringify(o), { status: st || 200, headers: Object.assign({ 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }, c || {}) });

async function tg(env, method, body) {
  if (!env.SHOP_BOT_TOKEN) return null;
  return fetch('https://api.telegram.org/bot' + env.SHOP_BOT_TOKEN + '/' + method, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
}
let BOT = null;
async function botName(env) { if (BOT) return BOT; const r = await tg(env, 'getMe', {}); if (!r) return null; const j = await r.json().catch(() => ({})); BOT = j.ok ? j.result.username : null; return BOT; }
const hookSecret = async env => (await sha('shophook:' + env.SHOP_BOT_TOKEN)).slice(0, 32);

async function limited(req, tag, sec) {
  const ip = req.headers.get('cf-connecting-ip') || '0';
  const key = new Request('https://rl.alisher-shop/' + tag + '/' + encodeURIComponent(ip));
  if (await caches.default.match(key)) return true;
  await caches.default.put(key, new Response('1', { headers: { 'cache-control': 'max-age=' + sec } }));
  return false;
}

/* ---------- Public: katalog ---------- */
async function pdfsPublic(req, env) {
  const c = cors(req);
  let items = [];
  try { items = (await env.DB.prepare("SELECT id, subject, title, descr, price, sales FROM pdfs WHERE active = 1 AND file_id IS NOT NULL AND file_id != '' ORDER BY subject, sort DESC, id ASC LIMIT 500").all()).results || []; } catch (e) {}
  return J({ ok: true, bot: await botName(env), items }, 200, c);
}

/* ---------- Admin auth ---------- */
async function auth(req, env) {
  const h = req.headers.get('authorization') || ''; const t = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!/^[a-f0-9]{64}$/.test(t)) return false;
  const row = await env.DB.prepare('SELECT created FROM shop_tokens WHERE hash = ?').bind(await sha(t)).first();
  return !!row && row.created > now() - 43200;
}
async function admin(req, env, p) {
  const c = cors(req);
  if (p === '/api/login' && req.method === 'POST') {
    if (await limited(req, 'login', 10)) return J({ error: 'too_many' }, 429, c);
    const code = rid(12); await env.DB.prepare('INSERT INTO shop_login (code, done, created) VALUES (?,0,?)').bind(code, now()).run();
    await env.DB.prepare('DELETE FROM shop_login WHERE created < ?').bind(now() - 3600).run();
    return J({ code, bot: await botName(env) }, 200, c);
  }
  if (p === '/api/login' && req.method === 'GET') {
    const code = new URL(req.url).searchParams.get('code') || ''; if (!/^[a-f0-9]{24}$/.test(code)) return J({ status: 'expired' }, 200, c);
    const row = await env.DB.prepare('SELECT * FROM shop_login WHERE code = ? AND created > ?').bind(code, now() - 600).first();
    if (!row) return J({ status: 'expired' }, 200, c); if (!row.done) return J({ status: 'wait' }, 200, c);
    await env.DB.prepare('DELETE FROM shop_login WHERE code = ?').bind(code).run();
    const tok = rid(32); await env.DB.prepare('INSERT INTO shop_tokens (hash, created) VALUES (?,?)').bind(await sha(tok), now()).run();
    await env.DB.prepare('DELETE FROM shop_tokens WHERE created < ?').bind(now() - 43200).run();
    return J({ status: 'ok', token: tok }, 200, c);
  }
  if (!(await auth(req, env))) return J({ error: 'auth' }, 401, c);
  if (p === '/api/logout' && req.method === 'POST') { const t = (req.headers.get('authorization') || '').slice(7); await env.DB.prepare('DELETE FROM shop_tokens WHERE hash = ?').bind(await sha(t)).run(); return J({ ok: true }, 200, c); }
  if (p === '/api/pdfs' && req.method === 'GET') return J({ bot: await botName(env), items: (await env.DB.prepare('SELECT * FROM pdfs ORDER BY sort DESC, id ASC').all()).results }, 200, c);
  if (p === '/api/pdf' && req.method === 'POST') {
    const b = await req.json().catch(() => ({})); const title = S(b.title, 90); const subject = S(b.subject, 40);
    if (!title) return J({ error: 'title' }, 400, c); if (!subject) return J({ error: 'subject' }, 400, c);
    const price = Math.max(1, Math.min(2500, parseInt(b.price) || 20)), sort = Math.max(-999, Math.min(999, parseInt(b.sort) || 0)), active = b.active === false ? 0 : 1, descr = S(b.descr, 300);
    if (b.id) { await env.DB.prepare('UPDATE pdfs SET subject=?,title=?,descr=?,price=?,sort=?,active=?,updated=? WHERE id=?').bind(subject, title, descr, price, sort, active, now(), +b.id).run(); return J({ ok: true, id: +b.id }, 200, c); }
    const r = await env.DB.prepare('INSERT INTO pdfs (subject,title,descr,price,sort,active,sales,created,updated) VALUES (?,?,?,?,?,?,0,?,?)').bind(subject, title, descr, price, sort, active, now(), now()).run();
    return J({ ok: true, id: r.meta.last_row_id }, 200, c);
  }
  if (p === '/api/pdf-del' && req.method === 'POST') { const b = await req.json().catch(() => ({})); await env.DB.prepare('DELETE FROM pdfs WHERE id = ?').bind(+b.id).run(); return J({ ok: true }, 200, c); }
  if (p === '/api/pdf-file' && req.method === 'POST') {
    if (!env.SHOP_BOT_TOKEN || !env.ADMIN_ID) return J({ error: 'not_configured' }, 503, c);
    const fd = await req.formData().catch(() => null); if (!fd) return J({ error: 'form' }, 400, c);
    const id = parseInt(fd.get('id')) || 0; const file = fd.get('file');
    if (!id || !file || typeof file === 'string') return J({ error: 'bad' }, 400, c);
    if (file.size > 20000000) return J({ error: 'big' }, 400, c);
    const out = new FormData(); out.append('chat_id', String(env.ADMIN_ID)); out.append('document', file, (file.name || 'manba') + ''); out.append('caption', 'alisher.live manba #' + id);
    const r = await fetch('https://api.telegram.org/bot' + env.SHOP_BOT_TOKEN + '/sendDocument', { method: 'POST', body: out });
    const j = await r.json().catch(() => ({}));
    if (!j.ok || !j.result || !j.result.document) return J({ error: 'telegram', detail: S(j.description, 150) }, 502, c);
    const fid = j.result.document.file_id;
    await env.DB.prepare('UPDATE pdfs SET file_id=?, fname=?, size=?, updated=? WHERE id=?').bind(fid, S(file.name, 120), file.size | 0, now(), id).run();
    return J({ ok: true }, 200, c);
  }
  if (p === '/api/sales' && req.method === 'GET') return J({ sales: (await env.DB.prepare('SELECT s.*, p.title FROM pdf_sales s LEFT JOIN pdfs p ON p.id = s.item_id ORDER BY s.id DESC LIMIT 500').all()).results }, 200, c);
  return J({ error: 'not_found' }, 404, c);
}

/* ---------- Bot webhook (Stars) ---------- */
async function shopHook(req, env, ctx) {
  if (req.headers.get('x-telegram-bot-api-secret-token') !== await hookSecret(env)) return new Response('no', { status: 403 });
  const u = await req.json().catch(() => ({}));
  // pre-checkout: tasdiqlashdan oldin
  if (u.pre_checkout_query) {
    const q = u.pre_checkout_query; const m = String(q.invoice_payload || '').match(/^item_(\d+)$/);
    let ok = false;
    if (m) { const row = await env.DB.prepare('SELECT price, file_id, active FROM pdfs WHERE id = ?').bind(+m[1]).first(); ok = !!row && row.active && row.file_id && row.price === q.total_amount; }
    await tg(env, 'answerPreCheckoutQuery', ok ? { pre_checkout_query_id: q.id, ok: true } : { pre_checkout_query_id: q.id, ok: false, error_message: 'Manba topilmadi yoki narx oʻzgardi. Qaytadan urinib koʻring.' });
    return J({ ok: true });
  }
  const m = u.message; if (!m || !m.from) return J({ ok: true });
  const chat = m.chat.id, from = m.from;
  // muvaffaqiyatli toʻlov: yetkazib berish
  if (m.successful_payment) {
    const sp = m.successful_payment; const mm = String(sp.invoice_payload || '').match(/^item_(\d+)$/);
    if (mm) {
      const row = await env.DB.prepare('SELECT * FROM pdfs WHERE id = ?').bind(+mm[1]).first();
      if (row && row.file_id) {
        await tg(env, 'sendDocument', { chat_id: chat, document: row.file_id, caption: '✅ «' + esc(row.title) + '» — rahmat! Bu sizning nusxangiz. Savol boʻlsa: alisher.live' });
        await env.DB.prepare('UPDATE pdfs SET sales = sales + 1 WHERE id = ?').bind(row.id).run().catch(() => {});
        await env.DB.prepare('INSERT INTO pdf_sales (item_id, uid, uname, stars, charge_id, created) VALUES (?,?,?,?,?,?)').bind(row.id, from.id, S(from.first_name || '', 60) + (from.username ? ' @' + from.username : ''), sp.total_amount | 0, S(sp.telegram_payment_charge_id, 80), now()).run().catch(() => {});
        if (env.ADMIN_ID) ctx.waitUntil(tg(env, 'sendMessage', { chat_id: env.ADMIN_ID, text: '🛒 Yangi sotuv: «' + esc(row.title) + '» — ' + (sp.total_amount | 0) + ' ⭐\nXaridor: ' + esc(from.first_name || '') + (from.username ? ' @' + from.username : '') + ' (ID ' + from.id + ')', parse_mode: 'HTML' }));
      }
    }
    return J({ ok: true });
  }
  const text = (m.text || '').trim();
  const am = text.match(/^\/start\s+adm_([a-f0-9]{24})$/);
  const bm = text.match(/^\/start\s+buy_(\d+)$/);
  if (am) {
    if (String(from.id) === String(env.ADMIN_ID)) {
      const r = await env.DB.prepare('UPDATE shop_login SET done = 1 WHERE code = ? AND created > ?').bind(am[1], now() - 600).run();
      await tg(env, 'sendMessage', { chat_id: chat, text: r.meta && r.meta.changes ? '✅ Manbalar boshqaruviga kirish tasdiqlandi. Sahifaga qayting.' : '⌛ Havola eskirgan. Sahifada qaytadan bosing.' });
    } else {
      await tg(env, 'sendMessage', { chat_id: chat, text: 'Bu boshqaruvga faqat sayt egasi kira oladi.' });
      if (env.ADMIN_ID) await tg(env, 'sendMessage', { chat_id: env.ADMIN_ID, text: '⚠️ Manbalar admin paneliga begona urinish: ' + (from.first_name || '') + (from.username ? ' @' + from.username : '') + ' (ID ' + from.id + ')' });
    }
    return J({ ok: true });
  }
  if (bm) { await sendInvoice(env, chat, +bm[1]); return J({ ok: true }); }
  const lm = text.match(/^\/start\s+login_([a-f0-9]{24})$/);
  if (lm) {
    const code = lm[1];
    const row = await env.DB.prepare('SELECT created FROM login_codes WHERE code = ?').bind(code).first();
    if (row && now() - row.created < 600) {
      await env.DB.prepare('UPDATE login_codes SET tg_id = ?, name = ? WHERE code = ?')
        .bind(String(from.id), (from.first_name || '') + (from.last_name ? ' ' + from.last_name : ''), code).run();
      await tg(env, 'sendMessage', { chat_id: chat, text: '✅ alisher.live saytiga kirdingiz! Sahifaga qayting — avtomatik davom etadi.' });
    } else {
      await tg(env, 'sendMessage', { chat_id: chat, text: '⌛ Havola eskirgan. Saytda «Kirish»ni qaytadan bosing.' });
    }
    return J({ ok: true });
  }
  if (/^\/start/.test(text)) {
    await tg(env, 'sendMessage', { chat_id: chat, text: 'Assalomu alaykum! 👋\n\nBu — <b>alisher.live</b> ilovasi. Tugmani bosib, ilovani Telegram ichida oching: bepul testlar, bilimlar viktorinasi, ingliz tili va oʻquv manbalari.', parse_mode: 'HTML', reply_markup: { inline_keyboard: [[{ text: '🚀 Ilovani ochish', web_app: { url: 'https://alisher.live/' } }], [{ text: '📚 Oʻquv manbalari', web_app: { url: 'https://alisher.live/manbalar.html' } }]] } });
  }
  return J({ ok: true });
}
async function sendInvoice(env, chat, id) {
  const row = await env.DB.prepare('SELECT * FROM pdfs WHERE id = ?').bind(id).first();
  if (!row || !row.active || !row.file_id) { await tg(env, 'sendMessage', { chat_id: chat, text: 'Kechirasiz, bu manba hozir mavjud emas.' }); return; }
  await tg(env, 'sendInvoice', {
    chat_id: chat, title: S(row.title, 32), description: S(row.descr || (row.subject + ' — taqdimot'), 255),
    payload: 'item_' + row.id, currency: 'XTR', prices: [{ label: S(row.title, 32), amount: row.price }]
  });
}

export default {
  async fetch(req, env, ctx) {
    const u = new URL(req.url), p = u.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(req) });
    try {
      if (p === '/pdfs') return await pdfsPublic(req, env);
      if (p.startsWith('/api/')) return await admin(req, env, p);
      if (p.startsWith('/shop/') && req.method === 'POST') return env.SHOP_BOT_TOKEN && p === '/shop/' + await hookSecret(env) ? await shopHook(req, env, ctx) : new Response('no', { status: 404 });
      if (p === '/shop-setup') {
        if (!env.SHOP_BOT_TOKEN) return J({ error: 'no_token' }, 503);
        const r = await tg(env, 'setWebhook', { url: u.origin + '/shop/' + await hookSecret(env), secret_token: await hookSecret(env), allowed_updates: ['message', 'pre_checkout_query'], drop_pending_updates: true });
        const j = await r.json().catch(() => ({})); return J({ ok: !!j.ok, bot: await botName(env), description: j.description });
      }
    } catch (e) { return J({ error: 'server', detail: String(e && e.message || e).slice(0, 150) }, 500); }
    if (p === '/admin' || p === '/admin/') return new Response(ADMIN, { headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex, nofollow', 'cache-control': 'no-store', 'referrer-policy': 'strict-origin-when-cross-origin' } });
    if (p === '/' ) return Response.redirect('https://alisher.live/manbalar.html', 302);
    return new Response('Not found', { status: 404 });
  }
};
