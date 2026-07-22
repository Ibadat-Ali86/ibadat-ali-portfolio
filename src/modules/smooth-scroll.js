import Lenis from 'lenis';
import { prefersReducedMotion } from './reduced-motion.js';

export function initSmoothScroll() {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
  const lenis = new Lenis({
    smoothWheel: true,
    duration: 1.05,
    easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
    wheelMultiplier: 0.9,
    anchors: { offset: -72 },
    autoRaf: true
  });
  lenis.on('scroll', () => window.dispatchEvent(new Event('portfolio:smooth-scroll')));
  window.addEventListener('pagehide', () => lenis.destroy(), { once: true });
  return lenis;
}
