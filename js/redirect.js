(function () {
  'use strict';

  function go404(e) {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '404.html';
    return false;
  }

  function isRealHref(link) {
    var h = link.getAttribute('href');
    if (!h || h === '#' || h === '' || h === '#!') return false;
    if (h.startsWith('#/')) return true;
    if (h.startsWith('#') && !h.startsWith('#/') && h !== '#') {
      var pageAnchor = document.querySelector(h);
      if (pageAnchor) return true;
    }
    if (h.indexOf('javascript:') === 0) return false;
    if (link.getAttribute('onclick')) return true;
    return true;
  }

  function shouldIgnore(el) {
    if (!el || el === document || el === document.body) return false;

    var id = el.id || '';
    if (id === 'sidebarToggle' || id === 'themeToggle' || id === 'panelToggle' ||
        id === 'panelClose' || id === 'profileBtn' || id === 'dashboardOverlay') return true;

    var tag = el.tagName ? el.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;

    return false;
  }

  document.addEventListener('click', function (e) {
    if (shouldIgnore(e.target)) return;
    if (shouldIgnore(e.target.closest('#profileSection'))) return;
    if (shouldIgnore(e.target.closest('.dashboard__search'))) return;
    if (shouldIgnore(e.target.closest('.dashboard__panel'))) return;

    var btn = e.target.closest('.d-btn--primary, .d-btn--ghost, .d-btn, .qaction, .p-action, .btn--primary, .btn--ghost, .btn');
    if (btn) {
      if (btn.hasAttribute('onclick')) return;
      if (btn.getAttribute('type') === 'submit' || btn.closest('form')) return;
      var link = btn.tagName === 'A' ? btn : btn.querySelector('a');
      if (link) {
        if (isRealHref(link)) return;
      }
      if (btn.classList.contains('dashboard__sidebar-link')) return;
      if (btn.closest('.dashboard__sidebar')) return;
      if (btn.closest('.dashboard__header')) {
        if (btn.closest('.dashboard__profile')) return;
        if (btn.closest('.dashboard__search')) return;
        if (btn.id === 'themeToggle' || btn.id === 'sidebarToggle' || btn.id === 'panelToggle') return;
        var headerLink = btn.tagName === 'A' ? btn : null;
        if (headerLink && isRealHref(headerLink)) return;
      }
      if (btn.closest('.dashboard__sidebar-footer')) return;
      if (btn.closest('.dashboard__sidebar-nav')) return;
      if (btn.closest('.header__actions')) return;
      if (btn.closest('.mobile-menu')) return;
      if (btn.closest('.dashboard__dropdown-body')) {
        var ddLink = btn.tagName === 'A' ? btn : btn.querySelector('a');
        if (ddLink && isRealHref(ddLink)) return;
      }
      go404(e);
      return;
    }

    var link = e.target.closest('a');
    if (link) {
      if (link.closest('.dashboard__sidebar-nav')) return;
      if (link.closest('.dashboard__sidebar-footer')) return;
      if (link.closest('.header__actions')) return;
      if (link.closest('.mobile-menu')) return;
      if (link.closest('.dashboard__header')) {
        if (link.closest('.dashboard__profile')) return;
        if (link.closest('.dashboard__search')) return;
        if (link.closest('.dashboard__panel')) return;
      }
      if (link.closest('.skip-link')) return;
      if (link.closest('.preloader')) return;
      if (link.closest('.dashboard__dropdown-body')) {
        if (isRealHref(link)) return;
        go404(e);
        return;
      }
      var href = link.getAttribute('href');
      if (!href || href === '#' || href === '' || href === '#!') {
        go404(e);
        return;
      }
    }
  }, true);

})();
