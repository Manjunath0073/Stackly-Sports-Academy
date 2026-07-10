/**
 * Stackly Sports Academy — Dashboard Framework
 * Reusable vanilla JavaScript
 */
(function () {
  'use strict';

  const dash = document.getElementById('dashboard');
  if (!dash) return;

  const sidebar = document.getElementById('dashboardSidebar');
  const overlay = document.getElementById('dashboardOverlay');
  const toggleBtn = document.getElementById('sidebarToggle');
  const panel = document.getElementById('dashboardPanel');
  const panelClose = document.getElementById('panelClose');
  const panelToggle = document.getElementById('panelToggle');
  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.dashboard__sidebar-link');

  // ===== SIDEBAR TOGGLE =====
  function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      sidebar.classList.toggle('dashboard__sidebar--open');
      overlay.classList.toggle('dashboard__overlay--active');
      document.body.style.overflow = sidebar.classList.contains('dashboard__sidebar--open') ? 'hidden' : '';
    } else {
      dash.classList.toggle('dashboard--collapsed');
    }
  }

  function closeSidebar() {
    sidebar.classList.remove('dashboard__sidebar--open');
    overlay.classList.remove('dashboard__overlay--active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // ===== RESPONSIVE SIDEBAR =====
  function handleResize() {
    if (window.innerWidth > 768) {
      closeSidebar();
    }
    if (window.innerWidth <= 1024 && window.innerWidth > 768) {
      dash.classList.add('dashboard--collapsed');
    }
    if (window.innerWidth > 1024) {
      const wasCollapsed = localStorage.getItem('dash_sidebar');
      if (wasCollapsed === 'true') {
        dash.classList.add('dashboard--collapsed');
      }
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();

  // ===== NOTIFICATION PANEL =====
  function openPanel() {
    if (!panel || !panelToggle) return;
    var rect = panelToggle.getBoundingClientRect();
    panel.style.top = (rect.bottom + 8) + 'px';
    panel.style.right = (window.innerWidth - rect.right) + 'px';
    panel.classList.add('dashboard__panel--open');
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('dashboard__panel--open');
  }

  function togglePanel(e) {
    e.stopPropagation();
    if (panel.classList.contains('dashboard__panel--open')) {
      closePanel();
    } else {
      openPanel();
    }
  }

  if (panelToggle) panelToggle.addEventListener('click', togglePanel);
  if (panelClose) panelClose.addEventListener('click', function(e) {
    e.stopPropagation();
    closePanel();
  });

  document.addEventListener('click', function(e) {
    if (!panel || !panelToggle) return;
    if (panel.classList.contains('dashboard__panel--open') &&
        !panel.contains(e.target) && !panelToggle.contains(e.target)) {
      closePanel();
    }
  });

  window.addEventListener('resize', function() {
    if (panel && panel.classList.contains('dashboard__panel--open')) {
      openPanel();
    }
  });

  // ===== PROFILE DROPDOWN =====
  function toggleDropdown(e) {
    e.stopPropagation();
    profileBtn.classList.toggle('dashboard__profile-btn--open');
    profileDropdown.classList.toggle('dashboard__profile-dropdown--open');
  }

  function closeDropdown(e) {
    if (!profileBtn.contains(e.target)) {
      profileBtn.classList.remove('dashboard__profile-btn--open');
      profileDropdown.classList.remove('dashboard__profile-dropdown--open');
    }
  }

  if (profileBtn) profileBtn.addEventListener('click', toggleDropdown);
  document.addEventListener('click', closeDropdown);

  // ===== THEME TOGGLE =====
  function toggleTheme() {
    dash.classList.toggle('dashboard--dark');
    const isDark = dash.classList.contains('dashboard--dark');
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

    // Re-initialize charts with new theme colors
    setTimeout(function () {
      if (typeof Charts !== 'undefined') {
        Charts.destroyAll();
        if (typeof App !== 'undefined') {
          App.renderPage(App.currentPage || 'overview');
        }
      }
    }, 150);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // ===== ESC KEY =====
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSidebar();
      closePanel();
      closeDropdown(e);
    }
  });

})();
