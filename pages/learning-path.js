/* ============================================================
   MentorAI — Learning Path Page
   ============================================================ */

const LearningPathPage = {
  activeSubject: 'all',
  selectedTopicId: null,

  subjects: [
    { id:'all',         label:'All Topics', icon:'📚' },
    { id:'coding',      label:'Coding',     icon:'💻' },
    { id:'math',        label:'Math',       icon:'📐' },
    { id:'writing',     label:'Writing',    icon:'✍️'  },
    { id:'datascience', label:'Data Sci',   icon:'📊' },
  ],

  render() {
    const completed   = Data.topics.filter(t => t.status === 'completed').length;
    const inProgress  = Data.topics.filter(t => t.status === 'in_progress').length;
    const total       = Data.topics.length;

    return `
      <div class="page animate-fade-in-up">
        <!-- Header -->
        <div class="page-header">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:var(--space-4)">
            <div>
              <h1 class="page-title">Learning Path 🗺️</h1>
              <p class="page-subtitle">Your personalized roadmap to mastery</p>
            </div>
            <div style="display:flex;gap:var(--space-4);align-items:center">
              <div style="text-align:center">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--color-success)">${completed}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted)">Completed</div>
              </div>
              <div style="width:1px;height:32px;background:var(--border-subtle)"></div>
              <div style="text-align:center">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--color-primary-light)">${inProgress}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted)">In Progress</div>
              </div>
              <div style="width:1px;height:32px;background:var(--border-subtle)"></div>
              <div style="text-align:center">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--text-muted)">${total - completed - inProgress}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted)">Upcoming</div>
              </div>
            </div>
          </div>

          <!-- Overall Progress -->
          <div style="margin-top:var(--space-5);background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:var(--space-5)">
            <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-3)">
              <span style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">Overall Path Progress</span>
              <span style="font-size:var(--text-sm);font-weight:700;color:var(--color-primary-light)">${Math.round(completed/total*100)}%</span>
            </div>
            <div class="progress-track lg" style="margin-bottom:var(--space-3)">
              <div class="progress-fill" id="path-progress-bar" style="width:0%"></div>
            </div>
            <div style="display:flex;gap:var(--space-4);font-size:var(--text-xs)">
              <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:50%;background:var(--color-success);display:inline-block"></span><span style="color:var(--text-muted)">${completed} completed</span></span>
              <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:50%;background:var(--color-primary);display:inline-block"></span><span style="color:var(--text-muted)">${inProgress} in progress</span></span>
              <span style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:50%;background:var(--border-default);display:inline-block"></span><span style="color:var(--text-muted)">${total-completed-inProgress} not started</span></span>
            </div>
          </div>
        </div>

        <!-- Subject Filter -->
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-6);flex-wrap:wrap">
          ${this.subjects.map(s => `
            <button class="btn btn-ghost btn-sm ${s.id === this.activeSubject ? 'btn-primary' : ''}" 
              id="filter-${s.id}"
              onclick="LearningPathPage.filterSubject('${s.id}')">
              ${s.icon} ${s.label}
            </button>
          `).join('')}
        </div>

        <!-- Topics by Subject -->
        <div id="topics-container">
          ${this.renderTopicsSection()}
        </div>
      </div>

      <!-- Topic Detail Modal -->
      <div id="topic-modal" class="modal-overlay" style="display:none">
        <div class="modal" id="topic-modal-content" style="max-width:600px"></div>
      </div>
    `;
  },

  renderTopicsSection() {
    const subjects = this.activeSubject === 'all'
      ? ['coding','math','writing','datascience']
      : [this.activeSubject];

    const subjectMeta = {
      coding:      { label:'Programming',  icon:'💻', color:'#3B82F6', agent: Data.getAgent('coding') },
      math:        { label:'Mathematics',  icon:'📐', color:'#8B5CF6', agent: Data.getAgent('math') },
      writing:     { label:'Writing',      icon:'✍️',  color:'#10B981', agent: Data.getAgent('writing') },
      datascience: { label:'Data Science', icon:'📊', color:'#F97316', agent: Data.getAgent('datascience') },
    };

    return subjects.map(subject => {
      const meta = subjectMeta[subject];
      const topics = Data.topics.filter(t => t.subject === subject);
      const done = topics.filter(t => t.status === 'completed').length;

      return `
        <div style="margin-bottom:var(--space-10)" class="animate-fade-in-up">
          <!-- Subject Header -->
          <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-5)">
            <div class="agent-avatar ${meta.agent.colorClass} agent-avatar-lg">${meta.icon}</div>
            <div style="flex:1">
              <div style="font-size:var(--text-xl);font-weight:800;color:var(--text-primary)">${meta.label}</div>
              <div style="font-size:var(--text-sm);color:var(--text-muted)">${done}/${topics.length} topics completed</div>
              <div class="progress-track sm" style="max-width:200px;margin-top:6px">
                <div class="progress-fill" style="width:${Math.round(done/topics.length*100)}%;background:${meta.color}"></div>
              </div>
            </div>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('chat');setTimeout(()=>ChatPage.selectAgent('${subject}'),100)">
              Chat with ${meta.agent.name} →
            </button>
          </div>

          <!-- Topic Cards Grid -->
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-4)">
            ${topics.map((t, i) => {
              const statusClass = t.status === 'completed' ? 'completed' : t.status === 'in_progress' ? 'in-progress' : '';
              const statusBadge = t.status === 'completed' ? 'badge-completed' :
                                  t.status === 'in_progress' ? 'badge-in-progress' : 'badge-locked';
              const statusLabel = t.status === 'completed' ? '✓ Completed' :
                                  t.status === 'in_progress' ? '⚡ In Progress' : '🔒 Locked';

              return `
                <div class="topic-card ${statusClass}" onclick="LearningPathPage.openTopic('${t.id}')" style="cursor:pointer">
                  <div class="topic-card-header">
                    <div style="display:flex;align-items:center;gap:var(--space-2)">
                      <span style="font-size:1.5rem">${t.icon}</span>
                      <span style="font-size:var(--text-lg);font-weight:800;color:var(--text-muted);opacity:.4">${String(i+1).padStart(2,'0')}</span>
                    </div>
                    <span class="badge ${statusBadge}">${statusLabel}</span>
                  </div>
                  <div class="topic-card-title">${t.name}</div>
                  <div class="topic-card-desc">${t.description}</div>
                  ${t.status === 'in_progress' ? `
                    <div style="margin-top:var(--space-3)">
                      <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                        <span style="font-size:var(--text-xs);color:var(--text-muted)">Progress</span>
                        <span style="font-size:var(--text-xs);font-weight:700;color:var(--color-primary-light)">${t.progress}%</span>
                      </div>
                      <div class="progress-track sm">
                        <div class="progress-fill" style="width:${t.progress}%"></div>
                      </div>
                    </div>
                  ` : ''}
                  <div class="topic-card-meta">
                    <span>⏱ ${t.hours}h</span>
                    <span>📊 Difficulty ${t.difficulty}/10</span>
                    ${t.prereqs.length ? `<span>🔗 ${t.prereqs.length} prereq${t.prereqs.length>1?'s':''}</span>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  filterSubject(subject) {
    this.activeSubject = subject;
    // Update buttons
    document.querySelectorAll('[id^="filter-"]').forEach(b => {
      b.className = 'btn btn-ghost btn-sm';
    });
    const active = document.getElementById(`filter-${subject}`);
    if (active) active.className = 'btn btn-primary btn-sm';

    const container = document.getElementById('topics-container');
    if (container) {
      container.style.opacity = '0';
      setTimeout(() => {
        container.innerHTML = this.renderTopicsSection();
        container.style.transition = 'opacity 0.3s ease';
        container.style.opacity = '1';
      }, 150);
    }
  },

  openTopic(topicId) {
    const topic = Data.getTopic(topicId);
    if (!topic) return;
    this.selectedTopicId = topicId;

    const agent = Data.getAgent(topic.subject);
    const prereqTopics = topic.prereqs.map(pid => Data.getTopic(pid)).filter(Boolean);

    const modal = document.getElementById('topic-modal');
    const content = document.getElementById('topic-modal-content');

    if (!modal || !content) return;

    const statusColor = topic.status === 'completed' ? 'var(--color-success)' :
                        topic.status === 'in_progress' ? 'var(--color-primary)' : 'var(--text-muted)';

    content.innerHTML = `
      <div class="modal-header">
        <div>
          <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-2)">
            <span style="font-size:2rem">${topic.icon}</span>
            <h2 class="modal-title">${topic.name}</h2>
          </div>
          <div style="display:flex;gap:var(--space-2)">
            <span class="badge badge-muted">${agent.fullName}</span>
            <span class="badge" style="background:${statusColor}18;color:${statusColor};border:1px solid ${statusColor}33">
              ${topic.status.replace('_',' ')}
            </span>
          </div>
        </div>
        <button class="modal-close" onclick="LearningPathPage.closeTopic()">✕</button>
      </div>
      
      <p style="font-size:var(--text-base);color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-6)">${topic.description}</p>
      
      <div class="grid-2" style="margin-bottom:var(--space-6)">
        ${[
          ['Estimated Time', `⏱ ${topic.hours} hours`],
          ['Difficulty', `${'⭐'.repeat(Math.ceil(topic.difficulty/2))} ${topic.difficulty}/10`],
          ['Category', agent.fullName],
          ['Problems', `~${Math.round(topic.hours * 3)} practice problems`],
        ].map(([label,val])=>`
          <div style="background:var(--bg-input);padding:var(--space-3) var(--space-4);border-radius:var(--radius-lg)">
            <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:2px">${label}</div>
            <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">${val}</div>
          </div>
        `).join('')}
      </div>

      ${topic.status === 'in_progress' ? `
        <div style="margin-bottom:var(--space-6)">
          <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-2)">
            <span style="font-size:var(--text-sm);font-weight:600;color:var(--text-primary)">Your Progress</span>
            <span style="font-size:var(--text-sm);font-weight:700;color:var(--color-primary-light)">${topic.progress}%</span>
          </div>
          <div class="progress-track lg">
            <div class="progress-fill" style="width:${topic.progress}%"></div>
          </div>
        </div>
      ` : ''}

      ${prereqTopics.length ? `
        <div style="margin-bottom:var(--space-6)">
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary);margin-bottom:var(--space-3)">Prerequisites</div>
          <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
            ${prereqTopics.map(p=>`
              <span class="badge ${p.status==='completed'?'badge-completed':'badge-locked'}">${p.icon} ${p.name}</span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div style="display:flex;gap:var(--space-3)">
        <button class="btn btn-ghost" style="flex:1" onclick="LearningPathPage.closeTopic()">Close</button>
        ${topic.status === 'not_started' ? `
          <button class="btn btn-primary" style="flex:2" onclick="LearningPathPage.closeTopic();App.navigate('chat');setTimeout(()=>ChatPage.selectAgent('${topic.subject}'),100)">
            🚀 Start with ${agent.name}
          </button>
        ` : `
          <button class="btn btn-primary" style="flex:2" onclick="LearningPathPage.closeTopic();App.navigate('chat');setTimeout(()=>ChatPage.selectAgent('${topic.subject}'),100)">
            ${topic.status === 'completed' ? '🔄 Review Topic' : '⚡ Continue Learning'}
          </button>
        `}
      </div>
    `;

    modal.style.display = 'flex';
  },

  closeTopic() {
    const modal = document.getElementById('topic-modal');
    if (modal) modal.style.display = 'none';
  },

  init() {
    // Animate progress bar
    setTimeout(() => {
      const bar = document.getElementById('path-progress-bar');
      const completed = Data.topics.filter(t => t.status === 'completed').length;
      if (bar) bar.style.width = `${Math.round(completed / Data.topics.length * 100)}%`;
    }, 300);

    // Close modal on overlay click
    const modal = document.getElementById('topic-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeTopic();
      });
    }
  }
};

window.LearningPathPage = LearningPathPage;
