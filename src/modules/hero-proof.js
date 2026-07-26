import { prefersReducedMotion } from './reduced-motion.js';

const roles = [
  'Data analysis · SQL, Pandas & visualisation',
  'Data science · forecasting & explainability',
  'ML engineering · PyTorch, XGBoost & Scikit-learn',
  'AI products · FastAPI, Docker & PostgreSQL'
];

function formatMetric(value, { prefix = '', suffix = '', decimals = 0 }) {
  return `${prefix}${Number(value).toFixed(decimals)}${suffix}`;
}

function initRoleRotator(reduced) {
  const target = document.querySelector('[data-role-rotator]');
  if (!target || reduced) return;
  let index = 0;
  const rotate = () => {
    index = (index + 1) % roles.length;
    target.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-12px)' }], { duration: 220, easing: 'ease', fill: 'forwards' }).finished
      .then(() => {
        target.textContent = roles[index];
        target.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 260, easing: 'ease-out', fill: 'forwards' });
      })
      .catch(() => {});
  };
  window.setTimeout(() => {
    rotate();
    window.setInterval(rotate, 3500);
  }, 2000);
}

function initTechCycler(reduced) {
  const chips = [...document.querySelectorAll('[data-tech-chip-cycler] b')];
  if (!chips.length) return;
  let index = 0;
  const activate = () => {
    chips.forEach((chip, chipIndex) => chip.classList.toggle('is-active', chipIndex === index));
    index = (index + 1) % chips.length;
  };
  activate();
  if (!reduced) window.setInterval(activate, 700);
}

function initCountUp(reduced) {
  document.querySelectorAll('[data-count-to]').forEach((element, index) => {
    const value = Number(element.dataset.countTo);
    const decimals = Number(element.dataset.countDecimals || 0);
    const prefix = element.dataset.countPrefix || '';
    const suffix = element.dataset.countSuffix || '';
    if (reduced || !Number.isFinite(value)) {
      element.textContent = formatMetric(value, { prefix, suffix, decimals });
      return;
    }
    const start = performance.now() + index * 160;
    const duration = 1400;
    const step = (now) => {
      const progress = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatMetric(value * eased, { prefix, suffix, decimals });
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  });
}

export function initHeroProof() {
  const reduced = prefersReducedMotion();
  initRoleRotator(reduced);
  initTechCycler(reduced);
  initCountUp(reduced);
}
