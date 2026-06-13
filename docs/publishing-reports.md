# Publishing Reports — Add-a-Report Workflow

This guide explains how to add a new research report to the SEF website.
No code changes are needed beyond creating one MDX file and optionally adding
a cover image and chart assets.

---

## 1. Create the MDX file

Place your report file at:

```
src/content/reports/<your-report-slug>.mdx
```

The filename becomes the URL slug. Use lowercase letters, numbers, and hyphens.

**Example:** `src/content/reports/2026-equity-note.mdx` → `/reports/2026-equity-note`

---

## 2. Required frontmatter fields

Every report MUST include ALL of the following fields. The build will fail
(with a clear error) if any required field is missing or invalid.

```yaml
---
title: "Your Report Title Here"
description: >
  At least 80 characters describing the report's thesis. This becomes the
  meta description for search engines — write a real sentence, not a label.
division: Macro          # Must be exactly: Macro | Equity
type: Report             # Must be exactly: Report | Note | Snapshot | Insight
sector: ["Sector One", "Sector Two"]   # Array of strings; [] is valid
analysts: ["Analyst Full Name"]        # Full names only — see Privacy Rule below
cover: ./_assets/cover.png            # Path to a colocated cover image (required)
pdfUrl: /reports/your-report-slug.pdf  # URL or path to the full PDF download
featured: false          # Set true to surface in "featured" slots (optional, default false)
publishedAt: 2026-02-01  # Date in YYYY-MM-DD format
---
```

### Field reference

| Field | Type | Valid values / notes |
|-------|------|----------------------|
| `title` | string | Report display title |
| `description` | string (min 80 chars) | SEO meta description — build fails if shorter |
| `division` | enum | `Macro` or `Equity` — exact capitalisation |
| `type` | enum | `Report`, `Note`, `Snapshot`, or `Insight` |
| `sector` | string array | e.g. `["Precious Metals"]` or `[]` |
| `analysts` | string array | Analyst **names only** — see Privacy Rule |
| `cover` | image path | Relative path to colocated `.png`/`.jpg` |
| `pdfUrl` | string | Full URL or root-relative path, e.g. `/reports/my-report.pdf` |
| `featured` | boolean | `true` or `false` (default `false`) |
| `publishedAt` | date | `YYYY-MM-DD` string |

---

## 3. Privacy rule — names only, never contact data

**IMPORTANT:** The `analysts` field MUST contain **full names only**.

- **Correct:** `analysts: ["Sang Le", "Nam Nguyen"]`
- **WRONG:** `analysts: ["sang.le@example.com"]` — emails are forbidden
- **WRONG:** `analysts: ["Sang Le (+84 xxx)"]` — phone numbers are forbidden

The member roster (`context/past_members.csv`) contains email addresses and
phone numbers that must **never** appear in any public page or content file.
The website exposes names only. This rule applies to all SEF content files.

---

## 4. Colocating cover and chart images

Place cover images and chart PNGs alongside (or near) your MDX file:

```
src/content/reports/
  your-report-slug.mdx
  _assets/
    cover.png
    chart-main.png
    chart-secondary.png
```

You can also colocate assets directly next to the MDX file (no `_assets/`
subdirectory required). Reference them with a relative path in frontmatter:

```yaml
cover: ./_assets/cover.png
# or
cover: ./cover.png
```

To embed chart images in the MDX body, import them at the top of the file
(after the frontmatter closing `---`):

```mdx
import myChart from './_assets/chart-main.png';

## Some Section

<img src={myChart.src} alt="Descriptive alt text" width={myChart.width} height={myChart.height} />
```

---

## 5. Validate locally

Before pushing, run:

```bash
npm run check
```

This runs `astro check`, which validates all frontmatter fields against the
zod schema. A descriptive error is printed for any missing or invalid field.

To preview the report page locally:

```bash
npm run dev
# then open http://localhost:4321/reports/your-report-slug
```

---

## 6. Deploying

Deployment is fully automatic:

1. Commit your MDX file (and any colocated images) to the `main` branch
2. `git push`
3. Vercel auto-detects the push, runs `astro build`, and deploys to the live URL

No manual build or deploy step is needed. The report page will be live at
`https://your-domain.com/reports/your-report-slug` within ~60 seconds of push.

---

## Quick checklist

- [ ] File is at `src/content/reports/<slug>.mdx`
- [ ] All 10 frontmatter fields are present
- [ ] `description` is at least 80 characters
- [ ] `division` is exactly `Macro` or `Equity`
- [ ] `type` is exactly `Report`, `Note`, `Snapshot`, or `Insight`
- [ ] `analysts` contains full names only — no emails, no phone numbers
- [ ] Cover image is colocated and path is correct
- [ ] `npm run check` exits with 0 errors
- [ ] Committed and pushed to `main`
