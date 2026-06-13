// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sef-website-chi.vercel.app',
  // output: 'static' is the default — no adapter required for Vercel static deploy (PLT-01)
  redirects: {
    // D-12: old /reports/[id] URLs redirect to /publications/[id] — no broken links
    '/reports/[id]': '/publications/[id]',
  },
  integrations: [mdx(), sitemap()],

  // Astro 6 built-in Fonts API — top-level `fonts:` key.
  // Uses fontProviders.local() for self-hosted woff2 files.
  // font-display: swap is the API default. Preload links emitted by <Font> in BaseLayout.
  //
  // Type scheme: Cinzel (display serif) → all headings/display/logo.
  //              Kollektif (geometric sans) → body + everything else.
  // Vietnamese note: neither font ships precomposed VN tone-mark glyphs
  // (U+1EA0–1EF9) or ₫ (U+20AB). Per-font `fallbacks` route those glyphs per
  // character — Cinzel → system serif, Kollektif → system sans (Segoe UI/Arial,
  // full VN coverage) — so VN names render without tofu and match each role.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Cinzel',
      cssVariable: '--font-cinzel',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/cinzel-regular.woff2'],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./public/fonts/cinzel-bold.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Kollektif',
      cssVariable: '--font-kollektif',
      fallbacks: ['Segoe UI', 'Arial', 'Helvetica', 'sans-serif'],
      options: {
        variants: [
          // Kollektif Regular 400 — default body weight
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/kollektif-regular.woff2'],
          },
          // Kollektif Bold 700 — strong / emphasis / CTA
          {
            weight: 700,
            style: 'normal',
            src: ['./public/fonts/kollektif-bold.woff2'],
          },
          // Kollektif Italic 400 — emphasis (real italic, not synthetic)
          {
            weight: 400,
            style: 'italic',
            src: ['./public/fonts/kollektif-italic.woff2'],
          },
          // Kollektif Bold Italic 700
          {
            weight: 700,
            style: 'italic',
            src: ['./public/fonts/kollektif-bolditalic.woff2'],
          },
        ],
      },
    },
  ],
});
