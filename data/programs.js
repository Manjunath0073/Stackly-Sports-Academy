const ProgramsData = (function () {
  'use strict';

  const programs = [
    { id: 1, name: 'Football — Advanced Drills', coach: 'Coach David', schedule: 'Mon, Wed, Fri — 06:00-07:30', venue: 'Main Arena, Field A', status: 'active', progress: 78, image: 'program-football.webp' },
    { id: 2, name: 'Basketball Skills', coach: 'Coach Emma', schedule: 'Tue, Thu — 08:00-09:30', venue: 'Indoor Court 2', status: 'active', progress: 65, image: 'program-basketball.webp' },
    { id: 3, name: 'Swimming Technique', coach: 'Coach Priya', schedule: 'Mon, Wed — 10:00-11:00', venue: 'Olympic Pool', status: 'active', progress: 82, image: 'program-swimming.webp' },
    { id: 4, name: 'Cricket Batting', coach: 'Coach Mike', schedule: 'Tue, Thu — 14:00-15:30', venue: 'Cricket Ground', status: 'active', progress: 70, image: 'program-cricket.webp' },
    { id: 5, name: 'Athletics Sprint', coach: 'Coach David', schedule: 'Fri — 06:00-07:30', venue: 'Track Stadium', status: 'upcoming', progress: 0, image: 'program-athletics.webp' },
    { id: 6, name: 'Volleyball', coach: 'Coach Emma', schedule: 'Sat — 09:00-11:00', venue: 'Indoor Court 1', status: 'upcoming', progress: 0, image: 'program-volleyball.webp' }
  ];

  function getAll() { return programs; }
  function getActive() { return programs.filter(p => p.status === 'active'); }
  function getUpcoming() { return programs.filter(p => p.status === 'upcoming'); }
  function getById(id) { return programs.find(p => p.id === id); }

  return { getAll, getActive, getUpcoming, getById };
})();
