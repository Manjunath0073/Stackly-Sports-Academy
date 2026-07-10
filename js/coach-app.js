const CoachApp = (function () {
  'use strict';

  var currentPage = 'overview';
  var contentEl = null;
  var pageTitleEl = document.getElementById('pageTitle');
  var navLinks = document.querySelectorAll('.dashboard__sidebar-nav a');
  var pageRenderers = {};

  function kpi(icon, value, label, color) {
    return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
  }

  function timelineItem(icon, title, detail, time, color) {
    return '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">' + Utils.escapeHtml(title) + '</strong><span class="tl__meta">' + Utils.escapeHtml(detail) + ' · ' + Utils.escapeHtml(time) + '</span></div></div>';
  }

  /* ===== OVERVIEW ===== */
  pageRenderers.overview = function () {
    var coach = CoachData.get();
    var todaySessions = SessionsData.getToday();
    var timeline = SessionsData.getTimeline();
    var students = StudentsData.getAll();

    var now = new Date();
    var dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return '' +
      '<div class="c-hero"><div class="c-hero__bg"></div><div class="c-hero__content">' +
      '<span class="c-hero__label">' + dateStr + '</span>' +
      '<h1 class="c-hero__title">Welcome Back, ' + Utils.escapeHtml(coach.firstName) + '</h1>' +
      '<div class="c-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(coach.role) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-book"/></svg> ' + Utils.escapeHtml(coach.specialization) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-award"/></svg> ' + coach.rating + ' ★ Rating</span>' +
      '</div>' +
      '<div class="c-hero__actions"><button class="d-btn d-btn--primary">Start Session</button><button class="d-btn d-btn--ghost c-hero__btn--light">View Schedule</button></div>' +
      '</div>' +
      '<div class="c-hero__stats">' +
      '<div class="c-hero__stat"><strong>' + students.length + '</strong><span>Students</span></div>' +
      '<div class="c-hero__stat"><strong>' + coach.totalSessions + '</strong><span>Sessions</span></div>' +
      '<div class="c-hero__stat"><strong>' + coach.avgAttendance + '%</strong><span>Attendance</span></div>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-zap', todaySessions.length, 'Today\'s Sessions', 'red') +
      kpi('dash-users', students.length, 'Active Students', 'gold') +
      kpi('dash-chart', coach.avgAttendance + '%', 'Attendance Rate', 'cyan') +
      kpi('dash-trending', '92%', 'Performance Avg', 'green') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Today\'s Sessions',
        '<div class="t-prog-grid">' +
        todaySessions.map(function (s) {
          var statusClass = s.status === 'live' ? 't-prog__status--active' : 't-prog__status--upcoming';
          return '<div class="t-prog"><div class="t-prog__body"><div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(s.sport) + ' — ' + Utils.escapeHtml(s.type) + '</strong><span class="t-prog__status ' + statusClass + '">' + Utils.escapeHtml(s.status) + '</span></div><span class="t-prog__coach"><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span><span class="t-prog__schedule"><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(s.time) + ' · ' + Utils.escapeHtml(s.duration) + '</span><span class="t-prog__schedule"><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + Utils.escapeHtml(s.venue) + ' · ' + s.students + ' students</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Student Overview',
        '<div class="t-prog-grid">' +
        StudentsData.getTopPerformers(3).map(function (st) {
          return '<div class="t-prog" style="align-items:center"><div class="t-prog__img" style="width:44px;height:44px;border-radius:50%"><img src="assets/' + (st.avatar || 'hero-athlete.webp') + '" alt=""></div><div class="t-prog__body"><div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(st.name) + '</strong><span class="t-prog__status t-prog__status--active">' + st.performance + '%</span></div><span class="t-prog__coach">' + Utils.escapeHtml(st.sport) + ' · Batch ' + Utils.escapeHtml(st.batch) + '</span></div></div>';
        }).join('') +
        '</div>') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Recent Activities',
        '<div class="tl">' +
        timelineItem('dash-check', 'Football Drills Completed', 'Session finished with 12 students', 'Today 07:30', 'green') +
        timelineItem('dash-play', 'Basketball Skills Session', 'Coach Emma conducted skills training', 'Today 09:30', 'cyan') +
        timelineItem('dash-star', 'New Student Enrolled', 'Emma Garcia joined Football program', 'Yesterday', 'gold') +
        timelineItem('dash-message', 'Feedback Received', '5 new session feedbacks submitted', 'Yesterday', 'red') +
        '</div>') +
      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-play"/></svg></span><span class="p-action__label">Start Session</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-users"/></svg></span><span class="p-action__label">View Students</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Reports</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Messages</span></button>' +
        '</div>') +
      '</div>' +
      UI.section('Weekly Sessions', '<div class="t-chart"><canvas id="coachWeeklyChart"></canvas></div>') +
      UI.section('Student Attendance', '<div class="t-chart"><canvas id="coachAttendanceChart"></canvas></div>');
  };

  /* ===== PROFILE ===== */
  pageRenderers.profile = function () {
    var c = CoachData.get();
    var initials = CoachData.getInitials(c.name);
    var avatarHtml = c.profileImage ? '<img src="' + Utils.escapeHtml(c.profileImage) + '" alt="">' : '<span class="p-hero__initials">' + initials + '</span>';

    return '' +
      '<div class="p-hero"><div class="p-hero__bg"></div><div class="p-hero__content">' +
      '<div class="p-hero__avatar-wrap"><div class="p-hero__avatar">' + avatarHtml + '</div><span class="p-hero__badge">Head Coach</span></div>' +
      '<h1 class="p-hero__name">' + Utils.escapeHtml(c.name) + '</h1>' +
      '<div class="p-hero__meta"><span><svg aria-hidden="true"><use href="#dash-card"/></svg> ' + Utils.escapeHtml(c.coachId) + '</span><span><svg aria-hidden="true"><use href="#dash-target"/></svg> ' + Utils.escapeHtml(c.specialization) + '</span><span><svg aria-hidden="true"><use href="#dash-award"/></svg> ' + c.rating + ' ★</span></div>' +
      '<div class="p-hero__contact"><span><svg aria-hidden="true"><use href="#dash-mail"/></svg> ' + Utils.escapeHtml(c.email) + '</span><span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(c.phone) + '</span><span><svg aria-hidden="true"><use href="#dash-calendar"/></svg> Since ' + Utils.escapeHtml(c.memberSince) + '</span></div>' +
      '<button class="d-btn d-btn--primary p-hero__btn">Edit Profile</button>' +
      '</div>' +
      '<div class="p-hero__stats"><div class="p-hero__stat"><strong>' + c.studentsCount + '</strong><span>Students</span></div><div class="p-hero__stat"><strong>' + c.totalSessions + '</strong><span>Sessions</span></div><div class="p-hero__stat"><strong>' + c.experience + '</strong><span>Experience</span></div><div class="p-hero__stat"><strong>' + c.avgAttendance + '%</strong><span>Attendance</span></div></div></div>' +

      UI.section('Personal Information',
        '<div class="p-grid p-grid--2col">' +
        '<div class="p-card"><div class="p-field"><span class="p-field__label">First Name</span><span class="p-field__value">' + Utils.escapeHtml(c.firstName) + '</span></div><div class="p-field"><span class="p-field__label">Last Name</span><span class="p-field__value">' + Utils.escapeHtml(c.lastName) + '</span></div><div class="p-field"><span class="p-field__label">Email</span><span class="p-field__value">' + Utils.escapeHtml(c.email) + '</span></div><div class="p-field"><span class="p-field__label">Phone</span><span class="p-field__value">' + Utils.escapeHtml(c.phone) + '</span></div></div>' +
        '<div class="p-card"><div class="p-field"><span class="p-field__label">Coach ID</span><span class="p-field__value">' + Utils.escapeHtml(c.coachId) + '</span></div><div class="p-field"><span class="p-field__label">Specialization</span><span class="p-field__value">' + Utils.escapeHtml(c.specialization) + '</span></div><div class="p-field"><span class="p-field__label">Experience</span><span class="p-field__value">' + Utils.escapeHtml(c.experience) + '</span></div><div class="p-field"><span class="p-field__label">Member Since</span><span class="p-field__value">' + Utils.escapeHtml(c.memberSince) + '</span></div></div>' +
        '</div>') +

      UI.section('Certifications',
        '<div class="achiev-grid">' +
        c.certifications.map(function (cert) {
          return '<div class="achiev-card"><div class="achiev-card__icon achiev-card__icon--gold"><svg aria-hidden="true"><use href="#dash-award"/></svg></div><strong class="achiev-card__name">' + Utils.escapeHtml(cert) + '</strong><span class="achiev-card__desc">Professional Certification</span></div>';
        }).join('') +
        '</div>') +

      (function () {
        var teams = ['Football', 'Basketball', 'Swimming', 'Athletics'];
        var upcomingSessions = SessionsData.getUpcoming();
        var allStudents = StudentsData.getAll();
        var upcomingHtml = upcomingSessions.slice(0, 2).map(function (s) {
          return '<div class="j-ev"><div class="j-ev__dot j-ev__dot--gold"></div><div class="j-ev__body"><strong>' + Utils.escapeHtml(s.sport) + '</strong><span>' + Utils.escapeHtml(s.date) + ' · ' + Utils.escapeHtml(s.time) + '</span></div></div>';
        }).join('');
        var teamsHtml = teams.map(function (t) {
          var cnt = StudentsData.getByCoach('Coach ' + (t === 'Football' || t === 'Athletics' ? 'David' : t === 'Basketball' ? 'Emma' : t === 'Swimming' ? 'Priya' : 'Mike')).length;
          return '<div class="j-tag"><span class="j-tag__dot"></span>' + Utils.escapeHtml(t) + ' <em>' + cnt + '</em></div>';
        }).join('');
        var certHtml = c.certifications.map(function (cert) {
          return '<div class="j-tag"><span class="j-tag__dot j-tag__dot--gold"></span>' + Utils.escapeHtml(cert) + '</div>';
        }).join('');
        return UI.section('My Journey',
          '<div class="t-grid t-grid--2col">' +
          '<div class="tl">' +
          '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--cyan"><svg aria-hidden="true"><use href="#dash-calendar"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">Joined Stackly Academy</strong><span class="tl__meta">Started as Assistant Coach</span><time class="tl__time">Sep 2020</time></div></div>' +
          '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--green"><svg aria-hidden="true"><use href="#dash-check"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">Promoted to Head Coach</strong><span class="tl__meta">Football & Athletics Lead</span><time class="tl__time">Jan 2022</time></div></div>' +
          '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--gold"><svg aria-hidden="true"><use href="#dash-trophy"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">UEFA B License Certified</strong><span class="tl__meta">Advanced coaching license</span><time class="tl__time">Mar 2023</time></div></div>' +
          '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--red"><svg aria-hidden="true"><use href="#dash-award"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">Coach of the Year</strong><span class="tl__meta">Awarded for outstanding performance</span><time class="tl__time">Dec 2025</time></div></div>' +
          '</div>' +
          '<div class="p-journey-side">' +
          (teamsHtml ? '<div class="d-section__subhead">Teams</div><div class="j-tags">' + teamsHtml + '</div>' : '') +
          (upcomingHtml ? '<div class="d-section__subhead" style="margin-top:12px">Upcoming Sessions</div>' + upcomingHtml : '') +
          '<div class="d-section__subhead" style="margin-top:12px">Certifications</div><div class="j-tags">' + certHtml + '</div>' +
          '<div class="d-section__subhead" style="margin-top:12px">Stats</div>' +
          '<div class="j-stats">' +
          '<div class="j-stat"><span class="j-stat__num">' + c.studentsCount + '</span><span class="j-stat__label">Students</span></div>' +
          '<div class="j-stat"><span class="j-stat__num">' + c.totalSessions + '</span><span class="j-stat__label">Sessions</span></div>' +
          '<div class="j-stat"><span class="j-stat__num">' + c.avgAttendance + '%</span><span class="j-stat__label">Attendance</span></div>' +
          '<div class="j-stat"><span class="j-stat__num">' + c.rating + '</span><span class="j-stat__label">Rating</span></div>' +
          '</div>' +
          '</div>' +
          '</div>');
      })() +

      UI.section('Training Hours', '<div class="g-chart"><canvas id="coachProfileHours"></canvas></div>') +

      UI.section('Quick Actions',
        '<div class="p-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-user"/></svg></span><span class="p-action__label">Update Profile</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Download Certificate</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-card"/></svg></span><span class="p-action__label">ID Card</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-settings"/></svg></span><span class="p-action__label">Settings</span></button>' +
        '</div>');
  };

  /* ===== STUDENTS ===== */
  pageRenderers.students = function () {
    var students = StudentsData.getAll();
    var topPerf = StudentsData.getTopPerformers(4);
    var active = StudentsData.getActive();
    var atRisk = StudentsData.getAtRisk();

    var tableRows = students.map(function (st) {
      var perfBar = '<div class="perf-bar" style="max-width:80px"><div class="perf-bar__fill perf-bar__fill--red" style="width:' + st.progress + '%"></div></div>';
      var statusBadge = st.status === 'active' ? '<span class="d-badge d-badge--green">Active</span>' : '<span class="d-badge d-badge--red">At Risk</span>';
      return ['<div style="display:flex;align-items:center;gap:10px"><div style="width:32px;height:32px;border-radius:50%;overflow:hidden;background:var(--hover-gradient);flex-shrink:0"><img src="assets/' + (st.avatar || 'hero-athlete.webp') + '" alt="" style="width:100%;height:100%;object-fit:cover"></div><strong>' + Utils.escapeHtml(st.name) + '</strong></div>', Utils.escapeHtml(st.sport), st.attendance + '%', perfBar, statusBadge, '<button class="d-btn d-btn--sm d-btn--ghost">View</button>'];
    }).slice(0, 8);

    var distData = {};
    students.forEach(function (st) { distData[st.sport] = (distData[st.sport] || 0) + 1; });
    var distLabels = Object.keys(distData);
    var distValues = distLabels.map(function (l) { return distData[l]; });

    return '' +
      '<div class="c-hero"><div class="c-hero__bg"></div><div class="c-hero__content">' +
      '<span class="c-hero__label">Student Management</span>' +
      '<h1 class="c-hero__title">' + students.length + ' Active Students</h1>' +
      '<div class="c-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-users"/></svg> ' + active.length + ' Active</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-check"/></svg> ' + atRisk.length + ' At Risk</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-trending"/></svg> ' + distLabels.length + ' Sports</span>' +
      '</div></div>' +
      '<div class="c-hero__stats">' +
      '<div class="c-hero__stat"><strong>' + students.length + '</strong><span>Total</span></div>' +
      '<div class="c-hero__stat"><strong>' + active.length + '</strong><span>Active</span></div>' +
      '<div class="c-hero__stat"><strong>' + atRisk.length + '</strong><span>At Risk</span></div>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-users', students.length, 'Total Students', 'red') +
      kpi('dash-check', active.length, 'Active', 'green') +
      kpi('dash-chart', '85%', 'Avg Performance', 'gold') +
      kpi('dash-activity', atRisk.length, 'At Risk', 'cyan') +
      '</div>' +

      '<div class="d-toolbar" style="margin-bottom:20px"><input type="search" class="d-search-input" placeholder="Search students..." style="max-width:300px"><button class="d-btn d-btn--ghost d-btn--sm">Sport</button><button class="d-btn d-btn--ghost d-btn--sm">Status</button><button class="d-btn d-btn--primary d-btn--sm" style="margin-left:auto">+ Add Student</button></div>' +

      UI.section('All Students',
        UI.table(['Student', 'Sport', 'Attendance', 'Progress', 'Status', 'Action'], tableRows) +
        '<div class="d-empty-note" style="display:flex;justify-content:space-between"><span>Showing ' + Math.min(8, students.length) + ' of ' + students.length + ' students</span><span style="display:flex;gap:8px"><a href="#" style="color:var(--secondary);font-size:0.82rem">1</a><a href="#" style="color:var(--text-light);font-size:0.82rem">2</a></span></div>') +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Top Performers',
        '<div class="t-prog-grid">' +
        topPerf.map(function (st, i) {
          return '<div class="t-prog" style="align-items:center"><div style="width:28px;text-align:center;font-family:var(--font-heading);font-weight:900;color:var(--secondary)">#' + (i + 1) + '</div><div class="t-prog__img" style="width:40px;height:40px;border-radius:50%"><img src="assets/' + (st.avatar || 'hero-athlete.webp') + '" alt=""></div><div class="t-prog__body"><strong class="t-prog__name">' + Utils.escapeHtml(st.name) + '</strong><span class="t-prog__coach">' + Utils.escapeHtml(st.sport) + ' · ' + st.performance + '%</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Age Distribution', '<div class="g-chart"><canvas id="coachAgeChart"></canvas></div>') +
      '</div>' +

      UI.section('Performance Distribution', '<div class="g-chart"><canvas id="coachPerfDistChart"></canvas></div>') +

      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-user"/></svg></span><span class="p-action__label">Add Student</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Export Roster</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Message All</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Reports</span></button>' +
        '</div>');
  };

  /* ===== TRAINING SESSIONS ===== */
  pageRenderers.sessions = function () {
    var today = SessionsData.getToday();
    var plans = SessionsData.getPlans();
    var timeline = SessionsData.getTimeline();
    var upcoming = SessionsData.getUpcoming();
    var weekPlan = SessionsData.getWeekPlan();
    var weeklyHours = SessionsData.getWeeklyHours();
    var completion = SessionsData.getCompletion();

    var totalWeekSessions = weekPlan.reduce(function (acc, d) { return acc + d.sessions.length; }, 0);
    var avgDaily = (totalWeekSessions / weekPlan.length).toFixed(1);

    return '' +
      '<div class="c-hero"><div class="c-hero__bg"></div><div class="c-hero__content">' +
      '<span class="c-hero__label">Training Sessions</span>' +
      '<h1 class="c-hero__title">Manage Sessions</h1>' +
      '<div class="c-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-zap"/></svg> ' + today.length + ' Today</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-calendar"/></svg> ' + upcoming.length + ' Upcoming</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-check"/></svg> ' + plans.length + ' Plans</span>' +
      '</div></div>' +
      '<div class="c-hero__stats">' +
      '<div class="c-hero__stat"><strong>' + today.length + '</strong><span>Today</span></div>' +
      '<div class="c-hero__stat"><strong>' + upcoming.length + '</strong><span>Upcoming</span></div>' +
      '<div class="c-hero__stat"><strong>' + plans.length + '</strong><span>Plans</span></div>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-play', today.length, 'Today\'s Sessions', 'red') +
      kpi('dash-calendar', upcoming.length, 'Upcoming', 'gold') +
      kpi('dash-check', plans.length, 'Active Plans', 'green') +
      kpi('dash-clock', weeklyHours.reduce(function (s, w) { return s + w.hours; }, 0) + 'h', 'Monthly Hours', 'cyan') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Today\'s Sessions',
        '<div class="t-prog-grid">' +
        today.map(function (s) {
          var statusClass = s.status === 'live' ? 't-prog__status--active' : 't-prog__status--upcoming';
          return '<div class="t-prog"><div class="t-prog__img" style="width:56px;height:56px;border-radius:10px;background:var(--hover-gradient);display:flex;align-items:center;justify-content:center;color:var(--white)"><svg aria-hidden="true" style="width:22px;height:22px"><use href="#dash-zap"/></svg></div><div class="t-prog__body"><div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(s.sport) + '</strong><span class="t-prog__status ' + statusClass + '">' + Utils.escapeHtml(s.status) + '</span></div><span class="t-prog__coach"><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span><span class="t-prog__schedule"><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(s.time) + ' · ' + Utils.escapeHtml(s.venue) + ' · ' + s.students + ' students</span></div></div>';
        }).join('') +
        '</div>') +
      '<div style="display:flex;flex-direction:column;gap:24px">' +
      UI.section('Weekly Calendar',
        '<div class="s-week">' +
        weekPlan.map(function (d) {
          var cnt = d.sessions.length;
          var times = d.sessions.map(function (s) { return s.split(' ').pop(); }).join(', ');
          return '<div class="s-day' + (cnt ? ' s-day--active' : '') + '"><span class="s-day__name">' + d.day + '</span>' + (cnt ? '<span class="s-day__sport">' + cnt + ' session' + (cnt > 1 ? 's' : '') + '</span><span class="s-day__time">' + times + '</span>' : '<span class="s-day__empty">Off</span>') + '</div>';
        }).join('') +
        '</div>') +
      UI.section('Weekly Summary',
        '<div class="j-stats" style="margin-top:0">' +
        '<div class="j-stat"><span class="j-stat__num">' + totalWeekSessions + '</span><span class="j-stat__label">Weekly Sessions</span></div>' +
        '<div class="j-stat"><span class="j-stat__num">' + avgDaily + '</span><span class="j-stat__label">Avg / Day</span></div>' +
        '<div class="j-stat"><span class="j-stat__num">' + weeklyHours.reduce(function (s, w) { return s + w.hours; }, 0) + 'h</span><span class="j-stat__label">This Month</span></div>' +
        '<div class="j-stat"><span class="j-stat__num">' + completion.reduce(function (s, c) { return s + c.rate; }, 0) / completion.length + '%</span><span class="j-stat__label">Completion</span></div>' +
        '</div>') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Training Timeline',
        '<div class="tl">' +
        timeline.map(function (t) {
          var dotColor = t.status === 'completed' ? 'green' : t.status === 'upcoming' ? 'cyan' : 'red';
          var icon = t.status === 'completed' ? 'dash-check' : 'dash-play';
          return '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--' + dotColor + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="tl__line"></div></div><div class="tl__content"><strong class="tl__title">' + Utils.escapeHtml(t.title) + '</strong><span class="tl__meta">' + Utils.escapeHtml(t.time) + '</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Training Plans',
        '<div class="t-prog-grid">' +
        plans.map(function (p) {
          return '<div class="t-prog"><div class="t-prog__body"><div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(p.name) + '</strong><span class="t-prog__pct" style="font-size:0.8rem">' + p.progress + '%</span></div><span class="t-prog__coach">Focus: ' + Utils.escapeHtml(p.focus) + ' · ' + p.sessions + ' sessions</span><div class="t-prog__bar-wrap"><div class="perf-bar"><div class="perf-bar__fill perf-bar__fill--red" style="width:' + p.progress + '%"></div></div></div></div></div>';
        }).join('') +
        '</div>') +
      '</div>' +

      UI.section('Upcoming Sessions',
        '<div class="tl">' +
        upcoming.map(function (s) {
          return '<div class="tl__item"><div class="tl__track"><div class="tl__dot tl__dot--cyan"></div><div class="tl__line tl__line--gradient"></div></div><div class="tl__content"><div class="tl__card"><div class="tl__card-top"><span class="tl__card-sport">' + Utils.escapeHtml(s.sport) + '</span><span class="tl__status tl__status--up">' + Utils.escapeHtml(s.date) + '</span></div><div class="tl__card-info"><span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span><span><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(s.time) + '</span><span><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + Utils.escapeHtml(s.venue) + '</span></div></div></div></div>';
        }).join('') +
        '</div>') +

      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-play"/></svg></span><span class="p-action__label">New Session</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-calendar"/></svg></span><span class="p-action__label">Schedule</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-book"/></svg></span><span class="p-action__label">Training Plans</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Analytics</span></button>' +
        '</div>');
  };

  /* ===== ATTENDANCE ===== */
  pageRenderers.attendance = function () {
    var records = CoachAttendanceData.getRecords();
    var absent = CoachAttendanceData.getAbsent();
    var monthly = CoachAttendanceData.getMonthly();

    var tableRows = records.map(function (r) {
      var rateColor = r.rate >= 90 ? 'green' : r.rate >= 75 ? 'gold' : 'red';
      var rateBadge = '<span class="d-badge d-badge--' + rateColor + '">' + r.rate + '%</span>';
      return [Utils.escapeHtml(r.name), Utils.escapeHtml(r.sport), r.present + '/' + r.total, rateBadge, '<button class="d-btn d-btn--sm d-btn--ghost">View</button>'];
    });

    return '' +
      '<div class="c-hero"><div class="c-hero__bg"></div><div class="c-hero__content">' +
      '<span class="c-hero__label">Attendance Tracking</span>' +
      '<h1 class="c-hero__title">Attendance Dashboard</h1>' +
      '<div class="c-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-chart"/></svg> ' + monthly[monthly.length - 1].rate + '% This Month</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-users"/></svg> ' + records.length + ' Students</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-close"/></svg> ' + absent.length + ' Absent</span>' +
      '</div></div>' +
      '<div class="c-hero__stats">' +
      '<div class="c-hero__stat"><strong>' + monthly[monthly.length - 1].rate + '%</strong><span>This Month</span></div>' +
      '<div class="c-hero__stat"><strong>' + records.filter(function (r) { return r.rate >= 90; }).length + '</strong><span>Good Standing</span></div>' +
      '<div class="c-hero__stat"><strong>' + absent.length + '</strong><span>Absent</span></div>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-chart', monthly[monthly.length - 1].rate + '%', 'Monthly Rate', 'red') +
      kpi('dash-users', records.filter(function (r) { return r.rate >= 90; }).length, 'Good Standing', 'green') +
      kpi('dash-activity', absent.length, 'Absent Students', 'gold') +
      kpi('dash-trending', '91%', 'Avg Attendance', 'cyan') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Monthly Attendance', '<div class="g-chart"><canvas id="coachAttMonthly"></canvas></div>') +
      UI.section('Attendance Comparison', '<div class="g-chart"><canvas id="coachAttCompare"></canvas></div>') +
      '</div>' +

      UI.section('Attendance Records',
        '<div class="d-toolbar"><input type="search" class="d-search-input" placeholder="Search..." style="max-width:240px"><button class="d-btn d-btn--ghost d-btn--sm">Filter</button><button class="d-btn d-btn--ghost d-btn--sm">Export</button></div>' +
        UI.table(['Student', 'Sport', 'Present', 'Rate', 'Action'], tableRows)) +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Absent Students',
        '<div class="t-prog-grid">' +
        absent.map(function (a) {
          return '<div class="t-prog" style="align-items:center"><div class="t-prog__body"><div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(a.name) + '</strong><span class="t-prog__status t-prog__status--upcoming">' + a.reason + '</span></div><span class="t-prog__coach">' + Utils.escapeHtml(a.sport) + ' · Missed ' + a.missed + ' sessions</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Attendance Trends', '<div class="g-chart"><canvas id="coachAttTrends"></canvas></div>') +
      '</div>' +

      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Mark Attendance</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Export Report</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Notify Parents</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-search"/></svg></span><span class="p-action__label">View Details</span></button>' +
        '</div>');
  };

  /* ===== PERFORMANCE REPORTS ===== */
  pageRenderers.reports = function () {
    var perf = PerformanceData;
    var students = StudentsData.getAll();
    var skills = perf.getSkills();

    var leaderRows = perf.getLeaderboard().map(function (p) {
      return ['<span style="font-weight:800;color:var(--secondary)">#' + p.rank + '</span>', '<strong>' + Utils.escapeHtml(p.name) + '</strong>', Utils.escapeHtml(p.sport), '<strong>' + p.score + '%</strong>'];
    });

    var goalRows = perf.getGoals().map(function (g) {
      var color = g.progress >= 70 ? 'cyan' : g.progress >= 40 ? 'gold' : 'red';
      var bar = '<div class="perf-bar" style="max-width:100px"><div class="perf-bar__fill perf-bar__fill--' + color + '" style="width:' + g.progress + '%"></div></div>';
      return [Utils.escapeHtml(g.student), Utils.escapeHtml(g.goal), bar + '<span style="font-size:0.72rem;color:var(--text-light)">' + g.progress + '%</span>', Utils.escapeHtml(g.deadline)];
    });

    return '' +
      '<div class="c-hero"><div class="c-hero__bg"></div><div class="c-hero__content">' +
      '<span class="c-hero__label">Performance Reports</span>' +
      '<h1 class="c-hero__title">Student Performance Analytics</h1>' +
      '<div class="c-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-trending"/></svg> ' + perf.getTrend()[perf.getTrend().length - 1].avg + '% Avg</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-users"/></svg> ' + students.length + ' Students</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-trophy"/></svg> ' + perf.getLeaderboard().length + ' Ranked</span>' +
      '</div></div>' +
      '<div class="c-hero__stats">' +
      '<div class="c-hero__stat"><strong>' + perf.getTrend()[perf.getTrend().length - 1].avg + '%</strong><span>Avg Score</span></div>' +
      '<div class="c-hero__stat"><strong>' + students.filter(function (s) { return s.performance >= 90; }).length + '</strong><span>Top Performers</span></div>' +
      '<div class="c-hero__stat"><strong>' + students.filter(function (s) { return s.performance < 75; }).length + '</strong><span>Needs Focus</span></div>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-trending', perf.getTrend()[perf.getTrend().length - 1].avg + '%', 'Avg Performance', 'red') +
      kpi('dash-users', students.filter(function (s) { return s.performance >= 90; }).length, 'Top Performers', 'green') +
      kpi('dash-activity', students.filter(function (s) { return s.performance < 75; }).length, 'Needs Focus', 'gold') +
      kpi('dash-award', perf.getCoachRatings().length, 'Coach Ratings', 'cyan') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Performance Trend', '<div class="g-chart"><canvas id="coachPerfTrend"></canvas></div>') +
      UI.section('Skill Radar', '<div class="g-chart"><canvas id="coachSkillRadar"></canvas></div>') +
      '</div>' +

      '<div class="t-grid t-grid--2col">' +
      UI.section('Sport Distribution', '<div class="g-chart"><canvas id="coachSportDist"></canvas></div>') +
      UI.section('Improvement Analysis', '<div class="g-chart"><canvas id="coachImproveChart"></canvas></div>') +
      '</div>' +

      UI.section('Leaderboard',
        UI.table(['Rank', 'Student', 'Sport', 'Score'], leaderRows)) +

      UI.section('Goal Tracking',
        UI.table(['Student', 'Goal', 'Progress', 'Deadline'], goalRows)) +

      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-trending"/></svg></span><span class="p-action__label">Generate Report</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Export Data</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Share Results</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-settings"/></svg></span><span class="p-action__label">Configure</span></button>' +
        '</div>');
  };

  /* ===== MESSAGES ===== */
  pageRenderers.messages = function () {
    var conversations = MessagesData.getAll();
    var first = conversations[0];

    function msgCard(c) {
      var cInitials = c.sender.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
      var cAvatar = c.avatar ? '<img src="assets/' + c.avatar + '" alt="">' : '<span class="ms-contact__initials">' + cInitials + '</span>';
      return '<div class="ms-contact' + (c.unread ? ' ms-contact--unread' : '') + '"><div class="ms-contact__avatar">' + cAvatar + '</div><div class="ms-contact__body"><strong>' + Utils.escapeHtml(c.sender) + '</strong><span>' + Utils.escapeHtml(c.lastMessage.substring(0, 40)) + '…</span></div><div class="ms-contact__meta"><span class="ms-contact__time">' + Utils.escapeHtml(c.timestamp) + '</span></div></div>';
    }

    return '' +
      '<div class="rc-hero"><div class="rc-hero__bg"></div><div class="rc-hero__content">' +
      '<span class="rc-hero__label">Messages</span>' +
      '<h1 class="rc-hero__title">Coach Inbox</h1>' +
      '<p class="rc-hero__sub">' + MessagesData.getUnread().length + ' unread · ' + conversations.length + ' conversations</p>' +
      '</div></div>' +

      '<div class="t-kpi-grid">' +
      kpi('dash-mail', MessagesData.getUnread().length, 'Unread', 'red') +
      kpi('dash-users', '4', 'Coaches', 'gold') +
      kpi('dash-user', '10', 'Students', 'cyan') +
      kpi('dash-download', '8', 'Shared Files', 'green') +
      '</div>' +

      '<div class="t-grid t-grid--2col" style="align-items:stretch">' +
      UI.section('Contacts',
        '<div class="ms-contact-list">' + conversations.map(function (c) { return msgCard(c); }).join('') + '</div>') +
      UI.section('Conversation',
        '<div class="ms-chat" style="min-height:360px"><div class="ms-chat__header"><div class="ms-chat__avatar"><img src="assets/' + first.avatar + '" alt=""></div><div class="ms-chat__meta"><strong>' + Utils.escapeHtml(first.sender) + '</strong><span class="ms-chat__status">Online</span></div></div>' +
        '<div class="ms-chat__messages">' +
        first.messages.map(function (msg) {
          var isMe = msg.from === 'Me';
          return '<div class="ms-chat__msg' + (isMe ? ' ms-chat__msg--me' : '') + '"><div class="ms-chat__bubble">' + Utils.escapeHtml(msg.text) + '</div><span class="ms-chat__time">' + Utils.escapeHtml(msg.time) + '</span></div>';
        }).join('') +
        '</div>' +
        '<div class="ms-chat__input"><input type="text" placeholder="Type a message..." class="d-input" style="flex:1;margin-bottom:0"><button class="d-btn d-btn--primary d-btn--sm" style="flex-shrink:0">Send</button></div></div>') +
      '</div>' +
      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-mail"/></svg></span><span class="p-action__label">New Message</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-users"/></svg></span><span class="p-action__label">Group Message</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Chat</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-card"/></svg></span><span class="p-action__label">Support</span></button>' +
        '</div>');
  };

  /* ===== SETTINGS ===== */
  pageRenderers.settings = function () {
    var c = CoachData.get();

    return '' +
      '<div class="rc-hero"><div class="rc-hero__bg"></div><div class="rc-hero__content">' +
      '<span class="rc-hero__label">Settings</span>' +
      '<h1 class="rc-hero__title">Coach Settings</h1>' +
      '<p class="rc-hero__sub">Manage your account, preferences, and profile.</p>' +
      '</div></div>' +

      '<div class="t-grid t-grid--2col">' +
      '<div>' +
      '<div class="st-group"><h3 class="st-group__title">Coach Profile</h3>' +
      '<div class="st-field"><label>Full Name</label><input type="text" class="d-input" value="' + Utils.escapeHtml(c.name) + '"></div>' +
      '<div class="st-field"><label>Email</label><input type="email" class="d-input" value="' + Utils.escapeHtml(c.email) + '"></div>' +
      '<div class="st-field"><label>Phone</label><input type="tel" class="d-input" value="' + Utils.escapeHtml(c.phone) + '"></div>' +
      '</div>' +
      '<div class="st-group"><h3 class="st-group__title">Security</h3>' +
      '<div class="st-field"><label>Current Password</label><input type="password" class="d-input" value=""></div>' +
      '<div class="st-field"><label>New Password</label><input type="password" class="d-input" value=""></div>' +
      '<div class="st-toggle"><span>Two-Factor Authentication</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '</div>' +
      '<div class="st-group"><h3 class="st-group__title">Notifications</h3>' +
      '<div class="st-toggle"><span>Email Notifications</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '<div class="st-toggle"><span>Push Notifications</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '<div class="st-toggle"><span>SMS Alerts</span><label class="d-switch"><input type="checkbox"><span class="d-switch__slider"></span></label></div>' +
      '</div>' +
      '</div>' +
      '<div>' +
      '<div class="st-group"><h3 class="st-group__title">Appearance</h3>' +
      '<div class="st-theme"><button class="st-theme__btn st-theme__btn--light">Light</button><button class="st-theme__btn st-theme__btn--dark">Dark</button><button class="st-theme__btn">System</button></div>' +
      '</div>' +
      '<div class="st-group"><h3 class="st-group__title">Preferences</h3>' +
      '<div class="st-toggle"><span>Profile Visible to Students</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '<div class="st-toggle"><span>Show Online Status</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '<div class="st-toggle"><span>Session Reminders</span><label class="d-switch"><input type="checkbox" checked><span class="d-switch__slider"></span></label></div>' +
      '</div>' +
      '<div class="st-group"><h3 class="st-group__title">Connected Devices</h3>' +
      '<div class="st-device"><div class="st-device__icon"><svg aria-hidden="true"><use href="#dash-dashboard"/></svg></div><div class="st-device__body"><strong>MacBook Pro</strong><span>Active now</span></div><span class="st-device__badge">Current</span></div>' +
      '<div class="st-device"><div class="st-device__icon"><svg aria-hidden="true"><use href="#dash-zap"/></svg></div><div class="st-device__body"><strong>iPad Air</strong><span>Last active yesterday</span></div><button class="d-btn d-btn--sm d-btn--ghost">Revoke</button></div>' +
      '</div>' +
      '<div class="st-group"><h3 class="st-group__title">Danger Zone</h3>' +
      '<p style="font-size:0.82rem;color:var(--text-light);margin-bottom:14px;line-height:1.6">Permanent actions that cannot be undone.</p>' +
      '<div style="display:flex;gap:12px"><button class="d-btn d-btn--ghost d-btn--sm" id="coachSettingsLogout" style="color:var(--secondary);border-color:rgba(239,68,68,0.2)">Logout</button><button class="d-btn d-btn--ghost d-btn--sm" style="color:var(--secondary);border-color:rgba(239,68,68,0.2)">Delete Account</button></div>' +
      '</div>' +
      '<div style="display:flex;justify-content:flex-end;gap:12px;margin-top:8px"><button class="d-btn d-btn--ghost">Cancel</button><button class="d-btn d-btn--primary">Save Changes</button></div>' +
      '</div></div>';
  };

  /* ===== Router ===== */
  function getPageFromHash() {
    return window.location.hash.replace(/^#\//, '') || 'overview';
  }

  function renderPage(page) {
    if (!page) page = 'overview';
    page = page.toLowerCase();
    if (!pageRenderers[page]) page = 'overview';
    currentPage = page;
    var renderFn = pageRenderers[page];
    if (!renderFn) return;
    if (contentEl) {
      contentEl.innerHTML = UI.pageSkeleton();
      requestAnimationFrame(function () {
        contentEl.innerHTML = renderFn();
        setupPage(page);
      });
    }
    updateActiveNav(page);
    updatePageTitle(page);
  }

  function setupPage(page) {
    animateCounters();
    animatePerfBars();
    setupCharts(page);
  }

  function setupCharts(page) {
    if (typeof Chart === 'undefined') return;

    if (page === 'overview') {
      Charts.createArea('coachWeeklyChart', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [4, 6, 3, 5, 4, 2, 0], Charts.COLORS.secondary);
      Charts.createBar('coachAttendanceChart', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], [92, 88, 95, 90, 93, 85, 0]);
    }
    if (page === 'profile') {
      Charts.createArea('coachProfileHours', ['Week 1', 'Week 2', 'Week 3', 'Week 4'], [18, 22, 16, 24], Charts.COLORS.highlight);
    }
    if (page === 'students') {
      Charts.createDoughnut('coachAgeChart', ['14-15', '16-17', '18-19', '20+'], [25, 35, 25, 15]);
      Charts.createBar('coachPerfDistChart', ['90-100%', '80-89%', '70-79%', 'Below 70%'], [3, 4, 2, 1]);
    }
    if (page === 'attendance') {
      var att = CoachAttendanceData;
      Charts.createLine('coachAttMonthly', att.getMonthly().map(function (d) { return d.month; }), att.getMonthly().map(function (d) { return d.rate; }), Charts.COLORS.secondary);
      Charts.createBar('coachAttCompare', att.getComparison().map(function (d) { return d.label; }), att.getComparison().map(function (d) { return d.rate; }));
      Charts.createArea('coachAttTrends', ['Week 1', 'Week 2', 'Week 3', 'Week 4'], [90, 88, 93, 91], Charts.COLORS.highlight);
    }
    if (page === 'reports') {
      var p = PerformanceData;
      Charts.createLine('coachPerfTrend', p.getTrend().map(function (d) { return d.month; }), p.getTrend().map(function (d) { return d.avg; }), Charts.COLORS.secondary);
      Charts.createRadar('coachSkillRadar', p.getSkills().map(function (d) { return d.label; }), [{ data: p.getSkills().map(function (d) { return d.value; }), color: Charts.COLORS.secondary }]);
      Charts.createDoughnut('coachSportDist', p.getDistribution().map(function (d) { return d.label; }), p.getDistribution().map(function (d) { return d.value; }));
      Charts.createBar('coachImproveChart', p.getImprovement().map(function (d) { return d.month; }), p.getImprovement().map(function (d) { return d.improvement; }));
    }
  }

  function animateCounters() {
    var counters = document.querySelectorAll('.stat-card__num, .t-kpi__num, .c-hero__stat strong');
    counters.forEach(function (el) {
      var text = el.textContent.replace(/[^0-9.]/g, '');
      var target = parseFloat(text);
      if (isNaN(target)) return;
      var suffix = el.textContent.replace(/[0-9.]/g, '');
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 30));
      var interval = 1000 / Math.ceil(target / step);
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.round(current) + suffix;
      }, interval);
    });
  }

  function animatePerfBars() {
    var fills = document.querySelectorAll('.perf-bar__fill');
    fills.forEach(function (el) {
      var w = el.style.width;
      el.style.width = '0%';
      setTimeout(function () { el.style.width = w; }, 200);
    });
  }

  function updateActiveNav(page) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      link.classList.toggle('dashboard__sidebar-link--active', href === '#/' + page || (page === 'overview' && (href === '#' || href === '#/')));
    });
  }

  function updatePageTitle(page) {
    var titles = {
      overview: 'Overview',
      profile: 'My Profile',
      students: 'Students',
      sessions: 'Training Sessions',
      attendance: 'Attendance',
      reports: 'Performance Reports',
      messages: 'Messages',
      settings: 'Settings'
    };
    if (pageTitleEl) pageTitleEl.textContent = titles[page] || 'Dashboard';
  }

  function handleHashChange() {
    renderPage(getPageFromHash());
  }

  function init() {
    contentEl = document.getElementById('app-content');
    if (!contentEl) return;
    window.addEventListener('hashchange', handleHashChange);
    renderPage(getPageFromHash());
  }

  document.addEventListener('DOMContentLoaded', init);

  return { renderPage: renderPage, currentPage: currentPage };
})();
