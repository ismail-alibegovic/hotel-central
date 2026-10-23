import type { ArrayField, CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isStaff, publishedOrStaff, staffUpdate } from "../access";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { seoFields } from "./seoFields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const privileged = { create: adminFieldAccess, update: adminFieldAccess };
const list = (name: string, label: [string, string]): ArrayField => ({
  name,
  type: "array",
  localized: true,
  labels: { singular: label[0], plural: label[1] },
  fields: [{ name: "text", type: "text", required: true }],
});

/**
 * The six rooms. Text and photographs are editable (independently in bs and en). Identity and anything
 * the booking engine or layout relies on is administrator-only: URL key, eZee room-type id, size,
 * order and visibility. Empty fields fall back to the static copy in `src/content/rooms.ts`
 * (see `src/cms/overrides.ts`), so a partly translated room never renders blank.
 */
export const Rooms: CollectionConfig = {
  slug: "rooms",
  admin: { useAsTitle: "slug", defaultColumns: ["slug", "order", "visible", "_status", "updatedAt"], listSearchableFields: ["slug", "name"] },
  access: { read: publishedOrStaff, create: isStaff, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
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
    { name: "roomTypeId", type: "text", access: { ...privileged, read: adminFieldAccess }, admin: { description: "eZee room type id (administrators only; the website always uses the value stored in code)." } },
    { name: "sizeM2", type: "number", min: 5, max: 500, access: privileged, admin: { description: "Room size in m² (administrators only)." } },
    { name: "order", type: "number", min: 1, max: 99, index: true, access: privileged, admin: { description: "Position in lists and the carousel (1 = first). Administrators only." } },
    { name: "visible", type: "checkbox", defaultValue: true, access: privileged, admin: { description: "Untick to take the room off the website (lists, carousel, sitemap, URL answers 404). Administrators only." } },

    { name: "name", type: "text", localized: true },
    { name: "titleLines", type: "textarea", localized: true, admin: { description: "Large title, one line per row (e.g. “Junior” / “Suite”)." } },
    { name: "feature", type: "text", localized: true, admin: { description: "Short defining feature shown above the title, e.g. “King-size bed”." } },
    { name: "sizeLabel", type: "text", localized: true, admin: { description: "e.g. “Room size 37 m²”." } },
    { name: "summary", type: "textarea", localized: true },
    {
      name: "description",
      type: "array",
      localized: true,
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [{ name: "text", type: "textarea", required: true }],
    },
    list("highlights", ["Highlight", "Highlights (carousel)"]),
    list("amenities", ["Amenity", "Amenities"]),
    ...seoFields(),
    {
      name: "gallery",
      type: "array",
      labels: { singular: "Photograph", plural: "Photographs" },
      admin: { description: "Leave empty to keep the current photographs. When photographs are added, they replace the current set (first = hero)." },
      maxRows: 12,
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
  ],
};
