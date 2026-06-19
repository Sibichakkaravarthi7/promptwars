/* ============================================================
   MentorAI — Landing Page
   ============================================================ */

const LandingPage = {
  render() {
    return `
      <!-- Landing Nav -->
      <nav class="landing-nav animate-fade-in">
        <a class="sidebar-logo" href="#" onclick="App.navigate('landing')" style="text-decoration:none;border:none;padding:0;min-height:auto">
          <div class="sidebar-logo-icon">M</div>
          <span class="sidebar-logo-text" style="-webkit-text-fill-color:white;background:none">MentorAI</span>
        </a>
        <div style="display:flex;align-items:center;gap:var(--space-8);font-size:var(--text-sm);color:var(--text-secondary)">
          <a href="#features-section"   onclick="document.getElementById('features-section').scrollIntoView({behavior:'smooth'});return false" style="color:var(--text-secondary);transition:color var(--transition-fast)" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">Features</a>
          <a href="#agents-section"     onclick="document.getElementById('agents-section').scrollIntoView({behavior:'smooth'});return false" style="color:var(--text-secondary);transition:color var(--transition-fast)" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">Agents</a>
          <a href="#pricing-section"    onclick="document.getElementById('pricing-section').scrollIntoView({behavior:'smooth'});return false" style="color:var(--text-secondary);transition:color var(--transition-fast)" onmouseover="this.style.color='var(--text-primary)'" onmouseout="this.style.color='var(--text-secondary)'">Pricing</a>
        </div>
        <div style="display:flex;gap:var(--space-3)">
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('onboarding')">Sign in</button>
          <button class="btn btn-primary btn-sm" onclick="App.navigate('onboarding')">Get Started Free</button>
        </div>
      </nav>

      <!-- Hero -->
      <section class="landing-hero">
        <div class="bg-particles">
          ${Array.from({length:8},(_,i)=>`<div class="particle" style="width:${4+i*2}px;height:${4+i*2}px;background:${['#3B82F6','#8B5CF6','#10B981','#06B6D4'][i%4]};left:${10+i*12}%;top:${20+i*8}%;--duration:${5+i}s;--delay:${i*0.7}s;opacity:0.15"></div>`).join('')}
        </div>
        <div class="hero-content stagger-children">
          <div class="badge badge-primary" style="margin:0 auto var(--space-6);font-size:var(--text-sm);padding:.5rem 1.25rem">
            🚀 Multi-Agent AI Tutoring Platform
          </div>
          <h1 style="font-size:clamp(2.5rem,6vw,5rem);font-weight:900;line-height:1.05;margin-bottom:var(--space-6)">
            Learn Anything with Your<br>
            <span class="gradient-text-animated">AI Expert Mentors</span>
          </h1>
          <p style="font-size:var(--text-xl);color:var(--text-secondary);max-width:660px;margin:0 auto var(--space-8);line-height:1.7">
            5 specialized AI agents — Coding, Math, Writing, Data Science & more —
            available 24/7 to give you personalized, expert-level tutoring.
          </p>
          <div style="display:flex;gap:var(--space-4);justify-content:center;flex-wrap:wrap">
            <button class="btn btn-primary btn-lg" id="hero-cta" onclick="App.navigate('onboarding')" style="font-size:1.05rem;padding:1rem 2.5rem">
              Start Learning Free
              <span>→</span>
            </button>
            <button class="btn btn-ghost btn-lg" onclick="App.navigate('dashboard')" style="font-size:1.05rem">
              View Demo Dashboard
            </button>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-8);margin-top:var(--space-12);flex-wrap:wrap">
            ${[['20K+','Students learning'],['4.9★','Average rating'],['24/7','AI availability'],['50+','Topics covered']].map(([v,l])=>`
              <div style="text-align:center">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--text-primary)">${v}</div>
                <div style="font-size:var(--text-xs);color:var(--text-muted)">${l}</div>
              </div>
            `).join('<div style="width:1px;height:32px;background:var(--border-subtle)"></div>')}
          </div>
        </div>
      </section>

      <!-- Features -->
      <section id="features-section" style="padding:var(--space-24) var(--space-8);background:var(--bg-surface)">
        <div style="max-width:1100px;margin:0 auto">
          <div style="text-align:center;margin-bottom:var(--space-16)">
            <div class="badge badge-secondary" style="margin:0 auto var(--space-4)">Why MentorAI</div>
            <h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:var(--space-4)">Everything you need to master any skill</h2>
            <p style="font-size:var(--text-lg);color:var(--text-muted);max-width:520px;margin:0 auto">Built for serious learners who want more than just answers — they want to truly understand.</p>
          </div>
          <div class="grid-3 stagger-children">
            ${[
              ['💬','Real-time AI Chat','Ask anything and get expert-level explanations instantly. Each agent specializes in their domain for maximum accuracy.'],
              ['💻','Code Execution','Write, run, and debug code directly in the browser. Get instant feedback on your solutions.'],
              ['📊','Adaptive Learning','Our AI adjusts difficulty based on your performance, always keeping you in the optimal challenge zone.'],
              ['🗺️','Personalized Paths','Get a custom learning roadmap built around your goals, timeline, and current skill level.'],
              ['📈','Progress Tracking',"Visual analytics show exactly where you are, how far you've come, and where to focus next."],
              ['🏆','Gamification','Earn achievements, maintain streaks, and compete on leaderboards to stay motivated.'],
            ].map(([icon,title,desc])=>`
              <div class="card card-hover" style="position:relative;overflow:hidden">
                <div style="font-size:2rem;margin-bottom:var(--space-4);width:56px;height:56px;display:flex;align-items:center;justify-content:center;background:rgba(59,130,246,0.1);border-radius:var(--radius-xl)">${icon}</div>
                <h3 style="font-size:var(--text-lg);font-weight:700;margin-bottom:var(--space-2)">${title}</h3>
                <p style="font-size:var(--text-sm);color:var(--text-muted);line-height:1.6">${desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Agents Showcase -->
      <section id="agents-section" style="padding:var(--space-24) var(--space-8)">
        <div style="max-width:1100px;margin:0 auto">
          <div style="text-align:center;margin-bottom:var(--space-16)">
            <div class="badge badge-success" style="margin:0 auto var(--space-4)">Meet Your Mentors</div>
            <h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:var(--space-4)">5 Specialized AI Agents</h2>
            <p style="font-size:var(--text-lg);color:var(--text-muted);max-width:520px;margin:0 auto">Each agent is trained to provide deep, domain-specific expertise — not generic answers.</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:var(--space-5)" class="stagger-children">
            ${Data.agents.map(a => `
              <div class="card card-hover" style="border-color:${a.color}22;background:linear-gradient(145deg,${a.color}08,var(--bg-card))" onclick="App.navigate('chat');setTimeout(()=>window.ChatPage&&ChatPage.selectAgent('${a.id}'),100)">
                <div style="display:flex;align-items:center;gap:var(--space-4);margin-bottom:var(--space-4)">
                  <div class="agent-avatar agent-avatar-lg ${a.colorClass}">${a.icon}</div>
                  <div>
                    <div style="font-size:var(--text-lg);font-weight:700;color:var(--text-primary)">${a.name}</div>
                    <div style="font-size:var(--text-xs);color:${a.color};font-weight:600">${a.fullName}</div>
                  </div>
                </div>
                <p style="font-size:var(--text-sm);color:var(--text-muted);line-height:1.6;margin-bottom:var(--space-4)">${a.description}</p>
                <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
                  ${a.specialty.split(', ').slice(0,3).map(s=>`<span class="badge badge-muted">${s}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Pricing -->
      <section id="pricing-section" style="padding:var(--space-24) var(--space-8);background:var(--bg-surface)">
        <div style="max-width:1000px;margin:0 auto">
          <div style="text-align:center;margin-bottom:var(--space-16)">
            <div class="badge badge-warning" style="margin:0 auto var(--space-4)">Simple Pricing</div>
            <h2 style="font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:var(--space-4)">Invest in your future</h2>
            <p style="font-size:var(--text-lg);color:var(--text-muted)">Way more affordable than $50-150/hour human tutors.</p>
          </div>
          <div class="pricing-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-5)">
            ${[
              { plan:'Free', price:'0', period:'forever', desc:'Perfect to get started', featured:false, cta:'Start Free',
                features:[['5 chats/day','check'],['1 code run/day','check'],['2 agents','check'],['Basic analytics','check'],['Study groups','cross'],['Priority support','cross']]},
              { plan:'Pro', price:'9.99', period:'/month', desc:'For serious learners', featured:true, cta:'Start Pro Trial',
                features:[['Unlimited chats','check'],['Unlimited code runs','check'],['All 5 agents','check'],['Advanced analytics','check'],['Study groups','check'],['Priority support','cross']]},
              { plan:'Premium', price:'29.99', period:'/month', desc:'Maximum acceleration', featured:false, cta:'Go Premium',
                features:[['Everything in Pro','check'],['1:1 human mentoring','check'],['Certifications','check'],['Interview prep mode','check'],['Custom learning path','check'],['Priority 24/7 support','check']]},
            ].map(p=>`
              <div class="pricing-card ${p.featured?'featured':''}">
                ${p.featured?'<div class="pricing-badge">Most Popular</div>':''}
                <div class="pricing-plan">${p.plan}</div>
                <div class="pricing-price">$${p.price}<span>${p.period}</span></div>
                <div class="pricing-desc">${p.desc}</div>
                <ul class="pricing-features">
                  ${p.features.map(([f,t])=>`<li class="pricing-feature"><span class="${t}">${t==='check'?'✓':'✗'}</span>${f}</li>`).join('')}
                </ul>
                <button class="btn ${p.featured?'btn-primary':'btn-ghost'} w-full" style="width:100%" onclick="App.navigate('onboarding')">${p.cta}</button>
              </div>
            `).join('')}
          </div>
          <p style="text-align:center;margin-top:var(--space-6);font-size:var(--text-sm);color:var(--text-muted)">
            🎓 50% student discount with .edu email · 30-day money-back guarantee
          </p>
        </div>
      </section>

      <!-- Testimonials -->
      <section style="padding:var(--space-24) var(--space-8)">
        <div style="max-width:1100px;margin:0 auto">
          <h2 style="font-size:clamp(1.75rem,3.5vw,2.5rem);font-weight:800;text-align:center;margin-bottom:var(--space-12)">Loved by 20,000+ learners</h2>
          <div class="grid-3 stagger-children">
            ${[
              { name:'Sarah K.', role:'CS Student → SWE Intern', text:'MentorAI\'s CodeMentor helped me crack Google\'s interview! The adaptive problems are incredible.', rating:5, avatar:'SK' },
              { name:'James M.', role:'Career Changer → Data Analyst', text:'DataSage explained pandas in a way my bootcamp instructor couldn\'t. Landed my first data job in 3 months!', rating:5, avatar:'JM' },
              { name:'Priya R.', role:'High Schooler', text:'MathGenius helped me go from C+ to A in calculus. Step-by-step explanations are better than any tutor.', rating:5, avatar:'PR' },
            ].map(t=>`
              <div class="card" style="position:relative">
                <div style="display:flex;gap:2px;margin-bottom:var(--space-4)">${'⭐'.repeat(t.rating)}</div>
                <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.7;margin-bottom:var(--space-5);font-style:italic">"${t.text}"</p>
                <div style="display:flex;align-items:center;gap:var(--space-3)">
                  <div class="user-avatar">${t.avatar}</div>
                  <div>
                    <div style="font-size:var(--text-sm);font-weight:700;color:var(--text-primary)">${t.name}</div>
                    <div style="font-size:var(--text-xs);color:var(--text-muted)">${t.role}</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Final CTA -->
      <section style="padding:var(--space-24) var(--space-8);background:var(--bg-surface)">
        <div style="max-width:700px;margin:0 auto;text-align:center">
          <h2 style="font-size:clamp(2rem,4vw,3.5rem);font-weight:900;margin-bottom:var(--space-4)">
            Ready to level up?<br>
            <span class="gradient-text-animated">Start learning today.</span>
          </h2>
          <p style="font-size:var(--text-lg);color:var(--text-muted);margin-bottom:var(--space-8)">
            Join 20,000+ learners who are mastering new skills 60% faster with AI mentorship.
          </p>
          <button class="btn btn-primary btn-lg glow-border" onclick="App.navigate('onboarding')" style="font-size:1.1rem;padding:1.1rem 3rem">
            Get Started for Free →
          </button>
          <p style="margin-top:var(--space-4);font-size:var(--text-sm);color:var(--text-muted)">No credit card required · Free forever plan available</p>
        </div>
      </section>

      <!-- Footer -->
      <footer style="padding:var(--space-8);border-top:1px solid var(--border-subtle);text-align:center">
        <div style="display:flex;align-items:center;justify-content:center;gap:var(--space-3);margin-bottom:var(--space-4)">
          <div class="sidebar-logo-icon" style="width:28px;height:28px;font-size:0.875rem">M</div>
          <span style="font-family:var(--font-heading);font-weight:800;color:var(--text-primary)">MentorAI</span>
        </div>
        <p style="font-size:var(--text-sm);color:var(--text-muted)">© 2026 MentorAI. Built with ❤️ for lifelong learners.</p>
      </footer>
    `;
  },

  init() {
    // Ensure nav hides on scroll for smooth UX — already in CSS
  }
};

window.LandingPage = LandingPage;
