/* ============================================================
   MentorAI — Progress & Analytics Page
   ============================================================ */

const ProgressPage = {
  activeTab: 'overview',

  render() {
    const user = Data.user;
    const earned = Data.getEarnedAchievements();

    return `
      <div class="page animate-fade-in-up">
        <div class="page-header">
          <h1 class="page-title">Progress & Analytics 📈</h1>
          <p class="page-subtitle">Track your learning journey and celebrate milestones</p>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-6);border-bottom:1px solid var(--border-subtle);padding-bottom:var(--space-4)">
          ${[['overview','📊 Overview'],['achievements','🏆 Achievements'],['sessions','📋 Sessions']].map(([id,label])=>`
            <button class="btn ${id===this.activeTab?'btn-primary':'btn-ghost'} btn-sm" 
              id="ptab-${id}" onclick="ProgressPage.switchTab('${id}')">${label}</button>
          `).join('')}
        </div>

        <div id="progress-content">
          ${this.renderOverview()}
        </div>
      </div>
    `;
  },

  renderOverview() {
    const user = Data.user;
    return `
      <!-- KPI Row -->
      <div class="grid-4" style="margin-bottom:var(--space-6)">
        ${[
          { label:'Total Hours',       value: user.totalHours + 'h',   icon:'⏱',  color:'#3B82F6', bg:'rgba(59,130,246,0.1)',  sub:'Since joining 45 days ago' },
          { label:'Problems Solved',   value: user.problemsSolved,      icon:'🎯',  color:'#10B981', bg:'rgba(16,185,129,0.1)',  sub:'Avg 5.5/day this week' },
          { label:'Concepts Learned',  value: user.conceptsLearned,     icon:'💡',  color:'#8B5CF6', bg:'rgba(139,92,246,0.1)', sub:'Across 4 subjects' },
          { label:'Avg Accuracy',      value: user.accuracyRate + '%',  icon:'🏆',  color:'#F97316', bg:'rgba(249,115,22,0.1)',  sub:'↑ 5% from last month' },
        ].map(s=>`
          <div class="stat-card">
            <div class="stat-card-icon" style="background:${s.bg}"><span style="font-size:1.2rem">${s.icon}</span></div>
            <div class="stat-card-label">${s.label}</div>
            <div class="stat-card-value">${s.value}</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">${s.sub}</div>
          </div>
        `).join('')}
      </div>

      <!-- Charts Row 1 -->
      <div class="grid-2" style="margin-bottom:var(--space-6)">
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">Monthly Progress</h3>
            <span class="badge badge-success">4 weeks</span>
          </div>
          <div style="height:220px"><canvas id="monthly-chart"></canvas></div>
        </div>
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">Subject Proficiency</h3>
            <span class="badge badge-primary">vs. average</span>
          </div>
          <div style="height:220px"><canvas id="radar-chart"></canvas></div>
        </div>
      </div>

      <!-- Charts Row 2 -->
      <div class="grid-2" style="margin-bottom:var(--space-6)">
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">Time by Subject</h3>
          </div>
          <div style="height:220px"><canvas id="donut-chart"></canvas></div>
        </div>
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">Topic Progress</h3>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-3)">
            ${Data.topics.filter(t=>t.status!=='not_started').slice(0,6).map(t=>`
              <div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                  <span style="font-size:var(--text-xs);font-weight:600;color:var(--text-primary)">${t.icon} ${t.name}</span>
                  <span style="font-size:var(--text-xs);font-weight:700;color:${t.status==='completed'?'var(--color-success)':'var(--color-primary-light)'}">${t.progress}%</span>
                </div>
                <div class="progress-track sm">
                  <div class="progress-fill" style="width:${t.progress}%;${t.status==='completed'?'background:var(--color-success)':''}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Learning Streak Calendar -->
      <div class="card" style="margin-bottom:var(--space-6)">
        <div class="section-header">
          <h3 class="section-title">Activity Calendar</h3>
          <div class="streak-badge"><span class="streak-fire">🔥</span>${Data.user.streak} day streak</div>
        </div>
        <div style="display:flex;gap:4px;flex-wrap:wrap">
          ${Array.from({length:90},(_,i)=>{
            const active = Math.random() > 0.35;
            const intensity = active ? Math.floor(Math.random()*4)+1 : 0;
            const colors = ['transparent','rgba(59,130,246,0.2)','rgba(59,130,246,0.4)','rgba(59,130,246,0.65)','rgba(59,130,246,0.9)'];
            const d = new Date(Date.now() - (89-i) * 86400000);
            return `<div style="width:12px;height:12px;border-radius:2px;background:${colors[intensity]};border:1px solid ${active?'rgba(59,130,246,0.3)':'rgba(255,255,255,0.04)'}" title="${d.toLocaleDateString()}: ${intensity?intensity+' sessions':'no activity'}"></div>`;
          }).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-3);margin-top:var(--space-3);font-size:var(--text-xs);color:var(--text-muted)">
          <span>Less</span>
          ${[0.1,0.25,0.45,0.65,0.9].map(o=>`<div style="width:12px;height:12px;border-radius:2px;background:rgba(59,130,246,${o})"></div>`).join('')}
          <span>More</span>
        </div>
      </div>

      <!-- Recent Achievements -->
      <div class="card">
        <div class="section-header">
          <h3 class="section-title">Recent Achievements</h3>
          <button class="btn btn-ghost btn-sm" onclick="ProgressPage.switchTab('achievements')">View all →</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:var(--space-4)">
          ${Data.getEarnedAchievements().map(a=>`
            <div class="achievement-card earned">
              <div class="achievement-icon">${a.icon}</div>
              <div class="achievement-name">${a.name}</div>
              <div class="achievement-desc">${a.desc}</div>
              <div style="font-size:var(--text-xs);color:var(--text-muted)">Earned ${Utils.formatDate(a.earnedAt,{relative:true})}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderAchievements() {
    return `
      <div>
        <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-6)">
          <div class="card" style="flex:1;padding:var(--space-4);text-align:center">
            <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--color-warning-light)">${Data.getEarnedAchievements().length}</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Badges Earned</div>
          </div>
          <div class="card" style="flex:1;padding:var(--space-4);text-align:center">
            <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--text-muted)">${Data.getLocked().length}</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Locked</div>
          </div>
          <div class="card" style="flex:1;padding:var(--space-4);text-align:center">
            <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--color-primary-light)">${Math.round(Data.getEarnedAchievements().length/Data.achievements.length*100)}%</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted)">Completion</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--space-4)">
          ${Data.achievements.map(a=>`
            <div class="achievement-card ${a.earned?'earned':'locked'}">
              <div class="achievement-icon" style="${a.earned?'background:rgba(249,115,22,0.15)':'background:rgba(100,116,139,0.1)'}">${a.icon}</div>
              <div class="achievement-name">${a.name}</div>
              <div class="achievement-desc">${a.desc}</div>
              ${a.earned ? `<div style="font-size:var(--text-xs);color:var(--color-warning-light)">✨ Earned!</div>` : `<div style="font-size:var(--text-xs);color:var(--text-muted)">🔒 Keep learning</div>`}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderSessions() {
    const sessions = [
      { date:'Today, 2:30 PM',     agent:'💻 CodeMentor',    topic:'Python Data Structures', duration:'45 min', problems:3, accuracy:90, status:'completed' },
      { date:'Today, 10:15 AM',    agent:'📊 DataSage',      topic:'pandas GroupBy',         duration:'32 min', problems:2, accuracy:85, status:'completed' },
      { date:'Yesterday, 8:00 PM', agent:'📐 MathGenius',    topic:'Linear Algebra Basics',  duration:'58 min', problems:5, accuracy:72, status:'completed' },
      { date:'Yesterday, 3:45 PM', agent:'💻 CodeMentor',    topic:'Binary Search',          duration:'25 min', problems:2, accuracy:100,status:'completed' },
      { date:'2 days ago, 7:20 PM',agent:'✍️ WriteCoach',    topic:'Academic Essay Structure',duration:'40 min', problems:1, accuracy:80, status:'completed' },
      { date:'3 days ago, 9:00 AM',agent:'🧠 AskAI',         topic:'General Q&A',            duration:'15 min', problems:0, accuracy:null,status:'completed' },
    ];
    return `
      <div class="card">
        <div class="section-header" style="margin-bottom:var(--space-5)">
          <h3 class="section-title">Session History</h3>
          <span style="font-size:var(--text-sm);color:var(--text-muted)">Last 30 days</span>
        </div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="border-bottom:1px solid var(--border-subtle)">
                ${['Date','Agent','Topic','Duration','Problems','Accuracy'].map(h=>`
                  <th style="text-align:left;padding:var(--space-3) var(--space-4);font-size:var(--text-xs);font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted)">${h}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${sessions.map((s,i)=>`
                <tr style="border-bottom:1px solid var(--border-subtle);transition:background var(--transition-fast)" onmouseover="this.style.background='var(--bg-card-hover)'" onmouseout="this.style.background='transparent'">
                  <td style="padding:var(--space-4);font-size:var(--text-sm);color:var(--text-muted)">${s.date}</td>
                  <td style="padding:var(--space-4);font-size:var(--text-sm);font-weight:600;color:var(--text-primary)">${s.agent}</td>
                  <td style="padding:var(--space-4);font-size:var(--text-sm);color:var(--text-secondary)">${s.topic}</td>
                  <td style="padding:var(--space-4);font-size:var(--text-sm);color:var(--text-muted)">${s.duration}</td>
                  <td style="padding:var(--space-4);font-size:var(--text-sm);font-weight:600;color:var(--color-primary-light)">${s.problems}</td>
                  <td style="padding:var(--space-4)">
                    ${s.accuracy !== null ? `
                      <span style="font-size:var(--text-sm);font-weight:700;color:${s.accuracy>=80?'var(--color-success)':s.accuracy>=60?'var(--color-primary-light)':'var(--color-warning)'}">${s.accuracy}%</span>
                    ` : '<span style="color:var(--text-muted);font-size:var(--text-sm)">—</span>'}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('[id^="ptab-"]').forEach(b => b.className = 'btn btn-ghost btn-sm');
    const active = document.getElementById(`ptab-${tab}`);
    if (active) active.className = 'btn btn-primary btn-sm';

    const content = document.getElementById('progress-content');
    if (!content) return;
    content.style.opacity = '0';
    setTimeout(() => {
      content.innerHTML = tab === 'overview' ? this.renderOverview() :
                          tab === 'achievements' ? this.renderAchievements() :
                          this.renderSessions();
      content.style.transition = 'opacity 0.25s';
      content.style.opacity = '1';
      if (tab === 'overview') this.initCharts();
    }, 150);
  },

  initCharts() {
    setTimeout(() => {
      Charts.renderMonthlyProgress('monthly-chart');
      Charts.renderSubjectRadar('radar-chart');
      Charts.renderActivityDoughnut('donut-chart');
    }, 50);
  },

  init() {
    this.initCharts();
  }
};

window.ProgressPage = ProgressPage;
