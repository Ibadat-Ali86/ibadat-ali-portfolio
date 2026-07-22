import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initRevealMotion() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('[data-reveal], [data-project-card]').forEach((element) => {
    ScrollTrigger.create({
      trigger: element,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.fromTo(element, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' })
    });
  });
}
