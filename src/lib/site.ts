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

// ─── Contact & socials (footer) ───
// PLACEHOLDERS — swap for SEF's real handles. The newsletter form opens a mail
// draft to CONTACT_EMAIL; wire it to a real service (Buttondown/Mailchimp/Formspree)
// when one exists by changing the <form action> in BaseLayout.astro.
export const CONTACT_EMAIL = 'saigonequities@gmail.com'; // PLACEHOLDER — swap for SEF's real inbox
export const INSTAGRAM_URL = 'https://www.instagram.com/sefvietnam/';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/sefvietnam/';

// ─── Assets ───
// Logo image files live in src/assets/logos/** and flow through the astro:assets
// pipeline (optimized + cache-busted at build). site.ts holds only FILENAMES; the
// landing page glob-imports the matching asset by filename — see index.astro.

// Network / affiliations — partners, collaborations, and where alumni land.
// Each entry carries a relationship `label` so one section can hold mixed
// relationship types. Files live in src/assets/logos/partners/.
export const PARTNERS = [
  { name: 'Wall Street Oasis',    file: 'wso-horizontal.png',      label: 'Official Partner' },
  { name: 'FPT Securities',       file: 'fpt-securities.jpg',      label: 'Alumni Destination' },
  { name: 'Rong Viet Securities', file: 'rongviet-securities.jpg', label: 'Industry Advisory' },
  { name: 'SSIS',                 file: 'ssis-club.jpg',           label: 'Student Club Partner' },
] as const;

// University marquee data — ordered as the marquee should read.
// Files live in src/assets/logos/universities/. Filenames must match exactly (a
// mismatch fails the build via resolveLogo). Adding/removing a school = one line
// here + drop (or remove) the matching file; no markup change needed.
export const UNIVERSITIES = [
  { name: 'University of California, Berkeley',           file: 'uc-berkeley.png' },
  { name: 'New York University',                          file: 'new-york-university.png' },
  { name: 'University of North Carolina at Chapel Hill',  file: 'unc-chapel-hill.png' },
  { name: 'University of Melbourne',                      file: 'uni-melb.jpg' },
  { name: 'University of Amsterdam',                      file: 'university-of-amsterdam.png' },
  { name: 'Marquette University',                         file: 'marquette-university.png' },
  { name: 'University of Finance & Marketing',            file: 'university-of-finance-marketing.png' },
  { name: 'VinUniversity',                                file: 'vinuniversity.png' },
] as const;

// NOTE: there is intentionally NO HERO_VIDEO_SRC / HERO_POSTER_SRC export —
// the hero is code-driven (animated CSS gradient/mesh), so it has no media asset to swap.
