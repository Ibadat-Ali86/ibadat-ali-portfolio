# SYSTEM_ARCHITECTURE.md

## Recommended stack

Use **Vite + semantic HTML + modular CSS + vanilla JavaScript**. The portfolio is content-rich but state-light; React would add runtime and architectural overhead without solving a real product problem.

## File structure

```text
portfolio/
├── AGENTS.md
├── PROJECT_CATALOG.md
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── og-image.webp
│   └── assets/
│       ├── generated/
│       │   └── PROVENANCE.md
│       ├── profile/
│       │   ├── README.md
│       │   └── ibadat-profile.webp
│       └── video/
│           ├── README.md
│           ├── interview.mp4
│           ├── interview-poster.webp
│           └── interview-en.vtt
└── src/
    ├── main.js
    ├── data/
    │   └── projects.js
    ├── styles/
    │   ├── reset.css
    │   ├── tokens.css
    │   ├── base.css
    │   ├── components.css
    │   ├── sections.css
    │   ├── motion.css
    │   └── responsive.css
    └── modules/
        ├── navigation.js
        ├── project-renderer.js
        ├── project-filter.js
        ├── smooth-scroll.js
        ├── reveal-motion.js
        ├── magnetic-buttons.js
        ├── video-observer.js
        └── reduced-motion.js
```

## Project data contract

```js
{
  slug: 'evershine',
  title: 'Evershine Academy LMS',
  tier: 'featured', // featured | selected | lab
  category: 'Full-Stack & Client Platforms',
  status: 'PRIVATE CLIENT',
  hook: '...',
  problem: '...',
  solution: '...',
  stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
  image: '/assets/generated/project-evershine.webp',
  links: [{ label: 'Live website', href: 'https://evershineacadmey.com/' }],
  sourceAccess: 'private',
  showSourceLink: false,
  featured: true,
  safeguards: ['Never render a source or GitHub CTA']
}
```

The renderer must enforce `showSourceLink === false`; it must not infer a GitHub link from a slug.

## Runtime modules

- `project-renderer.js`: creates project cards from the data source.
- `project-filter.js`: optional category filters; all content remains available without JavaScript.
- `navigation.js`: active-section state and mobile menu.
- `smooth-scroll.js`: progressive Lenis enhancement.
- `reveal-motion.js`: GSAP section and card reveals.
- `video-observer.js`: safe muted playback at ≥55% intersection.
- `reduced-motion.js`: central capability gate.

## Motion

Use GSAP + ScrollTrigger for staged reveals and tiny media parallax. Use CSS for hover, focus, hard-shadow presses, and color inversion. Disable nonessential effects under `prefers-reduced-motion: reduce`.

## Rendering strategy

All 17 entries should exist in initial HTML or be rendered synchronously from local data before enhancement. Search engines and assistive technology must not depend on scrolling or animation to discover projects.

## Performance budget

- Total initial compressed JavaScript: target ≤180 KB including motion libraries.
- Initial CSS: target ≤50 KB compressed.
- Hero image: ≤220 KB.
- Featured thumbnail: target ≤160 KB each.
- Selected/lab thumbnail: target ≤110 KB each.
- CLS ≤0.05; LCP target ≤2.5 seconds on simulated mobile.
- Lazy-load every below-the-fold image and never preload the interview video fully.
