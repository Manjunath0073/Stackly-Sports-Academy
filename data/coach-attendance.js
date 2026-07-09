const CoachAttendanceData = (function () {
  'use strict';

  const monthlyAttendance = [
    { month: 'Jan', rate: 92 },
    { month: 'Feb', rate: 88 },
    { month: 'Mar', rate: 95 },
    { month: 'Apr', rate: 90 },
    { month: 'May', rate: 93 },
    { month: 'Jun', rate: 91 }
  ];

  const comparison = [
    { label: 'Football', rate: 94 },
    { label: 'Basketball', rate: 88 },
    { label: 'Swimming', rate: 95 },
    { label: 'Cricket', rate: 82 },
    { label: 'Athletics', rate: 91 }
  ];

  const records = [
    { id: 1, name: 'John Doe', sport: 'Football', present: 22, total: 23, rate: 96 },
    { id: 2, name: 'Sarah Williams', sport: 'Basketball', present: 18, total: 22, rate: 82 },
    { id: 3, name: 'Mike Chen', sport: 'Swimming', present: 20, total: 21, rate: 95 },
    { id: 4, name: 'Emily Davis', sport: 'Cricket', present: 16, total: 20, rate: 80 },
    { id: 5, name: 'Alex Johnson', sport: 'Football', present: 21, total: 23, rate: 91 },
    { id: 6, name: 'Priya Sharma', sport: 'Athletics', present: 23, total: 24, rate: 96 },
    { id: 7, name: 'James Wilson', sport: 'Basketball', present: 14, total: 22, rate: 64 },
    { id: 8, name: 'Sophie Turner', sport: 'Swimming', present: 17, total: 20, rate: 85 }
  ];

  const absent = [
    { name: 'James Wilson', sport: 'Basketball', missed: 8, reason: 'Unexcused' },
    { name: 'Emily Davis', sport: 'Cricket', missed: 4, reason: 'Injury' },
    { name: 'Lucas Brown', sport: 'Cricket', missed: 3, reason: 'Medical' }
  ];

  const trends = [
    { week: 'Week 1', overall: 90, football: 92, basketball: 85 },
    { week: 'Week 2', overall: 88, football: 90, basketball: 82 },
    { week: 'Week 3', overall: 93, football: 95, basketball: 88 },
    { week: 'Week 4', overall: 91, football: 93, basketball: 86 }
  ];

  function getMonthly() { return monthlyAttendance; }
  function getComparison() { return comparison; }
  function getRecords() { return records; }
  function getAbsent() { return absent; }
  function getTrends() { return trends; }

  return { getMonthly, getComparison, getRecords, getAbsent, getTrends };
})();
