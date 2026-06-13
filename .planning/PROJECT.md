# Saigon Equities Forum — Website Revamp

## What This Is

A complete revamp of the website for **Saigon Equities Forum (SEF)** — a student-led, Vietnam-focused financial research community whose analysts study at top universities worldwide (NYU, Berkeley, UNC, Melbourne, Amsterdam, VinUni, and more) and who are now officially partnered with **Wall Street Oasis**. The site is a quietly-elite, cinematic marketing site that (1) converts ambitious high-school and incoming-college students into applicants, and (2) frames SEF's professional-grade research as the work of a serious institution to impress recruiters, partners, and adults who visit.

It replaces the current builder-based site (Wix-style, templated, "club"-feeling) with maintainable, code-built pages: a cinematic landing page, a filterable publications library, a short-form News & Insights stream, and a team directory with full analyst profile pages.

## Core Value

**A prospective student lands on the site and immediately wants to belong to — and apply to — SEF.** Recruitment conversion is the one thing that must work; every design and content decision serves it, while never looking less than institution-grade to an adult recruiter.

## Brand North Star

One word governs the entire identity: **ego**. SEF is finance, luxury, and quiet Wall-Street swagger — try-hard excellence presented with restraint. The work brags so the copy doesn't have to. Aspirational for students, credible for adults.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. v1 = recruitment-ready revamp. -->

**Landing / Recruitment**
- [ ] Cinematic, quietly-elite landing page with a recruitment-focused hero and a clear "Join SEF" call-to-action
- [ ] "Join SEF" CTA routes to the existing Google Form (via a polished dedicated page/section, not a jarring jump)
- [ ] Credibility proof featured prominently: Wall Street Oasis partnership, featured flagship reports, and university logos ("our analysts study at…")

**Publications Library**
- [ ] Browsable, filterable publications library organized by **Division** (Macro / Equity), **Type** (Report · Note · Snapshot · Insight), and **Sector** tag (Banking, Energy, Real Estate, …)
- [ ] Each report uses a **hybrid** presentation: a beautifully-typeset web summary page (exec overview + key charts + byline) with a "Read full report" PDF download
- [ ] Reports carry an analyst **byline** that links to the author's profile

**News & Insights**
- [ ] A distinct, fast-moving on-site "News & Insights" stream of short-form posts (headline, hero graphic, a few paragraphs, charts) — e.g. FTSE Russell upgrade, O&G, Rail, Vingroup bonds

**Team & Author Profiles**
- [ ] Polished team/directory page
- [ ] **Full analyst profile pages**: photo, short bio, university + course, division/role, links to every report they authored, and Instagram
- [ ] Profiles expose **only** privacy-safe fields: name, role, university, course, division, Instagram — never email or phone

**System / Foundation**
- [ ] Design system built on the SEF identity (green `#00845D`, gold `#C89D29`, dark grey `#3E3E3D`; Cinzel display, Inter body) — a single **light** treatment (warm cream/emerald/gold editorial canvas). *(Revised 2026-06-13: dark treatment dropped from v1 — owner chose light. Tokens stay swap-friendly for a possible future second treatment.)*
- [ ] Reports & insights authored as MDX/markdown content collections (v1 publishing model)
- [ ] Deployed to Vercel on the existing custom domain

### Out of Scope (v1 — deferred, not rejected)

- **Supabase self-serve publishing / analyst upload portal** — deferred to a dedicated later phase. v1 publishes via MDX/markdown (owner-published) to reach a recruitment-ready launch faster without a backend. Architecture must not preclude it.
- **On-site application form / backend** — v1 links to the existing Google Form. A branded on-site form can come later.
- **Member login / auth, dashboards, comments** — not needed for a recruitment marketing site.
- **Member stats/metrics counters** (# analysts, readership) — skipped early; numbers are modest in a first season and a weak proof point right now.
- **Bilingual EN/VN site** — English is SEF's working language and the audience studies/aspires to study abroad. English-only for v1 (revisit if recruiting domestically at scale).
- **Final logo / brand assets** — to be supplied during build; tasteful placeholders within the green/gold/Cinzel system used until then.

## Context

**The organization.** SEF is in its first season, bootstrapping an org meant to be passed down to future cohorts. Two analyst divisions: *Economics & Policy (Macro)* and *Equity Research*. ~13 active members across global universities (see `context/past_members.csv`). Values: Integrity, Collaboration, Public Service. Deliverables are explicitly produced for real recruiters/referral leads — quality bar is high. Recently partnered with **Wall Street Oasis** (Bloomberg subscription access, IB/modeling bootcamp seats, exclusive content) — a strong recruitment draw. (`context/handbook.md`, `context/jobdescription.md`)

**The deliverables.** Genuinely Wall-Street-grade research. Reviewed sample: the *2026 Gold Report* — "A Quantitative Decomposition of the SJC Wedge," with accounting identities, Greek notation, Bloomberg figures, and ~45 embedded chart images. Deliverables are `.docx` files (text + many embedded figure PNGs, Inter fonts) plus social-media graphic sets (PNG carousels) and supporting Excel. Categories present: Equity Research (FPT, Masan, MBB, VCB), Macro Research (Gold, Vietnam 2026 Macro Outlook, SBV, Semiconductor), Research (Real Estate), Social Media (FTSE Russell, O&G, Rail, Vingroup Bonds, Intro). This is why reports use a **hybrid** model — extracting the exec summary + key figures to the web while preserving the dense full document as a downloadable PDF. (`context/Deliverables/`)

**Current site.** Builder-based, green nav bar, Saigon-skyline hero with serif "Saigon Equities Forum," a "Recent Publications" blog feed. Competent but templated — reads as a student club rather than an institution. We are elevating, not iterating. (`context/current-web-pics/`)

**Design references & direction.** Provided references define the lane:
- `harvey_landing.png` (Harvey.ai) — the primary direction: cinematic, dark/restrained, editorial serif ("Practice Made Perfect"), muted greens, lots of negative space, logo wall of prestigious clients. This is the "quietly elite" target.
- `cinematic product.png` — dark glossy fintech energy (depth, 3D, "Smart Finance for Modern Users") — a secondary flavor for motion/hero treatment.
- `palette.png` — deep green + gold + cream, matching SEF's brand colors exactly.
- `palette2.png` (Luxora Botanicals) — luxury green/gold identity, serif wordmark, gold-foil restraint — informs the light/editorial treatment.

**Documentation style.** Owner documents in clean, versioned markdown (SRS + logic), table-heavy, structured (`context/sample_docs/`). Planning docs match this register.

**Design skills.** `/frontend-design`, `/emil-design-eng`, and `/taste` are to be applied at the UI/design phase (where they produce a concrete design system, motion language, and anti-generic frontend), not during questioning.

## Constraints

- **Tech stack**: Code-built static/SSG site (steering toward **Astro** — MDX content collections, minimal JS, ideal for report pages + cinematic landing, low long-term maintenance) — *because* the owner explicitly wants maintainable code and a content-driven site that future webmasters can inherit. Final stack confirmed in research.
- **Hosting**: Vercel (free tier), existing custom domain — *because* it's free, zero-ops, and the owner already owns the domain.
- **Publishing (v1)**: MDX/markdown content collections, owner-published — *because* Supabase self-serve is deliberately deferred to ship the recruitment site faster.
- **Brand**: Green `#00845D` / Gold `#C89D29` / Dark Grey `#3E3E3D`; Cinzel (display/logo), Inter / Inter Light (body), Arial (graphs) — *because* this is the locked SEF style guide (`context/style_guide.md`, Figma).
- **Tone**: Quietly elite — restraint over bravado — *because* the site must impress adult recruiters while still pulling students; keyword **ego** expressed through polish, not loud copy.
- **Motion**: Refined micro-motion only (tasteful fades, subtle parallax, smooth hovers, one hero moment) — *because* expensive-feeling restraint beats theme-park animation for this brand.
- **Privacy**: Public member data limited to name, role, university, course, division, Instagram — *because* emails/phones in `past_members.csv` must not be exposed.
- **Team / timeline**: Owner is the primary builder; flexible timeline, no fixed cohort deadline stated (assumption — flag if a recruiting deadline emerges).

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Recruitment is the #1 job (over pure prestige or distribution) | Owner ranked it first; design tiebreaker | — Pending |
| Hybrid report model: web summary + chart highlights + PDF download | Reports are dense, figure-heavy .docx; best effort/payoff balance | — Pending |
| v1 scope = landing + publications + team + insights | Full revamp, not a one-pager; matches "total revamp" intent | — Pending |
| Code-built site on Vercel (lean Astro), existing domain | Owner wants maintainable code; free hosting; aesthetic needs full control | — Pending |
| "Join SEF" → existing Google Form via polished page/button | No backend needed now; fastest credible conversion path | — Pending |
| Quietly-elite tone (Harvey-style restraint) | Must satisfy both students and adult recruiters | — Pending |
| Supabase analyst self-publishing deferred to later phase | Ship recruitment-ready site faster; avoid backend before launch | — Pending |
| Full analyst profile pages with report bylines | Strongest recruitment hook ("get published like them"); ties team↔publications | — Pending |
| Publications taxonomy: Division → Type → Sector | Scales with output; mirrors real deliverable structure | — Pending |
| Separate on-site News & Insights stream | Keeps short-form content on-site (SEO + recruitment) vs. heavy reports | — Pending |
| Visual base = single **light** treatment (warm cream/taupe + emerald + gold, from palette.png + style_guide.md), never generic white. Dark dropped from v1. | Owner reviewed a live palette preview and chose light; CSS-variable tokens keep a future second treatment cheap | ✓ Decided 2026-06-13 (Phase 1 discuss) |
| English-only v1 | Working language; audience studies/aspires to study abroad | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-13 after initialization*
