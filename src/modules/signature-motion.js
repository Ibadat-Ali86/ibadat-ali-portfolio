import { prefersReducedMotion } from './reduced-motion.js';

export function initSignatureMotion() {
  const signature = document.querySelector('[data-signature]');
  if (!signature) return;

  const activate = () => signature.classList.add('is-active');
  const isVisible = () => {
    const { top, bottom } = signature.getBoundingClientRect();
    return top < window.innerHeight && bottom > 0;
  };

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    activate();
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      activate();
      observer.disconnect();
    }
  }, { threshold: 0.35 });

  observer.observe(signature);

  if (isVisible()) {
    requestAnimationFrame(activate);
  }
}
