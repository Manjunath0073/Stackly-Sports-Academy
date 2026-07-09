const App = (function () {
  'use strict';

  var currentPage = 'overview';
  var contentEl = null;
  var pageTitleEl = document.getElementById('pageTitle');
  var navLinks = document.querySelectorAll('.dashboard__sidebar-nav a');
  var pageRenderers = {};

  /* ===== Page Renderers ===== */

  pageRenderers.overview = function () {
    var student = StudentData.get();
    var schedule = ScheduleData.getToday();
    var upcoming = ScheduleData.getUpcoming();
    var perf = AttendanceData.getOverall();
    var achievements = AchievementsData.getUnlocked();
    var activities = AchievementsData.getActivities();
    var announcements = AchievementsData.getAnnouncements();
    var events = AchievementsData.getEvents();

    return '' +

      /* Welcome Hero */
      '<section class="s-hero" aria-labelledby="heroTitle">' +
      '<div class="s-hero__bg" aria-hidden="true"></div>' +
      '<div class="s-hero__grid" aria-hidden="true"></div>' +
      '<div class="s-hero__content">' +
      '<div class="s-hero__top">' +
      '<span class="s-hero__date" id="currentDate"></span>' +
      '<span class="s-badge s-badge--gold">Premium Athlete</span>' +
      '</div>' +
      '<h1 class="s-hero__title" id="heroTitle">' +
      Utils.getGreeting() + ',<br>' +
      '<span class="text-gradient">' + Utils.escapeHtml(student.name) + '</span>' +
      '</h1>' +
      '<p class="s-hero__quote" id="motivationalQuote">"Champions aren\'t made in the gyms. Champions are made from something deep inside them — a desire, a dream, a vision."</p>' +
      '<div class="s-hero__cards">' +
      UI.glassCard('dash-user', 'Role', student.role) +
      UI.glassCard('dash-calendar', 'Member Since', student.memberSince) +
      UI.glassCard('dash-trophy', 'Training Streak', student.trainingStreak + ' Days') +
      '</div></div>' +
      '<div class="s-hero__media"><div class="s-hero__profile">' +
      '<img src="' + (student.profileImage || 'assets/hero-athlete.webp') + '" alt="' + Utils.escapeHtml(student.name) + '">' +
      '</div></div></section>' +

      /* Stats Cards */
      '<section class="stats" aria-label="Performance statistics">' +
      '<div class="stats__grid">' +
      UI.statCard('dash-zap', 4, 'Today\'s Training', 'Cardio &amp; strength') +
      UI.statCard('dash-calendar', 8, 'Upcoming Sessions', 'Next: Football drill') +
      UI.statCard('dash-chart', 96, 'Attendance', 'This month', '%') +
      UI.statCard('dash-trophy', 12, 'Achievements', 'Badges earned') +
      '</div></section>' +

      /* Content Grid */
      '<div class="d-content">' +
      '<div class="d-content__main">' +

      /* Today's Training */
      UI.section('Today\'s Training', UI.trainingCard(schedule), 'View All', '#/schedule') +

      /* Upcoming Timeline */
      UI.section('Upcoming Training', (function () {
        var dots = ['red', 'gold', 'cyan', ''];
        var statuses = ['Live', 'Upcoming', 'Upcoming', 'Tomorrow'];
        var items = '';
        upcoming.slice(0, 4).forEach(function (s, i) {
          var dotClass = dots[i] ? ' u-timeline__dot--' + dots[i] : '';
          var statusClass = statuses[i] === 'Live' ? ' u-timeline__status--live' : ' u-timeline__status--up';
          items += '<div class="u-timeline__item">' +
            '<div class="u-timeline__dot' + dotClass + '"></div>' +
            '<div class="u-timeline__card">' +
            '<div class="u-timeline__top"><span class="u-timeline__sport">' + Utils.escapeHtml(s.sport) + '</span><span class="u-timeline__status' + statusClass + '">' + statuses[i] + '</span></div>' +
            '<div class="u-timeline__info">' +
            '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span>' +
            '<span><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(s.time) + '</span>' +
            '<span><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + Utils.escapeHtml(s.venue) + '</span>' +
            '</div></div></div>';
        });
        return '<div class="u-timeline">' + items + '</div>';
      })(), 'View Schedule', '#/schedule') +

      /* Performance */
      UI.section('Performance Overview',
        '<div class="perf-grid">' +
        UI.perfCard('Overall Progress', perf.overallProgress, 'red') +
        UI.perfCard('Attendance', perf.attendance, 'gold') +
        UI.perfCard('Fitness Level', perf.fitnessLevel, 'cyan') +
        UI.perfCard('Performance Score', perf.performanceScore, 'red') +
        '</div>', 'Details', '#/goals') +

      /* Analytics */
      UI.section('Training Analytics',
        '<div class="chart-grid">' +
        UI.chartContainer('Weekly Attendance', 'chartWeekly') +
        UI.chartContainer('Monthly Performance', 'chartMonthly') +
        UI.chartContainer('Skill Distribution', 'chartSkills') +
        UI.chartContainer('Training Hours', 'chartHours') +
        '</div>') +

      /* Achievements */
      UI.section('Achievements',
        '<div class="achiev-grid">' +
        achievements.slice(0, 6).map(function (a) { return UI.achievementBadge(a); }).join('') +
        '</div>', 'All Badges', '#/achievements') +

      /* Activities */
      UI.section('Recent Activities',
        '<div class="act-timeline">' +
        activities.map(function (a) { return UI.timelineItem(a.dot, a.text, a.detail, a.time); }).join('') +
        '</div>', 'View All', '#/achievements') +

      /* Announcements */
      UI.section('Announcements',
        '<div class="announce-grid">' +
        announcements.map(function (a) { return UI.announcementCard(a); }).join('') +
        '</div>', 'All News', '#/messages') +

      /* Events */
      UI.section('Upcoming Events',
        '<div class="events-grid">' +
        events.map(function (e) { return UI.eventCard(e); }).join('') +
        '</div>', 'Calendar', '#/schedule') +

      /* Quick Actions */
      UI.section('Quick Actions',
        '<div class="qactions">' +
        '<button class="qaction"><span class="qaction__icon"><svg aria-hidden="true"><use href="#dash-play"/></svg></span><span class="qaction__label">Start Training</span></button>' +
        '<button class="qaction"><span class="qaction__icon"><svg aria-hidden="true"><use href="#dash-calendar"/></svg></span><span class="qaction__label">Book Session</span></button>' +
        '<button class="qaction"><span class="qaction__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="qaction__label">Message Coach</span></button>' +
        '<button class="qaction"><span class="qaction__icon"><svg aria-hidden="true"><use href="#dash-trending"/></svg></span><span class="qaction__label">View Progress</span></button>' +
        '</div>') +

      '</div>' +

      /* Sidebar */
      '<aside class="d-content__sidebar" aria-label="Dashboard sidebar information">' +
      '<div class="d-sidebar">' +

      '<div class="d-widget">' +
      '<h3 class="d-widget__title"><svg aria-hidden="true"><use href="#dash-message"/></svg> Coach Message</h3>' +
      '<div class="d-coach">' +
      '<div class="d-coach__avatar"><img src="assets/coach-david.webp" alt="Coach David"></div>' +
      '<div class="d-coach__body"><strong>Coach David</strong><p>"Great effort today! Focus on your footwork drills this week to improve agility."</p><span class="d-coach__time">2 hours ago</span></div>' +
      '</div></div>' +

      '<div class="d-widget">' +
      '<h3 class="d-widget__title"><svg aria-hidden="true"><use href="#dash-bolt"/></svg> Daily Tip</h3>' +
      '<div class="d-tip">' +
      '<div class="d-tip__icon"><svg aria-hidden="true"><use href="#dash-sun"/></svg></div>' +
      '<p class="d-tip__text">Stay hydrated before, during, and after training. Aim for 500ml of water 30 minutes before exercise.</p>' +
      '</div></div>' +

      '<div class="d-widget">' +
      '<h3 class="d-widget__title"><svg aria-hidden="true"><use href="#dash-sun"/></svg> Weather</h3>' +
      '<div class="d-weather">' +
      '<div class="d-weather__main"><span class="d-weather__temp">28°</span><span class="d-weather__cond">Sunny</span></div>' +
      '<div class="d-weather__details"><span><svg aria-hidden="true"><use href="#dash-droplet"/></svg> 45%</span><span><svg aria-hidden="true"><use href="#dash-trending"/></svg> 12 km/h</span></div>' +
      '</div></div>' +

      '<div class="d-widget">' +
      '<h3 class="d-widget__title"><svg aria-hidden="true"><use href="#dash-droplet"/></svg> Hydration Reminder</h3>' +
      '<div class="d-hydrate"><div class="d-hydrate__track"><div class="d-hydrate__bar" style="width:60%"></div></div>' +
      '<div class="d-hydrate__info"><span>1.2L / 2.0L</span><span>60%</span></div>' +
      '</div></div>' +

      '<div class="d-widget">' +
      '<h3 class="d-widget__title"><svg aria-hidden="true"><use href="#dash-calendar"/></svg> Next Session</h3>' +
      '<div class="d-next">' +
      '<div class="d-next__sport">' + upcoming[0].sport + '</div>' +
      '<div class="d-next__info">' +
      '<span><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + upcoming[0].day + ', ' + upcoming[0].time + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + upcoming[0].venue + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + upcoming[0].coach + '</span>' +
      '</div></div></div>' +

      '</div></aside></div>';
  };

  pageRenderers.profile = function () {
    var s = StudentData.get();
    var perf = AttendanceData.getOverall();
    var prog = ProgramsData.getActive();
    var achievements = AchievementsData.getUnlocked();
    var initials = StudentData.getInitials(s.name);

    var avatarImg = s.profileImage
      ? '<img src="' + Utils.escapeHtml(s.profileImage) + '" alt="' + Utils.escapeHtml(s.name) + '">'
      : '<span class="p-hero__initials">' + initials + '</span>';

    function field(label, value) {
      return '<div class="p-field"><span class="p-field__label">' + Utils.escapeHtml(label) + '</span><span class="p-field__value">' + Utils.escapeHtml(value) + '</span></div>';
    }

    function kpiCard(icon, value, label, color) {
      return '<div class="p-kpi"><div class="p-kpi__icon p-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="p-kpi__info"><span class="p-kpi__num">' + value + '</span><span class="p-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    function timelineItem(icon, title, desc, date, color) {
      return '<div class="p-timeline__item"><div class="p-timeline__dot p-timeline__dot--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="p-timeline__body"><strong>' + Utils.escapeHtml(title) + '</strong><span>' + Utils.escapeHtml(desc) + '</span><time>' + Utils.escapeHtml(date) + '</time></div></div>';
    }

    return '' +

      /* ===== SECTION 1: Profile Hero ===== */
      '<div class="p-hero">' +
      '<div class="p-hero__bg"></div>' +
      '<div class="p-hero__content">' +
      '<div class="p-hero__avatar-wrap">' +
      '<div class="p-hero__avatar">' + avatarImg + '</div>' +
      '<span class="p-hero__badge">Premium Athlete</span>' +
      '</div>' +
      '<h1 class="p-hero__name">' + Utils.escapeHtml(s.name) + '</h1>' +
      '<div class="p-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-card"/></svg> ' + Utils.escapeHtml(s.studentId) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-target"/></svg> ' + Utils.escapeHtml(s.primarySport) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-trending"/></svg> Level ' + Utils.escapeHtml(s.trainingLevel) + '</span>' +
      '</div>' +
      '<div class="p-hero__contact">' +
      '<span><svg aria-hidden="true"><use href="#dash-mail"/></svg> ' + Utils.escapeHtml(s.email) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.phone) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-calendar"/></svg> Joined ' + Utils.escapeHtml(s.memberSince) + '</span>' +
      '</div>' +
      '<button class="d-btn d-btn--primary p-hero__btn">Edit Profile</button>' +
      '</div>' +
      '<div class="p-hero__stats">' +
      '<div class="p-hero__stat"><strong>' + s.trainingStreak + '</strong><span>Day Streak</span></div>' +
      '<div class="p-hero__stat"><strong>' + perf.attendance + '%</strong><span>Attendance</span></div>' +
      '<div class="p-hero__stat"><strong>' + achievements.length + '</strong><span>Badges</span></div>' +
      '<div class="p-hero__stat"><strong>' + s.completedSessions + '</strong><span>Sessions</span></div>' +
      '</div></div>' +

      /* ===== SECTION 2: Personal Information ===== */
      UI.section('Personal Information',
        '<div class="p-grid p-grid--2col">' +
        '<div class="p-card">' + field('First Name', s.firstName) + field('Last Name', s.lastName) + field('Date of Birth', s.dateOfBirth) + field('Gender', s.gender) + '</div>' +
        '<div class="p-card">' + field('Blood Group', s.bloodGroup) + field('Nationality', s.nationality) + field('Address', s.address) + field('Emergency Contact', s.emergencyContact) + '</div>' +
        '</div>') +

      /* ===== SECTION 3: Sports Information ===== */
      UI.section('Sports Information',
        '<div class="p-grid p-grid--2col">' +
        '<div class="p-card">' + field('Primary Sport', s.primarySport) + field('Secondary Sport', s.secondarySport) + field('Coach', s.coach) + field('Current Batch', s.currentBatch) + '</div>' +
        '<div class="p-card">' + field('Training Level', s.trainingLevel) + field('Experience', s.experience) + field('Favorite Position', s.favoritePosition) + field('Medical Status', s.medicalStatus) + '</div>' +
        '</div>') +

      /* ===== SECTION 4: Performance Snapshot ===== */
      UI.section('Performance Snapshot',
        '<div class="p-kpi-grid">' +
        kpiCard('dash-chart', perf.attendance + '%', 'Attendance', 'red') +
        kpiCard('dash-trending', perf.fitnessLevel + '%', 'Fitness Score', 'gold') +
        kpiCard('dash-check', s.completedSessions, 'Completed Sessions', 'cyan') +
        kpiCard('dash-trophy', achievements.length, 'Achievements', 'green') +
        '</div>') +

      /* ===== SECTION 5: Performance Analytics ===== */
      UI.section('Performance Analytics',
        '<div class="chart-grid">' +
        UI.chartContainer('Monthly Performance', 'profileChartMonthly') +
        UI.chartContainer('Training Hours', 'profileChartHours') +
        '</div>') +

      /* ===== SECTION 6: Medical & Fitness ===== */
      UI.section('Medical &amp; Fitness',
        '<div class="p-grid p-grid--3col">' +
        '<div class="p-card p-card--center"><div class="p-med__icon"><svg aria-hidden="true"><use href="#dash-user"/></svg></div><strong class="p-med__num">' + Utils.escapeHtml(s.height) + '</strong><span class="p-med__label">Height</span></div>' +
        '<div class="p-card p-card--center"><div class="p-med__icon"><svg aria-hidden="true"><use href="#dash-user"/></svg></div><strong class="p-med__num">' + Utils.escapeHtml(s.weight) + '</strong><span class="p-med__label">Weight</span></div>' +
        '<div class="p-card p-card--center"><div class="p-med__icon p-med__icon--accent"><svg aria-hidden="true"><use href="#dash-target"/></svg></div><strong class="p-med__num">' + Utils.escapeHtml(s.bmi) + '</strong><span class="p-med__label">BMI</span></div>' +
        '<div class="p-card">' + field('Last Check-up', s.lastMedicalCheck) + field('Diet Plan', s.dietPlan) + '</div>' +
        '<div class="p-card">' + field('Injury Status', s.injuryStatus) + field('Medical Status', s.medicalStatus) + '</div>' +
        '<div class="p-card">' + field('Blood Group', s.bloodGroup) + field('Emergency Contact', s.emergencyContact) + '</div>' +
        '</div>') +

      /* ===== SECTION 7: Timeline ===== */
      UI.section('My Journey',
        '<div class="p-timeline">' +
        timelineItem('dash-calendar', 'Joined Academy', 'Enrolled as Student Athlete', 'Jan 2024', 'cyan') +
        timelineItem('dash-check', 'Completed Foundation Program', 'Finished Level 1 training', 'Jun 2024', 'green') +
        timelineItem('dash-trophy', 'Won Regional Competition', 'First place in Football', 'Mar 2025', 'gold') +
        timelineItem('dash-award', 'Unlocked Golden Goal Badge', 'Scored 50 goals milestone', 'Jun 2026', 'red') +
        '</div>') +

      /* ===== SECTION 8: Quick Actions ===== */
      UI.section('Quick Actions',
        '<div class="p-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-user"/></svg></span><span class="p-action__label">Update Profile</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-book"/></svg></span><span class="p-action__label">Training Programs</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-card"/></svg></span><span class="p-action__label">Download ID Card</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Contact Coach</span></button>' +
        '</div>');
  };

  pageRenderers.programs = function () {
    var s = StudentData.get();
    var programs = ProgramsData.getAll();
    var active = ProgramsData.getActive();
    var perf = AttendanceData.getOverall();
    var upcoming = ScheduleData.getUpcoming();
    var activities = AchievementsData.getActivities();
    var months = AttendanceData.getMonthly();

    /* Helper: program card */
    function progCard(p) {
      var img = 'assets/' + (p.image || 'program-football.webp');
      var statusClass = p.status === 'active' ? 't-prog__status--active' : 't-prog__status--upcoming';
      var statusText = p.status === 'active' ? 'Active' : 'Upcoming';
      return '<div class="t-prog">' +
        '<div class="t-prog__img"><img src="' + img + '" alt="' + Utils.escapeHtml(p.name) + '"></div>' +
        '<div class="t-prog__body">' +
        '<div class="t-prog__top"><strong class="t-prog__name">' + Utils.escapeHtml(p.name) + '</strong><span class="t-prog__status ' + statusClass + '">' + statusText + '</span></div>' +
        '<span class="t-prog__coach"><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(p.coach) + '</span>' +
        '<span class="t-prog__schedule"><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(p.schedule) + '</span>' +
        '<div class="t-prog__bar-wrap"><div class="perf-bar"><div class="perf-bar__fill perf-bar__fill--red" style="width:' + p.progress + '%"></div></div></div>' +
        '<div class="t-prog__foot"><span class="t-prog__pct">' + p.progress + '%</span><button class="d-btn d-btn--sm d-btn--primary">Continue</button></div>' +
        '</div></div>';
    }

    /* Helper: KPI */
    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    /* Helper: milestone */
    function milestone(icon, title, date, color) {
      return '<div class="t-milestone"><div class="t-milestone__icon t-milestone__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-milestone__body"><strong>' + Utils.escapeHtml(title) + '</strong><span>' + Utils.escapeHtml(date) + '</span></div></div>';
    }

    /* Helper: schedule day */
    function scheduleDay(day, data) {
      var dot = data ? '<div class="t-sched__dot"></div>' : '';
      var info = data ? '<span class="t-sched__sport">' + Utils.escapeHtml(data.sport) + '</span><span class="t-sched__coach">' + Utils.escapeHtml(data.coach) + '</span><span class="t-sched__time">' + Utils.escapeHtml(data.time) + '</span>' : '<span class="t-sched__empty">Rest</span>';
      return '<div class="t-sched__day' + (data ? ' t-sched__day--active' : '') + '"><span class="t-sched__day-label">' + Utils.escapeHtml(day) + '</span>' + dot + '<div class="t-sched__info">' + info + '</div></div>';
    }

    /* Table rows */
    var tableRows = programs.map(function (p) {
      var statusLabel = p.status === 'active' ? '<span class="d-badge d-badge--green">Active</span>' : '<span class="d-badge d-badge--cyan">Upcoming</span>';
      var progBar = '<div class="perf-bar" style="max-width:120px"><div class="perf-bar__fill perf-bar__fill--red" style="width:' + p.progress + '%"></div></div>';
      return ['<strong>' + Utils.escapeHtml(p.name) + '</strong>', Utils.escapeHtml(p.coach), Utils.escapeHtml(p.schedule), progBar + '<span style="font-size:0.75rem;color:var(--text-light);display:block;margin-top:4px">' + p.progress + '%</span>', statusLabel, '<button class="d-btn d-btn--sm d-btn--ghost">View</button>'];
    });

    var weekDays = [
      { day: 'Mon', data: upcoming[1] },
      { day: 'Tue', data: upcoming[2] },
      { day: 'Wed', data: upcoming[0] },
      { day: 'Thu', data: upcoming[4] },
      { day: 'Fri', data: upcoming[5] },
      { day: 'Sat', data: upcoming[6] }
    ];

    return '' +

      /* ===== SECTION 1: Hero ===== */
      '<div class="t-hero">' +
      '<div class="t-hero__bg"></div>' +
      '<div class="t-hero__content">' +
      '<span class="t-hero__label">Training Programs</span>' +
      '<h1 class="t-hero__title">' + Utils.escapeHtml(s.primarySport) + ' — ' + Utils.escapeHtml(s.trainingLevel) + '</h1>' +
      '<div class="t-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-book"/></svg> ' + Utils.escapeHtml(s.currentBatch) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-card"/></svg> Premium Athlete</span>' +
      '</div>' +
      '<div class="t-hero__actions"><button class="d-btn d-btn--primary">Continue Training</button><button class="d-btn d-btn--ghost t-hero__btn--light">Browse Programs</button></div>' +
      '</div>' +
      '<div class="t-hero__avatar"><img src="' + (s.profileImage || 'assets/hero-athlete.webp') + '" alt="' + Utils.escapeHtml(s.name) + '"></div>' +
      '</div>' +

      /* ===== SECTION 2: KPI Cards ===== */
      '<div class="t-kpi-grid">' +
      kpi('dash-book', active.length, 'Active Programs', 'red') +
      kpi('dash-check', programs.length - active.length, 'Completed', 'green') +
      kpi('dash-clock', '142', 'Training Hours', 'cyan') +
      kpi('dash-trending', perf.overallProgress + '%', 'Overall Progress', 'gold') +
      '</div>' +

      /* ===== SECTION 3: Chart + Active Programs ===== */
      '<div class="t-grid t-grid--2col">' +
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Program Progress</h2></div><div class="t-chart"><canvas id="programsChart"></canvas></div></div>' +
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Active Programs</h2><a href="#" class="d-section__link">View All <svg aria-hidden="true"><use href="#dash-arrow-right"/></svg></a></div><div class="t-prog-grid">' +
      active.slice(0, 2).map(function (p) { return progCard(p); }).join('') +
      '</div></div></div>' +

      /* ===== SECTION 4: Coach + Schedule ===== */
      '<div class="t-grid t-grid--2col">' +
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Coach Information</h2></div><div class="t-coach"><div class="t-coach__avatar"><img src="assets/coach-david.webp" alt="Coach David"></div><div class="t-coach__body"><strong class="t-coach__name">Coach David</strong><span class="t-coach__role">Head Coach — ' + Utils.escapeHtml(s.primarySport) + '</span><div class="t-coach__stats"><div class="t-coach__stat"><strong>12</strong><span>Years Exp</span></div><div class="t-coach__stat"><strong>4.9</strong><span>Rating</span></div><div class="t-coach__stat"><strong>' + programs.length + '</strong><span>Programs</span></div></div><div class="t-coach__tags"><span>Football</span><span>Basketball</span><span>Athletics</span></div><button class="d-btn d-btn--primary d-btn--sm" style="margin-top:12px">Contact Coach <svg aria-hidden="true"><use href="#dash-message"/></svg></button></div></div></div>' +

      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Weekly Schedule</h2><a href="#" class="d-section__link">Full Week <svg aria-hidden="true"><use href="#dash-arrow-right"/></svg></a></div><div class="t-sched">' +
      weekDays.map(function (w) { return scheduleDay(w.day, w.data); }).join('') +
      '</div></div></div>' +

      /* ===== SECTION 5: Programs Table ===== */
      UI.section('All Programs',
        '<div class="d-toolbar"><input type="search" class="d-search-input" placeholder="Search programs..." style="max-width:300px"><button class="d-btn d-btn--ghost d-btn--sm">Filter</button><button class="d-btn d-btn--ghost d-btn--sm">Sort</button><button class="d-btn d-btn--primary d-btn--sm" style="margin-left:auto">+ Enroll</button></div>' +
        UI.table(['Program', 'Coach', 'Schedule', 'Progress', 'Status', 'Action'], tableRows) +
        '<div class="d-empty-note" style="display:flex;justify-content:space-between"><span>Showing ' + programs.length + ' of ' + programs.length + ' programs</span><span style="display:flex;gap:8px"><a href="#" style="color:var(--text-light);font-size:0.82rem">1</a><a href="#" style="color:var(--text-light);font-size:0.82rem">2</a><a href="#" style="color:var(--secondary);font-size:0.82rem">3</a></span></div>') +

      /* ===== SECTION 6: Activities + Milestones ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Recent Activities',
        '<div class="act-timeline">' +
        activities.map(function (a) { return UI.timelineItem(a.dot, a.text, a.detail, a.time); }).join('') +
        '</div>') +
      UI.section('Upcoming Milestones',
        '<div class="t-milestone-grid">' +
        milestone('dash-target', 'Next Assessment', '15 Jul 2026', 'red') +
        milestone('dash-trophy', 'Football Tournament', '22 Jul 2026', 'gold') +
        milestone('dash-trending', 'Fitness Test', '05 Aug 2026', 'cyan') +
        milestone('dash-award', 'Program Completion', '30 Aug 2026', 'green') +
        '</div>') +
      '</div>' +

      /* ===== SECTION 7: Quick Actions ===== */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Program Materials</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Attendance</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-check"/></svg></span><span class="p-action__label">Assignments</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Coach Chat</span></button>' +
      '</div></div>';
  };

  pageRenderers.schedule = function () {
    var s = StudentData.get();
    var today = ScheduleData.getToday();
    var upcoming = ScheduleData.getUpcoming();
    var perf = AttendanceData.getOverall();
    var att = AttendanceData.getWeekly();

    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    function schedDay(day, data) {
      if (!data) return '<div class="s-day"><span class="s-day__name">' + day + '</span><span class="s-day__empty">—</span></div>';
      return '<div class="s-day s-day--active"><span class="s-day__name">' + day + '</span><span class="s-day__sport">' + Utils.escapeHtml(data.sport) + '</span><span class="s-day__time">' + Utils.escapeHtml(data.time) + '</span><span class="s-day__coach">' + Utils.escapeHtml(data.coach) + '</span></div>';
    }

    function timelineItem(icon, label, time, color) {
      return '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="s-tl__body"><strong>' + Utils.escapeHtml(label) + '</strong><span>' + Utils.escapeHtml(time) + '</span></div></div>';
    }

    var weekDays = [
      { day: 'Mon', data: upcoming[1] }, { day: 'Tue', data: upcoming[2] },
      { day: 'Wed', data: upcoming[0] }, { day: 'Thu', data: upcoming[4] },
      { day: 'Fri', data: upcoming[5] }, { day: 'Sat', data: upcoming[6] }
    ];

    var tableRows = upcoming.map(function (s) {
      var statusBadge = s.status === 'live' ? '<span class="d-badge d-badge--red">Live</span>' : '<span class="d-badge d-badge--cyan">' + Utils.escapeHtml(s.day) + '</span>';
      return [Utils.escapeHtml(s.sport), Utils.escapeHtml(s.coach), Utils.escapeHtml(s.day), Utils.escapeHtml(s.time), Utils.escapeHtml(s.venue), statusBadge, '<button class="d-btn d-btn--sm d-btn--ghost">Join</button>'];
    });

    var monthDays = [];
    for (var i = 1; i <= 30; i++) {
      var isToday = i === 9;
      var hasTraining = [1, 3, 5, 8, 9, 10, 12, 15, 17, 19, 22, 24, 26, 29].indexOf(i) !== -1;
      var isComp = [15, 22].indexOf(i) !== -1;
      var cls = '';
      if (isToday) cls = ' s-cal__day--today';
      if (hasTraining) cls += ' s-cal__day--training';
      if (isComp) cls += ' s-cal__day--comp';
      monthDays.push('<div class="s-cal__day' + cls + '"><span>' + i + '</span></div>');
    }

    var now = new Date();
    var dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    return '' +

      /* ===== SECTION 1: Hero ===== */
      '<div class="sch-hero">' +
      '<div class="t-hero__bg"></div>' +
      '<div class="sch-hero__content">' +
      '<span class="sch-hero__label">' + dateStr + '</span>' +
      '<h1 class="sch-hero__title">Training Schedule</h1>' +
      '<div class="sch-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.name) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-target"/></svg> ' + Utils.escapeHtml(s.primarySport) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-book"/></svg> ' + Utils.escapeHtml(s.currentBatch) + '</span>' +
      '</div>' +
      '<div class="sch-hero__actions"><button class="d-btn d-btn--primary">Join Today\'s Session</button><button class="d-btn d-btn--ghost sch-hero__btn--light">View Calendar</button></div>' +
      '</div>' +
      '<div class="sch-hero__stat">' +
      '<span class="sch-hero__stat-label">Next Training</span>' +
      '<strong class="sch-hero__stat-time">' + Utils.escapeHtml(today.time) + '</strong>' +
      '<span class="sch-hero__stat-sport">' + Utils.escapeHtml(today.sport) + '</span>' +
      '</div></div>' +

      /* ===== SECTION 2: KPI Cards ===== */
      '<div class="t-kpi-grid">' +
      kpi('dash-play', '3', 'Today\'s Sessions', 'red') +
      kpi('dash-check', '142', 'Completed', 'green') +
      kpi('dash-chart', perf.attendance + '%', 'Attendance', 'gold') +
      kpi('dash-calendar', upcoming.length, 'Upcoming', 'cyan') +
      '</div>' +

      /* ===== SECTION 3: Weekly Calendar + Today's Sessions ===== */
      '<div class="t-grid t-grid--2col">' +
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Weekly Calendar</h2></div><div class="s-week">' +
      weekDays.map(function (w) { return schedDay(w.day, w.data); }).join('') +
      '</div></div>' +
      UI.section('Today\'s Sessions',
        '<div class="s-today">' +
        '<div class="s-today__card"><div class="s-today__icon"><svg aria-hidden="true"><use href="#dash-zap"/></svg></div><div class="s-today__body"><strong>' + Utils.escapeHtml(today.sport) + '</strong><span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(today.coach) + '</span><span><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(today.time) + ' · ' + Utils.escapeHtml(today.duration) + '</span><span><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + Utils.escapeHtml(today.venue) + '</span></div><div class="s-today__status s-today__status--live">Live</div><button class="d-btn d-btn--primary d-btn--sm">Start</button></div>' +
        '</div>') +
      '</div>' +

      /* ===== SECTION 4: Monthly Calendar + Upcoming Sessions Table ===== */
      '<div class="t-grid t-grid--2col">' +
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Monthly Calendar</h2><span style="font-size:0.82rem;color:var(--text-light)">July 2026</span></div><div class="s-cal">' +
      '<div class="s-cal__header"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>' +
      '<div class="s-cal__grid">' + monthDays.join('') + '</div>' +
      '<div class="s-cal__legend"><span><span class="s-cal__dot s-cal__dot--today"></span> Today</span><span><span class="s-cal__dot s-cal__dot--training"></span> Training</span><span><span class="s-cal__dot s-cal__dot--comp"></span> Competition</span></div>' +
      '</div></div>' +
      UI.section('Upcoming Sessions',
        '<div class="d-toolbar"><input type="search" class="d-search-input" placeholder="Search..." style="max-width:220px"><button class="d-btn d-btn--ghost d-btn--sm">Filter</button></div>' +
        UI.table(['Sport', 'Coach', 'Date', 'Time', 'Venue', 'Status', 'Action'], tableRows) +
        '<div class="d-empty-note" style="display:flex;justify-content:space-between"><span>Showing ' + upcoming.length + ' sessions</span><span style="display:flex;gap:8px"><a href="#" style="color:var(--secondary);font-size:0.82rem">1</a><a href="#" style="color:var(--text-light);font-size:0.82rem">2</a><a href="#" style="color:var(--text-light);font-size:0.82rem">3</a></span></div>') +
      '</div>' +

      /* ===== SECTION 5: Attendance Heatmap + Training Timeline ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Attendance Heatmap',
        '<div class="s-heatmap">' +
        '<div class="s-heatmap__months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>' +
        '<div class="s-heatmap__grid">' + (function () {
          var cells = '';
          var levels = [0, 1, 2, 3, 0, 1, 2, 0, 3, 2, 1, 0, 2, 3, 1, 0, 2, 1, 3, 0, 1, 2, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 1, 3, 2, 1, 0, 2, 3, 0, 1, 2, 0, 3, 1, 2, 0, 1, 3, 2];
          for (var i = 0; i < 90; i++) {
            cells += '<div class="s-heatmap__cell s-heatmap__cell--l' + levels[i % levels.length] + '"></div>';
          }
          return cells;
        })() + '</div>' +
        '<div class="s-heatmap__legend"><span>Less</span><div class="s-heatmap__cell s-heatmap__cell--l0"></div><div class="s-heatmap__cell s-heatmap__cell--l1"></div><div class="s-heatmap__cell s-heatmap__cell--l2"></div><div class="s-heatmap__cell s-heatmap__cell--l3"></div><span>More</span></div>' +
        '</div>') +
      UI.section('Training Timeline',
        '<div class="s-tl">' +
        timelineItem('dash-check', 'Morning Football Drill', 'Completed · Today 06:00', 'green') +
        timelineItem('dash-play', 'Basketball Practice', 'Upcoming · 08:00', 'cyan') +
        timelineItem('dash-play', 'Swimming Session', 'Upcoming · 10:00', 'cyan') +
        timelineItem('dash-close', 'Cricket Match', 'Cancelled', 'red') +
        '</div>') +
      '</div>' +

      /* ===== SECTION 6: Quick Actions ===== */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">Attendance</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Coach Chat</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Training Materials</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-calendar"/></svg></span><span class="p-action__label">Download Schedule</span></button>' +
      '</div></div>';
  };

  pageRenderers.goals = function () {
    var s = StudentData.get();
    var goals = AchievementsData.getGoals();
    var perf = AttendanceData.getOverall();
    var skills = AttendanceData.getSkills();
    var mon = AttendanceData.getMonthly();
    var activities = AchievementsData.getActivities();

    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    function healthCard(icon, value, label, color) {
      return '<div class="g-health"><div class="g-health__icon g-health__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><strong class="g-health__num">' + Utils.escapeHtml(value) + '</strong><span class="g-health__label">' + Utils.escapeHtml(label) + '</span></div>';
    }

    function feedbackCard(icon, text, color) {
      return '<div class="g-feedback"><div class="g-feedback__icon g-feedback__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><p>' + Utils.escapeHtml(text) + '</p></div>';
    }

    function bestCard(value, label, unit) {
      return '<div class="g-best"><strong class="g-best__num">' + Utils.escapeHtml(value) + '</strong><span class="g-best__unit">' + Utils.escapeHtml(unit) + '</span><span class="g-best__label">' + Utils.escapeHtml(label) + '</span></div>';
    }

    var quotes = [
      '"The only limit is the one you set yourself."',
      '"Champions keep playing until they get it right."',
      '"Push harder than yesterday if you want a different tomorrow."'
    ];
    var quote = quotes[new Date().getDate() % quotes.length];

    return '' +

      /* ===== SECTION 1: Hero ===== */
      '<div class="g-hero">' +
      '<div class="t-hero__bg"></div>' +
      '<div class="g-hero__content">' +
      '<span class="g-hero__label">Current Goal</span>' +
      '<h1 class="g-hero__title">' + Utils.escapeHtml(goals[0].title) + '</h1>' +
      '<p class="g-hero__quote">' + quote + '</p>' +
      '<div class="g-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.coach) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-trending"/></svg> ' + s.trainingStreak + ' Day Streak</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-target"/></svg> Target: ' + Utils.escapeHtml(goals[0].target) + '</span>' +
      '</div>' +
      '<div class="g-hero__bar"><div class="perf-bar"><div class="perf-bar__fill perf-bar__fill--red" style="width:' + goals[0].progress + '%"></div></div><span class="g-hero__pct">' + goals[0].progress + '%</span></div>' +
      '</div>' +
      '<div class="g-hero__side"><div class="g-hero__stat"><strong>' + s.trainingStreak + '</strong><span>Day Streak</span></div><div class="g-hero__stat"><strong>' + perf.fitnessLevel + '%</strong><span>Fitness</span></div><div class="g-hero__stat"><strong>' + s.completedSessions + '</strong><span>Sessions</span></div></div>' +
      '</div>' +

      /* ===== SECTION 2: KPI Cards ===== */
      '<div class="t-kpi-grid">' +
      kpi('dash-trending', perf.fitnessLevel + '%', 'Fitness Score', 'red') +
      kpi('dash-zap', '85%', 'Speed', 'gold') +
      kpi('dash-target', '72%', 'Strength', 'cyan') +
      kpi('dash-activity', '78%', 'Stamina', 'green') +
      '</div>' +

      /* ===== SECTION 3: Fitness Progress + Goal Completion ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Fitness Progress',
        '<div class="g-chart"><canvas id="goalsFitnessChart"></canvas></div>') +
      UI.section('Goal Completion',
        '<div class="g-chart"><canvas id="goalsCompletionChart"></canvas></div>') +
      '</div>' +

      /* ===== SECTION 4: Radar Chart + Weekly Performance ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Skill Analysis',
        '<div class="g-chart"><canvas id="goalsRadarChart"></canvas></div>') +
      UI.section('Weekly Performance',
        '<div class="g-chart"><canvas id="goalsWeeklyChart"></canvas></div>') +
      '</div>' +

      /* ===== SECTION 5: Health Cards (4) ===== */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Health &amp; Wellness</h2></div>' +
      '<div class="g-health-grid">' +
      healthCard('dash-user', s.bmi, 'BMI', 'red') +
      healthCard('dash-user', s.weight, 'Weight', 'gold') +
      healthCard('dash-target', '12%', 'Body Fat', 'cyan') +
      healthCard('dash-trending', '2,450', 'Calories', 'green') +
      '</div></div>' +

      /* ===== SECTION 6: Goal Timeline + Coach Feedback ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Goal Timeline',
        '<div class="s-tl">' +
        (function () {
          var items = '';
          var tlData = [
            { i: 'dash-check', l: 'Weekly Goal: ' + goals[0].title, t: 'Due ' + goals[0].deadline, c: 'red' },
            { i: 'dash-target', l: 'Monthly Goal: ' + goals[1].title, t: 'Due ' + goals[1].deadline, c: 'gold' },
            { i: 'dash-trending', l: 'Yearly Goal: Strength Mastery', t: 'Due Dec 2026', c: 'cyan' },
            { i: 'dash-award', l: 'Complete All Levels', t: 'Due Jun 2027', c: 'green' }
          ];
          tlData.forEach(function (t) {
            items += '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--' + t.c + '"><svg aria-hidden="true"><use href="#' + t.i + '"/></svg></div><div class="s-tl__body"><strong>' + Utils.escapeHtml(t.l) + '</strong><span>' + Utils.escapeHtml(t.t) + '</span></div></div>';
          });
          return items;
        })() +
        '</div>') +
      UI.section('Coach Feedback',
        '<div class="g-feedback-grid">' +
        feedbackCard('dash-star', 'Excellent speed improvement this month. Keep pushing the sprint drills.', 'gold') +
        feedbackCard('dash-trending', 'Strength training needs focus. Add 2 extra sessions per week.', 'cyan') +
        feedbackCard('dash-target', 'Technique is solid. Work on agility to round out your game.', 'red') +
        '</div>') +
      '</div>' +

      /* ===== SECTION 7: Personal Best Records + Quick Actions ===== */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Personal Best Records',
        '<div class="g-best-grid">' +
        bestCard('11.2', 'Sprint', '100m') +
        bestCard('2.4m', 'Vertical Jump', 'height') +
        bestCard('32.5', 'Top Speed', 'km/h') +
        bestCard('5.2', 'Longest Distance', 'km') +
        '</div>') +
      UI.section('Quick Actions',
        '<div class="t-actions">' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-target"/></svg></span><span class="p-action__label">Update Goal</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-chart"/></svg></span><span class="p-action__label">View Reports</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-bolt"/></svg></span><span class="p-action__label">Training Tips</span></button>' +
        '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-droplet"/></svg></span><span class="p-action__label">Nutrition Plan</span></button>' +
        '</div>') +
      '</div>';
  };

  pageRenderers.achievements = function () {
    var s = StudentData.get();
    var unlocked = AchievementsData.getUnlocked();
    var activities = AchievementsData.getActivities();

    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    var goldCount = unlocked.filter(function (a) { return a.color === 'gold'; }).length;
    var silverCount = unlocked.filter(function (a) { return a.color === 'silver'; }).length;
    var bronzeCount = unlocked.filter(function (a) { return a.color === 'bronze'; }).length;

    var leaderboard = [
      { rank: 1, name: 'Alex Johnson', points: 2840, badges: 15 },
      { rank: 2, name: s.name, points: 2450, badges: unlocked.length },
      { rank: 3, name: 'Sarah Williams', points: 2210, badges: 11 },
      { rank: 4, name: 'Mike Chen', points: 1980, badges: 9 },
      { rank: 5, name: 'Emily Davis', points: 1750, badges: 8 }
    ];

    var lbRows = leaderboard.map(function (p) {
      var isMe = p.name === s.name;
      var nameHtml = isMe ? '<strong style="color:var(--secondary)">' + Utils.escapeHtml(p.name) + ' <span style="font-size:0.65rem;font-weight:600;color:var(--text-light)">(You)</span></strong>' : '<strong>' + Utils.escapeHtml(p.name) + '</strong>';
      return ['<span style="font-weight:800;color:' + (isMe ? 'var(--secondary)' : 'var(--text)') + '">#' + p.rank + '</span>', nameHtml, '<strong>' + p.points + '</strong>', p.badges + ' badges'];
    });

    var certs = [
      { title: 'Football Advanced', issuer: 'Stackly Academy', date: 'Jun 2026', color: 'gold' },
      { title: 'Swimming Level 5', issuer: 'Stackly Academy', date: 'Feb 2026', color: 'cyan' },
      { title: 'Sprint Excellence', issuer: 'Regional Sports', date: 'Mar 2026', color: 'red' }
    ];

    return '' +

      /* Hero */
      '<div class="a-hero">' +
      '<div class="t-hero__bg"></div>' +
      '<div class="a-hero__content">' +
      '<span class="a-hero__label">Achievements Arena</span>' +
      '<h1 class="a-hero__title">' + Utils.escapeHtml(s.name) + '</h1>' +
      '<div class="a-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-trophy"/></svg> ' + unlocked.length + ' Total Achievements</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-trending"/></svg> Rank #2</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-star"/></svg> ' + Utils.escapeHtml(unlocked[0] ? unlocked[0].name : 'None') + '</span>' +
      '</div>' +
      '</div>' +
      '<div class="a-hero__stats">' +
      '<div class="a-hero__stat"><strong>' + unlocked.length + '</strong><span>Achievements</span></div>' +
      '<div class="a-hero__stat"><strong>#2</strong><span>Rank</span></div>' +
      '<div class="a-hero__stat"><strong>' + s.trainingStreak + '</strong><span>Day Streak</span></div>' +
      '</div></div>' +

      /* KPI Grid */
      '<div class="t-kpi-grid">' +
      kpi('dash-trophy', goldCount, 'Gold Medals', 'gold') +
      kpi('dash-award', silverCount, 'Silver Medals', 'cyan') +
      kpi('dash-star', bronzeCount, 'Bronze Medals', 'green') +
      kpi('dash-check', certs.length, 'Certificates', 'red') +
      '</div>' +

      /* Analytics Row */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Achievement Growth', '<div class="a-chart"><canvas id="achievGrowthChart"></canvas></div>') +
      UI.section('Medal Distribution', '<div class="a-chart"><canvas id="achievMedalChart"></canvas></div>') +
      '</div>' +

      /* Certificates + Leaderboard */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Certificates',
        '<div class="a-cert-grid">' +
        certs.map(function (c) {
          return '<div class="a-cert"><div class="a-cert__ribbon a-cert__ribbon--' + c.color + '"></div><div class="a-cert__body"><strong>' + Utils.escapeHtml(c.title) + '</strong><span>' + Utils.escapeHtml(c.issuer) + '</span><span>' + Utils.escapeHtml(c.date) + '</span><div class="a-cert__actions"><button class="d-btn d-btn--sm d-btn--ghost">Preview</button><button class="d-btn d-btn--sm d-btn--ghost">Download</button><button class="d-btn d-btn--sm d-btn--ghost">Share</button></div></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Leaderboard',
        UI.table(['Rank', 'Student', 'Points', 'Achievements'], lbRows) +
        '<div class="d-empty-note" style="text-align:center;padding-top:8px">Showing top 5 of 24 students</div>') +
      '</div>' +

      /* Timeline + Competition Performance */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Achievement Timeline',
        '<div class="s-tl">' +
        unlocked.slice(0, 5).map(function (a) {
          var dotColor = a.color === 'gold' ? 'gold' : a.color === 'silver' ? 'cyan' : a.color === 'bronze' ? 'green' : a.color === 'red' ? 'red' : 'cyan';
          return '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--' + dotColor + '"><svg aria-hidden="true"><use href="#' + a.icon + '"/></svg></div><div class="s-tl__body"><strong>' + Utils.escapeHtml(a.name) + '</strong><span>' + Utils.escapeHtml(a.desc) + ' · ' + (a.unlockedDate || '') + '</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Competition Performance', '<div class="a-chart"><canvas id="achievCompChart"></canvas></div>') +
      '</div>' +

      /* Quick Actions */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-trophy"/></svg></span><span class="p-action__label">View All Badges</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Download Certificates</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-users"/></svg></span><span class="p-action__label">View Leaderboard</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-target"/></svg></span><span class="p-action__label">Next Competition</span></button>' +
      '</div></div>';
  };

  pageRenderers.membership = function () {
    var s = StudentData.get();
    var m = MembershipData.get();

    var featuresHtml = m.features.map(function (f) {
      return '<div class="m-feature' + (f.included ? '' : ' m-feature--off') + '"><svg aria-hidden="true"><use href="#' + (f.included ? 'dash-check' : 'dash-close') + '"/></svg><span>' + Utils.escapeHtml(f.name) + '</span></div>';
    }).join('');

    var billingRows = m.billingHistory.map(function (b) {
      var statusBadge = b.status === 'paid' ? '<span class="d-badge d-badge--green">Paid</span>' : '<span class="d-badge d-badge--red">Pending</span>';
      return [b.date, '$' + b.amount.toFixed(2), statusBadge, '<button class="d-btn d-btn--sm d-btn--ghost">PDF</button>'];
    });

    var renewalTimeline = [
      { label: 'Current Plan Active', date: m.memberSince, icon: 'dash-check', color: 'green' },
      { label: 'Next Renewal Date', date: m.expiryDate, icon: 'dash-calendar', color: 'gold' },
      { label: 'Auto-Renewal ' + (m.autoRenew ? 'Enabled' : 'Disabled'), date: m.autoRenew ? 'Automatic' : 'Manual', icon: 'dash-activity', color: 'cyan' }
    ];

    return '' +

      /* Hero */
      '<div class="a-hero">' +
      '<div class="t-hero__bg"></div>' +
      '<div class="a-hero__content">' +
      '<span class="a-hero__label">Membership Dashboard</span>' +
      '<h1 class="a-hero__title">' + Utils.escapeHtml(m.plan) + '</h1>' +
      '<div class="a-hero__meta">' +
      '<span><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(s.name) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-card"/></svg> ' + Utils.escapeHtml(s.studentId) + '</span>' +
      '<span><svg aria-hidden="true"><use href="#dash-calendar"/></svg> Since ' + Utils.escapeHtml(m.memberSince) + '</span>' +
      '</div></div>' +
      '<div class="a-hero__stats">' +
      '<div class="a-hero__stat"><strong>' + Utils.escapeHtml(m.plan) + '</strong><span>Plan</span></div>' +
      '<div class="a-hero__stat"><strong style="color:#22c55e">Active</strong><span>Status</span></div>' +
      '<div class="a-hero__stat"><strong>' + Utils.escapeHtml(m.expiryDate) + '</strong><span>Renewal</span></div>' +
      '</div></div>' +

      /* Membership Card */
      '<div class="m-card">' +
      '<div class="m-card__bg"></div>' +
      '<div class="m-card__content">' +
      '<div class="m-card__top"><span class="m-card__plan">' + Utils.escapeHtml(m.plan) + '</span><span class="m-card__status">Active</span></div>' +
      '<div class="m-card__name">' + Utils.escapeHtml(s.name) + '</div>' +
      '<div class="m-card__number">•••• •••• •••• 4242</div>' +
      '<div class="m-card__bottom"><span>Member since ' + Utils.escapeHtml(m.memberSince) + '</span><span>Renews ' + Utils.escapeHtml(m.expiryDate) + '</span></div>' +
      '</div></div>' +

      /* Benefits + Payment History */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Plan Benefits', '<div class="m-benefits">' + featuresHtml + '</div>') +
      UI.section('Payment History', UI.table(['Date', 'Amount', 'Status', 'Invoice'], billingRows)) +
      '</div>' +

      /* Usage Analytics */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Membership Usage', '<div class="a-chart"><canvas id="memberUsageChart"></canvas></div>') +
      UI.section('Academy Visits', '<div class="a-chart"><canvas id="memberVisitsChart"></canvas></div>') +
      '</div>' +

      /* Renewal Timeline + Support */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Renewal Timeline',
        '<div class="s-tl">' +
        renewalTimeline.map(function (t) {
          return '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--' + t.color + '"><svg aria-hidden="true"><use href="#' + t.icon + '"/></svg></div><div class="s-tl__body"><strong>' + Utils.escapeHtml(t.label) + '</strong><span>' + Utils.escapeHtml(t.date) + '</span></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Support',
        '<div class="m-support">' +
        '<div class="m-support__card"><div class="m-support__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></div><strong>Coach Contact</strong><span>Message your coach directly</span><button class="d-btn d-btn--sm d-btn--ghost">Chat</button></div>' +
        '<div class="m-support__card"><div class="m-support__icon m-support__icon--gold"><svg aria-hidden="true"><use href="#dash-card"/></svg></div><strong>Membership Help</strong><span>Billing & plan support</span><button class="d-btn d-btn--sm d-btn--ghost">Contact</button></div>' +
        '<div class="m-support__card"><div class="m-support__icon m-support__icon--cyan"><svg aria-hidden="true"><use href="#dash-search"/></svg></div><strong>FAQ</strong><span>Frequently asked questions</span><button class="d-btn d-btn--sm d-btn--ghost">Browse</button></div>' +
        '</div>') +
      '</div>' +

      /* Quick Actions */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-card"/></svg></span><span class="p-action__label">Renew Membership</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Download Invoice</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-trending"/></svg></span><span class="p-action__label">Upgrade Plan</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Contact Support</span></button>' +
      '</div></div>';
  };

  pageRenderers.resources = function () {
    var s = StudentData.get();

    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    var docs = [
      { name: 'Training Manual 2026', cat: 'Training', coach: 'Coach David', date: '15 Jun 2026', size: '2.4 MB', icon: 'dash-download' },
      { name: 'Nutrition Guide', cat: 'Health', coach: 'Nutritionist', date: '01 May 2026', size: '1.8 MB', icon: 'dash-download' },
      { name: 'Workout Planner', cat: 'Fitness', coach: 'Coach Emma', date: '20 Apr 2026', size: '0.6 MB', icon: 'dash-download' },
      { name: 'Injury Prevention Guide', cat: 'Medical', coach: 'Physio Team', date: '10 Mar 2026', size: '3.1 MB', icon: 'dash-download' },
      { name: 'Competition Calendar', cat: 'Events', coach: 'Admin', date: '05 Jan 2026', size: '1.2 MB', icon: 'dash-download' },
      { name: 'Equipment Checklist', cat: 'Gear', coach: 'Coach David', date: '12 Feb 2026', size: '0.4 MB', icon: 'dash-download' },
      { name: 'Team Directory', cat: 'Contact', coach: 'Admin', date: '01 Jan 2026', size: '0.8 MB', icon: 'dash-download' }
    ];

    var videos = [
      { title: 'Football Dribbling Drills', coach: 'Coach David', duration: '12:30', thumb: 'program-football.webp' },
      { title: 'Swimming Technique Basics', coach: 'Coach Priya', duration: '15:00', thumb: 'program-swimming.webp' },
      { title: 'Basketball Shooting Guide', coach: 'Coach Emma', duration: '10:45', thumb: 'program-basketball.webp' }
    ];

    var featured = [
      { title: 'Training Guide 2026', desc: 'Complete training methodology and program guide for all sports.', icon: 'dash-book', color: 'red' },
      { title: 'Nutrition Guide', desc: 'Meal plans, supplements, and dietary recommendations for athletes.', icon: 'dash-droplet', color: 'gold' },
      { title: 'Fitness Assessment', desc: 'Track your fitness metrics and benchmark against standards.', icon: 'dash-trending', color: 'cyan' },
      { title: 'Rules & Regulations', desc: 'Official rulebook for all academy sports and competitions.', icon: 'dash-check', color: 'green' }
    ];

    var tableRows = docs.map(function (d) {
      return ['<div class="rc-name"><svg aria-hidden="true"><use href="#' + d.icon + '"/></svg> ' + Utils.escapeHtml(d.name) + '</div>', '<span class="rc-cat">' + Utils.escapeHtml(d.cat) + '</span>', Utils.escapeHtml(d.coach), Utils.escapeHtml(d.date), Utils.escapeHtml(d.size), '<div style="display:flex;gap:4px"><button class="d-btn d-btn--sm d-btn--ghost">DL</button><button class="d-btn d-btn--sm d-btn--ghost">View</button></div>'];
    });

    return '' +

      /* Hero */
      '<div class="rc-hero"><div class="rc-hero__bg"></div><div class="rc-hero__content">' +
      '<span class="rc-hero__label">Resources</span>' +
      '<h1 class="rc-hero__title">Resource Center</h1>' +
      '<p class="rc-hero__sub">Access all learning materials, guides, and training resources in one place.</p>' +
      '</div></div>' +

      /* KPI */
      '<div class="t-kpi-grid">' +
      kpi('dash-download', docs.length + videos.length, 'Total Resources', 'red') +
      kpi('dash-download', docs.length, 'Downloads', 'gold') +
      kpi('dash-play', videos.length, 'Videos', 'cyan') +
      kpi('dash-book', docs.length, 'Documents', 'green') +
      '</div>' +

      /* Search + Featured */
      '<div class="d-toolbar" style="margin-bottom:20px"><input type="search" class="d-search-input" placeholder="Search resources..." style="max-width:320px"><button class="d-btn d-btn--ghost d-btn--sm">Category</button><button class="d-btn d-btn--ghost d-btn--sm">Sort</button></div>' +

      /* Featured */
      UI.section('Featured Resources',
        '<div class="rc-feat-grid">' +
        featured.map(function (f) {
          return '<div class="rc-feat"><div class="rc-feat__icon rc-feat__icon--' + f.color + '"><svg aria-hidden="true"><use href="#' + f.icon + '"/></svg></div><strong>' + Utils.escapeHtml(f.title) + '</strong><span>' + Utils.escapeHtml(f.desc) + '</span><button class="d-btn d-btn--sm d-btn--ghost">Open</button></div>';
        }).join('') +
        '</div>') +

      /* Downloads Table */
      UI.section('All Resources',
        UI.table(['Document', 'Category', 'Coach', 'Date', 'Size', 'Action'], tableRows)) +

      /* Videos + Recent Downloads */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Video Tutorials',
        '<div class="rc-vid-grid">' +
        videos.map(function (v) {
          return '<div class="rc-vid"><div class="rc-vid__thumb"><img src="assets/' + v.thumb + '" alt="' + Utils.escapeHtml(v.title) + '"><span class="rc-vid__dur">' + v.duration + '</span></div><div class="rc-vid__body"><strong>' + Utils.escapeHtml(v.title) + '</strong><span>' + Utils.escapeHtml(v.coach) + '</span><button class="d-btn d-btn--sm d-btn--primary">Watch</button></div></div>';
        }).join('') +
        '</div>') +
      UI.section('Recent Downloads',
        '<div class="s-tl">' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--green"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><div class="s-tl__body"><strong>Training Manual 2026</strong><span>Downloaded 2 hours ago</span></div></div>' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--gold"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><div class="s-tl__body"><strong>Nutrition Guide</strong><span>Downloaded yesterday</span></div></div>' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--cyan"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><div class="s-tl__body"><strong>Workout Planner</strong><span>Downloaded 3 days ago</span></div></div>' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--red"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><div class="s-tl__body"><strong>Injury Prevention Guide</strong><span>Downloaded 5 days ago</span></div></div>' +
        '</div>') +
      '</div>' +

      /* Coach Recommended */
      UI.section('Coach Recommended',
        '<div class="rc-rec-grid">' +
        '<div class="rc-rec"><div class="rc-rec__icon"><img src="assets/coach-david.webp" alt="Coach David"></div><div><strong>Football Drills Compilation</strong><span>Recommended by Coach David</span></div><button class="d-btn d-btn--sm d-btn--ghost">Open</button></div>' +
        '<div class="rc-rec"><div class="rc-rec__icon"><img src="assets/coach-emma.webp" alt="Coach Emma"></div><div><strong>Basketball Fundamentals</strong><span>Recommended by Coach Emma</span></div><button class="d-btn d-btn--sm d-btn--ghost">Open</button></div>' +
        '<div class="rc-rec"><div class="rc-rec__icon"><img src="assets/coach-priya.webp" alt="Coach Priya"></div><div><strong>Swimming Technique Video</strong><span>Recommended by Coach Priya</span></div><button class="d-btn d-btn--sm d-btn--ghost">Open</button></div>' +
        '</div>') +

      /* Quick Actions */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></span><span class="p-action__label">Download All</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Contact Coach</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-star"/></svg></span><span class="p-action__label">Bookmark</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-search"/></svg></span><span class="p-action__label">Browse All</span></button>' +
      '</div></div>';
  };

  pageRenderers.messages = function () {
    var s = StudentData.get();
    var conversations = MessagesData.getAll();
    var unreadCount = MessagesData.getUnread().length;
    var first = conversations[0];
    var initials = StudentData.getInitials(first.sender);
    var avatarHtml = first.avatar ? '<img src="assets/' + first.avatar + '" alt="' + Utils.escapeHtml(first.sender) + '">' : '<span class="ms-chat__initials">' + initials + '</span>';

    function kpi(icon, value, label, color) {
      return '<div class="t-kpi"><div class="t-kpi__icon t-kpi__icon--' + color + '"><svg aria-hidden="true"><use href="#' + icon + '"/></svg></div><div class="t-kpi__info"><span class="t-kpi__num">' + value + '</span><span class="t-kpi__label">' + Utils.escapeHtml(label) + '</span></div></div>';
    }

    return '' +

      /* Hero */
      '<div class="rc-hero"><div class="rc-hero__bg"></div><div class="rc-hero__content">' +
      '<span class="rc-hero__label">Messages</span>' +
      '<h1 class="rc-hero__title">Inbox</h1>' +
      '<p class="rc-hero__sub">' + unreadCount + ' unread · ' + conversations.length + ' total conversations</p>' +
      '</div></div>' +

      /* KPI */
      '<div class="t-kpi-grid">' +
      kpi('dash-mail', unreadCount, 'Unread', 'red') +
      kpi('dash-users', '4', 'Coaches', 'gold') +
      kpi('dash-user', '1', 'Admin', 'cyan') +
      kpi('dash-download', '12', 'Shared Files', 'green') +
      '</div>' +

      /* Contacts + Chat Window */
      '<div class="t-grid t-grid--2col" style="align-items:stretch">' +

      /* Contacts List */
      UI.section('Contacts',
        '<div class="d-toolbar" style="margin-bottom:10px"><input type="search" class="d-search-input" placeholder="Search messages..." style="max-width:100%"></div>' +
        '<div class="ms-contact-list">' +
        conversations.map(function (c, i) {
          var cInitials = c.sender.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
          var cAvatar = c.avatar ? '<img src="assets/' + c.avatar + '" alt="' + Utils.escapeHtml(c.sender) + '">' : '<span class="ms-contact__initials">' + cInitials + '</span>';
          return '<div class="ms-contact' + (i === 0 ? ' ms-contact--active' : '') + (c.unread ? ' ms-contact--unread' : '') + '"><div class="ms-contact__avatar">' + cAvatar + '</div><div class="ms-contact__body"><strong>' + Utils.escapeHtml(c.sender) + '</strong><span>' + Utils.escapeHtml(c.lastMessage.substring(0, 40)) + '…</span></div><div class="ms-contact__meta"><span class="ms-contact__time">' + Utils.escapeHtml(c.timestamp) + '</span>' + (c.unread ? '<span class="ms-contact__badge">' + (c.unread === true ? '1' : c.unread) + '</span>' : '') + '</div></div>';
        }).join('') +
        '</div>') +

      /* Conversation */
      UI.section('Conversation',
        '<div class="ms-chat">' +
        '<div class="ms-chat__header"><div class="ms-chat__avatar">' + avatarHtml + '</div><div class="ms-chat__meta"><strong>' + Utils.escapeHtml(first.sender) + '</strong><span class="ms-chat__status">Online</span></div></div>' +
        '<div class="ms-chat__messages">' +
        first.messages.map(function (msg) {
          var isMe = msg.from === 'Me';
          return '<div class="ms-chat__msg' + (isMe ? ' ms-chat__msg--me' : '') + '"><div class="ms-chat__bubble">' + Utils.escapeHtml(msg.text) + '</div><span class="ms-chat__time">' + Utils.escapeHtml(msg.time) + '</span></div>';
        }).join('') +
        '<div class="ms-chat__typing"><span class="ms-chat__dot"></span><span class="ms-chat__dot"></span><span class="ms-chat__dot"></span> ' + Utils.escapeHtml(first.sender) + ' is typing</div>' +
        '</div>' +
        '<div class="ms-chat__input"><input type="text" placeholder="Type a message..." class="d-input" style="flex:1;margin-bottom:0"><button class="d-btn d-btn--primary d-btn--sm" style="flex-shrink:0">Send</button></div>' +
        '</div>') +
      '</div>' +

      /* Shared Files + Notifications */
      '<div class="t-grid t-grid--2col">' +
      UI.section('Shared Files',
        '<div class="ms-files">' +
        '<div class="ms-file"><div class="ms-file__icon"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><strong>Training Plan Q3.pdf</strong><span>2.4 MB · Shared 2h ago</span></div>' +
        '<div class="ms-file"><div class="ms-file__icon ms-file__icon--gold"><svg aria-hidden="true"><use href="#dash-play"/></svg></div><strong>Sprint Analysis.mp4</strong><span>45 MB · Shared yesterday</span></div>' +
        '<div class="ms-file"><div class="ms-file__icon ms-file__icon--cyan"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><strong>Nutrition Plan.docx</strong><span>0.8 MB · Shared 3d ago</span></div>' +
        '</div>') +
      UI.section('Notifications',
        '<div class="s-tl">' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--green"><svg aria-hidden="true"><use href="#dash-message"/></svg></div><div class="s-tl__body"><strong>New message from Coach David</strong><span>2 hours ago</span></div></div>' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--gold"><svg aria-hidden="true"><use href="#dash-check"/></svg></div><div class="s-tl__body"><strong>Feedback received on your performance</strong><span>Yesterday</span></div></div>' +
        '<div class="s-tl__item"><div class="s-tl__dot s-tl__dot--cyan"><svg aria-hidden="true"><use href="#dash-download"/></svg></div><div class="s-tl__body"><strong>New file shared in Basketball chat</strong><span>3 days ago</span></div></div>' +
        '</div>') +
      '</div>' +

      /* Quick Actions */
      '<div class="d-section"><div class="d-section__head"><h2 class="d-section__title">Quick Actions</h2></div><div class="t-actions">' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-mail"/></svg></span><span class="p-action__label">New Message</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-message"/></svg></span><span class="p-action__label">Coach Chat</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-users"/></svg></span><span class="p-action__label">Group Chat</span></button>' +
      '<button class="p-action"><span class="p-action__icon"><svg aria-hidden="true"><use href="#dash-card"/></svg></span><span class="p-action__label">Support</span></button>' +
      '</div></div>';
  };

  pageRenderers.settings = function () {
    var s = StudentData.get();
    var initials = StudentData.getInitials(s.name);
    var avatarHtml = s.profileImage
      ? '<img src="' + Utils.escapeHtml(s.profileImage) + '" alt="' + Utils.escapeHtml(s.name) + '">'
      : '<span class="st-avatar__initials">' + initials + '</span>';

    function toggleGroup(title, items) {
      return '<div class="st-group"><h3 class="st-group__title">' + Utils.escapeHtml(title) + '</h3>' + items + '</div>';
    }

    function field(label, value, type) {
      return '<div class="st-field"><label>' + Utils.escapeHtml(label) + '</label><input type="' + (type || 'text') + '" class="d-input" value="' + Utils.escapeHtml(value || '') + '"></div>';
    }

    function toggle(label, checked) {
      return '<div class="st-toggle"><span>' + Utils.escapeHtml(label) + '</span><label class="d-switch"><input type="checkbox"' + (checked ? ' checked' : '') + '><span class="d-switch__slider"></span></label></div>';
    }

    return '' +

      /* Hero */
      '<div class="rc-hero"><div class="rc-hero__bg"></div><div class="rc-hero__content">' +
      '<span class="rc-hero__label">Settings</span>' +
      '<h1 class="rc-hero__title">Account Settings</h1>' +
      '<p class="rc-hero__sub">Manage your profile, security, and preferences.</p>' +
      '</div></div>' +

      /* Settings Grid */
      '<div class="t-grid t-grid--2col">' +

      /* Left Column */
      '<div>' +

      /* Profile */
      toggleGroup('Profile Information',
        '<div class="st-avatar-section"><div class="st-avatar">' + avatarHtml + '</div><button class="d-btn d-btn--sm d-btn--ghost">Change Photo</button></div>' +
        field('Full Name', s.name) +
        field('Email', s.email, 'email') +
        field('Phone', s.phone, 'tel')) +

      /* Security */
      toggleGroup('Security',
        field('Current Password', '', 'password') +
        field('New Password', '', 'password') +
        field('Confirm Password', '', 'password') +
        toggle('Two-Factor Authentication', true) +
        '<button class="d-btn d-btn--sm d-btn--ghost" style="margin-top:8px">Manage Sessions</button>') +

      /* Notifications */
      toggleGroup('Notifications',
        toggle('Email Notifications', true) +
        toggle('Push Notifications', true) +
        toggle('SMS Alerts', false) +
        toggle('Marketing Emails', false)) +

      '</div>' +

      /* Right Column */
      '<div>' +

      /* Appearance */
      toggleGroup('Appearance',
        '<div class="st-theme">' +
        '<button class="st-theme__btn st-theme__btn--light">Light</button>' +
        '<button class="st-theme__btn st-theme__btn--dark">Dark</button>' +
        '<button class="st-theme__btn">System</button>' +
        '</div>' +
        '<div class="st-field"><label>Accent Color</label><div class="st-colors"><span class="st-color" style="background:#EF4444"></span><span class="st-color st-color--active" style="background:#F59E0B"></span><span class="st-color" style="background:#06B6D4"></span><span class="st-color" style="background:#8B5CF6"></span><span class="st-color" style="background:#10B981"></span></div></div>' +
        '<div class="st-field"><label>Font Size</label><select class="d-input" style="appearance:auto"><option>Small</option><option selected>Medium</option><option>Large</option></select></div>') +

      /* Privacy */
      toggleGroup('Privacy',
        toggle('Profile Visible to Coaches', true) +
        toggle('Show Activity Status', true) +
        toggle('Share Progress with Others', false)) +

      /* Connected Devices */
      toggleGroup('Connected Devices',
        '<div class="st-device"><div class="st-device__icon"><svg aria-hidden="true"><use href="#dash-dashboard"/></svg></div><div class="st-device__body"><strong>MacBook Pro</strong><span>Active now · Safari</span></div><span class="st-device__badge">Current</span></div>' +
        '<div class="st-device"><div class="st-device__icon"><svg aria-hidden="true"><use href="#dash-zap"/></svg></div><div class="st-device__body"><strong>iPhone 15</strong><span>Last active 2h ago</span></div><button class="d-btn d-btn--sm d-btn--ghost">Revoke</button></div>' +
        '<div class="st-device"><div class="st-device__icon"><svg aria-hidden="true"><use href="#dash-book"/></svg></div><div class="st-device__body"><strong>iPad Air</strong><span>Last active yesterday</span></div><button class="d-btn d-btn--sm d-btn--ghost">Revoke</button></div>') +

      /* Danger Zone */
      toggleGroup('Danger Zone',
        '<p style="font-size:0.82rem;color:var(--text-light);margin-bottom:14px;line-height:1.6">Permanent actions that cannot be undone. Proceed with caution.</p>' +
        '<div style="display:flex;gap:12px">' +
        '<button class="d-btn d-btn--ghost d-btn--sm" id="settingsLogoutBtn" style="color:var(--secondary);border-color:rgba(239,68,68,0.2)">Logout</button>' +
        '<button class="d-btn d-btn--ghost d-btn--sm" style="color:var(--secondary);border-color:rgba(239,68,68,0.2)">Delete Account</button>' +
        '</div>') +

      /* Save */
      '<div style="display:flex;justify-content:flex-end;gap:12px;margin-top:8px">' +
      '<button class="d-btn d-btn--ghost">Cancel</button>' +
      '<button class="d-btn d-btn--primary">Save Changes</button>' +
      '</div>' +

      '</div></div>';
  };

  /* ===== Router ===== */

  function getPageFromHash() {
    var hash = window.location.hash.replace(/^#\//, '') || 'overview';
    return hash || 'overview';
  }

  function renderPage(page) {
    if (!page) page = 'overview';
    page = page.toLowerCase();

    if (!pageRenderers[page]) {
      page = 'overview';
    }

    currentPage = page;
    var renderFn = pageRenderers[page];
    if (!renderFn) return;

    if (contentEl) {
      contentEl.innerHTML = UI.pageSkeleton();
      var renderStart = performance ? performance.now() : 0;
      requestAnimationFrame(function () {
        contentEl.innerHTML = renderFn();
        setupPage(page);
      });
    }

    updateActiveNav(page);
    updatePageTitle(page);
  }

  function setupPage(page) {
    if (page === 'overview') {
      setupOverviewPage();
    }
    if (page === 'profile') {
      setupProfilePage();
    }
    if (page === 'programs') {
      setupProgramsPage();
    }
    if (page === 'schedule') {
      setupSchedulePage();
    }
    if (page === 'goals') {
      setupGoalsPage();
    }
    if (page === 'achievements') {
      setupAchievementsPage();
    }
    if (page === 'membership') {
      setupMembershipPage();
    }
    if (page === 'resources' || page === 'messages' || page === 'settings') {
      animateCounters();
      animatePerfBars();
    }
    setupCharts(page);
  }

  function setupProfilePage() {
    animateCounters();
    animatePerfBars();
  }

  function setupProgramsPage() {
    animateCounters();
    animatePerfBars();
  }

  function setupSchedulePage() {
    animateCounters();
    animatePerfBars();
  }

  function setupGoalsPage() {
    animateCounters();
    animatePerfBars();
  }

  function setupAchievementsPage() {
    animateCounters();
    animatePerfBars();
  }

  function setupMembershipPage() {
    animateCounters();
    animatePerfBars();
  }

  function setupOverviewPage() {
    var now = new Date();
    var dateEl = document.getElementById('currentDate');
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    var quotes = [
      "Champions aren't made in the gyms. Champions are made from something deep inside them — a desire, a dream, a vision.",
      "The harder the battle, the sweeter the victory.",
      "Push yourself because no one else is going to do it for you.",
      "Believe you can and you're halfway there."
    ];
    var quoteEl = document.getElementById('motivationalQuote');
    if (quoteEl) quoteEl.textContent = '"' + quotes[now.getHours() % quotes.length] + '"';

    animateCounters();
    animatePerfBars();
  }

  function setupCharts(page) {
    if (typeof Chart === 'undefined') return;

    if (page === 'overview' || page === 'goals') {
      var perfGrid = document.querySelector('.perf-grid');
      if (perfGrid) {
        Utils.observeOnce(perfGrid, animatePerfBars, 0.3);
      }
    }

    if (page === 'profile') {
      var profileChartSection = document.querySelector('.chart-grid');
      if (profileChartSection) {
        Utils.observeOnce(profileChartSection, function () {
          var mon = AttendanceData.getMonthly();
          var hours = AttendanceData.getHours();
          Charts.createLine('profileChartMonthly', mon.map(function (d) { return d.month; }), mon.map(function (d) { return d.value; }), Charts.COLORS.secondary);
          Charts.createBar('profileChartHours', hours.map(function (d) { return d.week; }), hours.map(function (d) { return d.hours; }));
        }, 0.3);
      }
    }

    if (page === 'schedule') {
      var attData = AttendanceData.getWeekly();
      Charts.createLine('scheduleWeekly', attData.map(function (d) { return d.day; }), attData.map(function (d) { return d.value; }), Charts.COLORS.secondary);
    }

    if (page === 'goals') {
      var gMon = AttendanceData.getMonthly();
      var gSkills = AttendanceData.getSkills();
      Charts.createLine('goalsFitnessChart', gMon.map(function (d) { return d.month; }), gMon.map(function (d) { return d.value; }), Charts.COLORS.secondary);
      Charts.createBar('goalsCompletionChart', ['Goal 1', 'Goal 2', 'Goal 3', 'Goal 4'], [65, 72, 80, 45]);
      Charts.createRadar('goalsRadarChart', gSkills.map(function (d) { return d.label; }), [{ label: 'You', data: gSkills.map(function (d) { return d.value; }), color: Charts.COLORS.secondary }, { label: 'Target', data: [90, 85, 95, 88, 92], color: Charts.COLORS.highlight }]);
      Charts.createArea('goalsWeeklyChart', ['Week 1', 'Week 2', 'Week 3', 'Week 4'], [82, 78, 85, 80], Charts.COLORS.accent);
    }

    if (page === 'achievements') {
      Charts.createLine('achievGrowthChart', ['Jan','Feb','Mar','Apr','May','Jun'], [2, 4, 5, 7, 9, 12], Charts.COLORS.secondary);
      Charts.createDoughnut('achievMedalChart', ['Gold', 'Silver', 'Bronze'], [3, 2, 1]);
      Charts.createBar('achievCompChart', ['Q1','Q2','Q3','Q4'], [78, 85, 82, 90]);
    }

    if (page === 'membership') {
      Charts.createLine('memberUsageChart', ['Week 1','Week 2','Week 3','Week 4'], [5, 7, 4, 8], Charts.COLORS.highlight);
      Charts.createBar('memberVisitsChart', ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], [3, 5, 2, 6, 4, 1, 0]);
    }

    if (page === 'programs') {
      var programsChart = document.getElementById('programsChart');
      if (programsChart) {
        Utils.observeOnce(programsChart.parentElement, function () {
          var weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
          var completion = [65, 72, 80, 78];
          Charts.createBar('programsChart', weeks, completion);
        }, 0.3);
      }
    }

    if (page === 'overview') {
      var chartSection = document.querySelector('.chart-grid');
      if (chartSection) {
        Utils.observeOnce(chartSection, function () {
          var att = AttendanceData.getWeekly();
          var mon = AttendanceData.getMonthly();
          var skills = AttendanceData.getSkills();
          var hours = AttendanceData.getHours();

          Charts.createLine('chartWeekly', att.map(function (d) { return d.day; }), att.map(function (d) { return d.value; }), Charts.COLORS.secondary);
          Charts.createBar('chartMonthly', mon.map(function (d) { return d.month; }), mon.map(function (d) { return d.value; }));
          Charts.createDoughnut('chartSkills', skills.map(function (d) { return d.label; }), skills.map(function (d) { return d.value; }));
          Charts.createArea('chartHours', hours.map(function (d) { return d.week; }), hours.map(function (d) { return d.hours; }), Charts.COLORS.highlight);
        }, 0.3);
      }
    }
  }

  function animateCounters() {
    var counters = document.querySelectorAll('.stat-card__num');
    counters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      if (isNaN(target)) return;
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 40));
      var interval = 1200 / Math.ceil(target / step);
      var timer = setInterval(function () {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current + (target > 20 ? '%' : '');
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
      overview: 'Dashboard',
      profile: 'My Profile',
      programs: 'Training Programs',
      schedule: 'Training Schedule',
      goals: 'Performance Goals',
      achievements: 'Achievements',
      membership: 'Membership',
      resources: 'Resource Center',
      messages: 'Messages',
      settings: 'Settings'
    };
    if (pageTitleEl) pageTitleEl.textContent = titles[page] || 'Dashboard';
  }

  function handleHashChange() {
    var page = getPageFromHash();
    renderPage(page);
  }

  function init() {
    contentEl = document.getElementById('app-content');
    if (!contentEl) return;

    window.addEventListener('hashchange', handleHashChange);

    var initialPage = getPageFromHash();
    renderPage(initialPage);

    function performLogout(e) {
      if (e) e.preventDefault();
      var authKeys = ['sportAcademUser', 'userEmail', 'userName', 'userRole', 'userPhone', 'profileImage', 'loginTime', 'studentEmail', 'studentName', 'studentProfileImage', 'userToken', 'auth_token', 'sessionId'];
      authKeys.forEach(function (key) { Storage.remove(key); });
      window.location.href = 'login.html';
    }

    var logoutLink = document.querySelector('.dashboard__sidebar-footer a');
    if (logoutLink) {
      logoutLink.addEventListener('click', performLogout);
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('#settingsLogoutBtn');
      if (btn) performLogout(e);
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { renderPage: renderPage, currentPage: currentPage, pageRenderers: pageRenderers };
})();
