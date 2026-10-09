# Ibadat Ali — AI Automation & Systems Engineering

I build practical AI, data, and automation systems, from problem framing and model evaluation through usable software and a documented handoff.

[Portfolio website](https://ibadat-ali-portfolio.vercel.app/) · [GitHub profile](https://github.com/Ibadat-Ali86) · [Email](mailto:ibadcodes@gmail.com)

My work sits across applied machine learning, LLM workflows, developer tools, and full-stack delivery. I’ve worked as an ML / AI Engineer and Data Scientist Intern, alongside independent project delivery. The portfolio focuses on what each system does, how it is put together, and the evidence available to inspect it.

## Selected work

- **[CodeScope MCP Preflight](https://github.com/Ibadat-Ali86/codescope-mcp-preflight)** — Local-first repository analysis and context retrieval for coding agents.
- **[CareVision](https://github.com/Ibadat-Ali86/carevision)** — Multimodal, human-reviewed decision-support prototype; not a diagnostic system.
- **[SentinelIQ](https://github.com/Ibadat-Ali86/sentinel-iq-cmpass-nasa-rul-prediction)** — Predictive-maintenance workflow combining sequence modeling, anomaly signals, explanations, and planning.
- **[TopoLite-KD](https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification)** — Research prototype exploring topology-aware knowledge distillation.
- **[AdaptIQ / ForecastAI](https://github.com/Ibadat-Ali86/Demand-Sales-Walmart-Forecasting)** — Demand-forecasting workflow with model comparison and a planning interface.
- **WhatsApp Transaction Verification AI Agent** — Private client workflow; the [portfolio case study](https://ibadat-ali-portfolio.vercel.app/) describes the work without exposing its source repository.

Project claims are kept deliberately narrow: metrics are shown only when their definitions and results can be verified, and private client source code is not linked.

## About this repository

This repository contains the responsive, single-page portfolio website for Ibadat Ali. It presents AI systems, research engineering, data products, and full-stack delivery through case studies, project details, experience, and contact information.

## Architecture

- Semantic single-page HTML with build-time project rendering
- Vanilla JavaScript for navigation, filters, the portfolio assistant, restrained GSAP reveal motion, Lenis enhancement, and media fallbacks
- Modular CSS with controlled digital-brutalist tokens and responsive grids
- One canonical project source: `src/data/projects.js`
- A serverless `/api/chat` route using `meta/llama-3.1-8b-instruct` through NVIDIA's hosted API

The build-time renderer writes the project catalog from a single source of truth in a priority-ordered layout. Projects are grouped for browsing and remain available before JavaScript loads.

## Portfolio experience

- Featured systems and selected case studies lead the catalog; focused labs follow them.
- Every project opens a case-study detail view with scope, approach, result, technology, and available evidence
- Client and workflow evidence is labeled explicitly, with private work protected from source links
- Responsive layouts support mobile, tablet, and desktop widths; keyboard and reduced-motion preferences are supported

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
- The contact form uses a local `mailto:` fallback; no external form endpoint or analytics provider has been configured.

## Deployment

The production artifact is `dist/` after `npm run build`. The portfolio is deployed through the linked Vercel project at https://ibadat-ali-portfolio.vercel.app. Add `NVIDIA_API_KEY` to the Vercel project's Production, Preview, and Development environments before deployment.

The original handoff documents are retained unchanged in `docs/portfolio-handoff/`.
