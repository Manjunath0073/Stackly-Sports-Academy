const AttendanceData = (function () {
  'use strict';

  const weeklyAttendance = [
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 90 },
    { day: 'Wed', value: 78 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 88 },
    { day: 'Sat', value: 72 },
    { day: 'Sun', value: 80 }
  ];

  const monthlyPerformance = [
    { month: 'Jan', value: 72 },
    { month: 'Feb', value: 78 },
    { month: 'Mar', value: 85 },
    { month: 'Apr', value: 80 },
    { month: 'May', value: 90 },
    { month: 'Jun', value: 88 }
  ];

  const skillDistribution = [
    { label: 'Speed', value: 85 },
    { label: 'Strength', value: 72 },
    { label: 'Agility', value: 90 },
    { label: 'Endurance', value: 78 },
    { label: 'Technique', value: 88 }
  ];

  const trainingHours = [
    { week: 'Week 1', hours: 12 },
    { week: 'Week 2', hours: 15 },
    { week: 'Week 3', hours: 10 },
    { week: 'Week 4', hours: 18 }
  ];

  const overall = {
    attendance: 96,
    fitnessLevel: 85,
    performanceScore: 92,
    overallProgress: 78
  };

  function getWeekly() { return weeklyAttendance; }
  function getMonthly() { return monthlyPerformance; }
  function getSkills() { return skillDistribution; }
  function getHours() { return trainingHours; }
  function getOverall() { return overall; }

  return { getWeekly, getMonthly, getSkills, getHours, getOverall };
})();
