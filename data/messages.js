const MessagesData = (function () {
  'use strict';

  const conversations = [
    {
      id: 1, sender: 'Coach David', avatar: 'coach-david.webp', role: 'Head Coach',
      lastMessage: 'Great effort today! Focus on your footwork drills this week to improve agility.',
      timestamp: '2 hours ago', unread: true,
      messages: [
        { from: 'Coach David', text: 'Great effort today! Focus on your footwork drills this week to improve agility.', time: '2 hours ago' },
        { from: 'Me', text: 'Thanks coach! I\'ll work on that.', time: '1 hour ago' },
        { from: 'Coach David', text: 'Also remember to stretch properly after each session.', time: '30 min ago' }
      ]
    },
    {
      id: 2, sender: 'Coach Emma', avatar: 'coach-emma.webp', role: 'Basketball Coach',
      lastMessage: 'Your jump shot improved significantly this week.',
      timestamp: '1 day ago', unread: false,
      messages: [
        { from: 'Coach Emma', text: 'Your jump shot improved significantly this week.', time: '1 day ago' },
        { from: 'Me', text: 'Thank you! The drills are really helping.', time: '1 day ago' }
      ]
    },
    {
      id: 3, sender: 'Coach Priya', avatar: 'coach-priya.webp', role: 'Swimming Coach',
      lastMessage: 'Don\'t forget tomorrow\'s session is at the Olympic Pool.',
      timestamp: '2 days ago', unread: false,
      messages: [
        { from: 'Coach Priya', text: 'Don\'t forget tomorrow\'s session is at the Olympic Pool.', time: '2 days ago' },
        { from: 'Me', text: 'Got it, see you there!', time: '2 days ago' }
      ]
    },
    {
      id: 4, sender: 'Coach Mike', avatar: 'coach-mike.webp', role: 'Cricket Coach',
      lastMessage: 'Bring your own equipment for the practice match on Friday.',
      timestamp: '3 days ago', unread: false,
      messages: [
        { from: 'Coach Mike', text: 'Bring your own equipment for the practice match on Friday.', time: '3 days ago' },
        { from: 'Me', text: 'Will do, coach.', time: '3 days ago' }
      ]
    },
    {
      id: 5, sender: 'Admin', avatar: '', role: 'Academy Administration',
      lastMessage: 'Your membership renewal is due next month.',
      timestamp: '5 days ago', unread: true,
      messages: [
        { from: 'Admin', text: 'Your membership renewal is due next month.', time: '5 days ago' }
      ]
    }
  ];

  function getAll() { return conversations; }
  function getUnread() { return conversations.filter(c => c.unread); }
  function getById(id) { return conversations.find(c => c.id === id); }

  return { getAll, getUnread, getById };
})();
