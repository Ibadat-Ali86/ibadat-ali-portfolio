import Lenis from 'lenis';
import { prefersReducedMotion } from './reduced-motion.js';

export function initSmoothScroll() {
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;
  const lenis = new Lenis({ smoothWheel: true, duration: 0.8 });
  const frame = (time) => {
    lenis.raf(time);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
