/* ============================================================
   MentorAI — App Router & State Manager
   ============================================================ */

const App = {
  currentPage: null,
  isDarkMode: true,
  sidebarCollapsed: false,

  // Page registry
  pages: {
    landing:       { module: () => LandingPage,       title: 'MentorAI — Learn Anything with AI',    hasShell: false },
    onboarding:    { module: () => OnboardingPage,    title: 'Get Started — MentorAI',               hasShell: false },
    dashboard:     { module: () => DashboardPage,     title: 'Dashboard — MentorAI',                 hasShell: true, navLabel: 'Dashboard',     navIcon: '📊' },
    chat:          { module: () => ChatPage,          title: 'AI Chat — MentorAI',                   hasShell: true, navLabel: 'Chat',          navIcon: '💬' },
    editor:        { module: () => EditorPage,        title: 'Code Editor — MentorAI',               hasShell: true, navLabel: 'Code Editor',   navIcon: '💻' },
    'learning-path':{ module: () => LearningPathPage, title: 'Learning Path — MentorAI',             hasShell: true, navLabel: 'Learning Path', navIcon: '🗺️' },
    progress:      { module: () => ProgressPage,      title: 'Progress — MentorAI',                  hasShell: true, navLabel: 'Progress',      navIcon: '📈' },
    library:       { module: () => LibraryPage,       title: 'Library — MentorAI',                   hasShell: true, navLabel: 'Library',       navIcon: '📚' },
  },

  // ── Boot ────────────────────────────────────────────────────
  init() {
    // Load theme preference
    const savedTheme = Utils.storage.get('mentor_theme', 'dark');
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    // Load sidebar state
    this.sidebarCollapsed = Utils.storage.get('mentor_sidebar_collapsed', false);

    // Initial route
    const hash = window.location.hash.slice(1) || 'landing';
    this.navigate(hash, true);

    // Hash change listener
    window.addEventListener('hashchange', () => {
      const page = window.location.hash.slice(1);
      if (page && page !== this.currentPage) {
        this.navigate(page, true);
      }
    });
  },

  // ── Navigate ─────────────────────────────────────────────────
  navigate(pageName, fromHash = false) {
    const page = this.pages[pageName] || this.pages['landing'];

    // Update URL
    if (!fromHash) {
      window.location.hash = pageName;
      return; // hashchange will call navigate again
    }

    this.currentPage = pageName;
    document.title = page.title;

    if (page.hasShell) {
      this.renderShell(pageName);
    } else {
      this.renderFullPage(pageName);
    }
  },

  // ── Render full page (no sidebar) ───────────────────────────
  renderFullPage(pageName) {
    const shell = document.getElementById('app-shell');
    const pageMod = this.pages[pageName].module();
    shell.innerHTML = pageMod.render();
    pageMod.init?.();
    window.scrollTo(0, 0);
  },

  // ── Render with shell (sidebar + header) ────────────────────
  renderShell(pageName) {
    const shell = document.getElementById('app-shell');
    const pageMod = this.pages[pageName].module();

    shell.innerHTML = `
      ${this.renderSidebar(pageName)}
      <div class="main-content ${this.sidebarCollapsed ? 'sidebar-collapsed' : ''}" id="main-content">
        ${this.renderHeader(pageName)}
        <div id="page-content">
          ${pageMod.render()}
        </div>
      </div>
    `;

    // Bind sidebar events
    this.bindSidebarEvents();
    pageMod.init?.();
    window.scrollTo(0, 0);
  },

  // ── Sidebar ──────────────────────────────────────────────────
  renderSidebar(activePage) {
    const navItems = [
      { page: 'dashboard',     icon: '📊', label: 'Dashboard'     },
      { page: 'chat',          icon: '💬', label: 'AI Chat',       badge: 'New' },
      { page: 'editor',        icon: '💻', label: 'Code Editor'   },
      { page: 'learning-path', icon: '🗺️', label: 'Learning Path' },
      { page: 'progress',      icon: '📈', label: 'Progress'      },
      { page: 'library',       icon: '📚', label: 'Library'       },
    ];

    return `
      <aside class="sidebar ${this.sidebarCollapsed ? 'collapsed' : ''}" id="sidebar">
        <!-- Logo -->
        <a class="sidebar-logo" onclick="App.navigate('landing')" style="cursor:pointer;text-decoration:none">
          <div class="sidebar-logo-icon">M</div>
          <span class="sidebar-logo-text">MentorAI</span>
        </a>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <div class="nav-section-title">Main</div>
          ${navItems.slice(0,3).map(item => `
            <button class="nav-item ${activePage === item.page ? 'active' : ''}" 
              id="nav-${item.page}"
              onclick="App.navigate('${item.page}')">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </button>
          `).join('')}

          <div class="nav-section-title" style="margin-top:var(--space-4)">Learning</div>
          ${navItems.slice(3).map(item => `
            <button class="nav-item ${activePage === item.page ? 'active' : ''}"
              id="nav-${item.page}"
              onclick="App.navigate('${item.page}')">
              <span class="nav-icon">${item.icon}</span>
              <span class="nav-label">${item.label}</span>
            </button>
          `).join('')}
        </nav>

        <!-- Footer -->
        <div class="sidebar-footer">
          <!-- Streak indicator -->
          <div style="padding:var(--space-2) var(--space-3);opacity:${this.sidebarCollapsed?0:1};transition:opacity var(--transition-base);pointer-events:${this.sidebarCollapsed?'none':'auto'}">
            <div class="streak-badge" style="width:100%;justify-content:center">
              <span class="streak-fire">🔥</span>
              <span>${Data.user.streak} day streak</span>
            </div>
          </div>

          <!-- User -->
          <div class="sidebar-user">
            <div class="user-avatar">${Data.user.initials}</div>
            <div class="sidebar-user-info">
              <div class="user-name">${Data.user.name}</div>
              <div class="user-plan">${Data.user.plan} Plan</div>
            </div>
          </div>

          <!-- Collapse toggle -->
          <button class="sidebar-collapse-btn" id="sidebar-toggle" onclick="App.toggleSidebar()" title="${this.sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}">
            ${this.sidebarCollapsed ? '→' : '←'}
          </button>
        </div>
      </aside>
    `;
  },

  // ── Header ───────────────────────────────────────────────────
  renderHeader(pageName) {
    const pageMeta = this.pages[pageName];
    const titles = {
      dashboard: 'Dashboard',
      chat: 'AI Chat',
      editor: 'Code Editor',
      'learning-path': 'Learning Path',
      progress: 'Progress',
      library: 'Resource Library'
    };

    return `
      <header class="top-header">
        <div class="header-title">${titles[pageName] || ''}</div>
        <div class="header-search">
          <span class="header-search-icon">🔍</span>
          <input type="text" placeholder="Search topics, problems..." 
            onkeydown="if(event.key==='Enter'&&this.value){App.navigate('library');}" />
        </div>
        <div class="header-actions">
          <!-- Theme toggle -->
          <button class="theme-btn" onclick="App.toggleTheme()" title="Toggle theme" id="theme-btn">
            ${this.isDarkMode ? '☀️' : '🌙'}
          </button>
          <!-- Notifications -->
          <button class="notif-btn" onclick="App.showNotifs()">
            🔔
            <div class="notif-dot"></div>
          </button>
          <!-- User avatar -->
          <div class="user-avatar" style="cursor:pointer" onclick="App.navigate('progress')">${Data.user.initials}</div>
        </div>
      </header>
    `;
  },

  // ── Sidebar Events ───────────────────────────────────────────
  bindSidebarEvents() {
    // Allow Escape key to close mobile menu
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('mobile-open');
      }
    });
  },

  // ── Toggle Sidebar ───────────────────────────────────────────
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    Utils.storage.set('mentor_sidebar_collapsed', this.sidebarCollapsed);

    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const toggleBtn = document.getElementById('sidebar-toggle');

    if (sidebar) sidebar.classList.toggle('collapsed', this.sidebarCollapsed);
    if (mainContent) mainContent.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
    if (toggleBtn) toggleBtn.textContent = this.sidebarCollapsed ? '→' : '←';
  },

  // ── Toggle Theme ─────────────────────────────────────────────
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    Utils.storage.set('mentor_theme', this.isDarkMode ? 'dark' : 'light');

    const btn = document.getElementById('theme-btn');
    if (btn) btn.textContent = this.isDarkMode ? '☀️' : '🌙';

    Utils.showToast(`${this.isDarkMode ? 'Dark' : 'Light'} mode activated`, 'info', 2000);
  },

  // ── Notifications ────────────────────────────────────────────
  showNotifs() {
    Utils.showToast('🔔 New achievement unlocked: Week Warrior! You have a 7-day streak.', 'success', 5000);
  },
};

// Boot the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());

window.App = App;
