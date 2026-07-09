const StudentsData = (function () {
  'use strict';

  const students = [
    { id: 1, name: 'John Doe', avatar: 'hero-athlete.webp', sport: 'Football', coach: 'Coach David', attendance: 96, performance: 92, status: 'active', batch: 'Batch A', phone: '+1 555-0101', email: 'john.doe@academy.com', progress: 78 },
    { id: 2, name: 'Sarah Williams', avatar: '', sport: 'Basketball', coach: 'Coach Emma', attendance: 88, performance: 85, status: 'active', batch: 'Batch A', phone: '+1 555-0102', email: 'sarah.w@academy.com', progress: 65 },
    { id: 3, name: 'Mike Chen', avatar: '', sport: 'Swimming', coach: 'Coach Priya', attendance: 95, performance: 90, status: 'active', batch: 'Batch B', phone: '+1 555-0103', email: 'mike.c@academy.com', progress: 82 },
    { id: 4, name: 'Emily Davis', avatar: '', sport: 'Cricket', coach: 'Coach Mike', attendance: 72, performance: 78, status: 'active', batch: 'Batch B', phone: '+1 555-0104', email: 'emily.d@academy.com', progress: 70 },
    { id: 5, name: 'Alex Johnson', avatar: '', sport: 'Football', coach: 'Coach David', attendance: 91, performance: 88, status: 'active', batch: 'Batch A', phone: '+1 555-0105', email: 'alex.j@academy.com', progress: 85 },
    { id: 6, name: 'Priya Sharma', avatar: '', sport: 'Athletics', coach: 'Coach David', attendance: 98, performance: 95, status: 'active', batch: 'Batch A', phone: '+1 555-0106', email: 'priya.s@academy.com', progress: 90 },
    { id: 7, name: 'James Wilson', avatar: '', sport: 'Basketball', coach: 'Coach Emma', attendance: 65, performance: 72, status: 'at-risk', batch: 'Batch A', phone: '+1 555-0107', email: 'james.w@academy.com', progress: 45 },
    { id: 8, name: 'Sophie Turner', avatar: '', sport: 'Swimming', coach: 'Coach Priya', attendance: 85, performance: 80, status: 'active', batch: 'Batch B', phone: '+1 555-0108', email: 'sophie.t@academy.com', progress: 68 },
    { id: 9, name: 'Lucas Brown', avatar: '', sport: 'Cricket', coach: 'Coach Mike', attendance: 78, performance: 75, status: 'active', batch: 'Batch B', phone: '+1 555-0109', email: 'lucas.b@academy.com', progress: 60 },
    { id: 10, name: 'Emma Garcia', avatar: '', sport: 'Football', coach: 'Coach David', attendance: 93, performance: 91, status: 'active', batch: 'Batch A', phone: '+1 555-0110', email: 'emma.g@academy.com', progress: 86 }
  ];

  function getAll() { return students; }
  function getById(id) { return students.find(s => s.id === id); }
  function getBySport(sport) { return students.filter(s => s.sport === sport); }
  function getByCoach(coach) { return students.filter(s => s.coach === coach); }
  function getActive() { return students.filter(s => s.status === 'active'); }
  function getAtRisk() { return students.filter(s => s.status === 'at-risk'); }
  function getTopPerformers(n) { return [...students].sort((a, b) => b.performance - a.performance).slice(0, n || 5); }

  return { getAll, getById, getBySport, getByCoach, getActive, getAtRisk, getTopPerformers };
})();
