import { assistantSuggestions } from '../data/portfolio-profile.js';

const MAX_MESSAGE_LENGTH = 700;
const REQUEST_TIMEOUT_MS = 50_000;

export function initPortfolioAssistant() {
  const root = document.querySelector('[data-portfolio-assistant]');
  if (!root) return;

  const launcher = root.querySelector('[data-assistant-launcher]');
  const panel = root.querySelector('[data-assistant-panel]');
  const closeButton = root.querySelector('[data-assistant-close]');
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
    if (open) requestAnimationFrame(() => { scrollToLatestMessage(); input.focus(); });
    if (!open && restoreFocus) launcher.focus();
  }

  function appendMessage(role, content) {
    const article = document.createElement('article');
    const label = document.createElement('span');
    const text = document.createElement('p');
    article.className = `assistant-message assistant-message--${role}`;
    label.className = 'assistant-message__label';
    label.textContent = role === 'user' ? 'YOU' : 'IA ASSISTANT';
    text.textContent = content;
    article.append(label, text);
    messagesElement.append(article);
    scrollToLatestMessage();
  }

  function appendLoadingMessage() {
    const article = document.createElement('article');
    const label = document.createElement('span');
    const indicator = document.createElement('span');
    const accessibleText = document.createElement('span');
    article.className = 'assistant-message assistant-message--assistant assistant-message--loading';
    article.dataset.assistantLoading = '';
    label.className = 'assistant-message__label';
    label.textContent = 'IA ASSISTANT';
    indicator.className = 'assistant-typing';
    indicator.setAttribute('aria-hidden', 'true');
    indicator.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));
    accessibleText.className = 'sr-only';
    accessibleText.textContent = 'Ibadat’s assistant is generating a response.';
    article.append(label, indicator, accessibleText);
    messagesElement.append(article);
    scrollToLatestMessage();
    return article;
  }

  function setBusy(busy) {
    isBusy = busy;
    input.disabled = busy;
    submitButton.disabled = busy;
    suggestionsElement.querySelectorAll('button').forEach((button) => { button.disabled = busy; });
    submitButton.textContent = busy ? 'THINKING…' : 'ASK IA ↗';
    if (busy) status.textContent = 'Ibadat’s assistant is preparing an answer.';
  }

  async function ask(question) {
    const content = question.trim();
    if (!content || isBusy) return;

    conversation.push({ role: 'user', content });
    appendMessage('user', content);
    const loadingMessage = appendLoadingMessage();
    input.value = '';
    counter.textContent = `0 / ${MAX_MESSAGE_LENGTH}`;
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
      if (!response.ok || !payload?.success) throw new Error(payload?.error?.message || 'The assistant is temporarily unavailable.');

      const reply = payload.data.message;
      conversation.push({ role: 'assistant', content: reply });
      loadingMessage.remove();
      appendMessage('assistant', reply);
      status.textContent = 'Answer received.';
    } catch (error) {
      conversation.pop();
      loadingMessage.remove();
      const message = error?.name === 'AbortError' ? 'The request timed out. Please try again.' : error.message;
      appendMessage('error', message || 'The assistant is temporarily unavailable.');
      status.textContent = 'The assistant could not answer that question.';
    } finally {
      clearTimeout(timeout);
      setBusy(false);
      input.focus();
    }
  }

  assistantSuggestions.forEach((suggestion) => {
    const button = document.createElement('button');
    button.className = 'assistant-suggestion';
    button.type = 'button';
    button.textContent = suggestion;
    button.addEventListener('click', () => ask(suggestion));
    suggestionsElement.append(button);
  });

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  closeButton.addEventListener('click', () => setOpen(false, true));
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    ask(input.value);
  });
  input.addEventListener('input', () => {
    counter.textContent = `${input.value.length} / ${MAX_MESSAGE_LENGTH}`;
  });
  input.addEventListener('keydown', (event) => {
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
