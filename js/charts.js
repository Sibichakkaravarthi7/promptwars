/* ============================================================
   MentorAI — Charts Engine (Chart.js wrapper)
   ============================================================ */

const Charts = {
  instances: {},

  // Common gradient helper
  createGradient(ctx, color1, color2) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  },

  // Common chart defaults
  defaults: {
    font: { family: "'Inter', sans-serif", size: 12 },
    color: '#94A3B8',
    grid: 'rgba(255,255,255,0.05)',
    tick: '#64748B',
  },

  // ── Destroy chart if exists ─────────────────────────────────
  destroy(id) {
    if (this.instances[id]) {
      this.instances[id].destroy();
      delete this.instances[id];
    }
  },

  // ── Weekly Hours Line Chart ─────────────────────────────────
  renderWeeklyHours(canvasId) {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = Data.weeklyProgress;

    const gradient = this.createGradient(ctx, 'rgba(59,130,246,0.3)', 'rgba(59,130,246,0.0)');

    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Hours Studied',
          data: data.hours,
          borderColor: '#3B82F6',
          backgroundColor: gradient,
          borderWidth: 2.5,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#0D1421',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#F0F6FF',
            bodyColor: '#94A3B8',
            padding: 12,
            callbacks: { label: ctx => ` ${ctx.raw}h studied` }
          }
        },
        scales: {
          x: {
            grid: { color: this.defaults.grid, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font }
          },
          y: {
            grid: { color: this.defaults.grid, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font, callback: v => v + 'h' },
            beginAtZero: true
          }
        }
      }
    });
  },

  // ── Monthly Progress Line Chart ─────────────────────────────
  renderMonthlyProgress(canvasId) {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = Data.monthlyProgress;

    const grad1 = this.createGradient(ctx, 'rgba(59,130,246,0.25)', 'rgba(59,130,246,0.0)');
    const grad2 = this.createGradient(ctx, 'rgba(139,92,246,0.2)', 'rgba(139,92,246,0.0)');

    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Proficiency %',
            data: data.proficiency,
            borderColor: '#3B82F6',
            backgroundColor: grad1,
            borderWidth: 2.5,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#0D1421',
            pointBorderWidth: 2,
            pointRadius: 6,
            fill: true,
            tension: 0.4,
            yAxisID: 'y'
          },
          {
            label: 'Problems Solved',
            data: data.problems,
            borderColor: '#8B5CF6',
            backgroundColor: grad2,
            borderWidth: 2.5,
            pointBackgroundColor: '#8B5CF6',
            pointBorderColor: '#0D1421',
            pointBorderWidth: 2,
            pointRadius: 6,
            fill: true,
            tension: 0.4,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            labels: { color: '#94A3B8', font: this.defaults.font, usePointStyle: true, pointStyleWidth: 10 }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#F0F6FF',
            bodyColor: '#94A3B8',
            padding: 12
          }
        },
        scales: {
          x: {
            grid: { color: this.defaults.grid, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font }
          },
          y: {
            grid: { color: this.defaults.grid, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font, callback: v => v + '%' },
            beginAtZero: true, max: 100, position: 'left'
          },
          y1: {
            grid: { display: false, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font },
            beginAtZero: true, position: 'right'
          }
        }
      }
    });
  },

  // ── Accuracy Bar Chart ──────────────────────────────────────
  renderAccuracyBar(canvasId) {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = Data.weeklyProgress;

    this.instances[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Accuracy %',
          data: data.accuracy,
          backgroundColor: data.accuracy.map(v =>
            v >= 80 ? 'rgba(16,185,129,0.7)' :
            v >= 65 ? 'rgba(59,130,246,0.7)' :
                      'rgba(249,115,22,0.7)'
          ),
          borderColor: data.accuracy.map(v =>
            v >= 80 ? '#10B981' : v >= 65 ? '#3B82F6' : '#F97316'
          ),
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#F0F6FF',
            bodyColor: '#94A3B8',
            padding: 12,
            callbacks: { label: ctx => ` Accuracy: ${ctx.raw}%` }
          }
        },
        scales: {
          x: {
            grid: { display: false, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font }
          },
          y: {
            grid: { color: this.defaults.grid, drawBorder: false },
            ticks: { color: this.defaults.tick, font: this.defaults.font, callback: v => v + '%' },
            min: 0, max: 100
          }
        }
      }
    });
  },

  // ── Subject Radar Chart ─────────────────────────────────────
  renderSubjectRadar(canvasId) {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = Data.subjectProficiency;

    this.instances[canvasId] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Your Proficiency',
          data: data.values,
          backgroundColor: 'rgba(59,130,246,0.15)',
          borderColor: '#3B82F6',
          borderWidth: 2,
          pointBackgroundColor: '#3B82F6',
          pointBorderColor: '#0D1421',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Average Learner',
          data: [55, 50, 45, 60, 48],
          backgroundColor: 'rgba(139,92,246,0.08)',
          borderColor: 'rgba(139,92,246,0.4)',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointBackgroundColor: '#8B5CF6',
          pointRadius: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: { color: '#94A3B8', font: this.defaults.font, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#F0F6FF',
            bodyColor: '#94A3B8',
            padding: 12
          }
        },
        scales: {
          r: {
            min: 0, max: 100,
            grid: { color: 'rgba(255,255,255,0.06)' },
            angleLines: { color: 'rgba(255,255,255,0.06)' },
            ticks: {
              color: '#64748B',
              font: { size: 10 },
              stepSize: 25,
              backdropColor: 'transparent'
            },
            pointLabels: { color: '#94A3B8', font: { size: 12, family: "'Inter', sans-serif" } }
          }
        }
      }
    });
  },

  // ── Activity Doughnut ────────────────────────────────────────
  renderActivityDoughnut(canvasId) {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    this.instances[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Python', 'Data Science', 'Math', 'JavaScript', 'Writing'],
        datasets: [{
          data: [38, 25, 18, 12, 7],
          backgroundColor: [
            'rgba(59,130,246,0.85)',
            'rgba(249,115,22,0.85)',
            'rgba(139,92,246,0.85)',
            'rgba(16,185,129,0.85)',
            'rgba(6,182,212,0.85)',
          ],
          borderColor: '#0D1421',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#94A3B8',
              font: this.defaults.font,
              usePointStyle: true,
              pointStyleWidth: 10,
              padding: 14
            }
          },
          tooltip: {
            backgroundColor: '#1E293B',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            titleColor: '#F0F6FF',
            bodyColor: '#94A3B8',
            padding: 12,
            callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}% of time` }
          }
        }
      }
    });
  },

  // ── Mini sparkline (inline small chart) ─────────────────────
  renderSparkline(canvasId, data, color = '#3B82F6') {
    this.destroy(canvasId);
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    this.instances[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => i),
        datasets: [{
          data,
          borderColor: color,
          borderWidth: 2,
          pointRadius: 0,
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
          x: { display: false },
          y: { display: false }
        },
        animation: { duration: 800 }
      }
    });
  }
};

window.Charts = Charts;
