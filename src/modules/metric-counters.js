import { prefersReducedMotion } from './reduced-motion.js';

const formatCount = (value) => String(value).padStart(2, '0');

export function initMetricCounters() {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const counters = [...document.querySelectorAll('[data-count-up]')];
  if (!counters.length) return;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.countUp);
    if (!Number.isSafeInteger(target) || target < 0) {
      counter.removeAttribute('data-count-up');
      return;
    }
    counter.textContent = formatCount(0);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = Number(counter.dataset.countUp);
      observer.unobserve(counter);
      if (!Number.isSafeInteger(target) || target < 0) return;

      let startedAt;
      const animate = (timestamp) => {
        startedAt ??= timestamp;
        const progress = Math.min((timestamp - startedAt) / 900, 1);
        const eased = 1 - (1 - progress) ** 3;
        counter.textContent = formatCount(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(animate);
      };
      window.requestAnimationFrame(animate);
    });
  }, { threshold: 0.35 });

  counters.filter((counter) => counter.hasAttribute('data-count-up')).forEach((counter) => observer.observe(counter));
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
}
