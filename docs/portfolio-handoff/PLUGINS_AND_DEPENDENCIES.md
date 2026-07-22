# PLUGINS_AND_DEPENDENCIES.md

## Runtime dependencies

Pin exact versions at implementation time after checking the current npm registry.

- `vite` — build, dev server, asset hashing.
- `gsap` — timeline animation.
- `@gsap/scrolltrigger` or the ScrollTrigger export included with GSAP, depending on the verified package API.
- `lenis` — optional progressive smooth scrolling.
- `lucide` — social/action icons with visible labels.

## No framework dependency

Do not add React, Vue, Svelte, Framer Motion, Three.js, AOS, a carousel library, or a filtering library. The site does not need application state or heavy visual runtime dependencies.

## Fonts

Use self-hosted or carefully loaded `Space Grotesk` and `IBM Plex Mono` when licensing/source is clear. Define complete system fallbacks. Never ship font files from an unverified source.

## Image generation

Use the available Codex/OpenAI image-generation capability for project art. Save optimized WebP outputs under `public/assets/generated/`. Do not call an image API from the browser.

## Contact and analytics

No contact-form or analytics package is included by default. Add one only after the user chooses a provider and the privacy impact, environment variables, consent behavior, and failure states are documented.

## Deployment

The static build may be deployed to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. Avoid provider-specific SDKs unless a concrete feature requires them.
