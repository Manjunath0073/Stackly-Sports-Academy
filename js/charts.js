const Charts = (function () {
  'use strict';

  var instances = {};

  var COLORS = {
    secondary: '#EF4444',
    accent: '#F59E0B',
    highlight: '#06B6D4',
    purple: '#8B5CF6',
    green: '#10B981'
  };

  function isDark() {
    return document.getElementById('dashboard').classList.contains('dashboard--dark');
  }

  function textColor() { return isDark() ? '#94a3b8' : '#64748B'; }
  function gridColor() { return isDark() ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'; }
  function cardBg() { return isDark() ? '#1e293b' : '#ffffff'; }

  function createLine(id, labels, data, color, fill) {
    destroy(id);
    var canvas = document.getElementById(id);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, (fill || color) + '30');
    gradient.addColorStop(1, (fill || color) + '00');

    instances[id] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: data,
          borderColor: color,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: color,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor() }, ticks: { color: textColor(), font: { size: 10 } } },
          y: { grid: { color: gridColor() }, ticks: { color: textColor(), font: { size: 10 }, maxTicksLimit: 5 }, min: 0, max: 100 }
        }
      }
    });
  }

  function createBar(id, labels, data, colors) {
    destroy(id);
    var canvas = document.getElementById(id);
    if (!canvas) return;
    instances[id] = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: data,
          backgroundColor: colors || labels.map(function (_, i) {
            var c = [COLORS.secondary, COLORS.accent, COLORS.highlight, COLORS.secondary, COLORS.accent, COLORS.highlight];
            return c[i % c.length] + '80';
          }),
          borderColor: colors || labels.map(function (_, i) {
            var c = [COLORS.secondary, COLORS.accent, COLORS.highlight, COLORS.secondary, COLORS.accent, COLORS.highlight];
            return c[i % c.length];
          }),
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor(), font: { size: 10 } } },
          y: { grid: { color: gridColor() }, ticks: { color: textColor(), font: { size: 10 }, maxTicksLimit: 5 }, min: 0, max: 100 }
        }
      }
    });
  }

  function createDoughnut(id, labels, data, colors) {
    destroy(id);
    var canvas = document.getElementById(id);
    if (!canvas) return;
    var defaultColors = [COLORS.secondary, COLORS.accent, COLORS.highlight, COLORS.purple, COLORS.green].map(function (c) { return c + 'CC'; });
    instances[id] = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: colors || defaultColors,
          borderColor: cardBg(),
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: textColor(), font: { size: 10 }, padding: 12, boxWidth: 10, usePointStyle: true }
          }
        },
        cutout: '65%'
      }
    });
  }

  function createArea(id, labels, data, color) {
    destroy(id);
    var canvas = document.getElementById(id);
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');

    instances[id] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '',
          data: data,
          borderColor: color,
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: color,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: textColor(), font: { size: 10 } } },
          y: { grid: { color: gridColor() }, ticks: { color: textColor(), font: { size: 10 }, maxTicksLimit: 5 }, min: 0 }
        }
      }
    });
  }

  function destroy(id) {
    if (instances[id]) {
      instances[id].destroy();
      delete instances[id];
    }
  }

  function destroyAll() {
    Object.keys(instances).forEach(function (id) { destroy(id); });
  }

  function createRadar(id, labels, datasets) {
    destroy(id);
    var canvas = document.getElementById(id);
    if (!canvas) return;
    instances[id] = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: datasets.map(function (d) {
          return {
            label: d.label || '',
            data: d.data,
            borderColor: d.color || COLORS.secondary,
            backgroundColor: (d.color || COLORS.secondary) + '25',
            borderWidth: 2,
            pointBackgroundColor: d.color || COLORS.secondary,
            pointRadius: 3
          };
        })
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: datasets.length > 1, position: 'bottom', labels: { color: textColor(), font: { size: 10 }, boxWidth: 10 } }
        },
        scales: {
          r: {
            angleLines: { color: gridColor() },
            grid: { color: gridColor() },
            pointLabels: { color: textColor(), font: { size: 10 } },
            ticks: { display: false },
            min: 0,
            max: 100
          }
        }
      }
    });
  }

  return { createLine, createBar, createDoughnut, createArea, createRadar, destroy, destroyAll, COLORS };
})();
