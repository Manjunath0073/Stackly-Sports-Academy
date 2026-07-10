const CoachData = (function () {
  'use strict';

  function get() {
    var user = Auth.getCurrentUser();
    var stored = user || {};
    var nameParts = (stored.name || '').split(' ');
    var firstName = nameParts[0] || 'David';
    var lastName = nameParts.slice(1).join(' ') || 'Johnson';

    return {
      name: stored.name || 'Coach David',
      firstName: firstName,
      lastName: lastName,
      email: stored.email || 'david.johnson@sportsacademy.com',
      role: 'Head Coach',
      phone: stored.phone || '+1 (555) 111-2233',
      profileImage: stored.profileImage || '',
      loginTime: stored.loginTime || new Date().toISOString(),
      memberSince: 'September 2020',
      coachId: 'CH-2020-001',
      specialization: stored.sport || 'Football, Athletics',
      experience: '12 Years',
      rating: 4.9,
      certifications: ['UEFA B License', 'NSCA Certified', 'First Aid Certified'],
      studentsCount: 24,
      totalSessions: 580,
      avgAttendance: 94
    };
  }

  function update(data) {
    var existing = get();
    var merged = Object.assign({}, existing, data);
    Auth.saveCurrentUser(merged);
    return merged;
  }

  function getInitials(name) {
    if (!name) return 'CD';
    return name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  }

  return { get: get, update: update, getInitials: getInitials };
})();
