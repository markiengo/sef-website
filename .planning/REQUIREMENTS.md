# Requirements: Saigon Equities Forum — Website Revamp

**Defined:** 2026-06-13
**Core Value:** A prospective student lands on the site and immediately wants to belong to — and apply to — SEF, while it never looks less than institution-grade to an adult recruiter.

## v1 Requirements

Requirements for the initial recruitment-ready launch. Each maps to a roadmap phase.

### Brand & Design System

- [x] **BRD-01**: Every page applies the SEF identity consistently — green/gold/dark-grey palette, Cinzel display type, Inter / Inter Light body type
- [x] **BRD-02**: The site ships a single on-palette **light** treatment — a warm cream/taupe editorial canvas (`palette.png` mood: emerald + olive-gold + taupe) with the locked SEF green/gold, never generic white. Colors are CSS-variable design tokens authored as a single clean `:root` block (a second treatment could be reintroduced later without touching components); no brand hex values are hardcoded in components. *(Revised 2026-06-13: dark treatment dropped from v1 — owner decision. See 01-CONTEXT.md D-01/D-02.)*
- [x] **BRD-03**: All light-treatment text/accent pairings meet WCAG AA contrast. Link/small-text accent is `#195042` (8:1); `#00845D` is for button fills + large text only (fails AA as body text on the light surface); gold `#C89D29` is decorative-only (never text). *(Revised 2026-06-13: dark-mode `#00C28B` accent is obsolete under light-only.)*
- [x] **BRD-04**: Display & body fonts are self-hosted with `font-display: swap` and a lean payload (no render-blocking, no FOUT)
- [ ] **BRD-05**: Refined micro-motion (tasteful fades, subtle parallax, smooth hovers, one hero moment) is applied site-wide without gimmickry

### Landing / Recruitment

- [ ] **LND-01**: A visitor sees a cinematic hero that communicates SEF's identity and a clear, recruitment-focused value proposition
- [ ] **LND-02**: A prominent "Join SEF" CTA routes the visitor to the existing Google Form via a polished join page/section
- [ ] **LND-03**: The landing page features the Wall Street Oasis partnership (badge + brief context)
- [ ] **LND-04**: The landing page showcases featured flagship reports that link into the publications library
- [ ] **LND-05**: The landing page displays a university logos strip ("our analysts study at…")

### Publications Library

- [x] **PUB-01**: A visitor can browse all publications in a library view
- [ ] **PUB-02**: A visitor can filter publications by Division (Macro / Equity), Type (Report · Note · Snapshot · Insight), and Sector tag
- [ ] **PUB-03**: Each report has a web summary page rendering an exec overview plus key charts natively
- [ ] **PUB-04**: Each report page offers a "Read full report" action that opens/downloads the full PDF
- [x] **PUB-05**: Each report displays an analyst byline that links to that analyst's profile page
- [ ] **PUB-06**: Each report page contains the key thesis as real HTML text (not PDF-only) — a required `description` and a minimum exec-summary length are enforced for SEO

### News & Insights

- [ ] **INS-01**: A visitor can browse a short-form "News & Insights" stream that is visually and structurally distinct from full reports
- [ ] **INS-02**: A visitor can open an individual insight (headline, hero graphic, body copy, inline charts)

### Team & Analyst Profiles

- [ ] **TEAM-01**: A visitor can view a team directory of SEF members
- [ ] **TEAM-02**: Each analyst has a full profile page (photo, short bio, university, course, division/role, Instagram)
- [ ] **TEAM-03**: An analyst's profile lists every report they authored (byline back-reference, build-time)
- [ ] **TEAM-04**: Profiles expose only privacy-safe fields — name, role, university, course, division, Instagram — never email or phone

### Content Model

- [ ] **MOD-01**: Reports and insights are authored as MDX/markdown content collections with a typed frontmatter schema (division, type, sector, analysts, cover, pdfUrl, featured, publishedAt, description)
- [ ] **MOD-02**: All content is read through a single data-adapter module (`getReports`, `getReport`, etc.) so a future Supabase backend is a one-file swap with no page-level rework
- [ ] **MOD-03**: The owner can publish a new report by adding an MDX file + colocated assets and deploying — workflow documented in the repo

### Platform & Deploy

- [x] **PLT-01**: The site is a code-built Astro project, statically generated and mostly zero-JS
- [ ] **PLT-02**: Chart and cover images are optimized at build time (WebP/AVIF, responsive `srcset`) and never served unoptimized
- [ ] **PLT-03**: The site deploys to Vercel on the existing custom domain over HTTPS
- [ ] **PLT-04**: The site is responsive across mobile / tablet / desktop and meets reasonable Core Web Vitals

## v2 Requirements

Deferred to a future release. Tracked, not in the current roadmap.

### Supabase Publishing

- **SUP-01**: Analysts can self-publish reports/insights without touching code (Supabase-backed)
- **SUP-02**: Report metadata stored in Supabase Postgres; PDFs/covers in Supabase Storage
- **SUP-03**: A lightweight admin/upload flow (or Supabase Studio) for non-technical members
- **SUP-04**: `getReports()` adapter swapped from content collections to Supabase queries

### Recruitment Enhancements

- **APP-01**: Branded on-site multi-step application form (replacing the Google Form link)
- **THEME-01**: User-facing dark/light theme toggle (if both treatments are kept live)
- **METR-01**: Animated credibility metrics (analysts, universities, reports, readership)

## Out of Scope

Explicitly excluded for v1. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Member login / auth / dashboards | Not needed for a recruitment marketing site |
| Comments / discussion threads | Off-brand for v1; moderation overhead |
| On-site application form (backend) | v1 links to existing Google Form; defer branded form to v2 |
| Supabase self-serve publishing | Deliberately deferred to ship recruitment site faster; architecture preserves the path |
| Bilingual EN/VN | English is SEF's working language; audience studies/aspires abroad |
| Credibility metrics counters | Modest first-season numbers are a weak proof point now |
| Final logo / brand assets | Supplied during build; tasteful placeholders within the brand system used until then |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BRD-01 | Phase 1 — Foundation | Complete |
| BRD-02 | Phase 1 — Foundation | Complete |
| BRD-03 | Phase 1 — Foundation | Complete |
| BRD-04 | Phase 1 — Foundation | Complete |
| BRD-05 | Phase 6 — Polish & Motion | Pending |
| LND-01 | Phase 3 — Landing Page | Pending |
| LND-02 | Phase 3 — Landing Page | Pending |
| LND-03 | Phase 3 — Landing Page | Pending |
| LND-04 | Phase 3 — Landing Page | Pending |
| LND-05 | Phase 3 — Landing Page | Pending |
| PUB-01 | Phase 2 — Publications Library | Complete |
| PUB-02 | Phase 2 — Publications Library | Pending |
| PUB-03 | Phase 2 — Publications Library | Pending |
| PUB-04 | Phase 2 — Publications Library | Pending |
| PUB-05 | Phase 2 — Publications Library | Complete |
| PUB-06 | Phase 2 — Publications Library | Pending |
| INS-01 | Phase 5 — News & Insights | Pending |
| INS-02 | Phase 5 — News & Insights | Pending |
| TEAM-01 | Phase 4 — Team & Analyst Profiles | Pending |
| TEAM-02 | Phase 4 — Team & Analyst Profiles | Pending |
| TEAM-03 | Phase 4 — Team & Analyst Profiles | Pending |
| TEAM-04 | Phase 4 — Team & Analyst Profiles | Pending |
| MOD-01 | Phase 1 — Foundation | Pending |
| MOD-02 | Phase 1 — Foundation | Pending |
| MOD-03 | Phase 1 — Foundation | Pending |
| PLT-01 | Phase 1 — Foundation | Complete |
| PLT-02 | Phase 6 — Polish & Motion | Pending |
| PLT-03 | Phase 1 — Foundation | Pending |
| PLT-04 | Phase 1 — Foundation | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27 ✓
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-13*
*Last updated: 2026-06-13 after roadmap creation — all 27 v1 requirements mapped*
