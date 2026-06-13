// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Vietnamese unicode range (U+1EA0-1EF9 core + combining marks)
// Must be a tuple (at least one element) to satisfy the Astro Fonts API type.
/** @type {[string, ...string[]]} */
const VIETNAMESE_RANGE = [
  'U+0102-0103',
  'U+0110-0111',
  'U+0128-0129',
  'U+0168-0169',
  'U+01A0-01A1',
  'U+01AF-01B0',
  'U+0300-0301',
  'U+0303-0304',
  'U+0308-0309',
  'U+0323',
  'U+0329',
  'U+1EA0-1EF9',
  'U+20AB',
];

export default defineConfig({
  site: 'https://sef-website-chi.vercel.app',
  // output: 'static' is the default — no adapter required for Vercel static deploy (PLT-01)
  integrations: [mdx(), sitemap()],

  // Astro 6 built-in Fonts API — top-level `fonts:` key (confirmed on 6.4.6, not experimental).
  // Uses fontProviders.local() for self-hosted woff2 files.
  // font-display: swap is the API default. Preload links emitted by <Font> in BaseLayout.
  // D-07: Cinzel 400+700 (display/logo only), Inter 300+400 (body/headings). No Inter 600/700.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Cinzel',
      cssVariable: '--font-cinzel',
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
      name: 'Inter',
      cssVariable: '--font-inter',
      options: {
        variants: [
          // Inter Light 300 — Latin (primary body/heading weight)
          {
            weight: 300,
            style: 'normal',
            src: ['./public/fonts/inter-light.woff2'],
          },
          // Inter Light 300 — Vietnamese supplement (analyst names + topics with diacritics, Pitfall 3)
          {
            weight: 300,
            style: 'normal',
            src: ['./public/fonts/inter-light-vietnamese.woff2'],
            unicodeRange: VIETNAMESE_RANGE,
          },
          // Inter Regular 400 — Latin (UI labels, nav items)
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/inter-regular.woff2'],
          },
          // Inter Regular 400 — Vietnamese supplement
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/inter-regular-vietnamese.woff2'],
            unicodeRange: VIETNAMESE_RANGE,
          },
        ],
      },
    },
  ],
});
