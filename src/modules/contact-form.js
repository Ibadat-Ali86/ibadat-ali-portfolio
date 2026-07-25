const contactEmail = 'ibadcodes@gmail.com';

function setStatus(status, message, state = 'neutral') {
  if (!status) return;
  status.textContent = message;
  status.dataset.state = state;
}

function initEmailCopy() {
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copyEmail || contactEmail;
      try {
        await navigator.clipboard.writeText(value);
        button.classList.add('is-copied');
        const action = button.querySelector('.contact-method__action');
        if (action) action.textContent = '✓';
        window.setTimeout(() => {
          button.classList.remove('is-copied');
          if (action) action.textContent = '⧉';
        }, 2000);
      } catch {
        window.location.href = `mailto:${value}`;
      }
    });
  });
}

function initMessageForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const status = form.querySelector('[data-contact-status]');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const engagementType = String(data.get('engagementType') || '').trim();
    const description = String(data.get('description') || '').trim();
    if (name.length < 2 || !email.includes('@') || !engagementType || description.length < 20) {
      setStatus(status, 'Please complete all fields with a valid email and at least 20 characters of project detail.', 'error');
      return;
    }
    const subject = encodeURIComponent(`Portfolio inquiry: ${engagementType} · ${name}`);
    const body = encodeURIComponent(`FROM: ${name} <${email}>\nTYPE: ${engagementType}\n\nMESSAGE:\n${description}\n\n---\nSent from Ibadat Ali portfolio`);
    if (form.dataset.noNavigate !== 'true') window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus(status, "Opening your email app. I'll reply within 24 hours.", 'success');
  });
}

export function initContactForm() {
  initEmailCopy();
  initMessageForm();
}
