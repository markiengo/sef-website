---
phase: 02-publications-library
verified: 2026-06-14T10:00:00Z
status: human_needed
score: 6/6 ROADMAP success criteria functionally met (1 wiring gap on cover-image grid)
overrides_applied: 0
re_verification:
  previous_status: human_needed
  previous_score: 5/6 (chart gap open)
  gaps_closed:
    - "Each new report page renders exec summary prose + at least one chart image natively — CLOSED: all 6 reports import + render a chart PNG (verified in built HTML)"
  gaps_remaining: []
  regressions:
    - "Library index cover-image grid is unwired — index.astro renders picsum.photos random stock images instead of the seeded cover PNGs (report.data.cover.src). This was claimed delivered in 02-05-SUMMARY line 199 ('all with cover images') but is NOT in the code. Not a ROADMAP SC failure but defeats D-05/D-07 (cover-image grid as recruitment first-impression) and adds an external network dependency to a static site."
gaps: []
human_verification:
  - test: "Open /publications in a browser and exercise the Division / Format / Sector dropdowns"
    expected: "Rows hide/show instantly with no page reload; live count updates (e.g. select Macro → 3 publications); selecting an impossible combo shows the empty state; 'Clear filters' appears when any filter is active and resets all dropdowns"
    why_human: "Filter island is is:inline JS — interactive DOM behavior cannot be confirmed by grep/build; code is verified correct (targets .pub-row, AND logic, sector pipe-split)"
  - test: "Open each report (/publications/2026-vietnam-macro, 2026-sbv-note, 2026-fpt-equity, 2026-masan-equity, 2026-mbb-note, 2026-gold-report) and confirm the embedded chart renders inline AND is the correct figure with an accurate caption"
    expected: "Each report body shows its chart PNG inline (not in a PDF embed); the chart matches the report subject and the alt/caption is factually correct — figures were auto-extracted from each report's source .docx and need human fact-check"
    why_human: "Image visual correctness and figure/caption accuracy require human review; presence is code-verified"
  - test: "Look at the cover-image grid on /publications"
    expected: "Owner decision required: cards currently show random picsum.photos stock images (unrelated photography pulled live from a third-party CDN), NOT the 6 generated cover-*.png files. Decide whether to wire report.data.cover.src into index.astro before launch (recommended — see regression note)"
    why_human: "This is a launch-readiness / brand judgment call; the wiring gap is code-confirmed but the accept/fix decision is the owner's"
  - test: "Click an analyst byline on any report (e.g. 'Hoang Minh Tue' on /publications/2026-vietnam-macro)"
    expected: "Navigates to /team/hoang-minh-tue showing the analyst name as h1 and 'Full profile coming soon.' — no 404"
    why_human: "Navigation flow confirmation in a real browser; routing + slug match are code-verified"
  - test: "Narrow the viewport / open on phone"
    expected: "Header collapses to hamburger (aria-expanded toggles); filter dropdowns stack full-width; pub rows drop to single column; masthead scales"
    why_human: "Responsive layout behavior requires a real viewport"
---

# Phase 2: Publications Library Verification Report

**Phase Goal (MVP user story / outcome):** A visitor can browse and filter all publications in a library view and open any report as a polished web summary page with exec overview, key charts, PDF download, analyst byline, and indexable HTML thesis text.

**Verified:** 2026-06-14T10:00:00Z (re-verification after post-UAT refinement)
**Status:** human_needed
**Re-verification:** Yes — chart gap from prior verification is CLOSED; one cover-grid wiring regression surfaced.

---

## Verdict: GOAL MET (with one launch-readiness gap to accept or fix)

All six ROADMAP success criteria are functionally delivered in the codebase and built output. The single prior blocker (new reports lacked native charts) is genuinely closed — all 6 reports now import and render a chart PNG inline. The post-UAT refinements described in the task are all confirmed present in source and dist.

One gap not present in the prior verification surfaced: the **library cover-image grid is unwired** — it renders `picsum.photos` random external stock images instead of the seeded `cover-*.png` files. This does not fail an SC (SC1 is "see all reports listed", which passes), but it defeats the cover-image-grid intent (D-05/D-07) and adds an external network dependency to a static site. Routed to the owner as a launch decision rather than a hard blocker.

---

## User Flow Coverage (MVP mode)

| Step | Expected outcome | Codebase evidence | Status |
|------|------------------|-------------------|--------|
| Land on /publications | All reports listed | dist/publications/index.html renders 6 `.pub-row` articles with title, description, meta, byline, date, CTA | ✓ MET |
| Browse the grid visually | Cover-image-led cards (recruitment first-impression, D-05/D-07) | index.astro line 97 hardcodes `picsum.photos/seed/...`; `report.data.cover.src` is never used (line 94-95 admits PLACEHOLDER) | ⚠ DEGRADED — lists reports but with random stock photos, not real covers |
| Filter by Division/Format/Sector | Instant, no reload | `<select>` dropdowns derived from live data (index.astro 16-18); is:inline JS queries `.pub-row` (line 146 — bug fixed), AND logic, sector pipe-split, live count, empty state, reset | ✓ MET (interaction human-pending) |
| Open a report | Exec overview + native charts | All 6 MDX import a chart PNG + `<img>`; built HTML shows `/_astro/chart-*.png`; keyStats band renders (6 stats in vietnam-macro) | ✓ MET |
| Read full report | PDF opens/downloads | `report-pdf-cta` on all pages, `target=_blank rel=noopener` | ✓ MET (pdfUrl are 404 placeholders — accepted owner limitation) |
| Click analyst byline | Navigates to profile stub, no 404 | slugify() shared across index/[id]/team; all 8 stubs in dist/team/; href matches route | ✓ MET |
| Search-engine indexing | HTML thesis text + description | `<p class=report-description>` + `<meta name=description>`; schema enforces ≥80 chars | ✓ MET |

---

## Observable Truths (ROADMAP Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Open the library and see all reports listed | ✓ VERIFIED | 6 `.pub-row` articles in dist/publications/index.html (caveat: covers are picsum placeholders — see regression) |
| 2 | Filter by Division/Type/Sector, results update without reload | ✓ VERIFIED (interaction human-pending) | Dropdowns derived from live data (no dead options); filter JS targets `.pub-row` (fixed from `.pub-card`); AND logic, sector `split('|').includes`, live `aria-live` count, empty state, reset all present |
| 3 | Open a report, read exec overview + view charts natively | ✓ VERIFIED | All 6 reports import a chart PNG and render `<img>`; built HTML confirms `/_astro/chart-*.png` for vietnam-macro and gold; exec prose present; keyStats band renders |
| 4 | Click "Read full report" → receive PDF | ✓ VERIFIED (known limitation) | CTA on all pages, opens new tab; pdfUrl placeholders 404 until owner supplies PDFs (accepted) |
| 5 | Byline links to /team/[slug], no 404 | ✓ VERIFIED | slugify.ts shared by index, [id], and team route; all 8 slugs generate matching dist/team/ routes |
| 6 | Key thesis as real HTML, indexable | ✓ VERIFIED | description rendered as visible `<p>` + `<meta name=description>`; ≥80 char schema gate; prose is HTML paragraphs, not PDF-only |

**Score:** 6/6 ROADMAP success criteria functionally met.

---

## Post-UAT Refinement Verification (the four claimed changes)

| Refinement | Claim | Evidence | Status |
|-----------|-------|----------|--------|
| 1. Editorial rows + filter selector fix | Redesigned to `.pub-row`; JS queries `.pub-row` not `.pub-card` | index.astro line 146 `querySelectorAll('.pub-row')`; dist confirms; zero `.pub-card` references anywhere in src/ or dist | ✓ VERIFIED |
| 2. Select dropdowns, live-derived options, normalized sectors | Chips→selects; options from live data; sectors normalized | `<select>` elements with options mapped from `allDivisions/allTypes/allSectors` (lines 16-18, 48-72); sectors = Technology, Materials, Consumer, Financials, Macro Strategy | ✓ VERIFIED |
| 3. keyStats band on detail page | New `keyStats` schema field rendered after header | content.config.ts lines 36-38 (`keyStats` zod field); [id].astro lines 83-92 render `.report-stats`; 6 stats render in vietnam-macro built HTML | ✓ VERIFIED |
| 4. Kollektif body font, 400/700 only, font-synthesis:none | Weights collapsed to 400/700; synthesis disabled | astro.config.mjs registers Kollektif at weight 400 + 700 (+italics) only; tokens.css line 43 `--font-body: var(--font-kollektif)`; global.css line 48 `font-synthesis: none`; zero 500/600 weights in publications/global/layout | ✓ VERIFIED |

---

## Key Link Verification

| From | To | Via | Status |
|------|----|-----|--------|
| index.astro | lib/content | `getReports()` | WIRED |
| index.astro | lib/slugify | `slugify(name)` in byline href | WIRED |
| index.astro card image | report.data.cover | `report.data.cover.src` | ✗ NOT WIRED — uses picsum.photos placeholder instead |
| [id].astro | lib/content | getReports/getReport/render | WIRED |
| [id].astro | lib/slugify | byline map | WIRED |
| [id].astro keyStats | content.config keyStats | `report.data.keyStats` | WIRED |
| MDX charts | _assets/chart-*.png | import + `<img src={chart.src}>` (all 6) | WIRED |
| team/[slug].astro | lib/content + slugify | getStaticPaths nameMap | WIRED |
| astro.config redirects | /publications/[id] | redirect block | WIRED (dist/reports/* redirect pages exist) |
| filter dropdowns | .pub-row data attrs | is:inline applyFilters | WIRED |

---

## Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Real Data | Status |
|----------|--------------|--------|-----------|--------|
| index card grid | reports[] | getReports() → collection (6 MDX) | Yes | FLOWING |
| index cover image | (none) | picsum.photos external URL | No — random stock, not report covers | ⚠ HOLLOW (cover assets exist but bypassed) |
| filter count | live DOM count | applyFilters() | Yes | FLOWING |
| [id] report body | report (MDX) | getReport(id) | Yes | FLOWING |
| [id] keyStats band | report.data.keyStats | frontmatter | Yes (6 stats in vietnam-macro) | FLOWING |
| MDX chart imgs | chart.src | imported PNG asset | Yes (hashed /_astro/chart-*.png) | FLOWING |
| team stubs | name | derived from all analysts[] | Yes | FLOWING |

---

## Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| Build exits 0 | npx astro build | 16 pages in 1.78s, exit 0 | ✓ PASS |
| All 6 publication routes | ls dist/publications | 6 report dirs + index.html | ✓ PASS |
| All 8 team stubs | ls dist/team | 8 routes incl. sef-equity-division | ✓ PASS |
| All 6 redirect routes | ls dist/reports | 6 redirect dirs | ✓ PASS |
| Filter JS targets .pub-row | grep dist index | `querySelectorAll('.pub-row')` | ✓ PASS |
| No stale .pub-card refs | grep src/ + dist | zero matches | ✓ PASS |
| All 6 reports render a chart (built) | grep _astro/chart | confirmed for vietnam-macro + gold; all 6 import in src | ✓ PASS |
| keyStats band renders | grep report-stat__value | 6 in vietnam-macro | ✓ PASS |
| team stub content | grep h1 + "coming soon" | Hoang Minh Tue h1 + "coming soon" | ✓ PASS |
| Kollektif weights = 400/700 only | grep config + 500/600 in src | only 400/700 registered; zero 500/600 in pages | ✓ PASS |
| Cover-image grid uses real covers | grep index img src | picsum.photos — NOT report covers | ✗ FAIL (wiring gap) |

---

## Requirements Coverage

| Requirement | Description | Status | Evidence |
|-------------|-------------|--------|----------|
| PUB-01 | Browsable publications library | SATISFIED (cover-grid degraded) | 6 rows render; covers are placeholders |
| PUB-02 | Filter by Division/Type/Sector | SATISFIED | Live-derived dropdowns, AND logic, count, empty state |
| PUB-03 | Web summary: exec overview + native charts | SATISFIED | All 6 reports render exec prose + inline chart (prior gap closed) |
| PUB-04 | "Read full report" PDF action | SATISFIED (mechanism) | CTA present; pdfUrl placeholders accepted |
| PUB-05 | Byline links to profile, no 404 | SATISFIED | Shared slugify; 8 stubs match |
| PUB-06 | Key thesis as indexable HTML | SATISFIED | description as HTML + meta; ≥80 char gate |

---

## Anti-Patterns Found

| File | Location | Pattern | Severity | Impact |
|------|----------|---------|----------|--------|
| src/pages/publications/index.astro | line 94-102 | `src={picsum.photos/...}` PLACEHOLDER comment | ⚠ WARNING | Cover-image grid renders random external stock photos, not the 6 generated cover PNGs. Bypasses report.data.cover; adds live third-party network dependency to a static site. Fix is a one-line swap to `report.data.cover.src`. |
| src/content/reports/_assets/cover.png | metadata | 957×76 (gold report) | ⚠ WARNING | Gold cover is a leftover chart PNG, wrong aspect — but since the grid uses picsum, this is moot until covers are wired in; then it needs a real 16:9 cover. |
| 5 new reports | pdfUrl | `/reports/[slug].pdf` (404) | ℹ INFO | Accepted owner limitation — no real PDFs in deliverables. |
| src/content/reports/2026-masan/mbb | analysts | "SEF Equity Division" | ℹ INFO | Generic credit creates /team/sef-equity-division stub — accepted, source had no individual bylines. |

No TBD / FIXME / XXX debt markers in any phase-modified file.

---

## Gaps Summary

**No ROADMAP success criterion fails.** The prior blocker (native charts on new reports) is fully closed — all 6 reports import and render a chart PNG, verified in built HTML.

**One non-SC wiring regression** routed to the owner as a launch decision rather than a hard gap:

The library cover-image grid (`index.astro`) renders `https://picsum.photos/seed/...` random stock photography rather than the 6 `cover-*.png` files that were generated, schema-validated, and shipped in Plan 05. The cover assets exist and pass the `cover: image()` build gate, but `report.data.cover.src` is never referenced in the grid. The 02-05-SUMMARY (line 199) claimed "6 cards visible in the grid, all with cover images" — that claim is not true of the current code. Because SC1 only requires reports to be "listed" (which they are), this does not fail the phase contract, but it (a) defeats D-05/D-07 — the cover-image grid as the recruitment first-impression, the explicit visual selling point of this phase — and (b) introduces a live external-CDN dependency on an otherwise self-contained static institution-grade site. Recommended fix is a one-line change (swap the picsum src for `{report.data.cover.src}`), after which the gold report's 957×76 cover should be replaced and the 5 Georgia-Bold placeholder covers swapped for Cinzel-designed finals (already on the owner follow-up list).

---

_Verified: 2026-06-14T10:00:00Z_
_Verifier: Claude (gsd-verifier)_
