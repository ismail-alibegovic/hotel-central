import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isStaff, publishedOrStaff, staffUpdate } from "../access";
import { blocks } from "../blocks/config";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { seoFields } from "./seoFields";
import { refuseSamplePublish } from "../hooks/sampleGuard";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

/**
 * Existing pages (about, rooms, spa, restaurant, meetings-events, location, contact) as editable
 * block layouts. Blocks map 1:1 onto existing Hotel Central components, so editors can change copy,
 * photographs, order and which sections appear without being able to break the design. A page with
 * no CMS document (or no usable blocks in the visitor's language) renders its static layout.
 */
export const Pages: CollectionConfig = {
  slug: "pages",
  admin: { useAsTitle: "slug", defaultColumns: ["slug", "_status", "updatedAt"] },
  access: { read: publishedOrStaff, create: isStaff, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish, refuseSamplePublish],
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
      admin: { description: "Existing route key, e.g. “spa”. Not editable by editors." },
    },
    ...seoFields({ socialImage: true }),
    { name: "layout", type: "blocks", blocks, minRows: 1, label: "Page sections", admin: { description: "Add, remove and reorder sections. Text is edited per language (switch language at the top); the section structure is shared." } },
  ],
};
