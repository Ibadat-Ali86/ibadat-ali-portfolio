# Master Codex Implementation Prompt — Ibadat Ali Portfolio

You are acting as a **principal frontend engineer, design-system implementer, accessibility specialist, QA engineer, and release owner**. Build the production-quality portfolio described by the attached handoff package.

## 1. Inputs and source of truth

Locate and extract:

`Ibadat_Ali_Brutalist_Portfolio_Codex_Handoff_v2.zip`

The extracted documentation contains:

- `AGENTS.md`
- `README.md`
- `PROJECT_CATALOG.md`
- `projects.manifest.json`
- `GITHUB_AND_KAGGLE_AUDIT.md`
- `SYSTEM_ARCHITECTURE.md`
- `DESIGN_SYSTEM.md`
- `COPY_GUIDELINES.md`
- `SECTIONS_SPEC.md`
- `IMAGEGEN_PROMPTS.md`
- `PLUGINS_AND_DEPENDENCIES.md`
- `LAUNCH_CHECKLIST.md`
- `CHATMEMORY.md`

Figma design source:

`https://www.figma.com/design/H15ij1vb3Kp1Wk0Qg6XLmR`

GitHub owner:

`Ibadat-Ali86`

Create this repository:

`Ibadat-Ali86/ibadat-ali-portfolio`

Repository description:

`Production portfolio for Ibadat Ali — AI systems, research engineering, data products, and full-stack delivery.`

The handoff documents are authoritative. When the Figma concept and the final handoff disagree about content, project count, privacy, or hierarchy, follow the final handoff.

---

## 2. Working behavior

Work autonomously and professionally. Do not stop after writing a plan. Continue through implementation, verification, Git commits, GitHub push, and a final report.

Before editing code:

1. Read **every handoff document completely**.
2. Inspect the installed Codex skills, plugins, and MCP servers.
3. Explicitly activate only the skills that match this work.
4. Use existing tools before installing anything new.
5. Never invent a skill, plugin, MCP server, package API, test result, metric, deployment, or asset.
6. Keep a running `PROGRESS.md` with completed phases, commands, validation evidence, blockers, and next action.
7. Keep `DECISIONS.md` for implementation decisions that are not already fixed by the handoff.
8. Do not ask routine questions whose answers are already present in the documentation. Ask only when a destructive operation, missing credential, or genuinely unresolved product decision prevents safe progress.

### Essential tools and integrations

Discover what is actually available first. Prefer the following when installed and authorized:

- **Figma MCP**: inspect frames, spacing, typography, colors, screenshots, and layout details from the provided file. Use it as a visual reference; do not overwrite the final design unless asked.
- **GitHub CLI (`gh`)**: authentication, repository creation, remote setup, issues, pull request, and repository verification.
- **GitHub MCP/plugin**: optional for richer repository and PR context when available; `git` and `gh` remain the source of truth for local history and repository creation.
- **Playwright or Chrome DevTools MCP**: visual QA, keyboard flows, responsive screenshots, console/network checks, and browser testing.
- **Context7 or another approved developer-documentation MCP**: verify current Vite, GSAP, Lenis, Lucide, Playwright, and related APIs before implementation.
- **Image-generation skill/plugin**: generate abstract portfolio artwork using `IMAGEGEN_PROMPTS.md`, with no readable text, logos, watermarks, fake dashboards, identifiable people, or sensitive medical imagery.
- **Security review skill/plugin**: run an authorized review only after the implementation is stable.

Run the available discovery commands or interfaces, including the equivalent of:

```bash
codex mcp list
codex mcp --help
```

Also inspect available skills through the Codex skills interface. Do not install random MCP servers or plugins. When an essential capability is unavailable, use a safe CLI fallback and record the limitation in `PROGRESS.md` and `VERIFICATION_REPORT.md`.

---

## 3. Non-negotiable product rules

1. Build a **single responsive scrolling page** using **Vite, semantic HTML, modular CSS, and vanilla JavaScript**.
2. Do not add React, Vue, Svelte, Next.js, Three.js, Framer Motion, AOS, a carousel package, or a filtering package.
3. Use one canonical project source: `src/data/projects.js`.
4. Render exactly **17 canonical projects**:
   - 7 featured
   - 5 selected
   - 5 labs/tools
5. Use the exact order and hierarchy from `PROJECT_CATALOG.md` and `AGENTS.md`.
6. Keep excluded parent repositories and upstream work out of the UI.
7. Show **AdaptIQ / ForecastAI** as the only Walmart forecasting card.
8. Evershine Academy LMS is a **PRIVATE CLIENT PROJECT**:
   - live CTA only;
   - no GitHub icon;
   - no repository URL;
   - no “view source” text;
   - no source-access wording;
   - no repository name, commit, branch, or private administration screenshot in HTML, JavaScript, metadata, comments, alt text, tests, generated files, or build output.
9. Do not publish contradictory or unverified model metrics.
10. Use research/decision-support wording for healthcare projects; never claim diagnosis, treatment, clinical deployment, or medical outcomes.
11. Do not generate Ibadat’s likeness. Use the real profile image only when supplied. Until then, use an honest typographic or abstract placeholder.
12. Do not create a fake contact form. Use LinkedIn as the primary contact path until a verified endpoint is supplied.
13. External links must use `target="_blank" rel="noopener noreferrer"`.
14. Support keyboard navigation, visible focus, reduced motion, readable fallbacks, and JavaScript-disabled core content.
15. No secrets, private paths, machine-specific file paths, or credentials may enter Git history.

Verified social destinations from the handoff:

- LinkedIn: `https://www.linkedin.com/in/mirzaibadatali`
- TikTok: `https://www.tiktok.com/@deepfx6`
- Instagram: `https://www.instagram.com/expla_inableai`
- Kaggle: `https://www.kaggle.com/ibadatali`
- GitHub: `https://github.com/Ibadat-Ali86`

---

## 4. Phase 0 — environment and safety preflight

Run and record:

```bash
pwd
node --version
npm --version
git --version
gh --version
gh auth status
codex mcp list
```

Then:

- Confirm the handoff ZIP exists and is readable.
- Confirm GitHub authentication belongs to `Ibadat-Ali86` or has permission to create a repository for that owner.
- Check whether `Ibadat-Ali86/ibadat-ali-portfolio` already exists.
- If it exists and is non-empty, do not overwrite it. Inspect it and either continue safely on a new branch when it is clearly this same project, or stop with a precise blocker.
- Never delete or force-push an existing unrelated repository.

---

## 5. Phase 1 — initialize Git and create the GitHub repository first

Create a fresh working directory and initialize Git before implementing the website:

```bash
mkdir -p ibadat-ali-portfolio
cd ibadat-ali-portfolio
git init -b main
```

Create a minimal professional `.gitignore` and temporary `README.md`, then make the initialization commit:

```bash
git add .gitignore README.md
git commit -m "chore: initialize portfolio repository"
```

Create the remote with GitHub CLI and push the initialization commit:

```bash
gh repo create Ibadat-Ali86/ibadat-ali-portfolio \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Production portfolio for Ibadat Ali — AI systems, research engineering, data products, and full-stack delivery."
```

Verify:

```bash
git remote -v
git status
gh repo view Ibadat-Ali86/ibadat-ali-portfolio --json nameWithOwner,url,visibility,defaultBranchRef
```

Do not add a license unless the user has explicitly selected one.

Create a working branch:

```bash
git switch -c feat/portfolio-v1
```

---

## 6. Phase 2 — import and normalize the handoff

Extract the handoff into:

`docs/portfolio-handoff/`

Copy the final `AGENTS.md` to the repository root so it governs the project. Preserve the original inside the docs folder as well.

Create:

- `IMPLEMENTATION_PLAN.md`
- `PROGRESS.md`
- `DECISIONS.md`
- `VERIFICATION_REPORT.md`

In `IMPLEMENTATION_PLAN.md`, map every requirement to a file, component/module, test, and acceptance check. Do not replace the original handoff documents with summaries.

Commit:

```bash
git add .
git commit -m "docs: import final portfolio handoff and implementation plan"
git push -u origin feat/portfolio-v1
```

---

## 7. Phase 3 — scaffold the production project

Follow `SYSTEM_ARCHITECTURE.md`.

Use a current stable Vite vanilla setup. Because the repository already contains documentation, scaffold into a temporary folder and merge only the required project files rather than overwriting the handoff.

Before installing dependencies, query the current registry and verify package APIs. Pin exact versions in the lockfile.

Required runtime packages, only after verification:

- Vite
- GSAP with ScrollTrigger through the package’s supported export
- Lenis as progressive enhancement
- Lucide’s appropriate vanilla package/API

Recommended development tooling, kept lean:

- ESLint
- Prettier
- Stylelint when it provides real value
- Playwright
- `@axe-core/playwright`
- `html-validate` or an equivalent maintained validator

Prefer Node’s built-in test runner for data-contract and privacy tests unless a heavier unit-test framework is justified.

Add scripts similar to:

```json
{
  "dev": "vite",
  "prebuild": "node scripts/render-static.mjs",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "...",
  "test": "node --test",
  "test:e2e": "playwright test",
  "validate:html": "...",
  "check": "npm run lint && npm test && npm run validate:html && npm run build"
}
```

Use the file structure defined in `SYSTEM_ARCHITECTURE.md`, extending it only when a clear responsibility requires it.

---

## 8. Phase 4 — build the data contract and static rendering foundation

Convert `projects.manifest.json` into the canonical `src/data/projects.js` module. Preserve all privacy and editorial safeguards.

Add automated invariant tests for at least:

- exactly 17 entries;
- exactly 7 featured, 5 selected, and 5 lab entries;
- unique slugs;
- required fields;
- valid external URLs;
- Evershine has `github: null`, `sourceAccess: 'private'`, and `showSourceLink: false`;
- the renderer never infers a GitHub link from a slug;
- excluded repository names do not render as cards;
- AdaptIQ is the only Walmart card;
- prohibited metrics and medical claims are absent.

Meet both requirements—one data source and useful no-JavaScript content—by implementing **build-time static rendering**:

1. `scripts/render-static.mjs` imports `src/data/projects.js`.
2. It generates semantic project markup into clearly marked regions of `index.html` before every build.
3. Client JavaScript progressively enhances the already-rendered DOM with filters, active navigation, motion, and media behavior.
4. The build fails when the generated markup violates a privacy or inventory invariant.

Do not duplicate project data manually in HTML.

---

## 9. Phase 5 — implement the design system first

Use the Figma MCP to inspect the existing portfolio concept and final Project Atlas board. Capture reference screenshots and measurements before styling.

Implement tokens from `DESIGN_SYSTEM.md`:

- near-black ink;
- warm paper;
- acid lime;
- cobalt blue;
- white and muted neutral;
- 3px borders;
- square corners;
- hard offset shadows;
- Space Grotesk display typography;
- IBM Plex Mono technical typography;
- 12-column desktop, 8-column tablet, and 4-column mobile grids.

Use self-hosted fonts only from a verified licensed source. Otherwise use a privacy-conscious hosted source or the documented system fallbacks. Do not copy unverified font files into the repository.

Build reusable CSS primitives before page sections:

- container and grid;
- section header/index;
- brutalist button and link;
- status label;
- tag/chip;
- media frame;
- featured card;
- selected card;
- lab card;
- focus ring;
- skip link;
- empty/media placeholder.

Avoid one-off styling that bypasses tokens.

---

## 10. Phase 6 — implement sections in the required order

Build exactly this page structure:

1. Global sticky navigation
2. Hero
3. About
4. Capabilities
5. Featured Systems
6. Complete Project Atlas
7. Interview
8. Social
9. Contact
10. Footer

Follow `SECTIONS_SPEC.md` and `COPY_GUIDELINES.md` precisely.

### Navigation

- semantic `<nav>`;
- skip link;
- desktop and mobile behavior;
- real menu button with `aria-expanded` and `aria-controls`;
- Escape closes the menu and restores focus;
- active section via IntersectionObserver;
- no navigation action depends only on hover.

### Hero

- minimum `100svh`;
- strong three-line positioning headline;
- two real CTAs;
- technical signal strip;
- abstract system visual rather than a fake dashboard.

### About

- honest profile-image placeholder until the real image is provided;
- never generate a face or user likeness;
- credibility strip based only on verified handoff wording.

### Featured Systems

Render the seven featured projects in exact order. Alternate editorial card layouts. The seventh card spans both columns at wide widths.

For Evershine, render only:

- `PRIVATE CLIENT PROJECT`;
- project overview and verified stack from the handoff;
- `VISIT LIVE WEBSITE`.

No source-related UI or metadata is permitted.

### Complete Project Atlas

- render the remaining ten projects;
- group them meaningfully;
- category filters are real buttons with selected state;
- all projects remain present and readable before enhancement;
- selected cards use a two-column desktop grid;
- labs use a three-column grid only when space allows.

### Interview

Do not create a broken media request. Until the real MP4, poster, and captions exist, render an intentional accessible placeholder. When assets are supplied:

- 16:9 video;
- native controls;
- captions track;
- `preload="metadata"`;
- muted autoplay only when at least 55% visible;
- pause when leaving view;
- handle rejected play promises;
- reduced-motion mode disables autoplay.

### Social and Contact

Use the five verified social URLs. LinkedIn is the primary contact CTA. No fake form.

---

## 11. Phase 7 — artwork and media

Read every prompt in `IMAGEGEN_PROMPTS.md`.

When an approved image-generation skill is available:

1. Generate abstract visuals at suitable source resolution.
2. Reject outputs containing readable text, logos, brand marks, watermarks, UI copy, real people, patient data, or misleading product screenshots.
3. Optimize to WebP under `public/assets/generated/`.
4. Record prompt, generation date, model/tool, edits, dimensions, and output filename in `public/assets/generated/PROVENANCE.md`.
5. Keep featured images within the handoff’s size targets.

When image generation is unavailable, create original geometric SVG/CSS visuals that follow the same prompts. Do not scrape random internet artwork.

Create an honest OG image using the portfolio’s shapes and typography, without private information.

---

## 12. Phase 8 — motion and progressive enhancement

Use CSS for hover, focus, button presses, and simple transitions.

Use GSAP/ScrollTrigger only for:

- staged section reveals;
- restrained card reveals;
- tiny media parallax where it materially improves the composition.

Use Lenis only as an optional enhancement. Native scrolling must remain fully functional when it fails or is disabled.

Under `prefers-reduced-motion: reduce`:

- reveal all content immediately;
- disable smooth scrolling, parallax, magnetic effects, and autoplay;
- keep state changes understandable without animation.

Limit continuous decorative animation to a maximum of two layers.

---

## 13. Phase 9 — responsive, accessibility, SEO, and performance

### Responsive QA widths

Test at minimum:

- 320px
- 375px
- 768px
- 1024px
- 1440px

Also test zoom at 200%, long titles, blocked images, slow network, and touch input.

### Accessibility

- logical headings;
- semantic landmarks;
- visible focus on every background;
- meaningful alt text, empty alt for decorative images;
- keyboard access to every action;
- filter states exposed with ARIA;
- no focus traps or hidden focus;
- sufficient contrast;
- reduced-motion support;
- no icon-only social links;
- captions required before publishing the interview video.

### SEO and metadata

Add:

- accurate title and description;
- favicon;
- Open Graph and social metadata;
- robots and sitemap when deployment URL is known;
- structured data only from verified public facts;
- no placeholder canonical URL;
- no private source information anywhere in metadata or generated output.

### Performance

Enforce the budgets from `SYSTEM_ARCHITECTURE.md` and `LAUNCH_CHECKLIST.md`:

- compressed JS target at or below 180 KB including motion libraries;
- compressed CSS target at or below 50 KB;
- declared image dimensions;
- lazy loading below the fold;
- no full video preload;
- CLS at or below 0.05 target;
- mobile LCP target at or below 2.5 seconds under the documented simulated conditions.

When a target is missed, optimize and rerun. Never claim a score that was not actually measured.

---

## 14. Phase 10 — automated QA and browser evidence

Use Playwright or the available browser MCP to test:

- initial load and no console errors;
- navigation and skip link;
- mobile menu keyboard flow;
- all 17 projects present;
- filters;
- every CTA destination;
- Evershine privacy invariant;
- reduced-motion mode;
- image fallbacks;
- JavaScript-disabled core content;
- 320/375/768/1024/1440 screenshots;
- no horizontal overflow;
- external links use safe attributes.

Run accessibility checks with Axe or an equivalent tool and manually verify keyboard behavior.

Run an external-link checker. Treat transient network failures separately from definite 404/invalid URLs.

Run:

```bash
npm run check
npm run test:e2e
npm run build
npm run preview
```

Inspect the production `dist/` output for:

- private paths;
- Evershine source references;
- excluded repository names rendered as project cards;
- secrets;
- source maps when they are not intended;
- broken asset paths.

Run a final authorized dependency/security review. Fix high-confidence issues without adding unnecessary packages.

---

## 15. Phase 11 — CI and repository professionalism

Add a maintained GitHub Actions workflow that runs on pull requests and pushes to `main`:

- dependency installation using the lockfile;
- lint;
- data/privacy invariant tests;
- HTML validation;
- production build;
- Playwright checks where practical;
- artifact upload for failure screenshots/reports when useful.

Use the current supported Node LTS and current maintained action versions after verifying official documentation. Add `.nvmrc` or an equivalent version declaration.

Add professional repository files:

- final `README.md` with setup, architecture, scripts, project hierarchy, privacy rules, assets, testing, and deployment instructions;
- `CONTRIBUTING.md` for future maintenance;
- `.editorconfig`;
- pull request template;
- optional issue templates only when they add real value;
- `SECURITY.md` appropriate for a static personal site.

Do not add badges for checks or deployments that do not exist.

---

## 16. Commit and pull-request discipline

Use small, meaningful commits. Suggested sequence:

1. `chore: initialize portfolio repository`
2. `docs: import final portfolio handoff and implementation plan`
3. `chore: scaffold vite project and quality tooling`
4. `feat: add canonical project data and static rendering`
5. `feat: implement brutalist design system and page shell`
6. `feat: build featured systems and project atlas`
7. `feat: add accessible navigation media and motion`
8. `feat: add generated artwork metadata and seo assets`
9. `test: add responsive accessibility and privacy checks`
10. `ci: add portfolio quality gates`
11. `docs: finalize implementation and verification report`

After all checks pass:

```bash
git status
git log --oneline --decorate -n 15
git push

gh pr create \
  --base main \
  --head feat/portfolio-v1 \
  --title "feat: launch Ibadat Ali portfolio v1" \
  --body-file VERIFICATION_REPORT.md
```

Review the PR diff and CI results. Do not merge while a required check fails. When all required checks pass and the diff contains no private information, merge with squash and delete the feature branch:

```bash
gh pr merge --squash --delete-branch
```

Then update local `main` and verify the final repository state.

---

## 17. Completion criteria

The task is complete only when:

- the GitHub repository exists under `Ibadat-Ali86`;
- local Git and `origin` are correctly initialized;
- the complete responsive site is implemented;
- all 17 projects render in the required hierarchy;
- Evershine exposes only its live website and private-client label;
- excluded repositories are absent as cards;
- no unverified metrics appear;
- the design matches the Figma/brutalist system across desktop and mobile;
- no broken media requests are present;
- keyboard, reduced-motion, and JavaScript-disabled paths work;
- lint, tests, HTML validation, production build, and browser QA pass;
- CI is configured and passing;
- the feature branch is merged only after passing checks;
- `VERIFICATION_REPORT.md` contains command evidence, actual results, screenshots/report paths, remaining asset placeholders, and the final GitHub URL.

## 18. Final response format

Return a concise professional handoff containing:

1. repository URL;
2. branch/PR/merge status;
3. implemented architecture;
4. completed sections;
5. tools, MCP servers, plugins, and skills actually used;
6. dependency versions actually installed;
7. exact commands and quality checks run;
8. actual test/build/accessibility/performance results;
9. screenshots or report locations;
10. remaining honest blockers, especially user-supplied profile/video assets or deployment credentials;
11. the single best next action.

Do not say something passed unless the command was run and its output supports the claim. Do not stop at a plan—build, test, review, and finish the repository.
