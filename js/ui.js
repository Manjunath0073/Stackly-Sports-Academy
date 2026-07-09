const UI = (function () {
  'use strict';

  /* ===== Section Wrappers ===== */
  function section(title, content, linkText, linkHref) {
    return '<section class="d-section">' +
      '<div class="d-section__head">' +
      '<h2 class="d-section__title">' + Utils.escapeHtml(title || '') + '</h2>' +
      (linkText && linkHref ? '<a href="' + Utils.escapeHtml(linkHref) + '" class="d-section__link">' + Utils.escapeHtml(linkText) + ' <svg aria-hidden="true"><use href="#dash-arrow-right"/></svg></a>' : '') +
      '</div>' +
      content +
      '</section>';
  }

  /* ===== Cards ===== */
  function statCard(icon, count, label, sub, suffix) {
    return '<article class="stat-card">' +
      '<div class="stat-card__inner">' +
      '<div class="stat-card__icon"><svg aria-hidden="true"><use href="#' + Utils.escapeHtml(icon) + '"/></svg></div>' +
      '<div class="stat-card__content">' +
      '<span class="stat-card__num" data-count="' + count + '">0</span>' +
      '<span class="stat-card__label">' + Utils.escapeHtml(label) + '</span>' +
      '<span class="stat-card__sub">' + Utils.escapeHtml(sub) + '</span>' +
      '</div></div></article>';
  }

  function glassCard(icon, label, value) {
    return '<div class="s-glass-card">' +
      '<div class="s-glass-card__icon"><svg aria-hidden="true"><use href="#' + Utils.escapeHtml(icon) + '"/></svg></div>' +
      '<div class="s-glass-card__text"><strong>' + Utils.escapeHtml(label) + '</strong><span>' + Utils.escapeHtml(value) + '</span></div>' +
      '</div>';
  }

  function trainingCard(data) {
    return '<div class="training-card">' +
      '<div class="training-card__header">' +
      '<div class="training-card__icon"><svg aria-hidden="true"><use href="#dash-zap"/></svg></div>' +
      '<div class="training-card__meta">' +
      '<strong class="training-card__sport">' + Utils.escapeHtml(data.sport) + '</strong>' +
      '<span class="training-card__coach"><svg aria-hidden="true"><use href="#dash-user"/></svg> ' + Utils.escapeHtml(data.coach) + '</span>' +
      '</div></div>' +
      '<div class="training-card__body">' +
      '<div class="training-card__detail"><svg aria-hidden="true"><use href="#dash-clock"/></svg><span>' + Utils.escapeHtml(data.time) + '</span></div>' +
      '<div class="training-card__detail"><svg aria-hidden="true"><use href="#dash-clock"/></svg><span>' + Utils.escapeHtml(data.duration) + '</span></div>' +
      '<div class="training-card__detail"><svg aria-hidden="true"><use href="#dash-map"/></svg><span>' + Utils.escapeHtml(data.venue) + '</span></div>' +
      '</div>' +
      '<div class="training-card__footer">' +
      '<button class="d-btn d-btn--primary">Join Session</button>' +
      '<button class="d-btn d-btn--ghost">Reschedule</button>' +
      '</div></div>';
  }

  /* ===== Progress Bar ===== */
  function progressBar(pct, color) {
    return '<div class="perf-bar"><div class="perf-bar__fill perf-bar__fill--' + Utils.escapeHtml(color) + '" style="width:' + Utils.clamp(pct, 0, 100) + '%"></div></div>';
  }

  function perfCard(label, pct, color) {
    return '<div class="perf-card">' +
      '<div class="perf-card__head"><span class="perf-card__label">' + Utils.escapeHtml(label) + '</span><span class="perf-card__pct">' + Utils.clamp(pct, 0, 100) + '%</span></div>' +
      progressBar(pct, color) +
      '</div>';
  }

  /* ===== Timeline ===== */
  function timelineItem(dotColor, title, detail, time) {
    return '<div class="act-item">' +
      '<div class="act-item__dot act-item__dot--' + Utils.escapeHtml(dotColor) + '"></div>' +
      '<div class="act-item__body">' +
      '<strong>' + Utils.escapeHtml(title) + '</strong>' +
      (detail ? '<span>' + Utils.escapeHtml(detail) + '</span>' : '') +
      (time ? '<time>' + Utils.escapeHtml(time) + '</time>' : '') +
      '</div></div>';
  }

  /* ===== Achievement Badge ===== */
  function achievementBadge(data) {
    return '<div class="achiev-card' + (data.unlocked === false ? ' achiev-card--locked' : '') + '">' +
      '<div class="achiev-card__icon achiev-card__icon--' + Utils.escapeHtml(data.color) + '">' +
      '<svg aria-hidden="true"><use href="#' + Utils.escapeHtml(data.icon) + '"/></svg></div>' +
      '<strong class="achiev-card__name">' + Utils.escapeHtml(data.name) + '</strong>' +
      '<span class="achiev-card__desc">' + Utils.escapeHtml(data.desc) + '</span>' +
      (data.unlockedDate ? '<span class="achiev-card__date">' + Utils.escapeHtml(data.unlockedDate) + '</span>' : '') +
      '</div>';
  }

  /* ===== Announcement Card ===== */
  function announcementCard(data) {
    var tagClass = data.tagColor === 'blue' ? ' announce-card__tag--blue' : data.tagColor === 'green' ? ' announce-card__tag--green' : '';
    return '<article class="announce-card">' +
      '<div class="announce-card__tag' + tagClass + '">' + Utils.escapeHtml(data.tag) + '</div>' +
      '<h3 class="announce-card__title">' + Utils.escapeHtml(data.title) + '</h3>' +
      '<p class="announce-card__text">' + Utils.escapeHtml(data.text) + '</p>' +
      '<span class="announce-card__date">' + Utils.escapeHtml(data.date) + '</span>' +
      '</article>';
  }

  /* ===== Event Card ===== */
  function eventCard(data) {
    return '<article class="event-card">' +
      '<div class="event-card__date"><span class="event-card__day">' + Utils.escapeHtml(data.date) + '</span><span class="event-card__mon">' + Utils.escapeHtml(data.month) + '</span></div>' +
      '<div class="event-card__body">' +
      '<h3 class="event-card__title">' + Utils.escapeHtml(data.title) + '</h3>' +
      '<span class="event-card__detail"><svg aria-hidden="true"><use href="#dash-clock"/></svg> ' + Utils.escapeHtml(data.time) + '</span>' +
      '<span class="event-card__detail"><svg aria-hidden="true"><use href="#dash-map"/></svg> ' + Utils.escapeHtml(data.venue) + '</span>' +
      '</div></article>';
  }

  /* ===== Chart Container ===== */
  function chartContainer(title, chartId) {
    return '<div class="chart-card">' +
      '<h3 class="chart-card__title">' + Utils.escapeHtml(title) + '</h3>' +
      '<div class="chart-card__wrap"><canvas id="' + Utils.escapeHtml(chartId) + '"></canvas></div>' +
      '</div>';
  }

  /* ===== Table ===== */
  function table(headers, rows) {
    var thead = '<thead><tr>' + headers.map(function (h) { return '<th>' + Utils.escapeHtml(h) + '</th>'; }).join('') + '</tr></thead>';
    var tbody = '<tbody>' + rows.map(function (row) {
      return '<tr>' + row.map(function (cell) { return '<td>' + cell + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody>';
    return '<div class="d-table-wrap"><table class="d-table">' + thead + tbody + '</table></div>';
  }

  /* ===== Message Card ===== */
  function messageCard(data) {
    var initials = data.sender.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase();
    var avatarHtml = data.avatar
      ? '<img src="assets/' + Utils.escapeHtml(data.avatar) + '" alt="' + Utils.escapeHtml(data.sender) + '">'
      : '<span class="d-msg__initials">' + initials + '</span>';
    return '<div class="d-msg' + (data.unread ? ' d-msg--unread' : '') + '" data-msg-id="' + data.id + '">' +
      '<div class="d-msg__avatar">' + avatarHtml + '</div>' +
      '<div class="d-msg__body">' +
      '<div class="d-msg__top"><strong>' + Utils.escapeHtml(data.sender) + '</strong><span>' + Utils.escapeHtml(data.timestamp) + '</span></div>' +
      '<span class="d-msg__role">' + Utils.escapeHtml(data.role) + '</span>' +
      '<p class="d-msg__preview">' + Utils.escapeHtml(data.lastMessage) + '</p>' +
      '</div></div>';
  }

  /* ===== Goal Card ===== */
  function goalCard(data) {
    var color = data.progress >= 70 ? 'cyan' : data.progress >= 40 ? 'gold' : 'red';
    return '<div class="d-goal">' +
      '<div class="d-goal__head">' +
      '<div><strong class="d-goal__title">' + Utils.escapeHtml(data.title) + '</strong><span class="d-goal__cat">' + Utils.escapeHtml(data.category) + '</span></div>' +
      '<span class="d-goal__target">' + Utils.escapeHtml(data.target) + '</span>' +
      '</div>' +
      '<div class="d-goal__bar-wrap"><div class="perf-bar"><div class="perf-bar__fill perf-bar__fill--' + color + '" style="width:' + Utils.clamp(data.progress, 0, 100) + '%"></div></div></div>' +
      '<div class="d-goal__foot"><span>' + Utils.clamp(data.progress, 0, 100) + '% complete</span><span>Due: ' + Utils.escapeHtml(data.deadline) + '</span></div>' +
      '</div>';
  }

  /* ===== Loading Skeletons ===== */
  function skeleton(type) {
    var types = {
      card: '<div class="sk sk--card"></div>',
      chart: '<div class="sk sk--chart"></div>',
      text: '<div class="sk sk--text"></div><div class="sk sk--text" style="width:80%"></div>',
      title: '<div class="sk sk--title"></div>',
      avatar: '<div class="sk sk--avatar"></div>',
      table: '<div class="sk sk--text" style="width:100%"></div><div class="sk sk--text" style="width:100%"></div><div class="sk sk--text" style="width:90%"></div><div class="sk sk--text" style="width:95%"></div>',
      timeline: '<div style="display:flex;gap:12px;align-items:center;margin-bottom:16px"><div class="sk sk--avatar"></div><div style="flex:1"><div class="sk sk--text" style="width:70%"></div><div class="sk sk--text" style="width:40%"></div></div></div><div style="display:flex;gap:12px;align-items:center;margin-bottom:16px"><div class="sk sk--avatar"></div><div style="flex:1"><div class="sk sk--text" style="width:60%"></div><div class="sk sk--text" style="width:30%"></div></div></div>'
    };
    return types[type] || types.text;
  }

  function pageSkeleton() {
    return '<div style="padding:4px">' +
      '<div class="sk sk--card" style="height:180px;margin-bottom:24px;border-radius:var(--radius-lg)"></div>' +
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px">' +
      '<div class="sk sk--card" style="height:80px"></div>'.repeat(4) +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px">' +
      '<div class="sk sk--chart" style="height:220px"></div>'.repeat(2) +
      '</div>' +
      '<div class="sk sk--card" style="height:200px"></div>' +
      '</div>';
  }

  /* ===== Empty State ===== */
  function emptyState(icon, title, message, actionLabel, actionHref) {
    return '<div class="empty-state"><div class="empty-state__icon"><svg aria-hidden="true"><use href="#' + Utils.escapeHtml(icon || 'dash-search') + '"/></svg></div><h3>' + Utils.escapeHtml(title || 'No data available') + '</h3><p>' + Utils.escapeHtml(message || 'There is nothing to display here yet.') + '</p>' + (actionLabel ? '<a href="' + Utils.escapeHtml(actionHref || '#') + '" class="d-btn d-btn--primary d-btn--sm">' + Utils.escapeHtml(actionLabel) + '</a>' : '') + '</div>';
  }

  return {
    section, statCard, glassCard, trainingCard, progressBar, perfCard,
    timelineItem, achievementBadge, announcementCard, eventCard,
    chartContainer, table, messageCard, goalCard,
    skeleton, pageSkeleton, emptyState
  };
})();
