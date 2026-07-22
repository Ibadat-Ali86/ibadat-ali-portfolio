# Ibadat Ali — AI Systems Portfolio

A responsive, static Vite portfolio for Ibadat Ali: AI systems, research engineering, data products, and full-stack delivery.

## Architecture

- Semantic single-page HTML with build-time project rendering
- Vanilla JavaScript for navigation, filters, the portfolio assistant, restrained GSAP reveal motion, Lenis enhancement, and media fallbacks
- Modular CSS with controlled digital-brutalist tokens and responsive grids
- One canonical project source: `src/data/projects.js`
- A serverless `/api/chat` route using `meta/llama-3.3-70b-instruct` through NVIDIA's hosted API

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

Copy `.env.example` to `.env.local` and provide `NVIDIA_API_KEY` to enable the assistant locally. The key is server-only: never use a `VITE_` prefix and never commit the populated environment file.

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
- The interview section is intentionally absent from the public page until a video, poster, and captions are supplied.
- No form endpoint or analytics provider has been configured.

## Deployment

The production artifact is `dist/` after `npm run build`. The portfolio is deployed through the linked Vercel project at https://ibadat-ali-portfolio.vercel.app. Add `NVIDIA_API_KEY` to the Vercel project's Production, Preview, and Development environments before deployment.

The original handoff documents are retained unchanged in `docs/portfolio-handoff/`.
