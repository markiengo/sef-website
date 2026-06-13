<!-- GSD:project-start source:PROJECT.md -->
## Project

**Saigon Equities Forum — Website Revamp**

A complete revamp of the website for **Saigon Equities Forum (SEF)** — a student-led, Vietnam-focused financial research community whose analysts study at top universities worldwide (NYU, Berkeley, UNC, Melbourne, Amsterdam, VinUni, and more) and who are now officially partnered with **Wall Street Oasis**. The site is a quietly-elite, cinematic marketing site that (1) converts ambitious high-school and incoming-college students into applicants, and (2) frames SEF's professional-grade research as the work of a serious institution to impress recruiters, partners, and adults who visit.

It replaces the current builder-based site (Wix-style, templated, "club"-feeling) with maintainable, code-built pages: a cinematic landing page, a filterable publications library, a short-form News & Insights stream, and a team directory with full analyst profile pages.

**Core Value:** **A prospective student lands on the site and immediately wants to belong to — and apply to — SEF.** Recruitment conversion is the one thing that must work; every design and content decision serves it, while never looking less than institution-grade to an adult recruiter.

### Constraints

- **Tech stack**: Code-built static/SSG site (steering toward **Astro** — MDX content collections, minimal JS, ideal for report pages + cinematic landing, low long-term maintenance) — *because* the owner explicitly wants maintainable code and a content-driven site that future webmasters can inherit. Final stack confirmed in research.
- **Hosting**: Vercel (free tier), existing custom domain — *because* it's free, zero-ops, and the owner already owns the domain.
- **Publishing (v1)**: MDX/markdown content collections, owner-published — *because* Supabase self-serve is deliberately deferred to ship the recruitment site faster.
- **Brand**: Green `#00845D` / Gold `#C89D29` / Dark Grey `#3E3E3D`; Cinzel (display/logo), Inter / Inter Light (body), Arial (graphs) — *because* this is the locked SEF style guide (`context/style_guide.md`, Figma).
- **Tone**: Quietly elite — restraint over bravado — *because* the site must impress adult recruiters while still pulling students; keyword **ego** expressed through polish, not loud copy.
- **Motion**: Refined micro-motion only (tasteful fades, subtle parallax, smooth hovers, one hero moment) — *because* expensive-feeling restraint beats theme-park animation for this brand.
- **Privacy**: Public member data limited to name, role, university, course, division, Instagram — *because* emails/phones in `past_members.csv` must not be exposed.
- **Team / timeline**: Owner is the primary builder; flexible timeline, no fixed cohort deadline stated (assumption — flag if a recruiting deadline emerges).
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

| Skill | Description | Path |
|-------|-------------|------|
| brandkit | Premium brand-kit image generation skill for creating high-end brand-guidelines boards, logo systems, identity decks, and visual-world presentations. Trained for minimalist, cinematic, editorial, dark-tech, luxury, cultural, security, gaming, developer-tool, and consumer-app brand systems. Optimized for intentional logo concepting, refined composition, sparse typography, strong symbolic meaning, premium mockups, art-directed imagery, and flexible grid layouts. | `.agents/skills/brandkit/SKILL.md` |
| design-taste-frontend | Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check. | `.agents/skills/design-taste-frontend/SKILL.md` |
| design-taste-frontend-v1 | The original v1 taste-skill, preserved for projects depending on its exact behavior. The current default is `design-taste-frontend` (v2 experimental), which is a substantial rewrite. Use this v1 install name only if you need exact backward compatibility. | `.agents/skills/design-taste-frontend-v1/SKILL.md` |
| emil-design-eng | This skill encodes Emil Kowalski's philosophy on UI polish, component design, animation decisions, and the invisible details that make software feel great. | `.agents/skills/emil-design-eng/SKILL.md` |
| full-output-enforcement | Overrides default LLM truncation behavior. Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Apply to any task requiring exhaustive, unabridged output. | `.agents/skills/full-output-enforcement/SKILL.md` |
| gpt-taste | Elite UX/UI & Advanced GSAP Motion Engineer. Enforces Python-driven true randomization for layout variance, strict AIDA page structure, wide editorial typography (bans 6-line wraps), gapless bento grids, strict GSAP ScrollTriggers (pinning, stacking, scrubbing), inline micro-images, and massive section spacing. | `.agents/skills/gpt-taste/SKILL.md` |
| high-end-visual-design | Teaches the AI to design like a high-end agency. Defines the exact fonts, spacing, shadows, card structures, and animations that make a website feel expensive. Blocks all the common defaults that make AI designs look cheap or generic. | `.agents/skills/high-end-visual-design/SKILL.md` |
| image-to-code | Elite website image-to-code skill for Codex. For visually important web tasks, it must first generate the design image(s) itself, deeply analyze them, then implement the website to match them as closely as possible. In Codex, it must prefer large, readable, section-specific images instead of tiny compressed boards, generate fresh standalone images for sections or detail views instead of cropping old ones, avoid lazy under-generation, avoid cards-inside-cards-inside-cards UI, and keep the hero clean, spacious, readable, and visible on a small laptop. | `.agents/skills/image-to-code/SKILL.md` |
| imagegen-frontend-mobile | Elite mobile app image-generation skill for creating premium, app-native screen concepts and flows. Designed for iOS, Android, and cross-platform mobile products. Prioritizes clean hierarchy, comfortably readable text, strong multi-screen consistency, controlled color palettes, non-generic creative direction, textured surfaces, image-led composition, tasteful custom iconography, and clean phone mockup framing. By default, screens should be shown inside a subtle premium iPhone or similar phone mockup with a visible frame, while the main focus stays on the app content itself. This skill generates images only. It does not write code. | `.agents/skills/imagegen-frontend-mobile/SKILL.md` |
| imagegen-frontend-web | Elite frontend image-direction skill for generating premium, conversion-aware website design references. CRITICAL OUTPUT RULE — generate ONE separate horizontal image FOR EVERY section. A landing page with 8 sections produces 8 images. Never compress multiple sections into one image. Enforces composition variety (not always left-text / right-image), background-image freedom, varied CTAs, varied hero scales (giant / mid / mini minimalist), narrative concept spine, second-read moments, and a single consistent palette across all images. Optimized for landing pages, marketing sites, and product comps that developers or coding models can accurately recreate. | `.agents/skills/imagegen-frontend-web/SKILL.md` |
| industrial-brutalist-ui | Raw mechanical interfaces fusing Swiss typographic print with military terminal aesthetics. Rigid grids, extreme type scale contrast, utilitarian color, analog degradation effects. For data-heavy dashboards, portfolios, or editorial sites that need to feel like declassified blueprints. | `.agents/skills/industrial-brutalist-ui/SKILL.md` |
| minimalist-ui | Clean editorial-style interfaces. Warm monochrome palette, typographic contrast, flat bento grids, muted pastels. No gradients, no heavy shadows. | `.agents/skills/minimalist-ui/SKILL.md` |
| redesign-existing-projects | Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework or vanilla CSS. | `.agents/skills/redesign-existing-projects/SKILL.md` |
| stitch-design-taste | Semantic Design System Skill for Google Stitch. Generates agent-friendly DESIGN.md files that enforce premium, anti-generic UI standards — strict typography, calibrated color, asymmetric layouts, perpetual micro-motion, and hardware-accelerated performance. | `.agents/skills/stitch-design-taste/SKILL.md` |
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
