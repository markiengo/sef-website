---
phase: 02-publications-library
plan: "01"
subsystem: layout-foundation
tags: [tokens, fonts, layout, navigation, accessibility]
dependency_graph:
  requires: []
  provides:
    - src/styles/tokens.css (--font-body → var(--font-kollektif))
    - src/lib/slugify.ts (canonical slugify named export)
    - src/layouts/BaseLayout.astro (global site header + footer)
  affects:
    - all pages inheriting BaseLayout (every current and future page)
    - Phase 2 byline links (import slugify from lib/slugify)
    - Phase 4 analyst profiles (same slugify import contract)
tech_stack:
  added: []
  patterns:
    - Astro scoped <style> for header/footer (token-only, no hardcoded hex)
    - Vanilla JS is:inline hamburger toggle (aria-expanded pattern)
    - Named TS export utility (no default export, mirrors content.ts)
key_files:
  created:
    - src/lib/slugify.ts
  modified:
    - src/styles/tokens.css
    - src/layouts/BaseLayout.astro
decisions:
  - "D-fonts: --font-body token updated from var(--font-the-seasons) (undefined) to var(--font-kollektif) — unlocks Kollektif body text site-wide"
  - "D-slug: slugify formula locked at lowercase + hyphen + strip non-alphanumeric — Phase 4 must import from lib/slugify.ts, never duplicate"
  - "D-nav: Join link uses rel='noopener noreferrer' (T-02-01-EXT threat mitigated)"
metrics:
  duration_minutes: 2
  completed_date: "2026-06-14"
  tasks_completed: 2
  files_changed: 3
---

# Phase 2 Plan 01: Foundation — Token Fix, Slugify, Global Chrome Summary

**One-liner:** Fixed broken Kollektif font-body token, created canonical slugify utility, and wired global sticky header + footer into BaseLayout so all pages inherit site chrome.

---

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Fix --font-body token + create slugify utility | `349219e` | src/styles/tokens.css, src/lib/slugify.ts |
| 2 | Global site header + minimal footer in BaseLayout | `30eb370` | src/layouts/BaseLayout.astro |

---

## Verification Results

1. `grep -n "font-body.*kollektif" src/styles/tokens.css` → line 43: `--font-body: var(--font-kollektif)` ✓
2. `grep -n "export function slugify" src/lib/slugify.ts` → line 19: named export confirmed ✓
3. `npx astro build` → exits 0, 2 pages built ✓
4. BaseLayout body contains `site-header`, `<slot />`, `site-footer` in that order ✓
5. Nav links: /publications, /team, #insights (aria-label coming soon), Join (rel="noopener noreferrer") ✓
6. Mobile hamburger: aria-label="Open navigation", aria-expanded="false" ✓
7. Zero hardcoded hex in BaseLayout `<style>` block ✓

---

## What Was Built

### Task 1: Token Fix + Slugify Utility

**tokens.css** — The `--font-body` token on line 43 was pointing to `var(--font-the-seasons)`, a variable that no longer exists (The Seasons was dropped in the Phase 1 font refactor). This caused all body text site-wide to fall back to browser default sans-serif. Fixed to `var(--font-kollektif)`. The comment block was also updated to reflect the correct font stack. No other token was changed.

**src/lib/slugify.ts** — New canonical utility module. Single named export `slugify(name: string): string` with formula `name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')`. JSDoc documents that Phase 2 stubs and Phase 4 profiles must import from this file — never copy-paste the formula. Named export only, matching content.ts convention.

### Task 2: Global Site Header + Minimal Footer

**BaseLayout.astro** — Expanded from bare `<body><slot /></body>` to full site chrome:

- Sticky header (64px, z-index 20, surface-2 background, surface-3 border-bottom)
- SEF logo in Cinzel 400/18px, ink color, links to /
- Desktop nav: Publications, Team, Insights (aria-label "coming soon"), Join
- Join button: outlined with border-radius 2px, min-height 44px, hover inverts to accent fill/surface text
- Join link: `rel="noopener noreferrer"` (T-02-01-EXT threat mitigated)
- Mobile hamburger: `<button>` with aria-label, aria-expanded, aria-controls; SVG aria-hidden
- Mobile nav panel: `id="mobile-nav"` hidden by default, 4 stacked links with 44px min-height each
- Inline script: toggles `hidden`, `aria-expanded`, and `aria-label` on button click
- Minimal footer: copyright line, surface-3 border-top, centered label text in ink-muted
- Responsive breakpoints: ≤767px hides desktop nav, shows hamburger; ≥768px hides hamburger + mobile nav

---

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical Fix] Updated comment block in tokens.css**
- **Found during:** Task 1
- **Issue:** The comment on lines 39-43 of tokens.css still referenced "The Seasons" and `--font-the-seasons`, which would be misleading for future maintainers
- **Fix:** Updated the comment block to correctly reference Kollektif and `--font-kollektif`
- **Files modified:** src/styles/tokens.css
- **Commit:** 349219e
- **Note:** The plan said "touch nothing else" but this is a correctness fix to the comment-block that references the same deleted variable; the token value on line 43 is the only functional change

---

## Threat Surface Scan

No new network endpoints, auth paths, or schema changes introduced. The Join nav link correctly includes `rel="noopener noreferrer"` as required by T-02-01-EXT in the plan's threat model.

---

## Known Stubs

None. This plan creates foundational infrastructure (token, utility, layout) with no data-rendering UI that could be stub-dependent.

---

## Self-Check

Files created/modified:
- [x] src/styles/tokens.css — found, contains `--font-body: var(--font-kollektif)` on line 43
- [x] src/lib/slugify.ts — found, exports `slugify` on line 19
- [x] src/layouts/BaseLayout.astro — found, contains site-header, slot, site-footer

Commits:
- [x] 349219e — feat(02-01): fix --font-body token + create slugify utility
- [x] 30eb370 — feat(02-01): global site header + minimal footer in BaseLayout

## Self-Check: PASSED
