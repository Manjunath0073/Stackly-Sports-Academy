const StudentData = (function () {
  'use strict';

  function get() {
    const stored = Storage.get('sportAcademUser');
    const fallbackName = Storage.get('userName') || Storage.get('studentName') || 'John Doe';
    const fallbackEmail = Storage.get('userEmail') || Storage.get('studentEmail') || 'john.doe@sportsacademy.com';
    const fallbackRole = Storage.get('userRole') || 'Student Athlete';
    const fallbackPhone = Storage.get('userPhone') || '+1 (555) 123-4567';
    const fallbackImage = Storage.get('profileImage') || Storage.get('studentProfileImage') || '';

    return {
      name: stored?.name || fallbackName,
      firstName: stored?.firstName || 'John',
      lastName: stored?.lastName || 'Doe',
      email: stored?.email || fallbackEmail,
      role: stored?.role || fallbackRole,
      phone: stored?.phone || fallbackPhone,
      profileImage: stored?.profileImage || fallbackImage,
      loginTime: stored?.loginTime || Storage.get('loginTime') || new Date().toISOString(),
      memberSince: stored?.memberSince || 'January 2024',
      studentId: stored?.studentId || 'STU-2024-0042',
      trainingStreak: stored?.trainingStreak || 12,
      address: stored?.address || '123 Sports Avenue, Arena District',
      emergencyContact: stored?.emergencyContact || '+1 (555) 987-6543',
      dateOfBirth: stored?.dateOfBirth || '2005-06-15',
      gender: stored?.gender || 'Male',
      bloodGroup: stored?.bloodGroup || 'O+',
      nationality: stored?.nationality || 'American',
      height: stored?.height || '5ft 10in',
      weight: stored?.weight || '165 lbs',
      primarySport: stored?.primarySport || 'Football',
      secondarySport: stored?.secondarySport || 'Swimming',
      coach: stored?.coach || 'Coach David',
      currentBatch: stored?.currentBatch || 'Batch A — Advanced',
      trainingLevel: stored?.trainingLevel || 'Advanced',
      experience: stored?.experience || '3 Years',
      favoritePosition: stored?.favoritePosition || 'Forward / Striker',
      medicalStatus: stored?.medicalStatus || 'Fit',
      dietPlan: stored?.dietPlan || 'High Protein',
      lastMedicalCheck: stored?.lastMedicalCheck || '10 Jun 2026',
      bmi: stored?.bmi || '21.5',
      injuryStatus: stored?.injuryStatus || 'None',
      completedSessions: stored?.completedSessions || 142
    };
  }

  function update(data) {
    const existing = get();
    const merged = Object.assign({}, existing, data);
    Storage.set('sportAcademUser', JSON.stringify(merged));
    return merged;
  }

  function getInitials(name) {
    if (!name) return 'JD';
    return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  }

  return { get, update, getInitials };
})();
