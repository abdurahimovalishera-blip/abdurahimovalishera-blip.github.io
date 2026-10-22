/* alisher.live — sayt skripti.
   Postlar posts.json faylidan olinadi. Hamma matn textContent orqali chiqariladi (HTML sifatida emas),
   havolalar faqat http/https bo'lsa qabul qilinadi. */
(function () {
  'use strict';

  // ---- Sozlamalar ----
  var CONFIG = {
    // Cusdis'da ro'yxatdan o'tgach, "App ID" ni shu yerga yozing. Bo'sh bo'lsa, izohlar "tez orada" deb turadi.
    cusdisAppId: '',
    cusdisHost: 'https://cusdis.com',
    author: 'Alisher Abduraximov'
  };

  var T = {
    uz: {
      nav_posts: 'Postlar', nav_contact: 'Aloqa', founder: 'Sayt asoschisi',
      bio: 'Yangiliklar, sport va turli yo‘nalishlardagi foydali ma’lumotlar.',
      cat_all: 'Barchasi', cat_news: 'Yangiliklar', cat_sport: 'Sport', cat_other: 'Turli', empty_cat: 'Bu bo‘limda hozircha post yo‘q.',
      privacy_line: 'Sayt hech kimning shaxsiy daxlsizligini buzmaydi.',
      btn_tg: 'Telegram’da yozish', btn_yt: 'YouTube kanal', btn_mail: 'Email yozish',
      spec_domain: 'Domen', spec_langs: 'Tillar', spec_since: 'Asos', spec_status: 'Holat', spec_online: 'Onlayn',
      posts_title: 'Postlar', posts_sub: 'Yangilari yuqorida', loading: 'Postlar yuklanmoqda…',
      load_err: 'Postlar yuklanmadi. Sahifani yangilab ko‘ring.', empty: 'Hozircha post yo‘q.',
      contact_title: 'Aloqa', contact_sub: 'Qulay usulni tanlang. Bosganingizda kerakli ilova ochiladi.',
      comments: 'Izohlar', copy_link: 'Havola', copied: 'Nusxalandi',
      watch_yt: 'YouTube’da ko‘rish', open_link: 'Havolani ochish',
      t_photo: 'Foto', t_video: 'Video', t_link: 'Havola', t_text: 'Post',
      cm_note: 'Ro‘yxatdan o‘tish shart emas. Izoh muallif tasdiqlagach ko‘rinadi.',
      cm_soon: 'Izohlar bo‘limi tez orada ishga tushadi.',
      privacy: 'Maxfiylik siyosati', pv_updated: 'Yangilangan: 22.10.2026',
      pv: [
        'Sayt hech kimning shaxsiy daxlsizligini buzmaydi: odamlarning shaxsiy hayoti, manzili, telefon raqami va boshqa shaxsiy ma’lumotlari ularning roziligisiz e’lon qilinmaydi.',
        'Sayt cookie-fayllar, reklama va kuzatuv (analitika) vositalaridan foydalanmaydi.',
        'Izoh qoldirganingizda faqat siz yozgan ism va izoh matni Cusdis xizmati (cusdis.com) serverida saqlanadi. Email maydoni ixtiyoriy, uni to‘ldirmasangiz ham bo‘ladi.',
        'Izohlar muallif tasdiqlaganidan keyingina ko‘rinadi. Haqoratli, qonunga zid yoki boshqa odamlarning shaxsiy ma’lumotlari yozilgan izohlar e’lon qilinmaydi. Izohingizda shaxsiy ma’lumot (telefon, manzil, hujjat raqami) yozmang.',
        'YouTube, Telegram, Instagram va boshqa saytlarga havolalar yangi oynada ochiladi. U yerda shu saytlarning o‘z qoidalari amal qiladi.',
        'Saytdagi matn, rasm va videolar muallifga tegishli. Ulardan foydalanish uchun muallif roziligi kerak.',
        'Izohingizni o‘chirishni so‘rash yoki boshqa savollar uchun: abdurahimovalishera@gmail.com'
      ]
    },
    en: {
      nav_posts: 'Posts', nav_contact: 'Contact', founder: 'Founder',
      bio: 'News, sport and useful information on a range of topics.',
      cat_all: 'All', cat_news: 'News', cat_sport: 'Sport', cat_other: 'Other', empty_cat: 'No posts in this section yet.',
      privacy_line: 'This site respects everyone’s privacy.',
      btn_tg: 'Message on Telegram', btn_yt: 'YouTube channel', btn_mail: 'Send an email',
      spec_domain: 'Domain', spec_langs: 'Languages', spec_since: 'Since', spec_status: 'Status', spec_online: 'Online',
      posts_title: 'Posts', posts_sub: 'Newest first', loading: 'Loading posts…',
      load_err: 'Posts could not be loaded. Please refresh the page.', empty: 'No posts yet.',
      contact_title: 'Contact', contact_sub: 'Pick whichever suits you. Tapping opens the right app.',
      comments: 'Comments', copy_link: 'Link', copied: 'Copied',
      watch_yt: 'Watch on YouTube', open_link: 'Open link',
      t_photo: 'Photo', t_video: 'Video', t_link: 'Link', t_text: 'Post',
      cm_note: 'No sign-up needed. Comments appear after the author approves them.',
      cm_soon: 'Comments are coming soon.',
      privacy: 'Privacy policy', pv_updated: 'Updated: 22.10.2026',
      pv: [
        'This site respects everyone’s privacy: people’s private lives, addresses, phone numbers and other personal data are never published without their consent.',
        'This site uses no cookies, advertising or tracking (analytics) tools.',
        'When you leave a comment, only the name and text you enter are stored on the servers of the Cusdis service (cusdis.com). The email field is optional; you can leave it empty.',
        'Comments appear only after the author approves them. Offensive or unlawful comments, or comments containing other people’s personal data, are not published. Please do not include personal details (phone, address, ID numbers) in comments.',
        'Links to YouTube, Telegram, Instagram and other sites open in a new tab, where those sites’ own rules apply.',
        'Texts, photos and videos on this site belong to the author. Reuse requires the author’s permission.',
        'To have your comment removed, or for any other question: abdurahimovalishera@gmail.com'
      ]
    },
    ru: {
      nav_posts: 'Публикации', nav_contact: 'Контакты', founder: 'Основатель сайта',
      bio: 'Новости, спорт и полезная информация на разные темы.',
      cat_all: 'Все', cat_news: 'Новости', cat_sport: 'Спорт', cat_other: 'Разное', empty_cat: 'В этом разделе пока нет публикаций.',
      privacy_line: 'Сайт уважает неприкосновенность частной жизни каждого.',
      btn_tg: 'Написать в Telegram', btn_yt: 'YouTube-канал', btn_mail: 'Написать письмо',
      spec_domain: 'Домен', spec_langs: 'Языки', spec_since: 'Основан', spec_status: 'Статус', spec_online: 'Онлайн',
      posts_title: 'Публикации', posts_sub: 'Сначала новые', loading: 'Загрузка публикаций…',
      load_err: 'Не удалось загрузить публикации. Обновите страницу.', empty: 'Публикаций пока нет.',
      contact_title: 'Контакты', contact_sub: 'Выберите удобный способ. Кнопка откроет нужное приложение.',
      comments: 'Комментарии', copy_link: 'Ссылка', copied: 'Скопировано',
      watch_yt: 'Смотреть на YouTube', open_link: 'Открыть ссылку',
      t_photo: 'Фото', t_video: 'Видео', t_link: 'Ссылка', t_text: 'Пост',
      cm_note: 'Регистрация не нужна. Комментарий появится после одобрения автором.',
      cm_soon: 'Комментарии скоро будут доступны.',
      privacy: 'Политика конфиденциальности', pv_updated: 'Обновлено: 22.10.2026',
      pv: [
        'Сайт уважает неприкосновенность частной жизни: личная жизнь людей, их адреса, телефоны и другие персональные данные не публикуются без их согласия.',
        'Сайт не использует cookie, рекламу и средства отслеживания (аналитику).',
        'Когда вы оставляете комментарий, на серверах сервиса Cusdis (cusdis.com) сохраняются только введённые вами имя и текст. Поле email необязательное, его можно не заполнять.',
        'Комментарии появляются только после одобрения автором. Оскорбительные, незаконные комментарии и комментарии с чужими персональными данными не публикуются. Не указывайте в комментариях личные данные (телефон, адрес, номера документов).',
        'Ссылки на YouTube, Telegram, Instagram и другие сайты открываются в новой вкладке, там действуют правила этих сайтов.',
        'Тексты, фото и видео на сайте принадлежат автору. Для их использования нужно согласие автора.',
        'Чтобы удалить свой комментарий или задать другой вопрос: abdurahimovalishera@gmail.com'
      ]
    }
  };

  var lang = 'uz';
  try { var saved = localStorage.getItem('lang'); if (saved && T[saved]) lang = saved; } catch (e) {}
  var posts = [];
  var openPostId = null;
  var cat = 'all';

  function t(k) { return (T[lang] && T[lang][k]) || T.uz[k] || k; }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function safeUrl(u) {
    if (typeof u !== 'string') return null;
    u = u.trim();
    if (/^(images|videos)\/[\w\-./]+$/i.test(u) && u.indexOf('..') === -1) return u;
    if (/^[\w-]+\.(jpe?g|png|webp|gif|mp4|webm)$/i.test(u)) return u;
    try {
      var p = new URL(u);
      return (p.protocol === 'https:' || p.protocol === 'http:') ? p.href : null;
    } catch (e) { return null; }
  }

  function svg(path, opts) {
    var ns = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(ns, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('aria-hidden', 'true');
    if (opts && opts.stroke) {
      s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor');
      s.setAttribute('stroke-width', '2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round');
    }
    path.split('|').forEach(function (d) {
      var p = document.createElementNS(ns, 'path'); p.setAttribute('d', d); s.appendChild(p);
    });
    return s;
  }
  var IC = {
    chat: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z',
    link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1|M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
    play: 'M8 5v14l11-7z'
  };

  function fmtDate(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || '');
    return m ? m[3] + '.' + m[2] + '.' + m[1] : '';
  }

  function localized(v) {
    if (v == null) return '';
    if (typeof v === 'string') return v;
    return v[lang] || v.uz || v.en || v.ru || '';
  }

  function ytId(u) {
    var m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/.exec(u || '');
    return m ? m[1] : null;
  }

  function linkify(text, into) {
    var re = /(https?:\/\/[^\s<>"']+)/g, last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) into.appendChild(document.createTextNode(text.slice(last, m.index)));
      var href = safeUrl(m[1]);
      if (href) {
        var a = el('a', null, m[1]); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer nofollow';
        into.appendChild(a);
      } else into.appendChild(document.createTextNode(m[1]));
      last = m.index + m[1].length;
    }
    if (last < text.length) into.appendChild(document.createTextNode(text.slice(last)));
  }

  function postType(p) {
    if (p.youtube || p.video) return 'video';
    if (p.images && p.images.length) return 'photo';
    if (p.link) return 'link';
    return 'text';
  }

  function renderPost(p) {
    var art = el('article', 'post');
    art.id = 'post-' + p.id;

    var head = el('div', 'post-head');
    var mk = el('span', 'mark', 'AA'); mk.setAttribute('aria-hidden', 'true');
    var who = el('div', 'who');
    who.appendChild(el('b', null, CONFIG.author));
    var dt = el('time', 'mono', fmtDate(p.date)); dt.dateTime = p.date || '';
    who.appendChild(dt);
    var ty = postType(p);
    head.appendChild(mk); head.appendChild(who); head.appendChild(el('span', 'tag t-' + ty, t('t_' + ty)));
    art.appendChild(head);

    var txt = localized(p.text);
    if (txt) { var pt = el('p', 'post-text'); linkify(txt, pt); art.appendChild(pt); }

    var imgs = (p.images || []).map(safeUrl).filter(Boolean);
    if (imgs.length) {
      var g = el('div', 'media' + (imgs.length > 1 ? ' g2' : ''));
      imgs.forEach(function (src, i) {
        var b = el('button'); b.type = 'button'; b.setAttribute('aria-label', (localized(p.alt) || t('t_photo')) + ' ' + (i + 1));
        var im = el('img'); im.src = src; im.alt = localized(p.alt) || ''; im.loading = 'lazy'; im.decoding = 'async';
        b.appendChild(im);
        b.addEventListener('click', function () { openLightbox(src, im.alt); });
        g.appendChild(b);
      });
      art.appendChild(g);
    }

    var vid = safeUrl(p.video);
    if (vid) {
      var vg = el('div', 'media');
      var v = el('video'); v.src = vid; v.controls = true; v.preload = 'metadata'; v.setAttribute('playsinline', '');
      vg.appendChild(v); art.appendChild(vg);
    }

    var yt = safeUrl(p.youtube);
    if (yt) {
      var a = el('a', 'yt'); a.href = yt; a.target = '_blank'; a.rel = 'noopener noreferrer';
      var id = ytId(yt);
      if (id) {
        var th = el('img'); th.alt = ''; th.loading = 'lazy'; th.referrerPolicy = 'no-referrer';
        th.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
        th.addEventListener('error', function () { th.remove(); });
        a.appendChild(th);
      }
      var pl = el('span', 'play'); var pi = el('i'); pi.appendChild(svg(IC.play)); pl.appendChild(pi); a.appendChild(pl);
      var cap = el('span', 'cap');
      cap.appendChild(el('span', null, localized(p.youtubeTitle) || t('watch_yt')));
      a.appendChild(cap);
      art.appendChild(a);
    }

    var lk = p.link && safeUrl(p.link.url);
    if (lk) {
      var l = el('a', 'lnk'); l.href = lk; l.target = '_blank'; l.rel = 'noopener noreferrer';
      var ic = el('span', 'ic'); ic.appendChild(svg(IC.link, { stroke: true })); l.appendChild(ic);
      var sp = el('span');
      sp.appendChild(el('b', null, localized(p.link.title) || t('open_link')));
      l.appendChild(sp);
      l.appendChild(el('span', 'arr', '→'));
      art.appendChild(l);
    }

    var foot = el('div', 'post-foot');
    var cb = el('button', 'act'); cb.type = 'button';
    cb.appendChild(svg(IC.chat, { stroke: true })); cb.appendChild(el('span', null, t('comments')));
    cb.setAttribute('aria-expanded', String(openPostId === p.id));
    cb.setAttribute('aria-controls', 'cm-' + p.id);
    cb.addEventListener('click', function () { toggleComments(p, art, cb); });
    var sb = el('button', 'act'); sb.type = 'button';
    sb.appendChild(svg(IC.link, { stroke: true })); sb.appendChild(el('span', null, t('copy_link')));
    sb.addEventListener('click', function () {
      copyText(location.href.split('#')[0] + '#post-' + p.id, sb);
    });
    foot.appendChild(cb); foot.appendChild(sb);
    art.appendChild(foot);

    if (openPostId === p.id) art.appendChild(buildComments(p));
    return art;
  }

  // ---- Izohlar (Cusdis) ----
  var cusdisLoaded = false;
  function buildComments(p) {
    var box = el('div', 'cmts'); box.id = 'cm-' + p.id;
    if (!CONFIG.cusdisAppId) {
      box.appendChild(el('div', 'soon', t('cm_soon')));
      return box;
    }
    var th = el('div'); th.id = 'cusdis_thread';
    th.setAttribute('data-host', CONFIG.cusdisHost);
    th.setAttribute('data-app-id', CONFIG.cusdisAppId);
    th.setAttribute('data-page-id', p.id);
    th.setAttribute('data-page-url', location.origin + location.pathname + '#post-' + p.id);
    th.setAttribute('data-page-title', (localized(p.text) || p.id).slice(0, 80));
    th.setAttribute('data-theme', 'auto');
    box.appendChild(th);
    setTimeout(function () {
      if (!cusdisLoaded) {
        cusdisLoaded = true;
        var s = document.createElement('script');
        s.src = CONFIG.cusdisHost + '/js/cusdis.es.js'; s.async = true; s.defer = true;
        document.body.appendChild(s);
      } else if (window.CUSDIS && typeof window.CUSDIS.initial === 'function') {
        window.CUSDIS.initial();
      }
    }, 0);
    return box;
  }

  function toggleComments(p, art, btn) {
    var wasOpen = openPostId === p.id;
    var prev = document.querySelector('.cmts');
    if (prev) {
      prev.remove();
      var pb = document.querySelector('.act[aria-expanded="true"]');
      if (pb) pb.setAttribute('aria-expanded', 'false');
    }
    openPostId = wasOpen ? null : p.id;
    if (!wasOpen) { art.appendChild(buildComments(p)); btn.setAttribute('aria-expanded', 'true'); }
  }

  // ---- Feed ----
  function renderFeed() {
    var feed = document.getElementById('feed');
    feed.textContent = '';
    if (!posts.length) { feed.appendChild(el('div', 'state', t('empty'))); return; }
    var list = cat === 'all' ? posts : posts.filter(function (p) { return p.category === cat; });
    if (!list.length) { feed.appendChild(el('div', 'state', t('empty_cat'))); return; }
    list.forEach(function (p) { feed.appendChild(renderPost(p)); });
  }

  function loadPosts() {
    fetch('posts.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        posts = (Array.isArray(data) ? data : [])
          .filter(function (p) { return p && typeof p.id === 'string' && /^[\w-]{1,80}$/.test(p.id) && !p.draft; })
          .map(function (p, i) { p._i = i; return p; })
          .sort(function (a, b) { return (b.date || '').localeCompare(a.date || '') || a._i - b._i; });
        var h = location.hash.replace('#', '');
        if (h.indexOf('post-') === 0) openPostId = h.slice(5);
        renderFeed();
        if (openPostId) {
          var target = document.getElementById('post-' + openPostId);
          if (target) target.scrollIntoView();
        }
      })
      .catch(function () {
        var feed = document.getElementById('feed');
        feed.textContent = '';
        feed.appendChild(el('div', 'state', t('load_err')));
      });
  }

  // ---- Til ----
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (n) {
      var v = t(n.getAttribute('data-i18n')); if (typeof v === 'string') n.textContent = v;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    var ul = document.getElementById('privacy-list'); ul.textContent = '';
    t('pv').forEach(function (s) { ul.appendChild(el('li', null, s)); });
    if (posts.length) renderFeed();
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('lang', lang); } catch (e) {}
      applyLang();
    });
  });

  document.querySelectorAll('.cats button').forEach(function (b) {
    b.addEventListener('click', function () {
      cat = b.getAttribute('data-cat');
      document.querySelectorAll('.cats button').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      renderFeed();
    });
  });

  // ---- Suzuvchi shakllar (fon) ----
  function floatingShapes() {
    var cv = document.createElement('canvas');
    cv.className = 'bgfx'; cv.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cv, document.body.firstChild);
    var cx = cv.getContext && cv.getContext('2d');
    if (!cx) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = 0, H = 0, shapes = [], running = false;
    var kinds = [3, 4, 6, 0, 3, 6, 4, 0]; // 3 uchburchak, 4 to'rtburchak, 6 oltiburchak, 0 doira
    var cols = ['46,168,255', '45,255,138', '244,248,255'];
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = Math.round(W * d); cv.height = Math.round(H * d);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(d, 0, 0, d, 0, 0);
    }
    function build() {
      var n = W < 640 ? 5 : 8, small = W < 640;
      shapes = [];
      for (var i = 0; i < n; i++) {
        var sp = rnd(0.12, 0.3), dir = rnd(0, Math.PI * 2);
        shapes.push({
          k: kinds[i % kinds.length], c: cols[i % cols.length],
          x: rnd(0, W), y: rnd(0, H), r: small ? rnd(14, 26) : rnd(20, 40),
          a: rnd(0, Math.PI * 2), va: rnd(0.0015, 0.004) * (Math.random() < 0.5 ? -1 : 1),
          vx: Math.cos(dir) * sp, vy: Math.sin(dir) * sp, o: rnd(0.35, 0.6)
        });
      }
    }
    function path(s) {
      cx.beginPath();
      if (s.k === 0) { cx.arc(0, 0, s.r, 0, Math.PI * 2); return; }
      for (var i = 0; i < s.k; i++) {
        var t = s.a + i * Math.PI * 2 / s.k, px = Math.cos(t) * s.r, py = Math.sin(t) * s.r;
        if (i) cx.lineTo(px, py); else cx.moveTo(px, py);
      }
      cx.closePath();
    }
    function draw() {
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < shapes.length; i++) {
        var s = shapes[i];
        cx.save(); cx.translate(s.x, s.y);
        path(s);
        cx.lineWidth = 1.6;
        cx.strokeStyle = 'rgba(' + s.c + ',' + s.o + ')';
        cx.shadowColor = 'rgba(' + s.c + ',.85)'; cx.shadowBlur = 12;
        cx.stroke();
        cx.restore();
      }
    }
    function step() {
      if (!running) return;
      for (var i = 0; i < shapes.length; i++) {
        var s = shapes[i], m = s.r + 10;
        s.x += s.vx; s.y += s.vy; s.a += s.va;
        if (s.x < -m) s.x = W + m; else if (s.x > W + m) s.x = -m;
        if (s.y < -m) s.y = H + m; else if (s.y > H + m) s.y = -m;
      }
      draw();
      requestAnimationFrame(step);
    }
    function start() { if (reduce || running) return; running = true; requestAnimationFrame(step); }
    size(); build(); draw(); start();
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        var oldW = W; size();
        if ((oldW < 640) !== (W < 640)) build();
        draw();
      }, 150);
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) running = false; else start();
    });
  }
  try { floatingShapes(); } catch (e) {}

  // ---- Nusxalash ----
  var toastTimer;
  function toast(msg) {
    var n = document.getElementById('toast');
    n.textContent = msg; n.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { n.hidden = true; }, 1800);
  }
  function copyText(text) {
    function fallback() {
      var ta = el('textarea'); ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(t('copied')); } catch (e) {}
      ta.remove();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(t('copied')); }, fallback);
    } else fallback();
  }
  document.querySelectorAll('.copy[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () { copyText(b.getAttribute('data-copy')); });
  });

  // ---- Oynalar ----
  var lastFocus = null;
  function openOv(id) { lastFocus = document.activeElement; var o = document.getElementById(id); o.hidden = false; o.querySelector('.x').focus(); }
  function closeOv(id) { document.getElementById(id).hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function openLightbox(src, alt) { var i = document.getElementById('lightbox-img'); i.src = src; i.alt = alt || ''; openOv('lightbox'); }
  document.getElementById('lightbox-close').addEventListener('click', function () { closeOv('lightbox'); });
  document.getElementById('lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') closeOv('lightbox'); });
  document.getElementById('privacy-open').addEventListener('click', function () { openOv('privacy'); });
  document.getElementById('privacy-close').addEventListener('click', function () { closeOv('privacy'); });
  document.getElementById('privacy').addEventListener('click', function (e) { if (e.target.id === 'privacy') closeOv('privacy'); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    ['lightbox', 'privacy'].forEach(function (id) { if (!document.getElementById(id).hidden) closeOv(id); });
  });

  var yr = document.querySelector('.yr'); var y = new Date().getFullYear();
  if (yr && y > 2026) yr.textContent = '2026–' + y;

  applyLang();
  loadPosts();
})();
