"use client";

import { Link, useAuth } from "@payloadcms/ui";

/**
 * Under the list of the built-in pages: where to find the pages that were added later. Staff see one "Pages" entry in the sidebar,
 * and this is the way from it to the second list.
 */
export function AddedPagesLink() {
  const { permissions } = useAuth();
  const entry = (permissions as { collections?: Record<string, { read?: boolean } | undefined> } | null | undefined)?.collections?.["custom-pages"];
  if (!entry || entry.read === false) return null;
  return (
    <p className="hc-addedpages" data-hc-added-pages>
      Looking for a page that was added later (for example an offers page)? <Link href="/admin/collections/custom-pages">Open added pages</Link>
    </p>
  );
}
