# Ibadat Ali — AI Systems Portfolio

A responsive, static Vite portfolio for Ibadat Ali: AI systems, research engineering, data products, and full-stack delivery.

## Architecture

- Semantic single-page HTML with build-time project rendering
- Vanilla JavaScript for navigation, filters, restrained GSAP reveal motion, Lenis enhancement, and media fallbacks
- Modular CSS with controlled digital-brutalist tokens and responsive grids
- One canonical project source: `src/data/projects.js`

The build-time renderer writes all project cards into `index.html`, so project content remains available before JavaScript loads.

## Project hierarchy

- 7 featured systems
- 5 selected case studies
- 5 labs and compact tools

Parent collections and duplicate/upstream repositories are intentionally excluded. The private-client card presents its required public live-site action only.

## Setup

```bash
nvm use
npm ci
npm run dev
```

## Quality commands

```bash
npm run lint
npm test
npm run build
npm run validate:html
npm run check
npm run test:e2e
npm run test:links
```

## Assets and privacy

- Generated abstract artwork lives in `public/assets/generated/`; provenance is documented there.
- The profile image is user-supplied and optimized locally; no generated likeness is used.
- The interview section intentionally displays an accessible placeholder until a video, poster, and captions are supplied.
- No verified deployment URL, form endpoint, or analytics provider has been configured.

## Deployment

The production artifact is `dist/` after `npm run build`. Deploy it to a static host after a deployment URL and its release checks are available. No deployment status is claimed by this repository.

The original handoff documents are retained unchanged in `docs/portfolio-handoff/`.
