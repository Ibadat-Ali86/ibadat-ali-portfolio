# AGENTS.md

## Mission

Build a production-quality, one-page portfolio for **Ibadat Ali** that proves one promise:

> Ibadat turns AI, data, research, and full-stack engineering into usable systems that can withstand real constraints.

The visual language is controlled digital Brutalism: warm paper, near-black ink, acid-lime and cobalt accents, exposed grids, 3px borders, square corners, offset hard shadows, huge geometric headlines, and monospace technical detail.

## Non-negotiable rules

1. One responsive scrolling page; no application router.
2. Use semantic HTML, keyboard-safe interactions, visible focus states, and reduced-motion support.
3. Render all project content from one `src/data/projects.js` source of truth.
4. Never fabricate clients, awards, metrics, deployment status, stars, forks, dates, testimonials, or employers.
5. Treat repository README figures as claims until reproduced or verified.
6. Generated art must contain no readable text, logos, fake dashboards, watermarks, or identifiable people.
7. Profile photo and interview video are user-supplied; never synthesize the user’s likeness.
8. External links open with `target="_blank" rel="noopener noreferrer"`.
9. Never expose source information for Evershine Academy LMS.
10. Do not show excluded parent collections as projects.

## Approved public catalog

The public catalog contains 14 projects. Keep project content in `src/data/projects.js` and render only the approved catalog slugs.

### Featured systems
1. WhatsApp Transaction Verification AI Agent
2. CodeScope MCP Preflight
3. CareVision
4. SentinelIQ
5. AdaptIQ / ForecastAI
6. Evershine Academy LMS
7. AI-Powered Lead Generation Workflow

### Additional case studies
8. AI-Powered WhatsApp Restaurant Chatbot
9. COVID-19 Global Analytics Platform
10. TopoLite-KD
11. VITAL-LINK
12. Pakistan E-commerce Price Prediction
13. Vendor Performance Analysis
14. Netflix Data Analysis

## Explicit project exclusions

Do not add these projects to the public catalog, portfolio assistant context, or RAG corpus: `csv-cleaner`, `learning-dashboard`, `mnist`, `resume-builder`, and `spam-classifier`.

## Explicit exclusions

- Data_Analysis_Projects (parent collection only)
- ML_Projects (parent collection only)
- R_Shiny-Web_Apps (parent collection only)
- portfolio
- Learning_Dasboard
- My_Python_Projects
- TopoLite-KD alternate tiny duplicate
- claw-code
- everything-claude-code
- data-science-portfolio (parent collection only)

## Evershine privacy contract

- Title: `Evershine Academy LMS`
- Label: `PRIVATE CLIENT PROJECT`
- Live CTA: `VISIT LIVE WEBSITE`
- Live URL: https://evershineacadmey.com/
- Source access: private
- Forbidden in UI, structured data, metadata, and documentation shipped to the public site: GitHub URL, repository name, “view source,” source availability, commit history, branch names, or screenshots revealing private administration data.

## Required execution order

1. Read every handoff document.
2. Initialize the Vite structure from `SYSTEM_ARCHITECTURE.md`.
3. Implement tokens and primitives before sections.
4. Keep the source data and the 14-project public catalog aligned with the approved list above.
5. Generate artwork from `IMAGEGEN_PROMPTS.md`.
6. Implement the page in the section order defined by `SECTIONS_SPEC.md`.
7. Validate every link and privacy rule.
8. Run the entire `LAUNCH_CHECKLIST.md`; document blocked checks honestly.

## Completion definition

The site is complete only when the 14 approved catalog entries render correctly, explicit project exclusions are absent from public output and assistant context, Evershine has no source link, contradictory metrics are omitted, media fallbacks work, and accessibility/performance checks pass.
