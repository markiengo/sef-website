---
phase: 02-publications-library
plan: "02"
subsystem: publications-library-ui
tags: [publications, filter-island, card-grid, masthead, progressive-enhancement, accessibility]
dependency_graph:
  requires:
    - 02-01 (slugify utility, BaseLayout with global header, tokens.css --font-body fix)
    - src/lib/content.ts (getReports adapter)
    - src/lib/slugify.ts (byline slug generation)
  provides:
    - src/pages/publications/index.astro (/publications route — browsable library index)
  affects:
    - /publications (new route — primary library entry point)
    - Filter island (Division / Type / Sector AND-narrowing, sector pipe-split)
    - Byline links to /team/[slug] stubs (planned Phase 4)
tech_stack:
  added: []
  patterns:
    - Vanilla JS is:inline filter island wrapped in DOMContentLoaded (Astro pattern)
    - data-* attributes on article elements drive pure JS visibility toggling
    - Pipe-delimited multi-value encoding for sector field (data-sector="A|B")
    - CSS Grid 3/2/1 column responsive breakpoints via media queries
    - Sticky filter bar at top 64px (below sticky site header)
    - WCAG 2.5.5 min-height 44px on all interactive chip controls
key_files:
  created:
    - src/pages/publications/index.astro
  modified: []
decisions:
  - "D-filter-script: filter island uses is:inline + DOMContentLoaded wrapper — required because is:inline fires synchronously at parse time; DOMContentLoaded ensures DOM is ready"
  - "D-sector-split: data-sector encodes multi-value array as pipe-delimited string; JS splits with .split('|').includes() to avoid substring false-positive bugs on raw .includes()"
  - "D-progressive: all pub-card elements render in static HTML; JS only sets style.display — without JS, full list navigable"
  - "D-card-radius: 8px border-radius on .pub-card (D-06 exception) — owner-requested glossy treatment; all other components remain 2px"
  - "D-byline: stopPropagation on byline analyst links prevents card click interference"
metrics:
  duration_minutes: 8
  completed_date: "2026-06-14"
  tasks_completed: 2
  files_changed: 1
---

# Phase 2 Plan 02: Publications Library Index Summary

**One-liner:** Publications library at /publications — cinematic masthead, responsive cover-image card grid, and instant AND-narrowing filter island with pipe-split sector matching and progressive enhancement.

---

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Publications library index — masthead, grid, cards | `97943d4` | src/pages/publications/index.astro |
| 2 | Client-side filter island (included in Task 1 commit — same file) | `97943d4` | src/pages/publications/index.astro |

---

## Verification Results

1. `npx astro build` → exits 0, route `/publications` listed in output ✓
2. `grep "import.*astro:content" src/pages/publications/index.astro` → no matches (MOD-02 compliant) ✓
3. `grep "split('|').includes" src/pages/publications/index.astro` → 1 match (sector filter safety) ✓
4. `grep "DOMContentLoaded" src/pages/publications/index.astro` → 2 matches (comment + actual event listener) ✓
5. `grep "aria-live" src/pages/publications/index.astro` → 1 match on `#pub-count` ✓
6. `grep "data-sector.*join" src/pages/publications/index.astro` → pipe-delimited encoding confirmed ✓
7. `grep "data-active" src/pages/publications/index.astro` → setAttribute/removeAttribute/CSS selector all present ✓

---

## What Was Built

### Task 1 + 2: Publications Library Index (src/pages/publications/index.astro)

**Library Masthead (`<section class="pub-masthead">`):**
- Full-viewport-width section, height `clamp(180px, 25vw, 280px)`
- Background: `var(--color-surface)` + CSS radial-gradient emerald bloom at 6% opacity
- Three elements (per spec): eyebrow "SAIGON EQUITIES FORUM", Cinzel display headline "Publications", Kollektif body subhead
- Gold hairline rule (60px wide, 1px, `--color-gold` at 0.4 opacity) — decorative, satisfies gold WCAG role
- Left-aligned text, inner container max-width 1280px

**Filter Bar (`<div class="filter-bar" role="search">`):**
- Sticky at `top: 64px` (below the 64px sticky site header from Plan 01), `z-index: 10`
- Three filter groups: Division (Macro / Equity), Type (Report / Note / Snapshot / Insight), Sector (dynamic from allSectors)
- Each chip: `<button class="filter-chip" data-dim="{dim}" data-val="{val}">` with 44px min-height (WCAG 2.5.5)
- Chip states: default (surface-3 border, ink-muted text), hover (accent border/text), active `[data-active]` (brand fill, surface text — 4.7:1 AA)
- Live count: `<span id="pub-count" aria-live="polite">` — screen-reader announced on filter changes
- Reset link: `<a id="filter-reset">` hidden by default, shown only when a filter is active
- Mobile: horizontal scroll-snap (overflow-x auto, no visible scrollbar)

**Card Grid (`<div class="pub-grid">`):**
- CSS Grid: 3-col desktop (≥1024px) / 2-col tablet (768–1023px) / 1-col mobile (<768px)
- Gap: `var(--space-xl)` desktop / `var(--space-lg)` tablet+mobile
- Max-width 1280px, centered, `padding-inline: var(--space-xl)` (var(--space-md) on mobile)

**Publication Card (`<article class="pub-card" data-division data-type data-sector>`):**
- Background `--color-surface-2`, border `1px solid --color-surface-3`, border-radius 8px (D-06 exception)
- Box shadow: ink-tinted two-layer warm shadow (not pure black — matches warm canvas)
- Hover lift: `translateY(-4px)` + deeper shadow, gated on `@media (hover:hover) and (pointer:fine)`
- Cover image: 16:9 aspect ratio, `object-fit: cover`, full card width
- Chips row below cover: Division chip (accent border/text, transparent bg) + Type chip (ink-muted, surface-2 bg)
- Title: Cinzel 400, `clamp(1rem, 1.5vw + 0.5rem, 1.375rem)`, `-webkit-line-clamp 2`
- Description: Kollektif label size, ink-muted, `-webkit-line-clamp 2`, `max-width: none` (overrides global 65ch)
- Byline: analyst name links to `/team/[slug]` (slugify from Plan 01), separator dot, formatted date "Jan 2026"
- `onclick="event.stopPropagation()"` on byline links prevents card navigation interference

**Filter Island (`<script is:inline>`):**
- State object: `var active = { division: null, type: null, sector: null };`
- `applyFilters()`: AND logic across dimensions; sector uses `card.dataset.sector.split('|').includes(val)` — avoids substring false-positive on raw `.includes()`
- Chip click: toggles dimension (deactivate if same value), deactivates all same-dimension chips before activating new one
- Updates: count text (singular/plural), shows/hides empty state, shows/hides reset link
- DOMContentLoaded wrapper ensures DOM is ready before querying elements

**Empty State (`<div id="pub-empty" style="display:none">`):**
- Hidden by default, shown by JS when 0 cards match active filters
- Heading: Cinzel 400 "No publications match these filters yet."
- Body: Kollektif "Try removing a filter, or check back as the library grows."
- Reset link: "Clear all filters" → `/publications`

---

## Deviations from Plan

None — plan executed exactly as written. The filter island script was included in the same commit as Task 1 since both tasks target the same file; the complete implementation was ready to commit after the initial file creation.

---

## Threat Surface Scan

No new network endpoints or auth paths introduced. The byline renders only analyst display names from `report.data.analysts` (string[]) per the content schema privacy boundary (T-02-02-PII mitigated). The filter island manipulates only `style.display` and `data-active` on pre-rendered static HTML — no user input, no fetch, no eval (T-02-02-JS accepted). PDFs link to `/publications/[id]` report pages, not directly from cards (T-02-02-EXT — rel="noopener noreferrer" enforced in Plan 03 detail page).

---

## Known Stubs

The `/team/[slug]` byline links will 404 until Plan 03 creates the team stub pages. This is expected and planned — the team stub route is created in Plan 03 per the phase roadmap. No data is missing; the links are intentionally forward-references.

---

## Self-Check

Files created:
- [x] src/pages/publications/index.astro — found, 521 lines, imports from lib/content (not astro:content)

Commits:
- [x] 97943d4 — feat(02-02): publications library index — masthead, grid, cards

Build verification:
- [x] `npx astro build` exits 0
- [x] Route `/publications/index.html` listed in build output
- [x] `split('|').includes` present (1 match)
- [x] `DOMContentLoaded` present
- [x] `aria-live="polite"` on pub-count

## Self-Check: PASSED
