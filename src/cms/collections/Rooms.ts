import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isStaff, publishedOrStaff, staffUpdate } from "../access";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * PoC scope: one existing room (`junior-suite`). Text fields override the static room copy in
 * `src/content/rooms.ts`; images, sizes and the eZee booking mapping stay in code (booking
 * mapping is privileged and not editable by editors).
 */
export const Rooms: CollectionConfig = {
  slug: "rooms",
  admin: { useAsTitle: "slug", defaultColumns: ["slug", "_status", "updatedAt"] },
  access: { read: publishedOrStaff, create: isStaff, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish],
    afterChange: [revalidateAfterChange("rooms")],
    afterDelete: [revalidateAfterDelete("rooms")],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      access: { update: adminFieldAccess },
      admin: { description: "Existing room URL key (stable). Not editable by editors." },
    },
    {
      name: "roomTypeId",
      type: "text",
      // Privileged: maps the room to the eZee booking engine. Seeded from code; not rendered from CMS in the PoC.
      access: { create: adminFieldAccess, update: adminFieldAccess, read: adminFieldAccess },
      admin: { description: "eZee room type id (administrators only)." },
    },
    { name: "name", type: "text", localized: true },
    { name: "feature", type: "text", localized: true },
    { name: "summary", type: "textarea", localized: true },
    {
      name: "description",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
  ],
};
