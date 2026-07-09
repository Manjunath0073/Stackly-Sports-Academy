const SessionsData = (function () {
  'use strict';

  const todaySessions = [
    { id: 1, sport: 'Football', coach: 'Coach David', time: '06:00 - 07:30', duration: '90 min', venue: 'Main Arena, Field A', students: 12, status: 'live', type: 'Drills' },
    { id: 2, sport: 'Basketball', coach: 'Coach Emma', time: '08:00 - 09:30', duration: '90 min', venue: 'Indoor Court 2', students: 8, status: 'live', type: 'Skills' },
    { id: 3, sport: 'Swimming', coach: 'Coach Priya', time: '10:00 - 11:00', duration: '60 min', venue: 'Olympic Pool', students: 6, status: 'upcoming', type: 'Technique' },
    { id: 4, sport: 'Cricket', coach: 'Coach Mike', time: '14:00 - 15:30', duration: '90 min', venue: 'Cricket Ground', students: 10, status: 'upcoming', type: 'Match Practice' }
  ];

  const weekPlan = [
    { day: 'Mon', sessions: ['Football 06:00', 'Basketball 08:00', 'Swimming 10:00'] },
    { day: 'Tue', sessions: ['Cricket 14:00', 'Basketball 08:00'] },
    { day: 'Wed', sessions: ['Football 06:00', 'Swimming 10:00'] },
    { day: 'Thu', sessions: ['Cricket 14:00', 'Basketball 08:00'] },
    { day: 'Fri', sessions: ['Football 06:00', 'Athletics 06:00'] },
    { day: 'Sat', sessions: ['Volleyball 09:00'] }
  ];

  const sessionTimeline = [
    { id: 1, title: 'Football Drills', time: 'Completed · Today 06:00', status: 'completed' },
    { id: 2, title: 'Basketball Skills', time: 'Completed · Today 08:00', status: 'completed' },
    { id: 3, title: 'Swimming Technique', time: 'Upcoming · Today 10:00', status: 'upcoming' },
    { id: 4, title: 'Cricket Match Practice', time: 'Upcoming · Today 14:00', status: 'upcoming' }
  ];

  const trainingPlans = [
    { id: 1, name: 'Football Advanced Drills', focus: 'Agility & Speed', sessions: 12, progress: 78 },
    { id: 2, name: 'Basketball Fundamentals', focus: 'Ball Handling', sessions: 8, progress: 65 },
    { id: 3, name: 'Swimming Technique', focus: 'Stroke Efficiency', sessions: 10, progress: 82 }
  ];

  const weeklyHours = [
    { week: 'Week 1', hours: 18 },
    { week: 'Week 2', hours: 22 },
    { week: 'Week 3', hours: 16 },
    { week: 'Week 4', hours: 24 }
  ];

  const sessionCompletion = [
    { month: 'Jan', rate: 88 },
    { month: 'Feb', rate: 92 },
    { month: 'Mar', rate: 85 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 94 },
    { month: 'Jun', rate: 89 }
  ];

  const upcomingSessions = [
    { id: 5, sport: 'Football', coach: 'Coach David', date: 'Tomorrow', time: '06:00', venue: 'Main Arena', status: 'scheduled' },
    { id: 6, sport: 'Basketball', coach: 'Coach Emma', date: 'Tomorrow', time: '08:00', venue: 'Indoor Court 2', status: 'scheduled' },
    { id: 7, sport: 'Athletics', coach: 'Coach David', date: 'Fri', time: '06:00', venue: 'Track Stadium', status: 'scheduled' },
    { id: 8, sport: 'Volleyball', coach: 'Coach Emma', date: 'Sat', time: '09:00', venue: 'Indoor Court 1', status: 'scheduled' }
  ];

  function getToday() { return todaySessions; }
  function getWeekPlan() { return weekPlan; }
  function getTimeline() { return sessionTimeline; }
  function getPlans() { return trainingPlans; }
  function getWeeklyHours() { return weeklyHours; }
  function getCompletion() { return sessionCompletion; }
  function getUpcoming() { return upcomingSessions; }

  return { getToday, getWeekPlan, getTimeline, getPlans, getWeeklyHours, getCompletion, getUpcoming };
})();
