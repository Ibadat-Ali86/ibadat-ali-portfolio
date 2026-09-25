import { motionQuery, prefersReducedMotion } from './reduced-motion.js';

export function initIntroVideo() {
  const section = document.querySelector('[data-intro-video]');
  const video = section?.querySelector('[data-intro-player]');
  if (!section || !video || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      section.classList.toggle('is-in-view', entry.isIntersecting);

      if (!entry.isIntersecting) {
        video.pause();
        return;
      }

      if (!prefersReducedMotion() && !video.ended) {
        video.play().catch(() => {});
      }
    });
  }, { threshold: 0.15 });

  observer.observe(section);
  const pauseForReducedMotion = (event) => {
    if (event.matches) video.pause();
  };
  if (typeof motionQuery.addEventListener === 'function') motionQuery.addEventListener('change', pauseForReducedMotion);
  else motionQuery.addListener?.(pauseForReducedMotion);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
}
