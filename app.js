/* alisher.live — sayt skripti.
   Yangiliklar posts.json faylidan olinadi. Hamma matn textContent orqali chiqariladi (HTML sifatida emas),
   havolalar faqat http/https bo'lsa qabul qilinadi. */
(function () {
  'use strict';

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // ---- Kirish taqdimoti (faqat birinchi tashrifda, 1.6 soniya) ----
  function intro() {
    if (/^#post-/.test(location.hash)) return;
    if (reduceMotion) return;
    try { if (localStorage.getItem('intro_seen')) return; localStorage.setItem('intro_seen', '1'); } catch (e) { return; }
    var st = document.createElement('style');
    st.textContent = [
      '#intro{position:fixed;inset:0;z-index:100;background:#060a12;display:grid;place-items:center;transition:opacity .45s ease,visibility .45s ease;cursor:pointer}',
      '#intro.out{opacity:0;visibility:hidden}',
      '#intro .box{display:grid;justify-items:center;gap:16px;padding:24px;text-align:center}',
      '#intro svg{width:112px;height:112px;overflow:visible;filter:drop-shadow(0 0 8px rgba(46,168,255,.55))}',
      '#intro path{fill:none;stroke-dasharray:100;stroke-dashoffset:100;stroke-linecap:butt;stroke-linejoin:miter;animation:introDraw .5s ease forwards}',
      '#intro .p1{stroke:#2ea8ff;stroke-width:4.8}',
      '#intro .p2{stroke:#2dff8a;stroke-width:4.8;animation-delay:.2s}',
      '#intro .p3{stroke:#f4f8ff;stroke-width:3.4;animation-delay:.45s}',
      '#intro .nm{font-family:var(--f-display);font-weight:700;font-size:clamp(1.5rem,6vw,2.4rem);line-height:1.15;color:#f4f8ff;opacity:0;animation:introUp .45s ease .55s forwards}',
      '#intro .nm span{color:#2ea8ff;text-shadow:0 0 18px rgba(46,168,255,.55)}',
      '#intro .ln{display:grid;grid-template-rows:2px 1px 2px;width:140px;transform:scaleX(0);animation:introLine .45s ease .7s forwards}',
      '#intro .ln i:nth-child(1){background:#2ea8ff}#intro .ln i:nth-child(2){background:#f4f8ff}#intro .ln i:nth-child(3){background:#2dff8a}',
      '#intro .dm{font-family:var(--f-mono);font-size:.85rem;letter-spacing:.2em;color:#2dff8a;opacity:0;animation:introUp .45s ease .8s forwards}',
      '@keyframes introDraw{to{stroke-dashoffset:0}}',
      '@keyframes introUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
      '@keyframes introLine{to{transform:scaleX(1)}}'
    ].join('');
    document.head.appendChild(st);
    var ov = document.createElement('div');
    ov.id = 'intro'; ov.setAttribute('aria-hidden', 'true');
    ov.innerHTML = '<div class="box">' +
      '<svg viewBox="0 0 64 64">' +
      '<path class="p1" pathLength="100" d="M8.9 51 L23.8 13 L38.8 51"/>' +
      '<path class="p2" pathLength="100" d="M25.2 51 L40.2 13 L55.1 51"/>' +
      '<path class="p3" pathLength="100" d="M16.4 37.4 L46.3 37.4"/>' +
      '</svg>' +
      '<div class="nm">Alisher <span>Abduraximov</span></div>' +
      '<div class="ln"><i></i><i></i><i></i></div>' +
      '<div class="dm">alisher.live</div>' +
      '</div>';
    document.body.insertBefore(ov, document.body.firstChild);
    var root = document.documentElement;
    root.style.overflow = 'hidden';
    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      ov.classList.add('out');
      root.style.overflow = '';
      document.removeEventListener('keydown', done);
      setTimeout(function () { ov.remove(); st.remove(); }, 500);
    }
    ov.addEventListener('click', done);
    document.addEventListener('keydown', done);
    setTimeout(done, 1600);
  }
  try { intro(); } catch (e) {}

  // ---- Sozlamalar ----
  var CONFIG = {
    // Cusdis'da ro'yxatdan o'tgach, "App ID" ni shu yerga yozing. Bo'sh bo'lsa, izohlar "tez orada" deb turadi.
    cusdisAppId: '',
    cusdisHost: 'https://cusdis.com',
    author: 'Alisher Abduraximov',
    pageSize: 10 // lentada bir martada nechta post ko'rinadi
  };

  // Kategoriyalar. posts.json dagi "category" maydoni shu kalitlardan biri bo'lishi kerak.
  // Yangi kategoriya qo'shish uchun shu ro'yxatga bitta qator qo'shing.
  var CATS = {
    news:   { uz: 'Yangiliklar', en: 'News',   ru: 'Новости' },
    sport:  { uz: 'Sport',       en: 'Sports', ru: 'Спорт' },
    useful: { uz: 'Foydali',     en: 'Useful', ru: 'Полезное' }
  };

  var T = {
    uz: {
      nav_posts: 'Yangiliklar', nav_contact: 'Aloqa',
      bio: 'Yangiliklar, sport va turli yo‘nalishlardagi foydali ma’lumotlar.',
      posts_title: 'Yangiliklar', loading: 'Yangiliklar yuklanmoqda…',
      load_err: 'Yangiliklar yuklanmadi. Sahifani yangilab ko‘ring.', empty: 'Hozircha yangilik yo‘q.',
      contact_title: 'Aloqa',
      all: 'Hammasi', filter: 'Kategoriyalar',
      more: 'Davomini o‘qish', less: 'Yig‘ish', load_more: 'Ko‘proq yuklash',
      comments: 'Izohlar', copy_link: 'Havola', share: 'Ulashish', copied: 'Nusxalandi',
      watch_yt: 'YouTube’da ko‘rish', open_link: 'Havolani ochish',
      t_photo: 'Foto',
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
      nav_posts: 'News', nav_contact: 'Contact',
      bio: 'News, sports and useful information on many topics.',
      posts_title: 'News', loading: 'Loading news…',
      load_err: 'News could not be loaded. Please refresh the page.', empty: 'No news yet.',
      contact_title: 'Contact',
      all: 'All', filter: 'Categories',
      more: 'Read more', less: 'Show less', load_more: 'Load more',
      comments: 'Comments', copy_link: 'Link', share: 'Share', copied: 'Copied',
      watch_yt: 'Watch on YouTube', open_link: 'Open link',
      t_photo: 'Photo',
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
      nav_posts: 'Новости', nav_contact: 'Контакты',
      bio: 'Новости, спорт и полезная информация на разные темы.',
      posts_title: 'Новости', loading: 'Загрузка новостей…',
      load_err: 'Не удалось загрузить новости. Обновите страницу.', empty: 'Новостей пока нет.',
      contact_title: 'Контакты',
      all: 'Все', filter: 'Категории',
      more: 'Читать далее', less: 'Свернуть', load_more: 'Показать ещё',
      comments: 'Комментарии', copy_link: 'Ссылка', share: 'Поделиться', copied: 'Скопировано',
      watch_yt: 'Смотреть на YouTube', open_link: 'Открыть ссылку',
      t_photo: 'Фото',
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
  var loaded = false;
  var openPostId = null;
  var cat = 'all';                // tanlangan kategoriya
  var shown = CONFIG.pageSize;    // hozir nechta post ko'rsatilgan
  var expanded = {};              // "Davomini o'qish" ochilgan postlar

  // Telefonda (sensorli ekran) tizimning "Ulashish" oynasi ishlatiladi
  var canShare = typeof navigator.share === 'function' &&
    !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

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
    share: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7|M16 6l-4-4-4 4|M12 2v13',
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

  function postLabel(p) {
    return localized(p.title) || (localized(p.text) || p.id).slice(0, 80);
  }

  function sharePost(p) {
    var url = location.href.split('#')[0] + '#post-' + p.id;
    if (!canShare) { copyText(url); return; }
    navigator.share({
      title: localized(p.title) || document.title,
      text: (localized(p.title) ? '' : (localized(p.text) || '').slice(0, 120)),
      url: url
    }).catch(function (e) {
      if (!e || e.name !== 'AbortError') copyText(url);
    });
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
    head.appendChild(mk); head.appendChild(who);
    if (CATS[p.category]) head.appendChild(el('span', 'tag', localized(CATS[p.category])));
    art.appendChild(head);

    var ttl = localized(p.title);
    if (ttl) art.appendChild(el('h3', 'post-title', ttl));

    var txt = localized(p.text);
    if (txt) {
      var pt = el('p', 'post-text'); linkify(txt, pt); art.appendChild(pt);
      var isLong = txt.length > 320 || txt.split('\n').length > 6;
      if (isLong) {
        var isOpen = !!expanded[p.id];
        if (!isOpen) pt.classList.add('clamp');
        var mb = el('button', 'more', t(isOpen ? 'less' : 'more')); mb.type = 'button';
        mb.setAttribute('aria-expanded', String(isOpen));
        mb.addEventListener('click', function () {
          var o = !expanded[p.id];
          expanded[p.id] = o;
          pt.classList.toggle('clamp', !o);
          mb.textContent = t(o ? 'less' : 'more');
          mb.setAttribute('aria-expanded', String(o));
        });
        art.appendChild(mb);
      }
    }

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
    sb.appendChild(svg(canShare ? IC.share : IC.link, { stroke: true }));
    sb.appendChild(el('span', null, t(canShare ? 'share' : 'copy_link')));
    sb.addEventListener('click', function () { sharePost(p); });
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
    var note = el('p', 'mono', t('cm_note'));
    note.style.color = 'var(--muted)'; note.style.margin = '0 0 10px';
    box.appendChild(note);
    var th = el('div'); th.id = 'cusdis_thread';
    th.setAttribute('data-host', CONFIG.cusdisHost);
    th.setAttribute('data-app-id', CONFIG.cusdisAppId);
    th.setAttribute('data-page-id', p.id);
    th.setAttribute('data-page-url', location.origin + location.pathname + '#post-' + p.id);
    th.setAttribute('data-page-title', postLabel(p));
    th.setAttribute('data-theme', 'dark');
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

  // ---- Kategoriya filtrlari ----
  function visiblePosts() {
    if (cat === 'all') return posts;
    return posts.filter(function (p) { return p.category === cat; });
  }

  function renderCats() {
    var feed = document.getElementById('feed');
    var bar = document.getElementById('cats');
    if (!bar) {
      bar = el('div', 'cats'); bar.id = 'cats'; bar.setAttribute('role', 'group');
      feed.parentNode.insertBefore(bar, feed);
    }
    bar.setAttribute('aria-label', t('filter'));
    bar.textContent = '';
    // Faqat postlari bor kategoriyalar ko'rsatiladi
    var keys = Object.keys(CATS).filter(function (k) {
      return posts.some(function (p) { return p.category === k; });
    });
    if (keys.length < 2) { bar.hidden = true; cat = 'all'; return; }
    bar.hidden = false;
    ['all'].concat(keys).forEach(function (k) {
      var b = el('button', null, k === 'all' ? t('all') : localized(CATS[k]));
      b.type = 'button';
      b.setAttribute('aria-pressed', String(cat === k));
      b.addEventListener('click', function () {
        if (cat === k) return;
        cat = k; shown = CONFIG.pageSize;
        renderCats(); renderFeed();
      });
      bar.appendChild(b);
    });
  }

  // ---- Lenta ----
  function moreButton(list, feed) {
    var lm = el('button', 'loadmore', t('load_more')); lm.type = 'button';
    lm.addEventListener('click', function () {
      var from = shown;
      shown += CONFIG.pageSize;
      lm.remove();
      var firstNew = null;
      list.slice(from, shown).forEach(function (p) {
        var n = renderPost(p);
        if (!firstNew) firstNew = n;
        feed.appendChild(n);
      });
      if (list.length > shown) feed.appendChild(moreButton(list, feed));
      if (firstNew) { firstNew.setAttribute('tabindex', '-1'); firstNew.focus({ preventScroll: true }); }
    });
    return lm;
  }

  function renderFeed() {
    var feed = document.getElementById('feed');
    feed.textContent = '';
    var list = visiblePosts();
    if (!list.length) { feed.appendChild(el('div', 'state', t('empty'))); return; }
    list.slice(0, shown).forEach(function (p) { feed.appendChild(renderPost(p)); });
    if (list.length > shown) feed.appendChild(moreButton(list, feed));
  }

  function loadPosts() {
    fetch('posts.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        posts = (Array.isArray(data) ? data : [])
          .filter(function (p) { return p && typeof p.id === 'string' && /^[\w-]{1,80}$/.test(p.id) && !p.draft; })
          .map(function (p, i) { p._i = i; return p; })
          .sort(function (a, b) { return (b.date || '').localeCompare(a.date || '') || a._i - b._i; });
        loaded = true;
        var h = location.hash.replace('#', '');
        if (h.indexOf('post-') === 0) {
          openPostId = h.slice(5);
          // Havola orqali kelingan post keyingi sahifalarda bo'lsa ham ko'rinsin
          var idx = -1;
          for (var i = 0; i < posts.length; i++) { if (posts[i].id === openPostId) { idx = i; break; } }
          if (idx >= shown) shown = Math.ceil((idx + 1) / CONFIG.pageSize) * CONFIG.pageSize;
        }
        renderCats();
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
    if (loaded) { renderCats(); renderFeed(); }
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.getAttribute('data-lang');
      try { localStorage.setItem('lang', lang); } catch (e) {}
      applyLang();
    });
  });

  // ---- Suzuvchi shakllar (fon). Telefonda yengil rejim, trafik tejash rejimida o'chiq ----
  function floatingShapes() {
    var conn = navigator.connection;
    if (conn && conn.saveData) return;
    var cv = document.createElement('canvas');
    cv.className = 'bgfx'; cv.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(cv, document.body.firstChild);
    var cx = cv.getContext && cv.getContext('2d');
    if (!cx) return;
    var W = 0, H = 0, lite = false, shapes = [], running = false, frame = 0;
    var kinds = [3, 4, 6, 0, 3, 6, 4, 0];
    var cols = ['46,168,255', '45,255,138', '244,248,255'];
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      lite = W < 640;
      cv.width = Math.round(W * d); cv.height = Math.round(H * d);
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(d, 0, 0, d, 0, 0);
    }
    function build() {
      var n = lite ? 4 : 8;
      shapes = [];
      for (var i = 0; i < n; i++) {
        var sp = rnd(0.12, 0.3), dir = rnd(0, Math.PI * 2);
        shapes.push({
          k: kinds[i % kinds.length], c: cols[i % cols.length],
          x: rnd(0, W), y: rnd(0, H), r: lite ? rnd(14, 26) : rnd(20, 40),
          a: rnd(0, Math.PI * 2), va: rnd(0.0015, 0.004) * (Math.random() < 0.5 ? -1 : 1),
          vx: Math.cos(dir) * sp, vy: Math.sin(dir) * sp, o: rnd(0.35, 0.6)
        });
      }
    }
    function path(s) {
      cx.beginPath();
      if (s.k === 0) { cx.arc(0, 0, s.r, 0, Math.PI * 2); return; }
      for (var i = 0; i < s.k; i++) {
        var a = s.a + i * Math.PI * 2 / s.k, px = Math.cos(a) * s.r, py = Math.sin(a) * s.r;
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
        if (!lite) { cx.shadowColor = 'rgba(' + s.c + ',.85)'; cx.shadowBlur = 12; }
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
      frame++;
      if (!lite || frame % 2 === 0) draw();
      requestAnimationFrame(step);
    }
    function start() { if (reduceMotion || running) return; running = true; requestAnimationFrame(step); }
    size(); build(); draw(); start();
    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        var wasLite = lite; size();
        if (wasLite !== lite) build();
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

  // ---- Oynalar ----
  var OVERLAYS = ['lightbox', 'privacy'];
  var lastFocus = null;
  function openOverlay() {
    for (var i = 0; i < OVERLAYS.length; i++) {
      var o = document.getElementById(OVERLAYS[i]);
      if (!o.hidden) return o;
    }
    return null;
  }
  function openOv(id) {
    lastFocus = document.activeElement;
    var o = document.getElementById(id); o.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    o.querySelector('.x').focus();
  }
  function closeOv(id) {
    document.getElementById(id).hidden = true;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function openLightbox(src, alt) { var i = document.getElementById('lightbox-img'); i.src = src; i.alt = alt || ''; openOv('lightbox'); }
  document.getElementById('lightbox-close').addEventListener('click', function () { closeOv('lightbox'); });
  document.getElementById('lightbox').addEventListener('click', function (e) { if (e.target.id === 'lightbox') closeOv('lightbox'); });
  document.getElementById('privacy-open').addEventListener('click', function () { openOv('privacy'); });
  document.getElementById('privacy-close').addEventListener('click', function () { closeOv('privacy'); });
  document.getElementById('privacy').addEventListener('click', function (e) { if (e.target.id === 'privacy') closeOv('privacy'); });
  document.addEventListener('keydown', function (e) {
    var o = openOverlay();
    if (!o) return;
    if (e.key === 'Escape') closeOv(o.id);
    else if (e.key === 'Tab') { e.preventDefault(); o.querySelector('.x').focus(); }
  });

  var yr = document.querySelector('.yr'); var y = new Date().getFullYear();
  if (yr && y > 2026) yr.textContent = '2026–' + y;

  applyLang();
  loadPosts();
})();
