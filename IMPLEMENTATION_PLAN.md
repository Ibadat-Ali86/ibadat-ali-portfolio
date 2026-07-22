# Portfolio Implementation Plan

## Objective

Deliver the handoff-defined, responsive, static Vite portfolio for Ibadat Ali; publish it through the requested GitHub repository after verified quality gates.

## Requirement map

| Requirement | Implementation target | Evidence |
| --- | --- | --- |
| One semantic scrolling page with no router | `index.html`, `src/main.js` | HTML and Playwright checks |
| Canonical 17-project source | `src/data/projects.js` | Node invariant tests |
| Accessible no-JavaScript project content | `scripts/render-static.mjs`, generated regions in `index.html` | build inspection + JS-disabled browser check |
| Private-client safeguards | renderer, data tests, build-output privacy scan | Node tests and `dist/` scan |
| Brutalist tokens and components | `src/styles/*.css` | CSS review and screenshots |
| Required section order | `index.html` | DOM order test and browser check |
| Safe external links | renderer and static anchors | HTML + Playwright checks |
| Responsive navigation, filters, motion | `src/modules/*.js` | Playwright keyboard/reduced-motion tests |
| Real profile asset and honest interview fallback | `public/assets/profile/*`, `index.html`, `video-observer.js` | asset inspection and browser check |
| Generated art provenance and budgets | `public/assets/generated/*` | provenance record, file-size check |
| SEO, favicon, Open Graph | `index.html`, `public/*` | build and HTML validation |
| Quality gates and CI | `package.json`, tests, `.github/workflows/ci.yml` | local commands and GitHub checks |

## Assumptions and constraints

- The handoff’s extracted files are authoritative because its requested ZIP was absent.
- Deployment URL, interview video, poster, captions, and verified email are not supplied; the site will use the required accessible fallback and will not claim deployment.
- No Figma MCP was listed by the installed Codex CLI. The written design system remains authoritative.
- No private-source terms may enter the production build, even though source handoff documents remain in the repository documentation.

## Sequence

1. Import the handoff and commit planning artifacts.
2. Scaffold Vite and install pinned, verified packages.
3. Create canonical data, static renderer, and invariant tests.
4. Build tokens, components, sections, assets, and progressive enhancements.
5. Add test, validation, CI, accessibility, and release documentation.
6. Run local and GitHub verification, review, merge only after successful checks.

## Security, performance, and rollback

- The static site has no forms, secrets, analytics SDKs, or mutable backend state.
- Links are explicitly allowlisted by project data and rendered with safe external-link attributes.
- Lazy media, declared dimensions, conditional motion, and lean modules preserve the stated budget.
- Each implementation phase is committed independently; revert commits provides rollback.

## Completion criteria

All 17 cards render in order, private-client and excluded-project rules are proven, tests/build/browser QA pass, CI succeeds, and the merged repository plus an evidence-based verification report are available.
