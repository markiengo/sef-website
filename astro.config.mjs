// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sef-website-chi.vercel.app',
  // output: 'static' is the default — no adapter required for Vercel static deploy (PLT-01)
  integrations: [mdx(), sitemap()],

  // Astro 6 built-in Fonts API — top-level `fonts:` key.
  // Uses fontProviders.local() for self-hosted woff2 files.
  // font-display: swap is the API default. Preload links emitted by <Font> in BaseLayout.
  //
  // Type scheme: The Seasons (display serif) → all headings/display/logo.
  //              Butler (text serif) → body + everything else.
  // Vietnamese note: neither font ships the precomposed VN tone-mark glyphs
  // (U+1EA0–1EF9) or ₫ (U+20AB). `fallbacks` routes those glyphs per-character
  // to a system serif (Georgia/Times) so VN names render without tofu boxes.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'The Seasons',
      cssVariable: '--font-the-seasons',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            weight: 300,
            style: 'normal',
            src: ['./public/fonts/the-seasons-light.woff2'],
          },
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/the-seasons-regular.woff2'],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./public/fonts/the-seasons-bold.woff2'],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Butler',
      cssVariable: '--font-butler',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          // Butler Roman 400 — default body weight
          {
            weight: 400,
            style: 'normal',
            src: ['./public/fonts/butler-regular.woff2'],
          },
          // Butler Medium 500 — UI labels / tags / subtle emphasis
          {
            weight: 500,
            style: 'normal',
            src: ['./public/fonts/butler-medium.woff2'],
          },
          // Butler Bold 700 — strong / emphasis
          {
            weight: 700,
            style: 'normal',
            src: ['./public/fonts/butler-bold.woff2'],
          },
        ],
      },
    },
  ],
});
