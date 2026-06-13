---
phase: 02-publications-library
plan: 04
subsystem: ui
tags: [astro, static-routes, team-profiles, slugify, getStaticPaths]

requires:
  - phase: 02-01
    provides: src/lib/slugify.ts (shared slug formula); src/lib/content.ts (getReports adapter); BaseLayout.astro (site header/footer)
  - phase: 02-03
    provides: src/pages/publications/[id].astro with byline links using /team/[slug] hrefs

provides:
  - src/pages/team/[slug].astro — stub route for every unique analyst in the reports collection
  - /team/sang-le (and any future analyst) resolves at build time; byline links never 404

affects:
  - 02-05 (phase-final verification — team stubs are live targets for byline link checks)
  - 04 (Phase 4 Team Profiles — extends this exact file in-place, no URL rework)

tech-stack:
  added: []
  patterns:
    - "getStaticPaths() with Map deduplication: Map<slug, name> from reports.forEach → r.data.analysts.forEach; one route per unique analyst regardless of how many reports they appear in"
    - "Shared slugify() import — team/[slug].astro and publications/[id].astro both import from src/lib/slugify.ts; formula divergence is prevented at the import level"
    - "Privacy boundary at render layer: MDX analysts field is string[] (names only); no email/phone/university in schema means no PII can reach this template"

key-files:
  created:
    - src/pages/team/[slug].astro
  modified: []

key-decisions:
  - "Map<slug, name> deduplication chosen over Set<name> to carry display name into props without a second lookup — same analyst in multiple reports produces one stub with correct casing"
  - "slug variable destructured from Astro.params even though unused in stub template — available for Phase 4 extension without touching function signature"
  - "aria-hidden on hr rule — decorative element, screen readers skip it"

patterns-established:
  - "getStaticPaths() Map deduplication pattern for analyst stubs — reuse in Phase 4 when extending the same route"
  - "Privacy comment block at top of file documents D-10 boundary — apply same pattern in Phase 4 data source"

requirements-completed: [PUB-05]

duration: 8min
completed: 2026-06-14
---

# Phase 2 Plan 04: Team Profile Stub Pages Summary

**Static /team/[slug] stubs generated from analyst names in MDX frontmatter, using shared slugify() so byline links from publications/[id] resolve without 404s**

## Performance

- **Duration:** 8 min
- **Started:** 2026-06-14T05:43:00Z
- **Completed:** 2026-06-14T05:51:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `src/pages/team/` directory and `[slug].astro` route — generates one stub per unique analyst across all reports
- Build confirms `/team/sang-le` route generated; no 404 on byline links from the Gold Report
- PUB-05 satisfied: every analyst in every report's frontmatter has a real /team/[slug] route
- Privacy constraint D-10 enforced: rendered HTML contains only the analyst name; no email, phone, university, or Instagram in source or output

## Task Commits

1. **Task 1: Team profile stub pages at /team/[slug]** — `5cd7b11` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `src/pages/team/[slug].astro` — getStaticPaths() derives unique analyst slugs via shared slugify(); stub renders name h1 + "Full profile coming soon." with BaseLayout wrapper and token-only CSS

## Decisions Made

- Map<slug, name> deduplication pattern used instead of Set<name> — carries display name as a prop without requiring a second O(n) lookup at render time
- `slug` variable destructured from Astro.params but intentionally unused in the stub template — makes Phase 4 extension frictionless (no signature change needed)
- Comment block at top of file explicitly documents MOD-02 and D-10/T-02-04-PII constraints — sets the pattern for Phase 4 to maintain

## Deviations from Plan

None — plan executed exactly as written. The PII grep in acceptance criteria matched a code comment (the privacy reminder in the source file), not any rendered output; built HTML at dist/team/sang-le/index.html contains zero PII strings, confirming the constraint is satisfied.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- All byline links in /publications/[id] now resolve to real /team/[slug] routes
- Phase 4 (Team Profiles) can extend src/pages/team/[slug].astro in-place: same file, same URL scheme, no migration needed
- The Map<slug, name> deduplication pattern and shared slugify() import are locked — Phase 4 must maintain both to avoid slug divergence

---
*Phase: 02-publications-library*
*Completed: 2026-06-14*
