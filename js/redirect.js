(function () {
  'use strict';

  var isDashboard = !!document.getElementById('dashboard');

  function go404(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '404.html';
    return false;
  }

  var JS_IDS = { sidebarToggle: 1, themeToggle: 1, panelToggle: 1, panelClose: 1, profileBtn: 1, dashboardOverlay: 1, menuToggle: 1, prevBtn: 1, nextBtn: 1, backToTop: 1, watchVideo: 1 };

  function isExcluded(el) {
    if (!el || el === document || el === document.body) return true;
    var tag = (el.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (el.closest('.skip-link')) return true;
    if (el.closest('.preloader')) return true;
    if (el.closest('.header__actions')) return true;
    if (el.closest('.mobile-menu')) return true;
    if (el.closest('.dashboard__panel')) return true;
    if (el.closest('.dashboard__profile')) return true;
    if (el.closest('.dashboard__search')) return true;
    if (el.closest('.dashboard__sidebar')) return true;
    if (el.closest('.dashboard__sidebar-footer')) return true;
    if (el.closest('.dashboard__sidebar-nav')) return true;
    if (el.closest('.dashboard__header')) {
      var id = el.id || '';
      if (JS_IDS[id]) return true;
    }
    var elId = el.id || '';
    if (JS_IDS[elId]) return true;
    return false;
  }

  function isFooter(el) {
    return !!el.closest('.footer, .footer__bottom, .footer__col, .footer__social, .footer__legal, .footer__newsletter');
  }

  function isHeader(el) {
    return !!el.closest('.header, .header__nav, .header__logo, .header__container');
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    var target = e.target;

    /* ---- Dashboard SPA ---- */
    if (isDashboard) {
      if (isExcluded(target)) return;
      if (target.closest('.dashboard__dropdown-body')) {
        var dd = target.closest('a');
        if (dd && dd.getAttribute('href') && dd.getAttribute('href') !== '#' && dd.getAttribute('href') !== '') return;
        go404(e); return;
      }
      var btn = target.closest('.d-btn--primary, .d-btn--ghost, .d-btn, .qaction, .p-action');
      if (btn) {
        if (btn.hasAttribute('onclick')) return;
        if (btn.getAttribute('type') === 'submit' || btn.closest('form')) return;
        if (btn.closest('.dashboard__header') && !btn.closest('.dashboard__profile')) return;
        var link = btn.tagName === 'A' ? btn : btn.querySelector('a');
        if (link && link.getAttribute('href') && link.getAttribute('href') !== '#' && link.getAttribute('href') !== '') {
          if (link.getAttribute('href').startsWith('#/')) return;
        }
        go404(e); return;
      }
      var a = target.closest('a');
      if (a) {
        var h = a.getAttribute('href') || '';
        if (h.startsWith('#/')) return;
        if (!h || h === '#' || h === '' || h === '#!') { go404(e); return; }
      }
      return;
    }

    /* ---- Public Pages ---- */
    if (isExcluded(target)) return;
    if (isHeader(target)) return;
    if (isFooter(target)) return;

    var btn = target.closest('.btn, .btn--primary, .btn--ghost, .btn--outline, .btn--play, .program-card__link, .pricing-card__btn, .coach-card__social a, .hero__scroll, .testimonial-btn, .back-to-top, .auth-social');
    if (btn) {
      if (btn.hasAttribute('onclick')) return;
      if (btn.getAttribute('type') === 'submit' || btn.closest('form')) return;
      go404(e);
      return;
    }

    var a = target.closest('a');
    if (a) {
      var href = a.getAttribute('href') || '';
      if (!href || href === '#' || href === '' || href.startsWith('#')) {
        go404(e); return;
      }
    }
  }, true);

})();
