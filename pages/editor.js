/* ============================================================
   MentorAI — Code Editor Page
   ============================================================ */

const EditorPage = {
  currentLanguage: 'python',
  currentProblem: null,
  hintIndex: 0,
  cmEditor: null,
  isRunning: false,

  languages: {
    python:     { label:'Python 3',     ext:'py',  mode:'python',      template:'# Write your Python code here\n\ndef solution():\n    pass\n\n# Test your solution\nprint(solution())\n' },
    javascript: { label:'JavaScript',  ext:'js',  mode:'javascript',  template:'// Write your JavaScript code here\n\nfunction solution() {\n    // Your code here\n    return null;\n}\n\nconsole.log(solution());\n' },
    java:       { label:'Java',         ext:'java',mode:'text/x-java', template:'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n        System.out.println("Hello, World!");\n    }\n}\n' },
    sql:        { label:'SQL',          ext:'sql', mode:'text/x-sql',  template:'-- Write your SQL query here\n\nSELECT *\nFROM your_table\nWHERE condition = true\nLIMIT 10;\n' },
  },

  render() {
    const problem = Data.problems[0]; // Default first problem
    this.currentProblem = problem;

    return `
      <div class="page animate-fade-in" style="padding:var(--space-4);height:calc(100vh - 64px);display:flex;flex-direction:column;gap:var(--space-4)">
        <!-- Top bar -->
        <div style="display:flex;align-items:center;gap:var(--space-4);flex-shrink:0">
          <div>
            <h1 style="font-size:var(--text-xl);font-weight:800;color:var(--text-primary)">${problem.title}</h1>
            <div style="display:flex;align-items:center;gap:var(--space-3);margin-top:2px">
              <span class="badge badge-primary">${problem.agentType}</span>
              <span class="badge ${problem.difficulty <= 3 ? 'badge-success' : problem.difficulty <= 6 ? 'badge-warning' : 'badge-danger'}">
                Difficulty ${problem.difficulty}/10
              </span>
              <span class="badge badge-muted">${problem.type.replace('_',' ')}</span>
            </div>
          </div>
          <div style="flex:1"></div>
          <!-- Language selector -->
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <select class="input select" id="lang-select" style="width:160px" onchange="EditorPage.changeLanguage(this.value)">
              ${Object.entries(this.languages).map(([k,v])=>`<option value="${k}" ${k===this.currentLanguage?'selected':''}>${v.label}</option>`).join('')}
            </select>
            <button class="btn btn-ghost btn-sm" onclick="EditorPage.showProblem()" id="problem-toggle">📋 Problem</button>
            <button class="btn btn-success" id="run-btn" onclick="EditorPage.runCode()" style="min-width:110px">
              ▶ Run Code
            </button>
            <button class="btn btn-primary btn-sm" onclick="EditorPage.submitSolution()">Submit →</button>
          </div>
        </div>

        <!-- Main editor area -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);flex:1;overflow:hidden">
          <!-- Editor pane -->
          <div class="editor-pane">
            <div class="editor-pane-header">
              <div style="display:flex;gap:6px">
                <div style="width:12px;height:12px;border-radius:50%;background:#EF4444"></div>
                <div style="width:12px;height:12px;border-radius:50%;background:#F97316"></div>
                <div style="width:12px;height:12px;border-radius:50%;background:#10B981"></div>
              </div>
              <span class="editor-pane-title" id="file-label">solution.py</span>
              <div style="margin-left:auto;display:flex;gap:var(--space-2)">
                <button class="btn btn-ghost btn-sm" onclick="EditorPage.formatCode()" style="font-size:var(--text-xs)">Format</button>
                <button class="btn btn-ghost btn-sm" onclick="EditorPage.resetCode()" style="font-size:var(--text-xs)">Reset</button>
              </div>
            </div>
            <div class="editor-body" id="editor-body">
              <textarea id="code-textarea" style="display:none">${this.languages[this.currentLanguage].template}</textarea>
              <div id="cm-editor" style="height:100%;font-size:14px"></div>
            </div>
          </div>

          <!-- Output / Console pane -->
          <div class="editor-pane">
            <div class="editor-pane-header">
              <span class="editor-pane-title">📟 Output Console</span>
              <div style="margin-left:auto;display:flex;gap:var(--space-2)">
                <button class="btn btn-ghost btn-sm" onclick="EditorPage.clearConsole()" style="font-size:var(--text-xs)">Clear</button>
              </div>
            </div>
            <div class="console-output" id="console-output">
              <span class="info">▶ MentorAI Code Executor v1.0</span>\n<span class="prompt">Ready. Click "Run Code" to execute...</span>
            </div>
          </div>
        </div>

        <!-- Bottom panel: Problem + Test Cases + Hints -->
        <div class="editor-pane" style="flex-shrink:0;max-height:220px;overflow-y:auto" id="problem-panel">
          <div class="editor-pane-header">
            <span class="editor-pane-title">📋 Problem Description</span>
            <button class="btn btn-ghost btn-sm" onclick="EditorPage.getHint()" style="font-size:var(--text-xs)">
              💡 Hint (${this.hintIndex}/${this.currentProblem.hints.length} used)
            </button>
            <button class="btn btn-ghost btn-sm" onclick="EditorPage.loadNextProblem()" style="font-size:var(--text-xs);margin-left:auto">
              Next Problem →
            </button>
          </div>
          <div style="padding:var(--space-4);display:grid;grid-template-columns:1fr auto;gap:var(--space-6)">
            <div>
              <p style="font-size:var(--text-sm);color:var(--text-secondary);line-height:1.6;margin-bottom:var(--space-3)">${problem.description}</p>
              ${problem.starterCode ? `
                <div style="font-size:var(--text-xs);color:var(--text-muted);margin-bottom:var(--space-2)">Expected output:</div>
                <code style="font-family:var(--font-code);font-size:var(--text-xs);color:var(--color-success-light);background:rgba(16,185,129,0.1);padding:var(--space-2) var(--space-3);border-radius:var(--radius-md);display:block">${problem.expectedOutput}</code>
              ` : ''}
            </div>
            <div style="min-width:200px">
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--text-muted);margin-bottom:var(--space-2);text-transform:uppercase;letter-spacing:.05em">Tags</div>
              <div style="display:flex;flex-wrap:wrap;gap:var(--space-1)">
                ${problem.tags.map(t=>`<span class="badge badge-muted">${t}</span>`).join('')}
              </div>
              <div style="font-size:var(--text-xs);font-weight:700;color:var(--text-muted);margin-top:var(--space-4);margin-bottom:var(--space-2);text-transform:uppercase;letter-spacing:.05em">Problem Set</div>
              <div style="display:flex;flex-direction:column;gap:var(--space-1)">
                ${Data.problems.map((p,i)=>`
                  <button class="btn btn-ghost btn-sm" style="font-size:var(--text-xs);justify-content:flex-start;text-align:left" onclick="EditorPage.loadProblem(${i})"
                    ${p.id===problem.id?'style="background:rgba(59,130,246,0.1);color:var(--color-primary-light)"':''}>
                    ${i+1}. ${p.title}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // ── Initialize CodeMirror ────────────────────────────────────
  init() {
    setTimeout(() => this.initEditor(), 100);
  },

  initEditor() {
    const container = document.getElementById('cm-editor');
    const textarea = document.getElementById('code-textarea');
    if (!container) return;

    if (typeof CodeMirror !== 'undefined') {
      this.cmEditor = CodeMirror(container, {
        value: this.languages[this.currentLanguage].template,
        mode: this.languages[this.currentLanguage].mode,
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: false,
        extraKeys: {
          'Ctrl-Enter': () => this.runCode(),
          'Cmd-Enter':  () => this.runCode(),
          'Tab': cm => cm.execCommand('insertSoftTab')
        },
        gutters: ['CodeMirror-linenumbers'],
      });
      this.cmEditor.setSize('100%', '100%');

      // Load problem starter code if available
      if (this.currentProblem?.starterCode) {
        this.cmEditor.setValue(this.currentProblem.starterCode);
      }
    } else {
      // Fallback plain textarea
      container.innerHTML = `
        <textarea id="fallback-editor" style="width:100%;height:100%;background:#1e1e2e;color:#cdd6f4;font-family:var(--font-code);font-size:14px;border:none;outline:none;padding:16px;resize:none;tab-size:4">${this.currentProblem?.starterCode || this.languages[this.currentLanguage].template}</textarea>
      `;
    }
  },

  getCode() {
    if (this.cmEditor) return this.cmEditor.getValue();
    const fa = document.getElementById('fallback-editor');
    return fa ? fa.value : '';
  },

  // ── Run Code (mock execution) ────────────────────────────────
  async runCode() {
    if (this.isRunning) return;
    this.isRunning = true;

    const btn = document.getElementById('run-btn');
    if (btn) { btn.innerHTML = '<span class="spinner spinner-sm"></span> Running...'; btn.disabled = true; }

    const code = this.getCode();
    const output = document.getElementById('console-output');

    if (output) {
      output.innerHTML = `<span class="info">▶ Running ${this.languages[this.currentLanguage].label} code...</span>\n`;
    }

    await Utils.sleep(800 + Math.random() * 1200);

    const result = this.executeCode(code, this.currentLanguage);

    if (output) {
      output.innerHTML = `<span class="info">▶ Execution complete (${result.timeMs}ms)</span>\n\n<span class="prompt">$ run solution.${this.languages[this.currentLanguage].ext}</span>\n\n${result.hasError ? `<span class="stderr">${Utils.escapeHtml(result.stderr)}</span>` : `<span class="stdout">${Utils.escapeHtml(result.stdout)}</span>`}`;
      if (result.exitCode !== 0) {
        output.innerHTML += `\n\n<span class="stderr">Process exited with code ${result.exitCode}</span>`;
      } else {
        output.innerHTML += `\n\n<span class="info">✓ Process exited with code 0</span>`;
      }
    }

    if (btn) { btn.innerHTML = '▶ Run Code'; btn.disabled = false; }
    this.isRunning = false;
  },

  // Mock JS execution + stub for other languages
  executeCode(code, lang) {
    const timeMs = Utils.randInt(60, 400);

    if (lang === 'javascript') {
      try {
        const logs = [];
        const mockConsole = { log: (...a) => logs.push(a.map(String).join(' ')), error: (...a) => logs.push('ERROR: ' + a.join(' ')), warn: (...a) => logs.push('WARN: ' + a.join(' ')) };
        const fn = new Function('console', code);
        fn(mockConsole);
        return { stdout: logs.join('\n') || '(no output)', stderr: '', exitCode: 0, timeMs, hasError: false };
      } catch (e) {
        return { stdout: '', stderr: e.message, exitCode: 1, timeMs, hasError: true };
      }
    }

    // Simulate Python / Java / SQL
    const simulations = {
      python: () => {
        if (code.includes('two_sum') || code.includes('two_sum')) return { stdout: '[0, 1]\n[1, 2]\n[0, 1]', stderr:'', exitCode:0, timeMs, hasError:false };
        if (code.includes('binary_search')) return { stdout: '3\n-1\n0', stderr:'', exitCode:0, timeMs, hasError:false };
        if (code.includes('count_words') && code.includes('+= 1')) return { stdout: "{'hello': 2, 'world': 2, 'python': 1}", stderr:'', exitCode:0, timeMs, hasError:false };
        if (code.includes('count_words')) return { stdout: "{'hello': 1, 'world': 1, 'python': 1}", stderr:'', exitCode:0, timeMs, hasError:false };
        if (code.includes('print')) {
          const match = code.match(/print\(([^)]+)\)/);
          return { stdout: match ? `${match[1].replace(/['"]/g,'')}` : 'None', stderr:'', exitCode:0, timeMs, hasError:false };
        }
        return { stdout: 'None\n\n(Simulation: Python execution complete)', stderr:'', exitCode:0, timeMs, hasError:false };
      },
      java:   () => ({ stdout:'Hello, World!\n\n(Simulation: Java compilation & execution complete)', stderr:'', exitCode:0, timeMs:timeMs+200, hasError:false }),
      sql:    () => ({ stdout:'id | name  | value\n---+-------+------\n 1 | row_1 | 42\n 2 | row_2 | 87\n\n(2 rows returned)', stderr:'', exitCode:0, timeMs, hasError:false }),
    };

    return (simulations[lang] || simulations.python)();
  },

  submitSolution() {
    const problem = this.currentProblem;
    const code = this.getCode();
    const result = this.executeCode(code, this.currentLanguage);

    // Simple check: does output match expected?
    const correct = result.stdout.trim().includes(problem.expectedOutput?.trim() || '');
    if (correct) {
      Utils.showToast('🎉 Correct! Well done!', 'success');
      // Show success in console
      const output = document.getElementById('console-output');
      if (output) output.innerHTML += '\n\n<span style="color:#10B981;font-weight:700">✅ ALL TESTS PASSED! Great work!</span>';
    } else {
      Utils.showToast('Not quite — check the expected output and try again.', 'warning');
      const output = document.getElementById('console-output');
      if (output) {
        this.runCode().then(() => {
          const o = document.getElementById('console-output');
          if (o) o.innerHTML += `\n\n<span style="color:#F97316">Expected:\n${Utils.escapeHtml(problem.expectedOutput || 'N/A')}</span>`;
        });
      }
    }
  },

  getHint() {
    const problem = this.currentProblem;
    if (this.hintIndex >= problem.hints.length) {
      Utils.showToast('No more hints available! Try the solution.', 'info');
      return;
    }
    const hint = problem.hints[this.hintIndex++];
    const output = document.getElementById('console-output');
    if (output) output.innerHTML += `\n\n<span style="color:#A78BFA">💡 Hint ${this.hintIndex}: ${Utils.escapeHtml(hint)}</span>`;
    // Update hint button
    const btn = document.querySelector('[onclick="EditorPage.getHint()"]');
    if (btn) btn.textContent = `💡 Hint (${this.hintIndex}/${problem.hints.length} used)`;
  },

  clearConsole() {
    const output = document.getElementById('console-output');
    if (output) output.innerHTML = '<span class="info">Console cleared</span>';
  },

  resetCode() {
    const template = this.currentProblem?.starterCode || this.languages[this.currentLanguage].template;
    if (this.cmEditor) this.cmEditor.setValue(template);
    else { const fa = document.getElementById('fallback-editor'); if(fa) fa.value = template; }
  },

  formatCode() {
    Utils.showToast('Code formatted!', 'success');
    // Just re-indent — CodeMirror handles it
    if (this.cmEditor) {
      const doc = this.cmEditor.getDoc();
      const totalLines = doc.lineCount();
      for (let i = 0; i < totalLines; i++) {
        this.cmEditor.indentLine(i, 'smart');
      }
    }
  },

  changeLanguage(lang) {
    this.currentLanguage = lang;
    const fileLabel = document.getElementById('file-label');
    if (fileLabel) fileLabel.textContent = `solution.${this.languages[lang].ext}`;

    if (this.cmEditor) {
      this.cmEditor.setOption('mode', this.languages[lang].mode);
      this.cmEditor.setValue(this.languages[lang].template);
    }
  },

  loadProblem(index) {
    this.currentProblem = Data.problems[index];
    this.hintIndex = 0;
    // Re-render the page
    const content = document.querySelector('.page');
    if (content) {
      content.outerHTML = `<div class="page">${this.render().replace('<div class="page animate-fade-in" style=','<div class="page" style=')}</div>`;
    }
    setTimeout(() => this.initEditor(), 100);
  },

  loadNextProblem() {
    const idx = Data.problems.findIndex(p => p.id === this.currentProblem.id);
    const next = (idx + 1) % Data.problems.length;
    this.loadProblem(next);
  },

  showProblem() {
    const panel = document.getElementById('problem-panel');
    if (panel) {
      panel.style.display = panel.style.display === 'none' ? '' : 'none';
    }
  }
};

window.EditorPage = EditorPage;
