const AchievementsData = (function () {
  'use strict';

  const achievements = [
    { id: 1, name: 'Golden Goal', desc: 'Scored 50 goals', icon: 'dash-trophy', color: 'gold', unlocked: true, unlockedDate: '15 Jun 2026' },
    { id: 2, name: 'Star Player', desc: 'MVP of the month', icon: 'dash-star', color: 'silver', unlocked: true, unlockedDate: '01 May 2026' },
    { id: 3, name: 'Iron Will', desc: '30-day streak', icon: 'dash-award', color: 'bronze', unlocked: true, unlockedDate: '20 Apr 2026' },
    { id: 4, name: 'Speed Demon', desc: 'Fastest sprint record', icon: 'dash-bolt', color: 'red', unlocked: true, unlockedDate: '10 Mar 2026' },
    { id: 5, name: 'Aqua King', desc: 'Completed swim level 5', icon: 'dash-droplet', color: 'cyan', unlocked: true, unlockedDate: '25 Feb 2026' },
    { id: 6, name: 'Sharp Shooter', desc: '95% accuracy', icon: 'dash-target', color: 'gold', unlocked: true, unlockedDate: '12 Jan 2026' },
    { id: 7, name: 'Ironman', desc: 'Complete 100 training sessions', icon: 'dash-zap', color: 'red', unlocked: false },
    { id: 8, name: 'Team Captain', desc: 'Lead your team to victory', icon: 'dash-users', color: 'cyan', unlocked: false },
    { id: 9, name: 'Marathon Runner', desc: 'Run 100km total', icon: 'dash-trending', color: 'silver', unlocked: false }
  ];

  const activities = [
    { id: 1, text: 'Completed football training', detail: 'Morning session with Coach David', time: '2 hours ago', dot: 'green' },
    { id: 2, text: 'New badge earned', detail: 'Golden Goal achievement unlocked', time: 'Yesterday', dot: 'gold' },
    { id: 3, text: 'Personal best in sprint', detail: '100m — 11.2 seconds', time: '2 days ago', dot: 'red' },
    { id: 4, text: 'Swimming assessment passed', detail: 'Advanced level 5 certified', time: '3 days ago', dot: 'cyan' },
    { id: 5, text: 'Coach feedback received', detail: 'Review your performance notes', time: '5 days ago', dot: 'gold' }
  ];

  const announcements = [
    { id: 1, tag: 'Important', tagColor: 'red', title: 'Facility Maintenance', text: 'Main Arena will be closed for maintenance on Sunday. All sessions moved to Indoor Court 1 & 2.', date: '2 hours ago' },
    { id: 2, tag: 'Event', tagColor: 'blue', title: 'Inter-Academy Tournament', text: 'Registration open for the annual sports tournament. Sign up by Friday to secure your spot.', date: '1 day ago' },
    { id: 3, tag: 'Update', tagColor: 'green', title: 'New Training Schedule', text: 'Updated weekly schedule effective next month. Check your personalized calendar for changes.', date: '3 days ago' }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Football Championship', date: '15', month: 'Jul', time: '09:00 - 16:00', venue: 'Main Stadium' },
    { id: 2, title: 'Swimming Gala', date: '22', month: 'Jul', time: '10:00 - 14:00', venue: 'Olympic Pool' },
    { id: 3, title: 'Parent-Coach Meeting', date: '05', month: 'Aug', time: '17:00 - 19:00', venue: 'Conference Hall' }
  ];

  const goals = [
    { id: 1, title: 'Improve Sprint Time', category: 'Speed', target: 'Sub 11s 100m', progress: 65, deadline: '30 Aug 2026' },
    { id: 2, title: 'Increase Strength', category: 'Strength', target: 'Bench press 150 lbs', progress: 72, deadline: '15 Sep 2026' },
    { id: 3, title: 'Master Swim Technique', category: 'Technique', target: 'Complete level 6', progress: 80, deadline: '01 Oct 2026' },
    { id: 4, title: 'Team Leadership', category: 'Leadership', target: 'Captain the team', progress: 45, deadline: 'Dec 2026' }
  ];

  function getAll() { return achievements; }
  function getUnlocked() { return achievements.filter(a => a.unlocked); }
  function getLocked() { return achievements.filter(a => !a.unlocked); }
  function getActivities() { return activities; }
  function getAnnouncements() { return announcements; }
  function getEvents() { return upcomingEvents; }
  function getGoals() { return goals; }

  return { getAll, getUnlocked, getLocked, getActivities, getAnnouncements, getEvents, getGoals };
})();
