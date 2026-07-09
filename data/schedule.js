const ScheduleData = (function () {
  'use strict';

  const todayTraining = {
    sport: 'Football — Advanced Drills',
    coach: 'Coach David',
    time: '06:00 - 07:30',
    duration: '90 min',
    venue: 'Main Arena, Field A',
    status: 'live'
  };

  const upcomingSessions = [
    { id: 1, sport: 'Basketball', coach: 'Coach Emma', time: '08:00 - 09:30', venue: 'Indoor Court 2', status: 'live', day: 'Today' },
    { id: 2, sport: 'Swimming', coach: 'Coach Priya', time: '10:00 - 11:00', venue: 'Olympic Pool', status: 'upcoming', day: 'Today' },
    { id: 3, sport: 'Cricket', coach: 'Coach Mike', time: '14:00 - 15:30', venue: 'Cricket Ground', status: 'upcoming', day: 'Today' },
    { id: 4, sport: 'Football', coach: 'Coach David', time: '06:00 - 07:30', venue: 'Main Arena, Field A', status: 'upcoming', day: 'Tomorrow' },
    { id: 5, sport: 'Basketball', coach: 'Coach Emma', time: '08:00 - 09:30', venue: 'Indoor Court 2', status: 'upcoming', day: 'Tomorrow' },
    { id: 6, sport: 'Athletics', coach: 'Coach David', time: '06:00 - 07:30', venue: 'Track Stadium', status: 'upcoming', day: 'Fri' },
    { id: 7, sport: 'Volleyball', coach: 'Coach Emma', time: '09:00 - 11:00', venue: 'Indoor Court 1', status: 'upcoming', day: 'Sat' }
  ];

  function getToday() { return todayTraining; }
  function getUpcoming() { return upcomingSessions; }
  function getByDay(day) { return upcomingSessions.filter(s => s.day === day); }

  return { getToday, getUpcoming, getByDay };
})();
