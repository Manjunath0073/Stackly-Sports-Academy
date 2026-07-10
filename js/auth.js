const Auth = (function () {
  'use strict';

  var USER_KEY = 'currentUser';

  function saveCurrentUser(user) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getCurrentUser() {
    try {
      var data = localStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function removeCurrentUser() {
    try {
      localStorage.removeItem(USER_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function logout(redirectTo) {
    removeCurrentUser();
    window.location.href = redirectTo || 'login.html';
  }

  function checkAuthentication() {
    var user = getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return null;
    }
    return user;
  }

  function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  }

  function getGreeting() {
    var h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  function formatDate(dateStr) {
    var d = dateStr ? new Date(dateStr) : new Date();
    return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatTime(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  function populateDate(user) {
    var dateEl = document.getElementById('currentDate');
    if (!dateEl) return false;
    if (user.loginTime) {
      dateEl.textContent = formatDate(user.loginTime) + ' · Logged in at ' + formatTime(user.loginTime);
    } else {
      dateEl.textContent = formatDate();
    }
    return true;
  }

  function updateDashboardUser() {
    var user = getCurrentUser();
    if (!user) return;

    var initials = getInitials(user.name);

    var avatarEl = document.querySelector('.dashboard__profile-avatar');
    var dropdownAvatar = document.querySelector('.dashboard__dropdown-avatar');
    var dropdownName = document.querySelector('.dashboard__dropdown-info strong');
    var dropdownRole = document.querySelector('.dashboard__dropdown-info span');

    if (avatarEl) avatarEl.textContent = initials;
    if (dropdownAvatar) dropdownAvatar.textContent = initials;
    if (dropdownName) dropdownName.textContent = user.name;
    if (dropdownRole) dropdownRole.textContent = user.role === 'coach' ? 'Head Coach' : 'Student Athlete';

    var sidebarName = document.getElementById('sidebarUserName');
    var sidebarRole = document.getElementById('sidebarUserRole');
    var sidebarImg = document.getElementById('sidebarUserImg');

    if (sidebarName) sidebarName.textContent = user.name;
    if (sidebarRole) sidebarRole.textContent = user.role === 'coach' ? 'Coach' : 'Student';
    if (sidebarImg) {
      if (user.profileImage) {
        sidebarImg.src = user.profileImage;
        sidebarImg.style.display = 'block';
      } else {
        sidebarImg.style.display = 'none';
      }
    }

    if (!populateDate(user)) {
      var retries = 0;
      var timer = setInterval(function () {
        retries++;
        if (populateDate(user) || retries > 20) {
          clearInterval(timer);
        }
      }, 150);
    }
  }

  function attachLogout() {
    document.querySelectorAll('[data-logout]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        logout();
      });
    });
  }

  function init() {
    var user = checkAuthentication();
    if (!user) return;
    updateDashboardUser();
    attachLogout();
  }

  if (document.getElementById('dashboard')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return {
    saveCurrentUser: saveCurrentUser,
    getCurrentUser: getCurrentUser,
    removeCurrentUser: removeCurrentUser,
    logout: logout,
    checkAuthentication: checkAuthentication,
    getInitials: getInitials,
    getGreeting: getGreeting,
    formatDate: formatDate,
    formatTime: formatTime,
    updateDashboardUser: updateDashboardUser
  };
})();
