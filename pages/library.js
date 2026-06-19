/* ============================================================
   MentorAI — Resource Library Page
   ============================================================ */

const LibraryPage = {
  searchQuery: '',
  activeType: 'all',
  bookmarks: Utils.storage.get('mentor_bookmarks', []),

  types: [
    { id:'all',      label:'All',      icon:'📚' },
    { id:'video',    label:'Videos',   icon:'🎬' },
    { id:'article',  label:'Articles', icon:'📄' },
    { id:'problem',  label:'Problems', icon:'🧩' },
    { id:'template', label:'Templates',icon:'📋' },
  ],

  render() {
    return `
      <div class="page animate-fade-in-up">
        <div class="page-header">
          <h1 class="page-title">Resource Library 📚</h1>
          <p class="page-subtitle">Curated content to supplement your learning journey</p>
        </div>

        <!-- Search + Filters -->
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-2xl);padding:var(--space-5);margin-bottom:var(--space-6)">
          <!-- Search bar -->
          <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) var(--space-4);background:var(--bg-input);border:1.5px solid var(--border-default);border-radius:var(--radius-xl);margin-bottom:var(--space-4);transition:all var(--transition-fast)"
            onfocusin="this.style.borderColor='var(--color-primary)'" onfocusout="this.style.borderColor='var(--border-default)'">
            <span style="color:var(--text-muted);font-size:1rem">🔍</span>
            <input type="text" id="lib-search" placeholder="Search resources, topics, tags..."
              class="input" style="border:none;background:none;padding:0;font-size:var(--text-base)"
              value="${this.searchQuery}"
              oninput="LibraryPage.handleSearch(this.value)">
            ${this.searchQuery ? `<button onclick="LibraryPage.clearSearch()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem">✕</button>` : ''}
          </div>

          <!-- Type Filters -->
          <div style="display:flex;gap:var(--space-2);flex-wrap:wrap">
            ${this.types.map(t=>`
              <button class="btn btn-sm ${t.id===this.activeType?'btn-primary':'btn-ghost'}" 
                id="lib-type-${t.id}"
                onclick="LibraryPage.filterType('${t.id}')">
                ${t.icon} ${t.label}
              </button>
            `).join('')}
            <div style="flex:1"></div>
            <span style="font-size:var(--text-sm);color:var(--text-muted);display:flex;align-items:center">
              ${this.getFiltered().length} resources
            </span>
          </div>
        </div>

        <!-- Recommended -->
        ${!this.searchQuery && this.activeType === 'all' ? `
          <div style="margin-bottom:var(--space-8)">
            <div class="section-header" style="margin-bottom:var(--space-4)">
              <h3 class="section-title">⭐ Recommended for You</h3>
              <span style="font-size:var(--text-sm);color:var(--text-muted)">Based on your learning path</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:var(--space-4)">
              ${Data.resources.slice(0,3).map(r => this.renderResourceCard(r, true)).join('')}
            </div>
          </div>
        ` : ''}

        <!-- All Resources -->
        <div>
          <div class="section-header" style="margin-bottom:var(--space-4)">
            <h3 class="section-title">${this.searchQuery ? `Results for "${this.searchQuery}"` : this.activeType === 'all' ? 'All Resources' : this.types.find(t=>t.id===this.activeType)?.label}</h3>
          </div>
          <div id="resources-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:var(--space-4)">
            ${this.renderResources()}
          </div>
        </div>
      </div>
    `;
  },

  getFiltered() {
    let resources = Data.resources;
    if (this.activeType !== 'all') resources = resources.filter(r => r.type === this.activeType);
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      resources = resources.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.desc.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.subject.toLowerCase().includes(q)
      );
    }
    return resources;
  },

  renderResources() {
    const resources = this.getFiltered();
    if (resources.length === 0) {
      return `
        <div class="empty-state" style="grid-column:1/-1">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No resources found</div>
          <div class="empty-state-desc">Try a different search term or category</div>
          <button class="btn btn-ghost btn-sm" onclick="LibraryPage.clearSearch()">Clear filters</button>
        </div>
      `;
    }
    return resources.map(r => this.renderResourceCard(r)).join('');
  },

  renderResourceCard(resource, recommended = false) {
    const isBookmarked = this.bookmarks.includes(resource.id);
    const subjectColor = {
      coding: '#3B82F6', math: '#8B5CF6', writing: '#10B981', datascience: '#F97316', general: '#06B6D4'
    }[resource.subject] || '#6B7280';

    const typeIcon = { video:'🎬', article:'📄', problem:'🧩', template:'📋' }[resource.type] || '📁';

    const difficultyLabel = resource.difficulty <= 3 ? 'Beginner' : resource.difficulty <= 6 ? 'Intermediate' : 'Advanced';
    const difficultyColor = resource.difficulty <= 3 ? 'var(--color-success)' : resource.difficulty <= 6 ? 'var(--color-warning)' : 'var(--color-danger)';

    return `
      <div class="resource-card stagger-children" style="${recommended ? 'border-color:rgba(249,115,22,0.25);background:linear-gradient(145deg,rgba(249,115,22,0.04),var(--bg-card))' : ''}">
        <div class="resource-icon" style="background:${subjectColor}15">
          <span>${typeIcon}</span>
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-2)">
            <div class="resource-card-title">${resource.title}</div>
            <button class="btn btn-ghost btn-sm" style="flex-shrink:0;padding:4px 8px;font-size:var(--text-base)"
              onclick="LibraryPage.toggleBookmark('${resource.id}', this)"
              title="${isBookmarked ? 'Remove bookmark' : 'Bookmark'}">
              ${isBookmarked ? '🔖' : '📌'}
            </button>
          </div>
          <div class="resource-card-desc">${resource.desc}</div>
          <div class="resource-card-meta">
            <span class="badge badge-muted" style="font-size:.65rem">${typeIcon} ${resource.type}</span>
            <span style="font-size:var(--text-xs);color:${difficultyColor};font-weight:600">${difficultyLabel}</span>
            ${resource.durationMin ? `<span style="font-size:var(--text-xs);color:var(--text-muted)">⏱ ${resource.durationMin}m</span>` : ''}
          </div>
          <div style="display:flex;gap:var(--space-1);margin-top:var(--space-2);flex-wrap:wrap">
            ${resource.tags.map(t=>`<span class="badge badge-muted" style="font-size:.65rem">${t}</span>`).join('')}
          </div>
          <div style="margin-top:var(--space-3)">
            <button class="btn btn-primary btn-sm" style="width:100%" onclick="LibraryPage.openResource('${resource.id}')">
              ${resource.type === 'video' ? '▶ Watch' : resource.type === 'problem' ? '🧩 Practice' : resource.type === 'template' ? '📋 Use Template' : '📖 Read'} →
            </button>
          </div>
        </div>
      </div>
    `;
  },

  handleSearch: Utils.debounce(function(query) {
    LibraryPage.searchQuery = query;
    LibraryPage.refreshGrid();
  }, 250),

  clearSearch() {
    this.searchQuery = '';
    this.activeType = 'all';
    const input = document.getElementById('lib-search');
    if (input) input.value = '';
    this.refreshGrid();
  },

  filterType(type) {
    this.activeType = type;
    document.querySelectorAll('[id^="lib-type-"]').forEach(b => b.className = 'btn btn-sm btn-ghost');
    const active = document.getElementById(`lib-type-${type}`);
    if (active) active.className = 'btn btn-sm btn-primary';
    this.refreshGrid();
  },

  refreshGrid() {
    const grid = document.getElementById('resources-grid');
    if (!grid) return;
    grid.style.opacity = '0';
    setTimeout(() => {
      grid.innerHTML = this.renderResources();
      grid.style.transition = 'opacity 0.2s';
      grid.style.opacity = '1';
    }, 120);
  },

  toggleBookmark(id, btn) {
    const idx = this.bookmarks.indexOf(id);
    if (idx === -1) {
      this.bookmarks.push(id);
      btn.textContent = '🔖';
      Utils.showToast('Bookmarked!', 'success');
    } else {
      this.bookmarks.splice(idx, 1);
      btn.textContent = '📌';
      Utils.showToast('Bookmark removed', 'info');
    }
    Utils.storage.set('mentor_bookmarks', this.bookmarks);
  },

  openResource(id) {
    const resource = Data.resources.find(r => r.id === id);
    if (!resource) return;
    // Show a brief "opening" toast and track it
    const labels = { video:'Opening video', article:'Opening article', problem:'Loading problem', template:'Loading template' };
    Utils.showToast(`${labels[resource.type] || 'Opening'}: ${resource.title}`, 'info');
    // In a real app: navigate to resource or open modal
  },

  init() {}
};

window.LibraryPage = LibraryPage;
