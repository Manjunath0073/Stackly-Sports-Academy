const StudentData = (function () {
  'use strict';

  function nameParts(fullName) {
    var parts = (fullName || '').split(' ');
    return { first: parts[0] || 'John', last: parts.slice(1).join(' ') || 'Doe' };
  }

  function get() {
    var user = Auth.getCurrentUser();
    var stored = user || {};
    var np = nameParts(stored.name);

    return {
      name: stored.name || Storage.get('userName') || 'John Doe',
      firstName: np.first,
      lastName: np.last,
      email: stored.email || Storage.get('userEmail') || 'john.doe@sportsacademy.com',
      role: stored.role === 'coach' ? 'Head Coach' : (stored.role === 'student' ? 'Student Athlete' : (Storage.get('userRole') || 'Student Athlete')),
      phone: stored.phone || Storage.get('userPhone') || '+1 (555) 123-4567',
      profileImage: stored.profileImage || Storage.get('profileImage') || '',
      loginTime: stored.loginTime || new Date().toISOString(),
      membership: stored.membership || 'Premium Athlete',
      memberSince: stored.memberSince || 'January 2024',
      studentId: stored.studentId || 'STU-2024-0042',
      trainingStreak: stored.trainingStreak || 12,
      address: stored.address || '123 Sports Avenue, Arena District',
      emergencyContact: stored.emergencyContact || '+1 (555) 987-6543',
      dateOfBirth: stored.dateOfBirth || '2005-06-15',
      gender: stored.gender || 'Male',
      bloodGroup: stored.bloodGroup || 'O+',
      nationality: stored.nationality || 'American',
      height: stored.height || '5ft 10in',
      weight: stored.weight || '165 lbs',
      primarySport: stored.sport || stored.primarySport || 'Football',
      secondarySport: stored.secondarySport || 'Swimming',
      coach: stored.coach || 'Coach David',
      currentBatch: stored.currentBatch || 'Batch A — Advanced',
      trainingLevel: stored.trainingLevel || 'Advanced',
      experience: stored.experience || '3 Years',
      favoritePosition: stored.favoritePosition || 'Forward / Striker',
      medicalStatus: stored.medicalStatus || 'Fit',
      dietPlan: stored.dietPlan || 'High Protein',
      lastMedicalCheck: stored.lastMedicalCheck || '10 Jun 2026',
      bmi: stored.bmi || '21.5',
      injuryStatus: stored.injuryStatus || 'None',
      completedSessions: stored.completedSessions || 142
    };
  }

  function update(data) {
    var existing = get();
    var merged = Object.assign({}, existing, data);
    Auth.saveCurrentUser(merged);
    return merged;
  }

  function getInitials(name) {
    if (!name) return 'JD';
    return name.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
  }

  return { get: get, update: update, getInitials: getInitials };
})();
