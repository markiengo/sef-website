// src/lib/content.ts
// MOD-02: THE single data-adapter seam.
//
// This is the ONLY module allowed to import from 'astro:content'.
// Pages and layouts MUST import getReports / getReport / render from HERE,
// never from astro:content directly (Anti-Pattern — breaks the adapter seam).
//
// SUPABASE SWAP POINT: to migrate from MDX content collections to a Supabase
// backend, replace only the bodies of getReports() and getReport() in this
// file. No page or layout needs to change (MOD-02, D-10 / 01-CONTEXT.md).

import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';

// Re-export the Report type so callers have full type safety without
// importing astro:content themselves.
export type Report = CollectionEntry<'reports'>;

/**
 * Returns all published reports sorted newest-first by publishedAt.
 * This is the primary listing query used by the publications library (Phase 2).
 */
export async function getReports(): Promise<Report[]> {
  const all = await getCollection('reports');
  return all.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

/**
 * Returns a single report by its collection entry id (the MDX filename
 * without extension, e.g. '2026-gold-report'), or undefined if not found.
 */
export async function getReport(id: string): Promise<Report | undefined> {
  return getEntry('reports', id);
}

// Re-export render so pages render MDX Content through the same seam.
// Usage: const { Content } = await render(report);
export { render };
