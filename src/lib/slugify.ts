// src/lib/slugify.ts
// Single canonical slug formula.
//
// IMPORT RULE: Both /team/[slug].astro (Phase 2 stubs) and Phase 4 analyst profiles
// MUST import slugify from this file. Never copy-paste the formula into individual files —
// slug divergence between byline links and profile routes breaks navigation (Pitfall 6).

/**
 * Converts an analyst display name into a URL-safe slug.
 *
 * Examples:
 *   "Sang Le"       → "sang-le"
 *   "Nguyễn Thành"  → "nguyn-thnh"  (non-ASCII chars are stripped)
 *
 * Formula is locked — any change here requires updating all generated /team/[slug] routes.
 * Both Phase 2 stubs and Phase 4 full profiles MUST use this function to prevent
 * slug divergence that would break byline links.
 */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
