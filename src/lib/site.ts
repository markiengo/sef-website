// src/lib/site.ts
// Single source of truth for external links + landing page asset/data references.
//
// Sibling to content.ts (the data-adapter seam). Where content.ts owns report DATA,
// this module owns the site's external URLs and static asset paths so the owner can
// SWAP any of them in ONE place — every CTA/link/marquee imports from here, never
// hardcodes a URL or asset path inline.

// ─── External links ───
// Application form (Google Form) — every "Join SEF" CTA links here, in a new tab.
export const JOIN_FORM_URL = 'https://forms.gle/wUxoKXsZkkEF1N1x5';

// Job description — the secondary "View the role →" link, in a new tab.
export const JD_URL = 'https://shorturl.at/GOnfJ';

// ─── Assets ───
// WSO partnership badge — horizontal variant is delivered & preferred for the inline band.
export const WSO_BADGE_SRC = '/logos/partners/wso-horizontal.png';

// University marquee data — ordered as the marquee should read.
// Files are DELIVERED in /public/logos/universities/.
// NYU is the only .webp — keep the extension. Adding/removing a school = one line here
// + drop (or remove) the file; no markup change needed.
export const UNIVERSITIES = [
  { name: 'University of California, Berkeley',           file: 'uc-berkeley.png' },
  { name: 'New York University',                          file: 'new-york-university.webp' },
  { name: 'University of North Carolina at Chapel Hill',  file: 'unc-chapel-hill.png' },
  { name: 'University of Melbourne',                      file: 'university-of-melbourne.png' },
  { name: 'University of Amsterdam',                      file: 'university-of-amsterdam.png' },
  { name: 'Marquette University',                         file: 'marquette-university.png' },
  { name: 'University of Finance & Marketing',            file: 'university-of-finance-marketing.png' },
  { name: 'VinUniversity',                                file: 'vinuniversity.png' },
] as const;

// NOTE: there is intentionally NO HERO_VIDEO_SRC / HERO_POSTER_SRC export —
// the hero is code-driven (animated CSS gradient/mesh), so it has no media asset to swap.
