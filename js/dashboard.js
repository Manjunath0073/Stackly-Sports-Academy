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
  function togglePanel() {
    dash.classList.toggle('dashboard--panel-open');
  }

  function closePanel() {
    dash.classList.remove('dashboard--panel-open');
  }

  if (panelToggle) panelToggle.addEventListener('click', togglePanel);
  if (panelClose) panelClose.addEventListener('click', closePanel);

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
