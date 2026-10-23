import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isStaff, publishedOrStaff, staffUpdate } from "../access";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * PoC scope: one existing page (`about`) is editable. Fields override matching static copy in
 * `src/content/pages.ts`; empty fields fall back to the static text, so rendering never breaks.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "slug", defaultColumns: ["slug", "_status", "updatedAt"] },
  access: { read: publishedOrStaff, create: isStaff, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish],
    afterChange: [revalidateAfterChange("pages")],
    afterDelete: [revalidateAfterDelete("pages")],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      // URLs are fixed by the route table; only admins may change/allocate them (prevents collisions).
      access: { update: adminFieldAccess },
      admin: { description: "Existing route key, e.g. “about”. Not editable by editors." },
    },
    { name: "metaTitle", type: "text", localized: true },
    { name: "metaDescription", type: "textarea", localized: true },
    { name: "heroEyebrow", type: "text", localized: true },
    { name: "heroTitle", type: "textarea", localized: true, admin: { description: "One headline line per row." } },
    { name: "heroIntro", type: "textarea", localized: true },
  ],
};
