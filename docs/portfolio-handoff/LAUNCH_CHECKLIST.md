# LAUNCH_CHECKLIST.md

## Content and project inventory

- [ ] All 17 canonical project entries render.
- [ ] Featured order exactly matches `PROJECT_CATALOG.md`.
- [ ] Parent collections do not appear as cards.
- [ ] AdaptIQ / ForecastAI is the only Walmart card.
- [ ] Evershine displays `PRIVATE CLIENT PROJECT` and its live URL.
- [ ] Evershine has no GitHub icon, source link, repository text, or inferred source route.
- [ ] Excluded repositories are absent.
- [ ] No contradictory or unverified metric appears.
- [ ] Healthcare copy uses research/decision-support language.

## Links

- [ ] Run an automated external-link check.
- [ ] Manually verify all live demos.
- [ ] Open external links in a new tab with safe rel attributes.
- [ ] Confirm child-repository paths still exist.
- [ ] Confirm the exact Evershine URL spelling: `evershineacadmey.com`.

## Accessibility

- [ ] Skip link works.
- [ ] Keyboard navigation reaches every action.
- [ ] Focus is visible against every background.
- [ ] Heading hierarchy is logical.
- [ ] Images have useful alt text or empty alt when decorative.
- [ ] Category filters use real buttons and expose selected state.
- [ ] Project details disclosure uses `aria-expanded` when present.
- [ ] Reduced-motion mode reveals all content immediately.
- [ ] Interview video has captions or is removed.

## Responsive QA

- [ ] 320px
- [ ] 375px
- [ ] 768px
- [ ] 1024px
- [ ] 1440px
- [ ] No horizontal overflow.
- [ ] Long project titles wrap without overlapping status labels.
- [ ] Cards remain readable with images blocked.

## Performance

- [ ] Lighthouse mobile and desktop runs recorded.
- [ ] Hero image ≤220 KB.
- [ ] Featured thumbnails target ≤160 KB.
- [ ] Other thumbnails target ≤110 KB.
- [ ] Width/height are declared on images.
- [ ] Below-the-fold images lazy-load.
- [ ] Video uses `preload="metadata"`.
- [ ] No more than two continuously animated decorative layers.
- [ ] No console errors or unhandled play promises.

## Privacy and integrity

- [ ] No secrets or private repository references in source, JSON, comments, alt text, Open Graph data, or build output.
- [ ] Generated artwork contains no real patient data or identifiable people.
- [ ] Public copy does not imply ownership of excluded upstream work.
- [ ] Repository claims are either reproduced, qualified, or omitted.

## Final build

- [ ] `npm run build` succeeds.
- [ ] Production preview works with JavaScript disabled for core content.
- [ ] HTML validation passes.
- [ ] Favicon and Open Graph assets exist.
- [ ] 404/deployment fallback is configured where needed.
- [ ] The final deployed URL is tested on a real phone.
