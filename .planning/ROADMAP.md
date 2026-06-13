# Roadmap: Saigon Equities Forum — Website Revamp

## Overview

From blank Astro project to a quietly-elite, recruitment-ready marketing site in six phases. The build order is deliberate: lay the design-system and content infrastructure first so every page that follows is wired to the same token layer and data adapter. The publications library ships before the landing page so the landing can link to real, live content. Team profiles ship after publications so byline back-references resolve at build time. News & Insights lands as a fast discrete slice — the content model is already in place. Polish and motion are applied last, across a fully-built site, so micro-motion decisions are holistic rather than piecemeal.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Astro scaffold, CSS-variable design system (single light treatment), content model, data adapter, and Vercel deploy pipeline
- [ ] **Phase 2: Publications Library** - Browsable, filterable publications library with per-report web summary pages, PDF download, bylines, and SEO text
- [ ] **Phase 3: Landing Page** - Cinematic, recruitment-focused landing page with hero, Join CTA, WSO partnership, featured reports, and university logos
- [ ] **Phase 4: Team & Analyst Profiles** - Team directory and full individual analyst profile pages with build-time report back-references and privacy enforcement
- [ ] **Phase 5: News & Insights** - Short-form News & Insights stream with index view and individual post pages, visually distinct from reports
- [ ] **Phase 6: Polish & Motion** - Site-wide refined micro-motion, image optimization pipeline, and final Core Web Vitals pass

## Phase Details

### Phase 1: Foundation
**Goal**: A deployable Astro project is live (vercel.app this phase; custom-domain cutover deferred to confirmed DNS access), the design system enforces the SEF identity via CSS-variable tokens in a single light treatment, and the content model + data adapter are in place so every future page reads data through a single interface
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: PLT-01, PLT-03, PLT-04, BRD-01, BRD-02, BRD-03, BRD-04, MOD-01, MOD-02, MOD-03
**Success Criteria** (what must be TRUE):
  1. Visiting the live HTTPS URL (a `*.vercel.app` URL this phase; custom domain follows) shows a working Astro page using the SEF light palette (cream/emerald/gold), Cinzel display type, and Inter body type
  2. Brand colors are CSS-variable tokens in a single light treatment — no brand hex values appear hardcoded in any component *(revised 2026-06-13: dark treatment dropped per owner; was "switch between dark and light")*
  3. All light-treatment text/accent color pairings pass WCAG AA contrast (links use `#195042`; `#00845D` for fills/large text; gold decorative-only) *(revised 2026-06-13: was "both treatments / dark accent `#00C28B`")*
  4. Fonts load from self-hosted assets with `font-display: swap` and produce no render-blocking or FOUT
  5. A developer can publish a new report by adding an MDX file + colocated assets, deploying, and following the documented workflow — `getReports()` / `getReport()` calls succeed with no page-level query changes
**Plans**: 4 plans
  - [x] 01-01-PLAN.md — Scaffold Astro 6 static project + thinnest end-to-end proof page (Walking Skeleton spine)
  - [x] 01-02-PLAN.md — Full CSS-variable token layer + self-hosted Cinzel/Inter via Astro Fonts API (light treatment, WCAG role split)
  - [x] 01-03-PLAN.md — Content model (zod schema) + single data adapter + seeded 2026 Gold Report + publish-workflow docs
  - [x] 01-04-PLAN.md — Deploy to Vercel (HTTPS on *.vercel.app), document custom-domain cutover, verify live

### Phase 2: Publications Library
**Goal**: A visitor can browse and filter all publications in a library view and open any report as a polished web summary page with exec overview, key charts, PDF download, analyst byline, and indexable HTML thesis text
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: PUB-01, PUB-02, PUB-03, PUB-04, PUB-05, PUB-06
**Success Criteria** (what must be TRUE):
  1. A visitor can open the publications library and see all reports listed
  2. A visitor can filter the library by Division (Macro / Equity), Type (Report, Note, Snapshot, Insight), and Sector tag — results update without a page reload or show filtered views correctly
  3. A visitor can open an individual report page and read the exec overview and view key charts rendered natively in the browser (not inside a PDF embed)
  4. A visitor can click "Read full report" on any report page and receive the full PDF (opens or downloads)
  5. Each report page displays the analyst byline as a link; clicking it navigates to that analyst's profile page (even if the profile page is a stub at this phase)
  6. Each report page contains the key thesis as real HTML text with a `description` field and a minimum exec-summary length — a search engine can index it
**Plans**: 5 plans
  - [x] 02-01-PLAN.md — Foundation fixes: --font-body token → Kollektif, slugify utility, global site header + footer in BaseLayout
  - [x] 02-02-PLAN.md — Publications library index at /publications: masthead, cover-image card grid, instant client-side filter island (PUB-01/PUB-02)
  - [ ] 02-03-PLAN.md — Route relocation /reports/[id] → /publications/[id]: byline links, breadcrumb, redirect in astro.config.mjs (PUB-03/04/05/06)
  - [ ] 02-04-PLAN.md — Team profile stubs at /team/[slug]: derived from report frontmatter, never dead-links, privacy-safe (PUB-05)
  - [ ] 02-05-PLAN.md — Cover generation + 5 seeded reports from context/Deliverables/: Macro + Equity divisions, multiple sectors (PUB-01/02/03/04)
**UI hint**: yes

### Phase 3: Landing Page
**Goal**: A visitor landing on the root URL sees a cinematic, quietly-elite hero that communicates SEF's identity and immediately surfaces a prominent "Join SEF" path, credibility proof (WSO partnership, flagship reports, university logos), and links into the live publications library
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: LND-01, LND-02, LND-03, LND-04, LND-05
**Success Criteria** (what must be TRUE):
  1. A visitor sees a cinematic hero section on the root URL that communicates SEF's identity and a recruitment-focused value proposition with no scrolling required
  2. A visitor can click "Join SEF" and reach a polished join page/section that routes to the existing Google Form — the transition does not feel jarring
  3. The landing page displays the Wall Street Oasis partnership badge with brief context visible above the fold or within the first scroll
  4. The landing page shows featured flagship report cards that link into the live publications library pages from Phase 2
  5. The landing page shows a university logos strip ("our analysts study at…") identifying the universities SEF members attend
**Plans**: TBD
**UI hint**: yes

### Phase 4: Team & Analyst Profiles
**Goal**: A visitor can browse the full team directory and open any analyst's individual profile page, which shows their photo, bio, university, course, division/role, Instagram, and a build-time list of every report they authored — exposing only privacy-safe fields
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: TEAM-01, TEAM-02, TEAM-03, TEAM-04
**Success Criteria** (what must be TRUE):
  1. A visitor can open the team directory page and see all current SEF members listed with their name, role, and division
  2. A visitor can click any analyst and reach their full profile page showing photo, short bio, university, course, division/role, and Instagram link
  3. Each analyst's profile page lists every report they authored, with links to the corresponding report pages from Phase 2 (resolved at build time — no dead links)
  4. Inspecting the HTML source of any profile page shows no email addresses or phone numbers — only name, role, university, course, division, and Instagram
**Plans**: TBD
**UI hint**: yes

### Phase 5: News & Insights
**Goal**: A visitor can browse an on-site News & Insights stream of short-form posts and open individual posts with headline, hero graphic, body copy, and inline charts — visually and structurally distinct from the full reports in the publications library
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: INS-01, INS-02
**Success Criteria** (what must be TRUE):
  1. A visitor can open the News & Insights index and see short-form posts listed in a layout that is visually distinct from the publications library (different card style, different typographic treatment, or clearly separate section)
  2. A visitor can open any individual insight post and read the headline, view the hero graphic, read body copy, and see any inline charts — all rendered natively in the browser
**Plans**: TBD
**UI hint**: yes

### Phase 6: Polish & Motion
**Goal**: Refined micro-motion is applied consistently across all site pages, all cover and chart images are served optimized (WebP/AVIF, responsive srcset), and the site meets reasonable Core Web Vitals targets — the result is a site that feels expensive without announcing it
**Mode:** mvp
**Depends on**: Phase 3, Phase 4, Phase 5
**Requirements**: BRD-05, PLT-02
**Success Criteria** (what must be TRUE):
  1. Every interactive element site-wide (navigation links, CTA buttons, card hovers, profile links) responds with a tasteful, on-brand micro-transition — no element changes state instantaneously without feedback
  2. The hero section features one deliberate cinematic moment (e.g., fade/reveal, subtle parallax, or editorial entrance) without gimmickry — `prefers-reduced-motion` users see an equivalent non-motion state
  3. All cover and chart images are served as WebP or AVIF with responsive `srcset` — no unoptimized originals are delivered to the browser
  4. The site scores a passing Lighthouse performance run (LCP under 2.5 s, CLS under 0.1) on a representative page
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in dependency order: 1 → 2 → 3 → 4 → 5 → 6 (Phase 5 can run concurrently with Phases 3–4 once Phase 1 is done; Phase 6 waits for all content phases)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete |  |
| 2. Publications Library | 2/5 | In Progress|  |
| 3. Landing Page | 0/? | Not started | - |
| 4. Team & Analyst Profiles | 0/? | Not started | - |
| 5. News & Insights | 0/? | Not started | - |
| 6. Polish & Motion | 0/? | Not started | - |
