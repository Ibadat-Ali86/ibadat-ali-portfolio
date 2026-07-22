# DESIGN_SYSTEM.md

## Visual principle

Controlled digital Brutalism: precise structure with intentionally raw edges. The system should feel engineered, not decorative.

## Core tokens

```css
:root {
  --ink: #090909;
  --paper: #f6f4ec;
  --acid: #b8ff00;
  --cobalt: #2961ff;
  --white: #ffffff;
  --muted: #d1d1c7;
  --border: 3px;
  --shadow-sm: 6px 6px 0 var(--ink);
  --shadow-lg: 10px 10px 0 var(--ink);
  --content: 1320px;
  --space-section: clamp(5rem, 9vw, 9rem);
}
```

## Typography

- Display: `Space Grotesk`, 700.
- Technical labels, metadata, buttons, tags: `IBM Plex Mono`, 700.
- Fallback: `Arial Black`, `Arial`, sans-serif for display; `Courier New`, monospace for technical copy.
- Use uppercase sparingly for navigation, statuses, and indexes; body text remains sentence case.

## Grid

- Desktop: 12 columns, 24px gutters, 60px page margins at 1440px.
- Tablet: 8 columns, 24px margins.
- Mobile: 4 columns, 18px margins.
- Section backgrounds may be full bleed; content remains constrained.

## Components

### Brutalist button
3px border, square corners, hard shadow, visible focus ring. On press, translate by the shadow offset and remove the shadow.

### Featured card
- 16:10 media.
- 3px border and 8px hard shadow.
- Number, status, title, hook, problem/solution, stack, action row.
- No modal routing. Optional inline disclosure only.

### Selected card
- 16:10 media or technical diagram crop.
- Shorter copy and compact stack tags.
- Two-column desktop grid.

### Lab card
- Compact text-first card.
- Optional small square visual.
- One-line purpose, stack, and source link.

### Private-client card
- Status chip: `PRIVATE CLIENT PROJECT`.
- Live CTA only.
- No source icon, GitHub icon, repository wording, or “code unavailable” text.

## Category accents

- AI Agents & Developer Tools: acid lime.
- AI Health & Applied ML: cobalt.
- Forecasting & Decision Systems: warm paper with acid data marks.
- Full-Stack & Client Platforms: cobalt blocks with paper UI geometry.
- Analytics & BI: paper/ink charts with acid highlights.
- ML & Data Labs: muted paper with compact black diagrams.

## Accessibility

Maintain WCAG AA contrast for body text and controls. Never rely on accent color alone for status. Hover states must have equivalent focus states. Motion cannot be required to reveal information.
