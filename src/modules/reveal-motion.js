import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const ease = 'power3.out';

function splitIntoWords(element) {
  if (element.dataset.splitReady === 'true') return [...element.querySelectorAll('[data-motion-word]')];

  const accessibleLabel = element.textContent.replace(/\s+/g, ' ').trim();
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const clip = document.createElement('span');
      const word = document.createElement('span');
      clip.className = 'word-clip';
      clip.setAttribute('aria-hidden', 'true');
      word.className = 'motion-word';
      word.dataset.motionWord = '';
      word.textContent = part;
      clip.append(word);
      fragment.append(clip);
    });
    node.replaceWith(fragment);
  });

  element.setAttribute('aria-label', accessibleLabel);
  element.dataset.splitReady = 'true';
  return [...element.querySelectorAll('[data-motion-word]')];
}

function revealBatch(elements, options = {}) {
  if (!elements.length) return;
  ScrollTrigger.batch(elements, {
    start: 'top 91%',
    once: true,
    interval: 0.08,
    batchMax: 4,
    onEnter: (batch) => gsap.fromTo(batch, {
      autoAlpha: 0,
      y: options.y ?? 42,
      rotateX: options.rotateX ?? 0,
      transformOrigin: 'center bottom'
    }, {
      autoAlpha: 1,
      y: 0,
      rotateX: 0,
      duration: options.duration ?? 0.72,
      stagger: options.stagger ?? 0.09,
      ease,
      clearProps: 'opacity,visibility,transform'
    })
  });
}

function createScrubbedTextReveal(element, words) {
  if (!words.length) return;
  gsap.set(words, { autoAlpha: 0.12, yPercent: 112, transformOrigin: 'left bottom' });
  const timeline = gsap.timeline({ paused: true });
  timeline.to(words, {
    autoAlpha: 1,
    yPercent: 0,
    duration: 1,
    stagger: 0.055,
    ease: 'none'
  });
  ScrollTrigger.create({
    trigger: element,
    start: 'top 91%',
    end: 'top 54%',
    scrub: 0.7,
    onUpdate: (self) => timeline.progress(self.progress)
  });
}

function createMediaParallax() {
  document.querySelectorAll('.media-frame').forEach((frame) => {
    const inner = frame.querySelector('[data-media-inner]');
    if (!inner) return;
    gsap.fromTo(inner, { yPercent: -3 }, {
      yPercent: 3,
      ease: 'none',
      scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
  });
}

export function initRevealMotion() {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('motion-enhanced');

  const splitTargets = [...document.querySelectorAll('[data-split], [data-card-title]')];
  const splitWords = new Map(splitTargets.map((element) => [element, splitIntoWords(element)]));
  const heroTitle = document.querySelector('#hero-title');
  const heroWords = splitWords.get(heroTitle) ?? [];

  const heroTimeline = gsap.timeline({ defaults: { ease } });
  heroTimeline
    .fromTo('[data-hero-eyebrow]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45 })
    .fromTo(heroWords, { autoAlpha: 0, yPercent: 115 }, { autoAlpha: 1, yPercent: 0, duration: 0.78, stagger: 0.045 }, '-=.2')
    .fromTo('[data-hero-copy]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.62 }, '-=.38')
    .fromTo('[data-hero-actions] > *', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.09 }, '-=.4')
    .fromTo('[data-hero-visual]', { autoAlpha: 0, x: 36, rotate: 1.2 }, { autoAlpha: 1, x: 0, rotate: 0, duration: 0.8 }, '-=.78');

  splitTargets.filter((element) => element !== heroTitle).forEach((element) => createScrubbedTextReveal(element, splitWords.get(element)));

  revealBatch([...document.querySelectorAll('.profile-frame, .interview-placeholder')], { y: 34, duration: 0.8 });
  revealBatch([...document.querySelectorAll('.credential, .capability-card')], { y: 38, stagger: 0.08 });
  revealBatch([...document.querySelectorAll('[data-project-card]')], { y: 54, rotateX: 2, duration: 0.78, stagger: 0.1 });
  revealBatch([...document.querySelectorAll('.social-list li')], { y: 22, duration: 0.55, stagger: 0.06 });
  revealBatch([...document.querySelectorAll('.section-index, .section-heading--split > p, .about__copy > p:not(.section-index), .contact__grid > div:last-child, .contact-method')], { y: 20, duration: 0.58, stagger: 0.07 });
  createMediaParallax();

  const progress = document.querySelector('[data-scroll-progress]');
  if (progress) {
    gsap.to(progress, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.18 }
    });
  }

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('portfolio:smooth-scroll', () => ScrollTrigger.update(), { passive: true });
  window.addEventListener('portfolio:layout-change', refresh);
  window.addEventListener('load', refresh, { once: true });
  document.fonts?.ready.then(refresh);
}
