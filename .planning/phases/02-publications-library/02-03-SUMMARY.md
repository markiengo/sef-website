---
phase: 02-publications-library
plan: "03"
subsystem: publications-detail-page
tags: [route-move, byline-links, breadcrumb, redirect, seo, pdf-cta]
dependency_graph:
  requires: [02-01, 02-02]
  provides: [publications-detail-route, reports-redirect]
  affects: [astro.config.mjs, src/pages/publications]
tech_stack:
  added: []
  patterns: [parameterized-astro-redirect, slugify-byline-links, breadcrumb-nav]
key_files:
  created:
    - src/pages/publications/[id].astro
  modified:
    - astro.config.mjs
  deleted:
    - src/pages/reports/[id].astro
decisions:
  - "Astro 6 parameterized redirect syntax confirmed working: '/reports/[id]': '/publications/[id]' emits meta-refresh HTML at /reports/[id] (assumption A1 validated)"
  - "Deleted src/pages/reports/[id].astro after confirming redirects config covers legacy URLs — no duplicate route"
  - "Breadcrumb placed as block element outside <article> at same max-width constraint, not inside article header"
metrics:
  duration: "5min"
  completed_date: "2026-06-14"
  tasks_completed: 2
  files_changed: 3
---

# Phase 2 Plan 3: Report Detail Page Move + Redirect Summary

Report detail page relocated from `/reports/[id]` to `/publications/[id]`; analyst byline made clickable to `/team/[slug]` via shared slugify; breadcrumb "← Publications" added; parameterized Astro redirect covers legacy URLs.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create /publications/[id].astro with byline links + breadcrumb | 3f68633 | src/pages/publications/[id].astro |
| 2 | Add /reports → /publications redirect + remove old route | 8cb6c65 | astro.config.mjs, deleted src/pages/reports/[id].astro |

## What Was Built

**Task 1 — publications/[id].astro:**
- Started from exact content of `src/pages/reports/[id].astro`
- Added `import { slugify } from '../../lib/slugify'` after existing imports
- Replaced `{report.data.analysts.join(', ')}` with mapped `<a href="/team/{slugify(name)}">` links with comma separators (Astro fragment syntax)
- Added `<a href="/publications" class="report-back">← Publications</a>` above `<article>` with CSS: `display: block`, `font-family: var(--font-body)`, `font-size: var(--text-label)`, `color: var(--color-accent)`, hover to `var(--color-ink)`
- All existing CSS (246 lines), PDF CTA with `rel="noopener noreferrer"`, MDX Content render, safety guard, formattedDate — all preserved unchanged

**Task 2 — redirects + cleanup:**
- Added `redirects: { '/reports/[id]': '/publications/[id]' }` to `astro.config.mjs`
- Confirmed Astro 6 parameterized redirect generates a meta-refresh HTML file at `/reports/[id]` pointing to `/publications/[id]` — assumption A1 validated
- Deleted `src/pages/reports/[id].astro` (force-removed due to line-ending modification from prior plan)

## Verification Results

- `npx astro build` exits 0 (confirmed 3x)
- Build generates `/publications/2026-gold-report/index.html`
- Build generates `/reports/2026-gold-report/index.html` (meta-refresh redirect HTML)
- `dist/reports/2026-gold-report/index.html` contains `url=/publications/2026-gold-report`
- `grep "rel=\"noopener"` → 1 match on PDF CTA
- `grep "import.*slugify"` → 1 match
- `grep "redirects"` in astro.config.mjs → 1 match
- `/team/` href present in byline link

## Decisions Made

1. **Assumption A1 validated:** Astro 6 supports `'/reports/[id]': '/publications/[id]'` parameterized redirect syntax — no fallback needed. Redirects config emits a proper meta-refresh + canonical HTML file at the legacy path.

2. **Breadcrumb placement:** Placed as a `display: block` element outside `<article>` (before it, inside `<BaseLayout>`), at the same `max-width: 800px; margin-inline: auto` constraint. The `.report-page` padding was reduced from `var(--space-4xl)` top to `var(--space-xl)` top since the breadcrumb now carries its own top padding (`var(--space-4xl)`).

3. **Force-delete of reports/[id].astro:** The file had line-ending modifications from a prior plan execution. Force-removed with `git rm -f` since this is an intentional deletion — the file is fully replaced by `publications/[id].astro` and the redirects config.

## Deviations from Plan

### Auto-fixed Issues

None — plan executed exactly as written. Assumption A1 (parameterized redirect syntax) was verified to work before proceeding.

## Requirements Coverage

| Requirement | Status |
|-------------|--------|
| PUB-03: Web summary page with exec overview + key charts natively | Done — /publications/[id].astro renders MDX Content |
| PUB-04: PDF CTA with rel="noopener noreferrer" | Done — preserved from original, verified via grep |
| PUB-05: Analyst byline links to /team/[slug] | Done — slugify() used for href generation |
| PUB-06: Description as visible HTML text; meta description populated | Done — .report-description renders and BaseLayout wires description prop |

## Known Stubs

None — all links and data are wired. The `/team/[slug]` targets are stub pages (created in plan 02-04), not stubs in this page's output.

## Threat Flags

None — no new network endpoints, auth paths, or trust boundaries introduced. PDF CTA `rel="noopener noreferrer"` preserved (T-02-03-EXT mitigated). Byline links expose names only via slugify (T-02-03-PII mitigated).

## Self-Check: PASSED

- [x] `src/pages/publications/[id].astro` exists
- [x] `src/pages/reports/[id].astro` deleted
- [x] commit 3f68633 exists
- [x] commit 8cb6c65 exists
- [x] `astro.config.mjs` contains redirects block
- [x] Build exits 0
