// src/content.config.ts
// EXACT filename — NOT src/content/config.ts (Pitfall 4: legacy location no longer recognised in Astro 5.x+/6.x).
// Uses the Content Layer glob() loader (current Astro 5.x+/6.x API).
//
// PRIVACY BOUNDARY — this schema is the single source of truth for what member/author data
// is ever modelled. It captures analyst NAMES only (the `analysts` string array).
// Email, phone, schoolEmail, and every other PII field from past_members.csv MUST NEVER
// appear here. See also: docs/publishing-reports.md and CLAUDE.md privacy constraint.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// MOD-01: Reports content collection.
// Fields locked to the SEF content model (D-10 / 01-CONTEXT.md).
const reports = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reports' }),
  schema: ({ image }) =>
    z.object({
      // Display
      title: z.string(),

      // SEO floor (PUB-06 foreshadow) — must be at least 80 chars to pass the build gate.
      description: z.string().min(80),

      // Content classification (MOD-01 enums)
      division: z.enum(['Macro', 'Equity']),
      type: z.enum(['Report', 'Note', 'Snapshot', 'Insight']),

      // Metadata
      sector: z.array(z.string()).default([]),

      // Optional "key figures" band rendered after the report header (PUB design).
      // Reusable across reports — equity reports can use valuation metrics, macro
      // reports can use headline indicators. Empty array → band is not rendered.
      keyStats: z
        .array(z.object({ label: z.string(), value: z.string() }))
        .default([]),

      // Analyst NAMES only — never email, phone, or any PII (privacy boundary).
      analysts: z.array(z.string()),

      // Assets
      // cover: image() — resolves the frontmatter path to an optimized ImageMetadata
      // object at build (astro:assets). Path is relative to the MDX file, e.g.
      // ../../assets/images/foo.webp. Pages render it via <Image src={data.cover} />.
      cover: image(),
      pdfUrl: z.string(), // Full-report download URL or path (PUB-04).

      // Flags
      featured: z.boolean().default(false),

      // Date — z.coerce.date() accepts YYYY-MM-DD frontmatter strings.
      publishedAt: z.coerce.date(),
    }),
});

export const collections = { reports };
