/* alisher.live — Telegram Mini App integratsiyasi
   Faqat sayt Telegram ilovasi ichida ochilganda ishga tushadi.
   Oddiy brauzerda hech narsa qilmaydi (hatto SDK ham yuklanmaydi). */
(function () {
  'use strict';

  var href = location.hash + '&' + location.search;
  // Telegram Mini App URL'ga tgWebApp* parametrlarini qo'shadi
  if (href.indexOf('tgWebApp') === -1) return;

  var root = document.documentElement;
  root.classList.add('in-telegram');

  // Sayt ranglari (temasi bo'yicha)
  var BG = { dark: '#07080B', light: '#F5F6F8' };

  // 1) Temani DARHOL o'rnatamiz (SDK yuklanishidan oldin — miltillash bo'lmasin).
  //    Telegram hash ichida tgWebAppThemeParams (bg_color) beradi.
  var guessed = null;
  try {
    var m = (location.hash + location.search).match(/tgWebAppThemeParams=([^&]+)/);
    if (m) {
      var tp = JSON.parse(decodeURIComponent(m[1]));
      if (tp && tp.bg_color) guessed = isDark(tp.bg_color) ? 'dark' : 'light';
    }
  } catch (e) {}
  if (guessed) setTheme(guessed);

  // 2) Telegram SDK'sini yuklaymiz
  var s = document.createElement('script');
  s.src = 'https://telegram.org/js/telegram-web-app.js';
  s.async = false;
  s.onload = init;
  s.onerror = function () {}; // SDK kelmasa ham sayt ishlayveradi
  (document.head || root).appendChild(s);

  function init() {
    var W = window.Telegram && window.Telegram.WebApp;
    if (!W) return;

    try { W.ready(); } catch (e) {}
    try { W.expand(); } catch (e) {}              // to'liq balandlik
    try { if (W.disableVerticalSwipes) W.disableVerticalSwipes(); } catch (e) {} // tasodifan yopilib qolmasin

    applyTheme();
    try { W.onEvent('themeChanged', applyTheme); } catch (e) {}

    // Orqaga tugmasi: bosh sahifada yashirin, boshqa sahifalarda ko'rinadi
    try {
      var bb = W.BackButton;
      if (bb) {
        bb.onClick(function () {
          if (window.history.length > 1) window.history.back();
          else location.href = '/';
        });
        var p = location.pathname.replace(/\/index\.html$/i, '/');
        if (p && p !== '/') bb.show(); else bb.hide();
      }
    } catch (e) {}

    function applyTheme() {
      var scheme = (W.colorScheme === 'light') ? 'light' : 'dark';
      setTheme(scheme);
      var c = BG[scheme];
      try { W.setHeaderColor(c); } catch (e) {}
      try { W.setBackgroundColor(c); } catch (e) {}
      try { if (W.setBottomBarColor) W.setBottomBarColor(c); } catch (e) {}
    }
  }

  function setTheme(t) {
    try { root.setAttribute('data-theme', t); } catch (e) {}
    try {
      var mt = document.querySelector('meta[name="theme-color"]');
      if (mt) mt.setAttribute('content', BG[t]);
    } catch (e) {}
  }

  function isDark(hex) {
    try {
      hex = String(hex).replace('#', '');
      if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      var r = parseInt(hex.slice(0, 2), 16),
          g = parseInt(hex.slice(2, 4), 16),
          b = parseInt(hex.slice(4, 6), 16);
      // nisbiy yorqinlik
      return (0.2126 * r + 0.7152 * g + 0.0722 * b) < 140;
    } catch (e) { return true; }
  }
})();
