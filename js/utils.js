/* ============================================================
   MentorAI — Utility Helpers
   ============================================================ */

const Utils = {
  // Generate UUID
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  },

  // Format date
  formatDate(date, opts = {}) {
    const d = date instanceof Date ? date : new Date(date);
    if (opts.relative) return this.relativeTime(d);
    if (opts.short) return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  },

  relativeTime(date) {
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60)   return 'just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400)return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  },

  formatTime(date) {
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  },

  // Format number with K/M suffix
  formatNumber(n) {
    if (n >= 1_000_000) return (n/1_000_000).toFixed(1) + 'M';
    if (n >= 1_000)     return (n/1_000).toFixed(1) + 'K';
    return n.toString();
  },

  // Escape HTML
  escapeHtml(str) {
    const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  },

  // Debounce
  debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  },

  // Throttle
  throttle(fn, ms = 300) {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= ms) { last = now; fn(...args); }
    };
  },

  // Sleep
  sleep(ms) { return new Promise(r => setTimeout(r, ms)); },

  // Clamp
  clamp(val, min, max) { return Math.min(Math.max(val, min), max); },

  // Random int
  randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; },

  // Random choice
  randChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; },

  // Deep clone
  clone(obj) { return JSON.parse(JSON.stringify(obj)); },

  // LocalStorage helpers
  storage: {
    get(key, fallback = null) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
      catch { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); }
      catch {}
    },
    remove(key) { localStorage.removeItem(key); }
  },

  // Copy to clipboard
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    }
  },

  // Animate counter
  animateCounter(el, target, duration = 1200) {
    const start = parseInt(el.textContent) || 0;
    const range = target - start;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(start + range * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  // Observe element visibility
  onVisible(el, callback, once = true) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          callback(e.target);
          if (once) obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
    return obs;
  },

  // Render markdown-like formatting (simple)
  renderMarkdown(text) {
    if (typeof marked !== 'undefined') {
      return marked.parse(text);
    }
    // Fallback basic renderer
    return text
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) =>
        `<div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-block-lang">${lang || 'code'}</span>
            <button class="code-block-copy" onclick="Utils.copyCodeBlock(this)">📋 Copy</button>
          </div>
          <pre class="code-block-body"><code class="language-${lang || 'plaintext'}">${this.escapeHtml(code.trim())}</code></pre>
        </div>`)
      .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.08);padding:2px 6px;border-radius:4px;font-family:var(--font-code);font-size:0.9em">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g,     '<em>$1</em>')
      .replace(/^### (.+)$/gm,     '<h3 style="margin:.75rem 0 .25rem;font-size:var(--text-base);font-weight:700">$1</h3>')
      .replace(/^## (.+)$/gm,      '<h2 style="margin:1rem 0 .5rem;font-size:var(--text-lg);font-weight:700">$1</h2>')
      .replace(/^- (.+)$/gm,       '<li style="margin-bottom:.25rem;padding-left:1rem">• $1</li>')
      .replace(/\n\n/g,            '<br><br>')
      .replace(/\n/g,              '<br>');
  },

  copyCodeBlock(btn) {
    const code = btn.closest('.code-block-wrapper').querySelector('code');
    this.copyText(code.textContent).then(() => {
      btn.textContent = '✅ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = '📋 Copy'; btn.classList.remove('copied'); }, 2000);
    });
  },

  // Toast notifications
  showToast(message, type = 'success', duration = 3500) {
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const container = document.getElementById('toast-container') || (() => {
      const c = document.createElement('div');
      c.id = 'toast-container';
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${Utils.escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  // Scroll to bottom
  scrollToBottom(el, smooth = true) {
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
  }
};

// Make copyCodeBlock globally accessible
window.Utils = Utils;
