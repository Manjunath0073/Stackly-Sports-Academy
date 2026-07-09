const PerformanceData = (function () {
  'use strict';

  const performanceTrend = [
    { month: 'Jan', avg: 72 },
    { month: 'Feb', avg: 78 },
    { month: 'Mar', avg: 85 },
    { month: 'Apr', avg: 80 },
    { month: 'May', avg: 90 },
    { month: 'Jun', avg: 88 }
  ];

  const skillRadar = [
    { label: 'Speed', value: 82 },
    { label: 'Strength', value: 74 },
    { label: 'Agility', value: 88 },
    { label: 'Endurance', value: 76 },
    { label: 'Technique', value: 85 }
  ];

  const sportDistribution = [
    { label: 'Football', value: 35 },
    { label: 'Basketball', value: 20 },
    { label: 'Swimming', value: 18 },
    { label: 'Cricket', value: 15 },
    { label: 'Athletics', value: 12 }
  ];

  const improvement = [
    { month: 'Jan', improvement: 5 },
    { month: 'Feb', improvement: 8 },
    { month: 'Mar', improvement: 12 },
    { month: 'Apr', improvement: 6 },
    { month: 'May', improvement: 15 },
    { month: 'Jun', improvement: 10 }
  ];

  const studentProgress = [
    { name: 'Priya Sharma', sport: 'Athletics', change: '+12%', trend: 'up' },
    { name: 'John Doe', sport: 'Football', change: '+8%', trend: 'up' },
    { name: 'Mike Chen', sport: 'Swimming', change: '+5%', trend: 'up' },
    { name: 'Sarah Williams', sport: 'Basketball', change: '-2%', trend: 'down' },
    { name: 'James Wilson', sport: 'Basketball', change: '-8%', trend: 'down' }
  ];

  const coachRatings = [
    { coach: 'Coach David', rating: 4.9, reviews: 48 },
    { coach: 'Coach Emma', rating: 4.7, reviews: 36 },
    { coach: 'Coach Priya', rating: 4.8, reviews: 42 },
    { coach: 'Coach Mike', rating: 4.6, reviews: 30 }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', score: 95, sport: 'Athletics' },
    { rank: 2, name: 'John Doe', score: 92, sport: 'Football' },
    { rank: 3, name: 'Mike Chen', score: 90, sport: 'Swimming' },
    { rank: 4, name: 'Emma Garcia', score: 88, sport: 'Football' },
    { rank: 5, name: 'Alex Johnson', score: 86, sport: 'Football' }
  ];

  const goals = [
    { id: 1, student: 'James Wilson', goal: 'Improve Attendance', target: '85%', progress: 64, deadline: '30 Aug 2026' },
    { id: 2, student: 'Emily Davis', goal: 'Recovery & Return', target: 'Full fitness', progress: 70, deadline: '15 Sep 2026' },
    { id: 3, student: 'Sarah Williams', goal: 'Shooting Accuracy', target: '80%', progress: 72, deadline: '01 Oct 2026' },
    { id: 4, student: 'Lucas Brown', goal: 'Bowling Speed', target: '130 km/h', progress: 55, deadline: 'Dec 2026' }
  ];

  function getTrend() { return performanceTrend; }
  function getSkills() { return skillRadar; }
  function getDistribution() { return sportDistribution; }
  function getImprovement() { return improvement; }
  function getStudentProgress() { return studentProgress; }
  function getCoachRatings() { return coachRatings; }
  function getLeaderboard() { return leaderboard; }
  function getGoals() { return goals; }

  return { getTrend, getSkills, getDistribution, getImprovement, getStudentProgress, getCoachRatings, getLeaderboard, getGoals };
})();
