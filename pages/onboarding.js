/* ============================================================
   MentorAI — Onboarding Wizard (5 Steps)
   ============================================================ */

const OnboardingPage = {
  currentStep: 1,
  totalSteps: 5,
  profile: {
    subjects: [],
    skillLevel: '',
    goal: '',
    timeline: '3',
    weeklyHours: '5',
    learningStyle: '',
    agents: [],
    communicationStyle: 'casual'
  },

  render() {
    return `
      <div class="onboarding-shell" id="onboarding-shell">
        <div class="bg-particles">
          ${Array.from({length:6},(_,i)=>`<div class="particle" style="width:${6+i*3}px;height:${6+i*3}px;background:${['#3B82F6','#8B5CF6'][i%2]};left:${5+i*17}%;top:${15+i*12}%;--duration:${6+i}s;--delay:${i*0.5}s;opacity:0.1"></div>`).join('')}
        </div>
        <div class="onboarding-card animate-scale-in" id="onboarding-card">
          <div id="onboarding-content">
            ${this.renderStep(1)}
          </div>
        </div>
      </div>
    `;
  },

  renderStep(step) {
    const steps = {
      1: this.renderStep1(),
      2: this.renderStep2(),
      3: this.renderStep3(),
      4: this.renderStep4(),
      5: this.renderStep5(),
    };
    return `
      <div class="step-indicator">
        ${Array.from({length:this.totalSteps},(_,i)=>`
          <div class="step-dot ${i+1===step?'active':i+1<step?'done':''}" id="step-dot-${i+1}"></div>
          ${i<this.totalSteps-1?'<div class="step-line"></div>':''}
        `).join('')}
      </div>
      <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-6)">Step ${step} of ${this.totalSteps}</div>
      ${steps[step]}
    `;
  },

  renderStep1() {
    const subjects = [
      { id:'coding',       icon:'💻', label:'Programming',  desc:'Python, JS, Java...'   },
      { id:'math',         icon:'📐', label:'Mathematics',  desc:'Algebra, Calculus...'  },
      { id:'writing',      icon:'✍️', label:'Writing',       desc:'Essays, Academic...'   },
      { id:'datascience',  icon:'📊', label:'Data Science', desc:'ML, pandas, SQL...'    },
      { id:'general',      icon:'🌍', label:'General',       desc:'Anything & everything' },
    ];
    return `
      <div>
        <h2 style="font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-2)">What do you want to learn?</h2>
        <p style="color:var(--text-muted);margin-bottom:var(--space-8)">Select all subjects you're interested in. You can always change this later.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);margin-bottom:var(--space-8)" id="subject-grid">
          ${subjects.map(s => `
            <button class="subject-btn card card-hover" id="subj-${s.id}"
              onclick="OnboardingPage.toggleSubject('${s.id}', this)"
              style="text-align:left;cursor:pointer;border:1.5px solid var(--border-subtle);transition:all var(--transition-fast);display:flex;align-items:center;gap:var(--space-3)">
              <span style="font-size:1.5rem;width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border-radius:var(--radius-lg)">${s.icon}</span>
              <div>
                <div style="font-weight:700;color:var(--text-primary)">${s.label}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted)">${s.desc}</div>
              </div>
            </button>
          `).join('')}
        </div>
        <button class="btn btn-primary" style="width:100%;padding:.875rem" onclick="OnboardingPage.nextStep()">
          Continue →
        </button>
      </div>
    `;
  },

  renderStep2() {
    const levels = [
      { id:'beginner',     icon:'🌱', label:'Beginner',     desc:'Just getting started, little to no experience' },
      { id:'intermediate', icon:'🌿', label:'Intermediate', desc:'Have basics down, want to go deeper' },
      { id:'advanced',     icon:'🌳', label:'Advanced',     desc:'Comfortable with fundamentals, tackling complex topics' },
    ];
    return `
      <div>
        <h2 style="font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-2)">What's your skill level?</h2>
        <p style="color:var(--text-muted);margin-bottom:var(--space-8)">This helps us personalize problem difficulty and explanations for you.</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-8)">
          ${levels.map(l => `
            <button class="level-btn card card-hover" id="level-${l.id}"
              onclick="OnboardingPage.selectLevel('${l.id}', this)"
              style="text-align:left;cursor:pointer;border:1.5px solid var(--border-subtle);display:flex;align-items:center;gap:var(--space-4)">
              <span style="font-size:2rem;width:52px;height:52px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border-radius:var(--radius-xl);flex-shrink:0">${l.icon}</span>
              <div style="flex:1">
                <div style="font-size:var(--text-lg);font-weight:700;color:var(--text-primary);margin-bottom:2px">${l.label}</div>
                <div style="font-size:var(--text-sm);color:var(--text-muted)">${l.desc}</div>
              </div>
              <span style="font-size:1.25rem;color:var(--text-muted);transition:color var(--transition-fast)">○</span>
            </button>
          `).join('')}
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-ghost" style="flex:1" onclick="OnboardingPage.prevStep()">← Back</button>
          <button class="btn btn-primary" style="flex:2" onclick="OnboardingPage.nextStep()">Continue →</button>
        </div>
      </div>
    `;
  },

  renderStep3() {
    return `
      <div>
        <h2 style="font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-2)">Set your learning goal</h2>
        <p style="color:var(--text-muted);margin-bottom:var(--space-8)">Clear goals lead to better outcomes. Be specific!</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-5);margin-bottom:var(--space-8)">
          <div class="form-group">
            <label class="form-label">What's your primary learning goal?</label>
            <input class="input input-lg" id="goal-input" type="text" placeholder='e.g., "Get a job as a Python developer in 6 months"' value="${this.profile.goal}" oninput="OnboardingPage.profile.goal=this.value">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4)">
            <div class="form-group">
              <label class="form-label">Timeline (months)</label>
              <select class="input select" id="timeline-select" onchange="OnboardingPage.profile.timeline=this.value">
                ${[1,2,3,6,12].map(m=>`<option value="${m}" ${m==3?'selected':''}>${m} month${m>1?'s':''}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Hours per week</label>
              <select class="input select" id="hours-select" onchange="OnboardingPage.profile.weeklyHours=this.value">
                ${[2,5,10,15,20].map(h=>`<option value="${h}" ${h==5?'selected':''}>${h}h/week</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">What specific outcomes do you want?</label>
            <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
              ${['Build a portfolio project','Get interview-ready','Pass an exam','Change careers','Upskill at work','Personal curiosity'].map(o=>`
                <button class="btn btn-ghost btn-sm outcome-btn" onclick="this.classList.toggle('btn-primary');this.classList.toggle('btn-ghost')" style="font-size:var(--text-xs)">${o}</button>
              `).join('')}
            </div>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-ghost" style="flex:1" onclick="OnboardingPage.prevStep()">← Back</button>
          <button class="btn btn-primary" style="flex:2" onclick="OnboardingPage.nextStep()">Continue →</button>
        </div>
      </div>
    `;
  },

  renderStep4() {
    const styles = [
      { id:'visual',   icon:'👁️', label:'Visual',    desc:'Diagrams, charts, visual examples' },
      { id:'textual',  icon:'📖', label:'Textual',   desc:'Detailed written explanations' },
      { id:'handson',  icon:'🛠️', label:'Hands-on',  desc:'Learn by doing with practice problems' },
    ];
    return `
      <div>
        <h2 style="font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-2)">How do you learn best?</h2>
        <p style="color:var(--text-muted);margin-bottom:var(--space-8)">We'll tailor our explanations to match your preferred learning style.</p>
        <div style="display:flex;flex-direction:column;gap:var(--space-3);margin-bottom:var(--space-8)">
          ${styles.map(s => `
            <button class="style-btn card card-hover" id="style-${s.id}"
              onclick="OnboardingPage.selectStyle('${s.id}', this)"
              style="text-align:left;cursor:pointer;border:1.5px solid var(--border-subtle);display:flex;align-items:center;gap:var(--space-4)">
              <span style="font-size:1.75rem;width:52px;height:52px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border-radius:var(--radius-xl);flex-shrink:0">${s.icon}</span>
              <div>
                <div style="font-size:var(--text-lg);font-weight:700;color:var(--text-primary)">${s.label}</div>
                <div style="font-size:var(--text-sm);color:var(--text-muted)">${s.desc}</div>
              </div>
            </button>
          `).join('')}
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-ghost" style="flex:1" onclick="OnboardingPage.prevStep()">← Back</button>
          <button class="btn btn-primary" style="flex:2" onclick="OnboardingPage.nextStep()">Continue →</button>
        </div>
      </div>
    `;
  },

  renderStep5() {
    return `
      <div>
        <h2 style="font-size:var(--text-3xl);font-weight:800;margin-bottom:var(--space-2)">Almost there! 🎉</h2>
        <p style="color:var(--text-muted);margin-bottom:var(--space-8)">Choose your preferred communication style with the AI agents.</p>
        <div style="margin-bottom:var(--space-8)">
          <div class="form-group" style="margin-bottom:var(--space-6)">
            <label class="form-label">Communication Style</label>
            <div class="tabs" id="style-tabs" style="margin-top:var(--space-2)">
              <button class="tab active" id="tab-casual" onclick="OnboardingPage.setCommStyle('casual',this)">Casual & Friendly</button>
              <button class="tab" id="tab-formal" onclick="OnboardingPage.setCommStyle('formal',this)">Formal & Professional</button>
            </div>
          </div>
          <div style="background:var(--bg-input);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:var(--space-5)">
            <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-3)">Preview — How CodeMentor will greet you:</div>
            <p id="style-preview" style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.7">
              "Hey Alex! 👋 Great to meet you! Ready to crush some code today? Let's start with something fun..."
            </p>
          </div>
        </div>
        <!-- Summary -->
        <div style="background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.15);border-radius:var(--radius-xl);padding:var(--space-5);margin-bottom:var(--space-8)">
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--color-primary-light);margin-bottom:var(--space-3)">✨ Your Learning Profile</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);font-size:var(--text-sm)">
            <div><span style="color:var(--text-muted)">Subjects: </span><span style="color:var(--text-primary);font-weight:600">${this.profile.subjects.length ? this.profile.subjects.join(', ') : 'All subjects'}</span></div>
            <div><span style="color:var(--text-muted)">Level: </span><span style="color:var(--text-primary);font-weight:600;text-transform:capitalize">${this.profile.skillLevel || 'Intermediate'}</span></div>
            <div><span style="color:var(--text-muted)">Timeline: </span><span style="color:var(--text-primary);font-weight:600">${this.profile.timeline} months</span></div>
            <div><span style="color:var(--text-muted)">Weekly time: </span><span style="color:var(--text-primary);font-weight:600">${this.profile.weeklyHours}h/week</span></div>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-ghost" style="flex:1" onclick="OnboardingPage.prevStep()">← Back</button>
          <button class="btn btn-primary" style="flex:2;background:linear-gradient(135deg,#10B981,#3B82F6)" onclick="OnboardingPage.complete()">
            🚀 Start Learning!
          </button>
        </div>
      </div>
    `;
  },

  // ── Actions ─────────────────────────────────────────────────
  toggleSubject(id, btn) {
    const idx = this.profile.subjects.indexOf(id);
    if (idx === -1) {
      this.profile.subjects.push(id);
      btn.style.borderColor = 'var(--color-primary)';
      btn.style.background = 'rgba(59,130,246,0.1)';
    } else {
      this.profile.subjects.splice(idx, 1);
      btn.style.borderColor = 'var(--border-subtle)';
      btn.style.background = '';
    }
  },

  selectLevel(id, btn) {
    this.profile.skillLevel = id;
    document.querySelectorAll('.level-btn').forEach(b => {
      b.style.borderColor = 'var(--border-subtle)';
      b.style.background = '';
      b.querySelector('span:last-child').textContent = '○';
    });
    btn.style.borderColor = 'var(--color-primary)';
    btn.style.background = 'rgba(59,130,246,0.1)';
    btn.querySelector('span:last-child').textContent = '●';
    btn.querySelector('span:last-child').style.color = 'var(--color-primary)';
  },

  selectStyle(id, btn) {
    this.profile.learningStyle = id;
    document.querySelectorAll('.style-btn').forEach(b => {
      b.style.borderColor = 'var(--border-subtle)';
      b.style.background = '';
    });
    btn.style.borderColor = 'var(--color-primary)';
    btn.style.background = 'rgba(59,130,246,0.1)';
  },

  setCommStyle(style, btn) {
    this.profile.communicationStyle = style;
    document.querySelectorAll('#style-tabs .tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const preview = document.getElementById('style-preview');
    if (preview) {
      preview.textContent = style === 'casual'
        ? '"Hey Alex! 👋 Great to meet you! Ready to crush some code today? Let\'s start with something fun..."'
        : '"Good day. I am CodeMentor, your programming tutor. I am prepared to assist you in developing your technical competencies..."';
    }
  },

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateCard();
    }
  },

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateCard();
    }
  },

  updateCard() {
    const content = document.getElementById('onboarding-content');
    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateX(20px)';
      setTimeout(() => {
        content.innerHTML = this.renderStep(this.currentStep);
        content.style.transition = 'all 0.3s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
      }, 200);
    }
  },

  complete() {
    Utils.storage.set('mentor_profile', this.profile);
    Utils.storage.set('mentor_onboarded', true);
    Utils.showToast('🎉 Profile created! Welcome to MentorAI!', 'success');
    App.navigate('dashboard');
  },

  init() {}
};

window.OnboardingPage = OnboardingPage;
