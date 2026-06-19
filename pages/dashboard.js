/* ============================================================
   MentorAI — Dashboard Page
   ============================================================ */

const DashboardPage = {
  render() {
    const user = Data.user;
    const topicsDone = Data.topics.filter(t => t.status === 'completed').length;
    const topicsInProgress = Data.topics.filter(t => t.status === 'in_progress');

    return `
      <div class="page animate-fade-in-up">
        <!-- Greeting Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:var(--space-8);flex-wrap:wrap;gap:var(--space-4)">
          <div>
            <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
              <h1 style="font-size:clamp(1.5rem,3vw,2.25rem);font-weight:800;color:var(--text-primary)">
                Good ${this.getGreeting()}, ${user.name.split(' ')[0]}! 👋
              </h1>
              <div class="streak-badge">
                <span class="streak-fire">🔥</span>
                <span>${user.streak} day streak</span>
              </div>
            </div>
            <p style="color:var(--text-muted);font-size:var(--text-base)">
              You've solved <strong style="color:var(--text-primary)">${user.problemsSolved}</strong> problems · 
              <strong style="color:var(--text-primary)">${user.accuracyRate}%</strong> accuracy ·
              <strong style="color:var(--color-primary-light)">${topicsDone}</strong> topics completed
            </p>
          </div>
          <div style="display:flex;gap:var(--space-3)">
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('learning-path')">📍 My Path</button>
            <button class="btn btn-primary btn-sm" onclick="App.navigate('chat')">💬 Start Learning</button>
          </div>
        </div>

        <!-- Weekly Goal Progress -->
        <div class="card" style="margin-bottom:var(--space-6);background:linear-gradient(135deg,rgba(59,130,246,0.08),rgba(139,92,246,0.06));border-color:rgba(59,130,246,0.2)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
            <div>
              <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">Weekly Goal Progress</div>
              <div style="font-size:var(--text-xs);color:var(--text-muted)">${user.weeklyHoursDone}h / ${user.weeklyGoalHours}h this week</div>
            </div>
            <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--color-primary-light)">${Math.round(user.weeklyHoursDone/user.weeklyGoalHours*100)}%</div>
          </div>
          <div class="progress-track lg">
            <div class="progress-fill" id="weekly-goal-bar" style="width:0%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:var(--space-2);font-size:var(--text-xs);color:var(--text-muted)">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <!-- Stat Cards -->
        <div class="grid-4" style="margin-bottom:var(--space-6)" id="stat-cards">
          ${[
            { label:'Problems Solved',   value: user.problemsSolved, icon:'🎯', color:'#3B82F6', bg:'rgba(59,130,246,0.1)',  delta:'+12 this week',  up:true,  spark:[180,210,195,230,240,247] },
            { label:'Accuracy Rate',      value: user.accuracyRate+'%', icon:'🎯', color:'#10B981', bg:'rgba(16,185,129,0.1)', delta:'+2.1% from last week', up:true,  spark:[72,75,74,78,79,78.4] },
            { label:'Learning Streak',    value: user.streak+' days',  icon:'🔥', color:'#F97316', bg:'rgba(249,115,22,0.1)', delta:'Personal best!',   up:true,  spark:[5,7,8,9,10,11,12] },
            { label:'Proficiency Level',  value: user.proficiencyLevel+'%', icon:'⭐', color:'#8B5CF6', bg:'rgba(139,92,246,0.1)', delta:'+5% this month', up:true, spark:[45,50,55,58,63,65] },
          ].map((s,i) => `
            <div class="stat-card">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
                <div class="stat-card-icon" style="background:${s.bg}">
                  <span style="font-size:1.1rem">${s.icon}</span>
                </div>
                <canvas id="spark-${i}" width="60" height="30" style="opacity:0.7"></canvas>
              </div>
              <div class="stat-card-label">${s.label}</div>
              <div class="stat-card-value" id="stat-val-${i}">${s.value}</div>
              <div class="stat-card-delta up">↑ ${s.delta}</div>
            </div>
          `).join('')}
        </div>

        <!-- Charts Row -->
        <div class="grid-2" style="margin-bottom:var(--space-6)">
          <!-- Weekly hours chart -->
          <div class="card">
            <div class="section-header">
              <h3 class="section-title">Study Hours This Week</h3>
              <div style="display:flex;gap:var(--space-2)">
                <button class="btn btn-ghost btn-sm">This Week</button>
              </div>
            </div>
            <div style="height:200px">
              <canvas id="weekly-chart"></canvas>
            </div>
          </div>
          <!-- Accuracy chart -->
          <div class="card">
            <div class="section-header">
              <h3 class="section-title">Daily Accuracy</h3>
            </div>
            <div style="height:200px">
              <canvas id="accuracy-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- In-Progress Topics + Activity -->
        <div class="grid-2" style="margin-bottom:var(--space-6)">
          <!-- Continue learning -->
          <div class="card">
            <div class="section-header">
              <h3 class="section-title">Continue Learning</h3>
              <a href="#" onclick="App.navigate('learning-path');return false" style="font-size:var(--text-sm);color:var(--color-primary-light)">View all →</a>
            </div>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              ${topicsInProgress.slice(0,3).map(t => {
                const subject = Data.agents.find(a => a.id === t.subject);
                return `
                  <div style="cursor:pointer" onclick="App.navigate('learning-path')">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2)">
                      <div style="display:flex;align-items:center;gap:var(--space-3)">
                        <span style="font-size:1.2rem">${t.icon}</span>
                        <div>
                          <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">${t.name}</div>
                          <div style="font-size:var(--text-xs);color:var(--text-muted)">${t.hours}h estimated · ${t.difficulty}/10 difficulty</div>
                        </div>
                      </div>
                      <span style="font-size:var(--text-sm);font-weight:700;color:var(--color-primary-light)">${t.progress}%</span>
                    </div>
                    <div class="progress-track sm">
                      <div class="progress-fill" style="width:${t.progress}%"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="section-header">
              <h3 class="section-title">Recent Activity</h3>
            </div>
            <div style="display:flex;flex-direction:column;gap:var(--space-4)">
              ${[
                { icon:'💬', action:'Chatted with CodeMentor',      detail:'Python Data Structures',   time:'2h ago',   color:'#3B82F6' },
                { icon:'✅', action:'Solved Two Sum Problem',        detail:'Difficulty 3/10 · Correct', time:'2h ago',   color:'#10B981' },
                { icon:'📖', action:'Completed "Control Flow"',      detail:'Topic 100% mastered',      time:'1d ago',   color:'#8B5CF6' },
                { icon:'🔥', action:'Extended your streak!',         detail:'12 days in a row',         time:'Today',    color:'#F97316' },
                { icon:'🏆', action:'Earned "Century Club" badge',   detail:'Solved 100 problems',      time:'3d ago',   color:'#F97316' },
              ].map(a => `
                <div style="display:flex;align-items:center;gap:var(--space-3)">
                  <div style="width:36px;height:36px;border-radius:var(--radius-lg);background:${a.color}18;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">${a.icon}</div>
                  <div style="flex:1">
                    <div style="font-size:var(--text-sm);font-weight:600;color:var(--text-primary)">${a.action}</div>
                    <div style="font-size:var(--text-xs);color:var(--text-muted)">${a.detail}</div>
                  </div>
                  <div style="font-size:var(--text-xs);color:var(--text-muted)">${a.time}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Recommended Agents -->
        <div class="card">
          <div class="section-header">
            <h3 class="section-title">Start a Session</h3>
            <span style="font-size:var(--text-sm);color:var(--text-muted)">Pick an agent and start learning</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-4)">
            ${Data.agents.map(a => `
              <button class="card card-hover" style="text-align:left;cursor:pointer;border:1.5px solid ${a.color}22;transition:all var(--transition-base)" onclick="App.navigate('chat');setTimeout(()=>window.ChatPage&&ChatPage.selectAgent('${a.id}'),100)"
                onmouseover="this.style.borderColor='${a.color}'" onmouseout="this.style.borderColor='${a.color}22'">
                <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-3)">
                  <div class="agent-avatar ${a.colorClass}">${a.icon}</div>
                  <div>
                    <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">${a.name}</div>
                    <div style="font-size:var(--text-xs);color:${a.color}">${a.fullName}</div>
                  </div>
                </div>
                <div style="font-size:var(--text-xs);color:var(--text-muted);line-height:1.4">${a.specialty.split(', ').slice(0,3).join(' · ')}</div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  },

  init() {
    // Animate weekly goal bar
    setTimeout(() => {
      const bar = document.getElementById('weekly-goal-bar');
      if (bar) bar.style.width = `${Math.round(Data.user.weeklyHoursDone/Data.user.weeklyGoalHours*100)}%`;
    }, 300);

    // Render charts after DOM ready
    setTimeout(() => {
      Charts.renderWeeklyHours('weekly-chart');
      Charts.renderAccuracyBar('accuracy-chart');

      // Sparklines
      const sparkData = [
        [180,210,195,230,240,247],
        [72,75,74,78,79,78.4],
        [5,7,8,9,10,11,12],
        [45,50,55,58,63,65]
      ];
      const sparkColors = ['#3B82F6','#10B981','#F97316','#8B5CF6'];
      sparkData.forEach((d, i) => Charts.renderSparkline(`spark-${i}`, d, sparkColors[i]));
    }, 100);
  }
};

window.DashboardPage = DashboardPage;
