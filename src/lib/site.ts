/**
 * Site origin and indexing policy.
 *
 * - Official domain: set NEXT_PUBLIC_SITE_URL (e.g. https://www.hotelcentral.ba). Only then,
 *   and never on a Vercel *preview* deployment, is the site indexable.
 * - Any other Vercel deployment (the *.vercel.app demo, previews) is noindexed and uses its
 *   own origin for canonical/sitemap, so it can never compete with or masquerade as the real site.
 * - Local builds fall back to the official URL (unchanged behaviour) and are indexable=false.
 *
 * Nothing here is site-wide hard-coded: launching = setting NEXT_PUBLIC_SITE_URL on production.
 */
const OFFICIAL = "https://www.hotelcentral.ba";

const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
const vercelEnv = process.env.VERCEL_ENV; // "production" | "preview" | "development" (Vercel only)
const vercelHost =
  vercelEnv === "production"
    ? (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL)
    : process.env.VERCEL_URL;

export const siteUrl = configured ?? (vercelEnv && vercelHost ? `https://${vercelHost}` : OFFICIAL);

export const indexable = Boolean(configured) && vercelEnv !== "preview";
