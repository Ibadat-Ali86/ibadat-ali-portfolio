// Content stays visible even when animation or observation is unavailable.
export function initRevealMotion() {
  if (!('IntersectionObserver' in window)) return;
  const revealElements = [...document.querySelectorAll('[data-reveal]')];
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const index = revealElements.indexOf(entry.target);
      entry.target.animate([
        { opacity: 0, transform: 'translateY(20px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], {
        duration: 600,
        delay: Math.max(0, index % 4) * 80,
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'both'
      });
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15 });
  revealElements.forEach((element) => observer.observe(element));
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
}
