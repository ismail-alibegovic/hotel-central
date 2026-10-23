import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isStaff, publishedOrStaff, staffUpdate } from "../access";
import { ctaField, imageField } from "../blocks/config";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const adminOnly = { create: adminFieldAccess, update: adminFieldAccess };

/**
 * Special offers and packages shown by the "Offers" section of any page. Text is written per language: an
 * offer that has no title in the visitor's language is not shown in that language. Nothing here changes
 * prices or availability — the button always leads to an approved destination (usually the booking engine).
 */
export const Offers: CollectionConfig = {
  slug: "offers",
  labels: { singular: "Offer", plural: "Offers" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "order", "visible", "sample", "_status", "updatedAt"] },
  access: { read: publishedOrStaff, create: isStaff, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish],
    afterChange: [revalidateAfterChange("offers")],
    afterDelete: [revalidateAfterDelete("offers")],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true, maxLength: 120 },
    { name: "summary", type: "textarea", localized: true, maxLength: 400, admin: { description: "One or two sentences." } },
    { name: "validity", type: "text", localized: true, maxLength: 120, admin: { description: "e.g. “Valid until 31 March” or “Weekends only”." } },
    imageField("image", { label: "Photograph (optional)" }),
    ctaField("cta", "Button (optional)"),
    { name: "order", type: "number", min: 1, max: 99, index: true, access: adminOnly, admin: { description: "Position in the list (1 = first). Administrators only." } },
    { name: "visible", type: "checkbox", defaultValue: true, access: adminOnly, admin: { description: "Untick to take the offer off the website without deleting it. Administrators only." } },
    {
      name: "sample",
      type: "checkbox",
      defaultValue: false,
      access: adminOnly,
      label: "Demo / sample content",
      admin: { description: "Shows a visible “Sample offer — not hotel-approved” label. Administrators only; untick once the hotel has approved the real offer." },
    },
  ],
};
