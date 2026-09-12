// Content stays visible even when animation or observation is unavailable.
export function initRevealMotion() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.animate([{ transform: 'translateY(10px)' }, { transform: 'translateY(0)' }],
        { duration: 360, easing: 'cubic-bezier(.2,.7,.2,1)' });
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal], .project-card').forEach((element) => observer.observe(element));
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
}
