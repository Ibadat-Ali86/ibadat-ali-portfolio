# Implementation Decisions

## 2026-07-22 — workspace placement

The supplied archive was already extracted and was not itself present as a ZIP. To preserve that source material, the fresh Git repository lives in `ibadat-ali-portfolio/` within the extracted handoff directory. The unmodified final documents are retained under `docs/portfolio-handoff/`.

## 2026-07-22 — profile media

The user supplied a real profile image. It will be used directly, optimized locally, and presented with CSS-only framing and motion. No generated or altered likeness will be created.

## 2026-07-22 — public site privacy

Handoff documentation is retained for repository provenance but is not imported into the Vite public build. The static renderer and automated tests will keep the private-client card restricted to its required public label and live-site action.
