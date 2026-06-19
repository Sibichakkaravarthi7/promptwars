/* ============================================================
   MentorAI — Chat Page
   ============================================================ */

const ChatPage = {
  selectedAgent: 'coding',
  activeConvId: null,

  render() {
    return `
      <div class="page animate-fade-in" style="padding:var(--space-5)">
        <!-- Agent Tabs -->
        <div style="margin-bottom:var(--space-4)">
          <div class="agent-tabs" id="agent-tabs">
            ${Data.agents.map(a => `
              <button class="agent-tab ${a.id === this.selectedAgent ? 'active '+a.id : ''}" 
                id="agent-tab-${a.id}"
                onclick="ChatPage.selectAgent('${a.id}')">
                <span>${a.icon}</span>
                <span>${a.name}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Chat Layout -->
        <div class="chat-layout">
          <!-- Conversation Sidebar -->
          <div class="chat-sidebar" id="chat-sidebar">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-3)">
              <span style="font-size:var(--text-sm);font-weight:700;color:var(--text-secondary)">Conversations</span>
              <button class="btn btn-ghost btn-icon-sm" onclick="ChatPage.clearChat()" title="New chat">+</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:var(--space-1)" id="conv-list">
              ${Data.conversations.map(c => {
                const agent = Data.getAgent(c.agentId);
                return `
                  <div class="conv-item ${c.id === this.activeConvId ? 'active' : ''}" id="conv-${c.id}" onclick="ChatPage.loadConversation('${c.id}')">
                    <div class="agent-avatar ${agent.colorClass} agent-avatar-sm">${agent.icon}</div>
                    <div style="flex:1;min-width:0">
                      <div class="conv-item-title">${c.title}</div>
                      <div class="conv-item-preview">${c.preview}</div>
                    </div>
                    <div class="conv-item-time">${Utils.relativeTime(c.timestamp)}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Main Chat Area -->
          <div class="chat-main" id="chat-main">
            ${this.renderChatHeader()}
            <div class="chat-messages" id="chat-messages">
              ${this.renderWelcomeMessage()}
            </div>
            ${this.renderChatInput()}
          </div>
        </div>
      </div>
    `;
  },

  renderChatHeader() {
    const agent = Data.getAgent(this.selectedAgent);
    return `
      <div class="chat-header" id="chat-header">
        <div class="agent-avatar ${agent.colorClass}">${agent.icon}</div>
        <div style="flex:1">
          <div style="font-size:var(--text-base);font-weight:700;color:var(--text-primary)">${agent.name}</div>
          <div style="display:flex;align-items:center;gap:var(--space-2)">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--color-success);animation:pulse 2s infinite"></div>
            <span style="font-size:var(--text-xs);color:var(--text-muted)">${agent.specialty}</span>
          </div>
        </div>
        <div style="display:flex;gap:var(--space-2)">
          <button class="btn btn-ghost btn-icon-sm" title="Clear chat" onclick="ChatPage.clearChat()">🗑️</button>
          <button class="btn btn-ghost btn-icon-sm" title="Export" onclick="ChatPage.exportChat()">📤</button>
        </div>
      </div>
    `;
  },

  renderWelcomeMessage() {
    const agent = Data.getAgent(this.selectedAgent);
    const session = ChatEngine.getSession(this.selectedAgent);

    if (session.messages.length === 0) {
      // Add greeting as first message
      ChatEngine.addMessage(this.selectedAgent, 'agent', agent.greeting);
    }

    return session.messages.map(msg => ChatEngine.renderMessage(msg, this.selectedAgent)).join('');
  },

  renderChatInput() {
    const agent = Data.getAgent(this.selectedAgent);
    return `
      <div class="chat-input-area">
        <!-- Quick Prompts -->
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-3);overflow-x:auto;scrollbar-width:none;padding-bottom:2px">
          ${this.getQuickPrompts(this.selectedAgent).map(p => `
            <button class="btn btn-ghost btn-sm" style="white-space:nowrap;flex-shrink:0;font-size:var(--text-xs)" onclick="ChatPage.sendQuickPrompt('${p.replace(/'/g,"\\'")}')">
              ${p}
            </button>
          `).join('')}
        </div>
        <div class="chat-input-wrapper">
          <textarea 
            class="chat-textarea"
            id="chat-input"
            placeholder="Ask ${agent.name} anything... (Shift+Enter for new line)"
            rows="1"
            onkeydown="ChatPage.handleKeydown(event)"
            oninput="ChatPage.autoResize(this)"
          ></textarea>
          <button class="btn btn-primary btn-icon" id="send-btn" onclick="ChatPage.sendMessage()" style="flex-shrink:0">
            ➤
          </button>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2)">
          <span style="font-size:var(--text-xs);color:var(--text-muted)">Powered by ${agent.model}</span>
          <span style="font-size:var(--text-xs);color:var(--text-muted)" id="char-count">0 / 2000</span>
        </div>
      </div>
    `;
  },

  getQuickPrompts(agentId) {
    const prompts = {
      coding:      ['Explain recursion','Debug my code','Generate a practice problem','What is Big-O?','Review my solution'],
      math:        ['Solve step-by-step','Explain this concept','Practice problems','What is integration?','Proof walkthrough'],
      writing:     ['Review my essay','Fix grammar','Improve structure','Check tone','Suggest rewrites'],
      datascience: ['Explain this algorithm','Show pandas example','Debug my model','Visualization tips','SQL query help'],
      general:     ['Explain like I\'m 5','Give me an analogy','What should I learn next?','Study tips','Summarize this topic'],
    };
    return prompts[agentId] || prompts.general;
  },

  // ── Actions ──────────────────────────────────────────────────
  selectAgent(agentId) {
    this.selectedAgent = agentId;
    ChatEngine.activeAgent = agentId;

    // Update tab styling
    document.querySelectorAll('.agent-tab').forEach(t => {
      t.className = 'agent-tab';
    });
    const activeTab = document.getElementById(`agent-tab-${agentId}`);
    if (activeTab) activeTab.className = `agent-tab active ${agentId}`;

    // Re-render chat header, messages, input
    const header = document.getElementById('chat-header');
    const messages = document.getElementById('chat-messages');
    const inputArea = document.querySelector('.chat-input-area');

    if (header) header.outerHTML = this.renderChatHeader();
    if (messages) {
      messages.innerHTML = this.renderWelcomeMessage();
      Utils.scrollToBottom(document.getElementById('chat-messages'));
    }
    if (inputArea) inputArea.outerHTML = this.renderChatInput();
  },

  handleKeydown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
    const input = document.getElementById('chat-input');
    if (input) {
      const count = document.getElementById('char-count');
      if (count) count.textContent = `${input.value.length} / 2000`;
    }
  },

  autoResize(ta) {
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px';
    const count = document.getElementById('char-count');
    if (count) count.textContent = `${ta.value.length} / 2000`;
  },

  sendQuickPrompt(text) {
    const input = document.getElementById('chat-input');
    if (input) { input.value = text; this.sendMessage(); }
  },

  async sendMessage() {
    const input = document.getElementById('chat-input');
    const messagesEl = document.getElementById('chat-messages');
    if (!input || !messagesEl) return;

    const text = input.value.trim();
    if (!text || ChatEngine.isStreaming) return;

    input.value = '';
    input.style.height = 'auto';

    const userMsg = ChatEngine.addMessage(this.selectedAgent, 'user', text);
    messagesEl.insertAdjacentHTML('beforeend', ChatEngine.renderMessage(userMsg, this.selectedAgent));
    Utils.scrollToBottom(messagesEl);

    // Show typing indicator
    messagesEl.insertAdjacentHTML('beforeend', ChatEngine.renderTypingIndicator(this.selectedAgent));
    Utils.scrollToBottom(messagesEl);

    await Utils.sleep(800 + Math.random() * 600); // Simulate thinking

    // Remove typing indicator
    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) typingEl.remove();

    // Add agent message placeholder
    const agentMsg = { id: Utils.uuid(), role: 'agent', content: '', timestamp: new Date() };
    const agent = Data.getAgent(this.selectedAgent);
    const msgHtml = `
      <div class="message-wrapper" id="msg-${agentMsg.id}">
        <div class="agent-avatar ${agent.colorClass} agent-avatar-sm">${agent.icon}</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:75%">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="font-size:var(--text-xs);font-weight:700;color:${agent.color}">${agent.name}</span>
            <span class="badge badge-muted" style="font-size:0.65rem">${agent.model}</span>
          </div>
          <div class="message-bubble message-agent" style="max-width:100%" id="msg-content-${agentMsg.id}"></div>
          <span class="message-time">${Utils.formatTime(agentMsg.timestamp)}</span>
        </div>
      </div>`;
    messagesEl.insertAdjacentHTML('beforeend', msgHtml);

    // Stream response
    const contentEl = document.getElementById(`msg-content-${agentMsg.id}`);
    await ChatEngine.streamResponse(this.selectedAgent, text,
      (accumulated) => {
        if (contentEl) {
          contentEl.innerHTML = Utils.renderMarkdown(accumulated) + '<span class="typewriter-cursor"></span>';
          Utils.scrollToBottom(messagesEl, false);
        }
      },
      (finalMsg) => {
        if (contentEl) {
          contentEl.innerHTML = Utils.renderMarkdown(finalMsg.content);
          // Syntax highlight all code blocks
          contentEl.querySelectorAll('pre code').forEach(block => {
            if (typeof hljs !== 'undefined') hljs.highlightElement(block);
          });
        }
      }
    );
  },

  clearChat() {
    ChatEngine.clearSession(this.selectedAgent);
    const messages = document.getElementById('chat-messages');
    if (messages) messages.innerHTML = this.renderWelcomeMessage();
    Utils.showToast('Chat cleared', 'info');
  },

  exportChat() {
    const session = ChatEngine.getSession(this.selectedAgent);
    const text = session.messages.map(m => `[${m.role.toUpperCase()}]: ${m.content}`).join('\n\n---\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `chat-${this.selectedAgent}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    Utils.showToast('Chat exported!', 'success');
  },

  loadConversation(convId) {
    this.activeConvId = convId;
    document.querySelectorAll('.conv-item').forEach(el => el.classList.remove('active'));
    const el = document.getElementById(`conv-${convId}`);
    if (el) el.classList.add('active');
    Utils.showToast('Conversation loaded', 'info');
  },

  init() {
    // Focus input
    setTimeout(() => {
      const input = document.getElementById('chat-input');
      if (input) input.focus();
    }, 200);
  }
};

window.ChatPage = ChatPage;
