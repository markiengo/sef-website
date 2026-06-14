---
phase: 02-publications-library
plan: "05"
subsystem: content
tags: [reports, seeding, covers, mdx, library]
dependency_graph:
  requires: [02-02, 02-03, 02-04]
  provides: [seeded-library, cover-assets, 6-report-grid]
  affects: [publications-index, report-detail-pages, team-stub-routes]
tech_stack:
  added: []
  patterns:
    - "Pillow (PIL) for deterministic PNG cover generation at 800x450"
    - "MDX exec summary prose extracted from .docx deliverables via zipfile + XML strip"
    - "Flat _assets/ colocation for all report images (covers + charts)"
key_files:
  created:
    - src/content/reports/_assets/cover-vietnam-macro.png
    - src/content/reports/_assets/cover-sbv-note.png
    - src/content/reports/_assets/cover-fpt-equity.png
    - src/content/reports/_assets/cover-masan-equity.png
    - src/content/reports/_assets/cover-mbb-note.png
    - src/content/reports/2026-vietnam-macro.mdx
    - src/content/reports/2026-sbv-note.mdx
    - src/content/reports/2026-fpt-equity.mdx
    - src/content/reports/2026-masan-equity.mdx
    - src/content/reports/2026-mbb-note.mdx
  modified: []
decisions:
  - "Used Pillow (PIL) for cover generation — woff2 fonts not loadable; Georgia Bold substituted for Cinzel; owner to swap in final designed covers"
  - "MBB note kept qualitative (source .docx was ~2KB, mostly Vietnamese historical intro with no English exec summary extractable without translation)"
  - "Masan and MBB used 'SEF Equity Division' as analysts credit — no individual analyst byline in source documents"
  - "All pdfUrl fields are placeholder /reports/[slug].pdf paths — no real PDFs in deliverables"
  - "Checkpoint auto-approved per unattended-run directive; verification items documented in NEEDS OWNER REVIEW"
metrics:
  duration_minutes: 13
  completed_date: "2026-06-14"
  tasks_completed: 1
  files_created: 10
  files_modified: 0
---

# Phase 2 Plan 5: Cover Generation + Report Seeding Summary

**One-liner:** 5 programmatically-generated 800x450 ivory/gold covers + 5 MDX reports extracted from real SEF deliverables, seeding a 6-report library across Macro/Equity and 5 sectors.

---

## What Was Built

All 5 cover PNG files were generated first using Python/Pillow before any MDX was written, satisfying the `cover: image()` build requirement. The 5 new MDX files were then authored with exec summary prose extracted from the source `.docx` files in `context/Deliverables/`. The build exits 0 and generates 6 `/publications/[id]` routes.

**Covers generated:**

| File | Division | Sector |
|------|----------|--------|
| cover-vietnam-macro.png | Macro | Vietnam Economy |
| cover-sbv-note.png | Macro | Monetary Policy |
| cover-fpt-equity.png | Equity | Technology |
| cover-masan-equity.png | Equity | Consumer Goods |
| cover-mbb-note.png | Equity | Banking |

**Reports seeded:**

| Slug | Division | Type | Sectors | Analysts |
|------|----------|------|---------|----------|
| 2026-vietnam-macro | Macro | Report | Vietnam Economy, Macro Finance | Hoang Minh Tue |
| 2026-sbv-note | Macro | Note | Banking, Monetary Policy | Hoang Minh Tue |
| 2026-fpt-equity | Equity | Report | Technology | Hung Tran, Nam Nguyen, Tan Ngo, Jay Chang, Alison Tran |
| 2026-masan-equity | Equity | Report | Consumer Goods | SEF Equity Division |
| 2026-mbb-note | Equity | Note | Banking | SEF Equity Division |

---

## Build Verification

```
npx astro build → exits 0
16 pages built in 2.09s
/publications/2026-vietnam-macro ✓
/publications/2026-sbv-note ✓
/publications/2026-fpt-equity ✓
/publications/2026-masan-equity ✓
/publications/2026-masan-equity ✓
/publications/2026-mbb-note ✓
/publications/2026-gold-report ✓ (existing)
/publications/index.html ✓
```

Filter coverage now demonstrable:
- "Macro" filter → 3 reports (Gold, Vietnam Macro, SBV Note)
- "Equity" filter → 3 reports (FPT, Masan, MBB)
- "Note" filter → 2 reports (SBV Note, MBB Note)
- "Technology" filter → 1 report (FPT)
- "Banking" filter → 2 reports (SBV Note, MBB Note)

---

## Deviations from Plan

### Auto-applied decisions

**1. Cover generation method changed from brandkit to Pillow**
- **Found during:** Task 1 setup
- **Issue:** Brandkit skill requires image generation capability not available in this environment; woff2 Cinzel fonts cannot be loaded by PIL for text rendering
- **Fix:** Generated programmatic 800x450 PNG covers using Python Pillow with Georgia Bold as Cinzel substitute. Covers follow the spec (ivory BG, gold accent bar, division/title/sector text, hairline, SEF mark). Visual fidelity is functional but not design-final.
- **Files modified:** N/A (decision affected cover-*.png files)
- **Commit:** b156ae2
- **Documented in:** NEEDS OWNER REVIEW

**2. MBB note content kept qualitative**
- **Found during:** .docx extraction
- **Issue:** `MBB notes.docx` was ~2,279 chars total, predominantly Vietnamese-language historical background with no English exec summary extractable. No financial figures recoverable without full translation.
- **Fix:** Wrote qualitative sector context note grounded in publicly verifiable facts (founding year, HOSE listing date, network size) rather than fabricating financial figures. Financial analysis described as "underway."
- **Files modified:** src/content/reports/2026-mbb-note.mdx

**3. Masan and MBB used generic team credit**
- **Found during:** .docx analyst extraction
- **Issue:** Masan Project.docx and MBB notes.docx contained no individual analyst bylines
- **Fix:** Used "SEF Equity Division" as the analysts[] credit. Schema accepts any non-empty string array.
- **Files modified:** 2026-masan-equity.mdx, 2026-mbb-note.mdx

**4. Checkpoint auto-approved (unattended run)**
- The plan's `checkpoint:human-verify` gate was auto-approved per unattended-run directive. Items for human review are documented below.

---

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| `pdfUrl: /reports/2026-vietnam-macro.pdf` | 2026-vietnam-macro.mdx | No PDF asset in deliverables; placeholder |
| `pdfUrl: /reports/2026-sbv-note.pdf` | 2026-sbv-note.mdx | No PDF asset; placeholder |
| `pdfUrl: /reports/2026-fpt-equity.pdf` | 2026-fpt-equity.mdx | No PDF asset; placeholder |
| `pdfUrl: /reports/2026-masan-equity.pdf` | 2026-masan-equity.mdx | No PDF asset; placeholder |
| `pdfUrl: /reports/2026-mbb-note.pdf` | 2026-mbb-note.mdx | No PDF asset; placeholder |

These stubs will 404 if a user clicks "Read full report" PDF CTA. Not a security issue on a static site, but degrades the experience. The owner should supply real PDF paths when available.

---

## Chart Gap Closure (added 2026-06-14, commit 425cbb0)

All 5 seeded reports now have at least one real inline chart extracted from the matching source `.docx` in `context/Deliverables/`. Each `.docx` was unzipped and `word/media/` was inspected; only web-renderable PNG rasters were used. EMF/WMF vectors were ignored. No charts were fabricated.

| Report | Chart file | Source .docx | Figure description |
|--------|-----------|-------------|--------------------|
| 2026-vietnam-macro | `chart-vietnam-macro-fiscal.png` | Vietnam 2026 Macro Outlook.docx `image21.png` | Vietnam government budget: balance, revenue, and expenditure as % of GDP, 1998-2023 |
| 2026-sbv-note | `chart-sbv-policy-rates-usdvnd.png` | SBV note.docx `image10.png` | SBV policy rates (refinancing, discount, interbank, repo) alongside USD/VND, 2020-early 2026 |
| 2026-fpt-equity | `chart-fpt-domestic-it-revenue.png` | FPT Corporation Equity Report.docx `image21.png` | FPT domestic IT segment revenue and pre-tax profit margin, 2019-2024 |
| 2026-masan-equity | `chart-masan-wincommerce-penetration.png` | Masan Project.docx `image7.png` | WinCommerce modern trade penetration vs. ASEAN peers (Vietnam 24%, Indonesia 35%, Thailand 39%) |
| 2026-mbb-note | `chart-mbb-shareholder-structure.png` | MBB notes.docx `image1.png` | MBB shareholder structure — Viettel Group 48%, SCIC 13%, Vietnam Helicopter Corp 9% |

All chart assets placed in `src/content/reports/_assets/`. Each MDX updated with `import` statement and `<img src={var.src} alt="..." width={var.width} height={var.height} />` following the exact gold report pattern. Build exits 0 (16 pages, all 6 `/publications/` routes).

**Reports with no usable figures that would have needed skipping:** None — all 5 source `.docx` files had at least one PNG raster figure. MBB notes.docx had exactly 2 images; `image1.png` (shareholder pie chart) was used; `image2.png` (institutional buys/sells Excel export) was omitted as secondary.

---

## NEEDS OWNER REVIEW

### 0. Inline chart verification (NEW)

Charts are now embedded in all 5 reports. Verify at `npx astro dev`:
- `/publications/2026-vietnam-macro` → fiscal balance/revenue/expenditure chart renders below the Infrastructure section
- `/publications/2026-sbv-note` → SBV policy rates + USD/VND chart renders above the "Policy Dilemma" section
- `/publications/2026-fpt-equity` → FPT domestic IT revenue & margin chart renders above "Key Risks"
- `/publications/2026-masan-equity` → WinCommerce ASEAN penetration chart renders above "The Modern Trade Thesis"
- `/publications/2026-mbb-note` → MBB shareholder structure pie chart renders above "Business Structure"

### 1. Cover image quality — swap in final designed covers

The 5 cover PNGs were generated programmatically with Python Pillow using **Georgia Bold** as a stand-in for Cinzel (the project's display font). The covers are structurally correct (800x450, ivory background, gold accent bar, division/title/sector text layout, SEF mark) but do not render Cinzel.

**Action required:** To match the brand spec, regenerate covers in Figma or with the brandkit skill using:
- Font: Cinzel Regular/Bold (available in `public/fonts/cinzel-regular.woff2`, `cinzel-bold.woff2`)
- Canvas: 800x450px PNG
- Background: `#F4EEE5`, left gold bar: `#C89D29`, title: `#1D3937`, division: `#195042`, sector: `#54675E`, SEF mark: `#91853A`

Replace files at: `src/content/reports/_assets/cover-vietnam-macro.png`, `cover-sbv-note.png`, `cover-fpt-equity.png`, `cover-masan-equity.png`, `cover-mbb-note.png`

The build will pick up new covers automatically (they are referenced by exact filename).

### 2. MBB note is qualitative only

The `MBB notes.docx` source file was mostly Vietnamese-language historical background with no extractable English exec summary or financial data. The seeded `2026-mbb-note.mdx` provides sector context and structural overview but **no financial model, rating, or target price**.

**Action required:** When the MBB equity analysis is complete within the team, replace the MDX body with the full exec summary, rating, and key figures.

### 3. PDF URLs are placeholders

All 5 new reports have `pdfUrl: /reports/2026-[slug].pdf` — these paths do not exist and will 404 if a visitor clicks the "Read full report" CTA.

**Action required:** Upload the actual PDF versions to `public/reports/` (or an external host) and update the `pdfUrl` field in each MDX file.

### 4. Filter visual verification

Run `npx astro dev` and confirm at http://localhost:4321/publications:
- 6 cards visible in the grid, all with cover images (no broken img icons)
- Filter "Macro" → 3 results | "Equity" → 3 results | "Note" → 2 results
- Open `/publications/2026-fpt-equity` → confirm exec summary prose renders as readable HTML

### 5. Analyst team stubs auto-generated

The new analyst names (Hoang Minh Tue, Hung Tran, Nam Nguyen, Tan Ngo, Jay Chang, Alison Tran) created stub `/team/[slug]` routes automatically via `getStaticPaths()`. Verify at `/team/hung-tran`, `/team/hoang-minh-tue` etc. that stub pages render without errors.

### 6. "SEF Equity Division" team stub

`analysts: ["SEF Equity Division"]` on Masan and MBB notes created a `/team/sef-equity-division` stub route. This is acceptable as a placeholder but looks odd as a team profile page. The owner may want to update these reports when individual analyst credits become available.

---

## Threat Surface Scan

No new network endpoints, auth paths, or trust boundary changes introduced. All new files are static MDX content and PNG assets. No PII was included: analysts[] fields contain display names only — no emails, phones, or university data. `past_members.csv` was not read.

---

## Self-Check

**Created files exist:**
- `src/content/reports/_assets/cover-vietnam-macro.png` — FOUND
- `src/content/reports/_assets/cover-sbv-note.png` — FOUND
- `src/content/reports/_assets/cover-fpt-equity.png` — FOUND
- `src/content/reports/_assets/cover-masan-equity.png` — FOUND
- `src/content/reports/_assets/cover-mbb-note.png` — FOUND
- `src/content/reports/2026-vietnam-macro.mdx` — FOUND
- `src/content/reports/2026-sbv-note.mdx` — FOUND
- `src/content/reports/2026-fpt-equity.mdx` — FOUND
- `src/content/reports/2026-masan-equity.mdx` — FOUND
- `src/content/reports/2026-mbb-note.mdx` — FOUND

**Chart assets exist (gap closure 2026-06-14):**
- `src/content/reports/_assets/chart-vietnam-macro-fiscal.png` — FOUND
- `src/content/reports/_assets/chart-sbv-policy-rates-usdvnd.png` — FOUND
- `src/content/reports/_assets/chart-fpt-domestic-it-revenue.png` — FOUND
- `src/content/reports/_assets/chart-masan-wincommerce-penetration.png` — FOUND
- `src/content/reports/_assets/chart-mbb-shareholder-structure.png` — FOUND

**Commits exist:**
- b156ae2 — cover PNGs — FOUND
- 4209740 — seeded MDX files — FOUND
- 425cbb0 — chart gap closure (5 chart PNGs + MDX embeds) — FOUND

**Build verification:** `npx astro build` exits 0, 16 pages generated including all 6 `/publications/` routes (post chart-gap-closure build confirmed).

## Self-Check: PASSED
