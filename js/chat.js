/* ============================================================
   MentorAI — Chat Engine
   Mock streaming responses, per-agent personas, history mgmt
   ============================================================ */

const ChatEngine = {
  // Active conversations keyed by agentId
  sessions: {},
  activeAgent: 'coding',
  isStreaming: false,

  // ── Initialize session ──────────────────────────────────────
  getSession(agentId) {
    if (!this.sessions[agentId]) {
      this.sessions[agentId] = {
        id: Utils.uuid(),
        agentId,
        messages: [],
        startedAt: new Date()
      };
    }
    return this.sessions[agentId];
  },

  // ── Add message ─────────────────────────────────────────────
  addMessage(agentId, role, content) {
    const session = this.getSession(agentId);
    const msg = {
      id: Utils.uuid(),
      role,            // 'user' | 'agent'
      content,
      timestamp: new Date()
    };
    session.messages.push(msg);
    return msg;
  },

  // ── Generate mock response ──────────────────────────────────
  generateResponse(agentId, userMessage) {
    const agent = Data.getAgent(agentId);
    const responses = Data.agentResponses[agentId];
    const lowerMsg = userMessage.toLowerCase();

    // Check keyword matches
    if (responses.keywords) {
      for (const [keyword, response] of Object.entries(responses.keywords)) {
        if (lowerMsg.includes(keyword)) {
          return response;
        }
      }
    }

    // Fallback responses
    const fallbacks = responses.fallback;
    return Utils.randChoice(fallbacks);
  },

  // ── Stream response (typewriter effect) ────────────────────
  async streamResponse(agentId, userMessage, onChunk, onDone) {
    if (this.isStreaming) return;
    this.isStreaming = true;

    const fullResponse = this.generateResponse(agentId, userMessage);

    // Add agent message placeholder
    const agentMsg = this.addMessage(agentId, 'agent', '');

    // Parse into chunks (word-by-word for text, instant for code blocks)
    const chunks = this.parseIntoChunks(fullResponse);

    let accumulated = '';
    const delayBase = 18; // ms per word

    for (const chunk of chunks) {
      if (chunk.type === 'code') {
        // Code blocks appear instantly
        await Utils.sleep(80);
        accumulated += chunk.content;
        agentMsg.content = accumulated;
        onChunk(accumulated);
      } else {
        // Text streams word by word
        const words = chunk.content.split(/(?<=\s)/);
        for (const word of words) {
          await Utils.sleep(delayBase + Math.random() * 20);
          accumulated += word;
          agentMsg.content = accumulated;
          onChunk(accumulated);
        }
      }
    }

    this.isStreaming = false;
    onDone(agentMsg);
  },

  // ── Parse response into text / code chunks ──────────────────
  parseIntoChunks(text) {
    const chunks = [];
    const codeRegex = /```[\s\S]*?```/g;
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      // Text before code block
      if (match.index > lastIndex) {
        chunks.push({ type: 'text', content: text.slice(lastIndex, match.index) });
      }
      // Code block itself
      chunks.push({ type: 'code', content: match[0] });
      lastIndex = match.index + match[0].length;
    }

    // Remaining text after last code block
    if (lastIndex < text.length) {
      chunks.push({ type: 'text', content: text.slice(lastIndex) });
    }

    return chunks.length ? chunks : [{ type: 'text', content: text }];
  },

  // ── Render message HTML ─────────────────────────────────────
  renderMessage(msg, agentId) {
    const agent = Data.getAgent(agentId);
    const isUser = msg.role === 'user';
    const timeStr = Utils.formatTime(msg.timestamp);

    const renderedContent = Utils.renderMarkdown(msg.content || '');

    if (isUser) {
      return `
        <div class="message-wrapper user" id="msg-${msg.id}">
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
            <div class="message-bubble message-user">${Utils.escapeHtml(msg.content)}</div>
            <span class="message-time">${timeStr}</span>
          </div>
          <div class="user-avatar" style="width:32px;height:32px;font-size:0.75rem;flex-shrink:0">${Data.user.initials}</div>
        </div>`;
    }

    return `
      <div class="message-wrapper" id="msg-${msg.id}">
        <div class="agent-avatar ${agent.colorClass} agent-avatar-sm" style="align-self:flex-start">${agent.icon}</div>
        <div style="display:flex;flex-direction:column;gap:4px;max-width:75%">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="font-size:var(--text-xs);font-weight:700;color:${agent.color}">${agent.name}</span>
            <span class="badge badge-muted" style="font-size:0.65rem">${agent.model}</span>
          </div>
          <div class="message-bubble message-agent" style="max-width:100%">${renderedContent}</div>
          <span class="message-time">${timeStr}</span>
        </div>
      </div>`;
  },

  // ── Render typing indicator ─────────────────────────────────
  renderTypingIndicator(agentId) {
    const agent = Data.getAgent(agentId);
    return `
      <div class="message-wrapper" id="typing-indicator">
        <div class="agent-avatar ${agent.colorClass} agent-avatar-sm">${agent.icon}</div>
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>`;
  },

  // ── Clear session ────────────────────────────────────────────
  clearSession(agentId) {
    delete this.sessions[agentId];
  },

  // ── Get conversation display items ──────────────────────────
  getConversationList() {
    return Data.conversations;
  }
};

window.ChatEngine = ChatEngine;
