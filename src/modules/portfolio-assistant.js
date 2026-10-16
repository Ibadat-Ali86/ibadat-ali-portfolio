import { assistantSuggestions } from '../data/portfolio-profile.js';

const MAX_MESSAGE_LENGTH = 700;
const REQUEST_TIMEOUT_MS = 30_000;

export function initPortfolioAssistant() {
  const root = document.querySelector('[data-portfolio-assistant]');
  if (!root) return;

  const launcher = root.querySelector('[data-assistant-launcher]');
  const panel = root.querySelector('[data-assistant-panel]');
  const closeButton = root.querySelector('[data-assistant-close]');
  const minimizeButton = root.querySelector('[data-assistant-minimize]');
  const messagesElement = root.querySelector('[data-assistant-messages]');
  const suggestionsElement = root.querySelector('[data-assistant-suggestions]');
  const form = root.querySelector('[data-assistant-form]');
  const input = root.querySelector('[data-assistant-input]');
  const submitButton = root.querySelector('[data-assistant-submit]');
  const status = root.querySelector('[data-assistant-status]');
  const counter = root.querySelector('[data-assistant-counter]');
  const conversation = [];
  let isBusy = false;
  let resizeFrame;

  function scrollToLatestMessage() {
    messagesElement.scrollTop = messagesElement.scrollHeight;
  }

  function setOpen(open, restoreFocus = false) {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    root.classList.toggle('is-open', open);
    if (open) {
      panel.classList.remove('is-minimized');
      requestAnimationFrame(() => {
        scrollToLatestMessage();
        input?.focus();
      });
    }
    if (!open && restoreFocus) launcher.focus();
  }

  function toggleMinimize() {
    panel.classList.toggle('is-minimized');
    if (!panel.classList.contains('is-minimized')) {
      scrollToLatestMessage();
      input?.focus();
    }
  }

  function renderFormattedContent(text) {
    const container = document.createElement('div');
    container.className = 'assistant-message__body';

    const lines = text.split('\n');
    let currentList = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();

      if (!line) {
        currentList = null;
        continue;
      }

      // Check if bullet point
      if (line.startsWith('- ') || line.startsWith('• ')) {
        if (!currentList) {
          currentList = document.createElement('ul');
          container.appendChild(currentList);
        }
        const li = document.createElement('li');
        li.innerHTML = formatInlineMarkdown(line.slice(2));
        currentList.appendChild(li);
        continue;
      }

      currentList = null;
      const p = document.createElement('p');
      p.innerHTML = formatInlineMarkdown(line);
      container.appendChild(p);
    }

    return container;
  }

  function formatInlineMarkdown(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function handleActionClick(action) {
    if (!action || !action.type || action.type === 'none') return;

    if (action.type === 'open_project' && action.target) {
      const targetSlug = action.target.toLowerCase();
      // Try to find open button for this project
      const projectCard = document.querySelector(`[data-project-open="${targetSlug}"]`) ||
                          document.querySelector(`[data-project-slug="${targetSlug}"] button`);
      if (projectCard) {
        projectCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => projectCard.click(), 400);
      } else {
        const atlasSection = document.getElementById('atlas') || document.getElementById('featured') || document.getElementById('projects');
        atlasSection?.scrollIntoView({ behavior: 'smooth' });
      }
      setOpen(false);
    } else if (action.type === 'open_contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          contactSection.querySelector('input[name="name"]')?.focus();
        }, 500);
      }
      setOpen(false);
    } else if (action.type === 'open_link' && typeof action.target === 'string') {
      try {
        const parsed = new URL(action.target, window.location.origin);
        const isAllowedDomain = [
          'github.com',
          'linkedin.com',
          'www.linkedin.com',
          'evershineacadmey.com',
          'ibadat-ali-portfolio.vercel.app',
          window.location.hostname
        ].some((domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));

        if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && isAllowedDomain) {
          window.open(parsed.href, '_blank', 'noopener,noreferrer');
        }
      } catch {
        // Silently discard malformed or unsafe URL protocols
      }
    }
  }

  function appendMessage(role, content, extras = {}) {
    const article = document.createElement('article');
    article.className = `assistant-message assistant-message--${role}`;

    const head = document.createElement('div');
    head.className = 'assistant-message__head';

    const avatar = document.createElement('span');
    avatar.className = 'assistant-message__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = role === 'user' ? '👤' : '🛸';

    const label = document.createElement('span');
    label.className = 'assistant-message__label';
    label.textContent = role === 'user' ? 'YOU' : 'ORBI · AI ASSISTANT';

    head.append(avatar, label);

    if (role === 'assistant') {
      const copyBtn = document.createElement('button');
      copyBtn.type = 'button';
      copyBtn.className = 'assistant-copy-btn';
      copyBtn.title = 'Copy response';
      copyBtn.setAttribute('aria-label', 'Copy response to clipboard');
      copyBtn.innerHTML = '<span>📋</span>';
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(content).then(() => {
          copyBtn.innerHTML = '<span style="color:#00C896">✓</span>';
          setTimeout(() => {
            copyBtn.innerHTML = '<span>📋</span>';
          }, 2000);
        });
      });
      head.append(copyBtn);
    }

    article.append(head);

    if (role === 'assistant') {
      const body = renderFormattedContent(content);
      article.append(body);

      // Render Action CTA button if present
      if (extras.action && extras.action.type !== 'none') {
        const actionWrap = document.createElement('div');
        actionWrap.className = 'assistant-action-card';

        const actionBtn = document.createElement('button');
        actionBtn.type = 'button';
        actionBtn.className = 'assistant-action-btn';

        if (extras.action.type === 'open_project') {
          actionBtn.textContent = `🔍 View ${extras.action.target.toUpperCase()} Case Study ↗`;
        } else if (extras.action.type === 'open_contact') {
          actionBtn.textContent = '📬 Discuss a Problem / Get in Touch ↗';
        } else {
          actionBtn.textContent = 'Explore Link ↗';
        }

        actionBtn.addEventListener('click', () => handleActionClick(extras.action));
        actionWrap.append(actionBtn);
        article.append(actionWrap);
      }

      // Render verified sources if present
      if (Array.isArray(extras.sourceIds) && extras.sourceIds.length > 0) {
        const sourcesWrap = document.createElement('div');
        sourcesWrap.className = 'assistant-sources';
        sourcesWrap.innerHTML = '<span>Verified:</span>';

        extras.sourceIds.slice(0, 3).forEach((src) => {
          const chip = document.createElement('span');
          chip.className = 'assistant-source-chip';
          chip.textContent = `✓ ${src}`;
          sourcesWrap.append(chip);
        });

        article.append(sourcesWrap);
      }

      // Render follow-up suggestions if present
      if (Array.isArray(extras.followUps) && extras.followUps.length > 0) {
        const followUpsWrap = document.createElement('div');
        followUpsWrap.className = 'assistant-followups';

        extras.followUps.slice(0, 3).forEach((q) => {
          const chip = document.createElement('button');
          chip.type = 'button';
          chip.className = 'assistant-followup-chip';
          chip.textContent = q;
          chip.addEventListener('click', () => ask(q));
          followUpsWrap.append(chip);
        });

        article.append(followUpsWrap);
      }
    } else {
      const text = document.createElement('p');
      text.textContent = content;
      article.append(text);
    }

    messagesElement.append(article);
    scrollToLatestMessage();
  }

  function appendLoadingMessage() {
    const article = document.createElement('article');
    article.className = 'assistant-message assistant-message--assistant assistant-message--loading';
    article.dataset.assistantLoading = '';

    const head = document.createElement('div');
    head.className = 'assistant-message__head';

    const avatar = document.createElement('span');
    avatar.className = 'assistant-message__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = '🛸';

    const label = document.createElement('span');
    label.className = 'assistant-message__label';
    label.textContent = 'ORBI · VERIFYING FACTS';

    head.append(avatar, label);

    const indicator = document.createElement('span');
    indicator.className = 'assistant-typing';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));

    const accessibleText = document.createElement('span');
    accessibleText.className = 'sr-only';
    accessibleText.textContent = 'Orbi is preparing an answer from verified portfolio records.';

    article.append(head, indicator, accessibleText);
    messagesElement.append(article);
    scrollToLatestMessage();
    return article;
  }

  function setBusy(busy) {
    isBusy = busy;
    if (input) input.disabled = busy;
    if (submitButton) {
      submitButton.disabled = busy;
      submitButton.querySelector('span:first-child').textContent = busy ? 'Verifying…' : 'Send';
    }
    if (suggestionsElement) {
      suggestionsElement.querySelectorAll('button').forEach((b) => { b.disabled = busy; });
    }
    if (status) {
      status.textContent = busy ? 'Orbi is querying verified portfolio evidence.' : '';
    }
  }

  async function ask(question) {
    const content = question.trim();
    if (!content || isBusy) return;

    // Hide welcome suggestions once conversation starts
    if (suggestionsElement) {
      suggestionsElement.style.display = 'none';
    }

    conversation.push({ role: 'user', content });
    appendMessage('user', content);
    const loadingMessage = appendLoadingMessage();

    if (input) {
      input.value = '';
      input.style.height = 'auto';
    }
    if (counter) counter.textContent = `0 / ${MAX_MESSAGE_LENGTH}`;
    setBusy(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation.slice(-7) }),
        signal: controller.signal
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error?.message || 'The assistant is temporarily unavailable.');
      }

      const reply = payload.data.message;
      conversation.push({ role: 'assistant', content: reply });
      loadingMessage.remove();

      appendMessage('assistant', reply, {
        followUps: payload.data.followUps,
        sourceIds: payload.data.sourceIds,
        action: payload.data.action
      });

      if (status) status.textContent = 'Answer received.';
    } catch (error) {
      conversation.pop();
      loadingMessage.remove();
      const message = error?.name === 'AbortError'
        ? 'The request took too long. Please try again.'
        : error.message || 'The assistant is temporarily unavailable.';
      appendMessage('error', message);
      if (status) status.textContent = 'Could not generate answer.';
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      input?.focus();
    }
  }

  // Populate curated initial suggestion chips
  if (suggestionsElement) {
    suggestionsElement.innerHTML = '';
    const curatedSuggestions = assistantSuggestions && assistantSuggestions.length > 0
      ? assistantSuggestions
      : [
          '🔍 Explore verified projects',
          '⚙️ Technical architecture & MCP',
          '💼 Discuss an AI business problem'
        ];

    curatedSuggestions.forEach((suggestion) => {
      const button = document.createElement('button');
      button.className = 'assistant-suggestion';
      button.type = 'button';
      button.textContent = suggestion;
      button.addEventListener('click', () => ask(suggestion));
      suggestionsElement.append(button);
    });
  }

  // Event Listeners
  launcher?.addEventListener('click', () => setOpen(panel.hidden));
  closeButton?.addEventListener('click', () => setOpen(false, true));
  minimizeButton?.addEventListener('click', toggleMinimize);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input) ask(input.value);
  });

  input?.addEventListener('input', () => {
    if (counter) counter.textContent = `${input.value.length} / ${MAX_MESSAGE_LENGTH}`;
    // Auto-grow textarea
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 110)}px`;
  });

  input?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });

  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      if (!panel.hidden) scrollToLatestMessage();
    });
  });
}
