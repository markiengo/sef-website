// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sef-website.vercel.app',
  // output: 'static' is the default — no adapter required for Vercel static deploy (PLT-01)
  // fonts: wired in plan 02 (Astro 6 built-in Fonts API)
  integrations: [mdx(), sitemap()],
});
