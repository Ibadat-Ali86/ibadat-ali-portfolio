import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProjectRail() {
  const section = document.querySelector('[data-project-rail-section]');
  const track = document.querySelector('[data-project-rail-track]');
  if (!section || !track || window.matchMedia('(max-width: 767px)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  const setup = () => {
    const totalScroll = Math.max(0, track.scrollWidth - section.clientWidth);
    if (!totalScroll) return;
    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top 84px',
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  };
  setup();
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
