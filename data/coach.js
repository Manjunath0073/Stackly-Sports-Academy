const CoachData = (function () {
  'use strict';

  function get() {
    const stored = Storage.get('sportAcademUser');
    return {
      name: stored?.name || 'Coach David',
      firstName: stored?.firstName || 'David',
      lastName: stored?.lastName || 'Johnson',
      email: stored?.email || 'david.johnson@sportsacademy.com',
      role: 'Head Coach',
      phone: stored?.phone || '+1 (555) 111-2233',
      profileImage: stored?.profileImage || 'assets/coach-david.webp',
      loginTime: stored?.loginTime || Storage.get('loginTime') || new Date().toISOString(),
      memberSince: 'September 2020',
      coachId: 'CH-2020-001',
      specialization: 'Football, Athletics',
      experience: '12 Years',
      rating: 4.9,
      certifications: ['UEFA B License', 'NSCA Certified', 'First Aid Certified'],
      studentsCount: 24,
      totalSessions: 580,
      avgAttendance: 94
    };
  }

  function update(data) {
    const existing = get();
    const merged = Object.assign({}, existing, data);
    Storage.set('sportAcademUser', JSON.stringify(merged));
    return merged;
  }

  function getInitials(name) {
    if (!name) return 'CD';
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  }

  return { get, update, getInitials };
})();
