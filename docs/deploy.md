# Vercel Deploy — How It Works

## Build approach

The SEF website is a **static Astro site with no server adapter** (`output: 'static'`, the
Astro default). No `@astrojs/vercel` package is required or installed — that package is for
SSR/on-demand rendering only, which this site does not use.

## How Vercel auto-builds the site

Vercel auto-detects Astro projects when the Git repository is imported at vercel.com/new:

- **Framework Preset:** Astro (detected automatically)
- **Build Command:** `astro build`
- **Output Directory:** `dist`
- **Environment variables:** none required — the site is fully static with no runtime secrets

Vercel runs `astro build` on each push to the connected branch, then serves the resulting
`dist/` directory as static files over HTTPS on the assigned `*.vercel.app` subdomain.

## Repository requirements

- `dist/` and `.vercel/` are gitignored — Vercel builds from source, never from committed
  build artifacts.
- No `.env` file exists or is needed for this phase.
- All prior-plan work (tokens, fonts, content, seed report) is committed to `master` and
  will be picked up automatically on the first Vercel build.

## Live URL

> **Placeholder — to be filled in after Task 2 (Vercel connect checkpoint)**
>
> `site: https://sef-website.vercel.app` in `astro.config.mjs` will be updated to the real
> assigned subdomain once Vercel completes the first build and the URL is confirmed.

## Deferred: custom domain cutover

Pointing the existing SEF custom domain at this Vercel project is deferred until DNS/registrar
access is confirmed. See `docs/custom-domain-cutover.md` for the documented cutover steps.
That task is tracked as a PLT-03 follow-up (decision D-08); it is NOT executed in this phase.
