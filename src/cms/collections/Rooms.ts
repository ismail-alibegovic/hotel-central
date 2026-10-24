import type { ArrayField, CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, publishedOrStaff, staffUpdate } from "../access";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { statusNote, adminOnlyTab } from "../admin/fields";
import { seoFields } from "./seoFields";
import { revalidateAfterChange, revalidateAfterDelete } from "../hooks/revalidate";

const privileged = { create: adminFieldAccess, update: adminFieldAccess };
const list = (name: string, label: [string, string], title: string): ArrayField => ({
  name,
  type: "array",
  localized: true,
  label: title,
  labels: { singular: label[0], plural: label[1] },
  fields: [{ name: "text", type: "text", required: true, label: "Text" }],
});

/**
 * The six rooms. Text and photographs are editable (independently in bs and en). Identity and anything
 * the booking engine or layout relies on is administrator-only: URL key, eZee room-type id, size,
 * order and visibility. Empty fields fall back to the static copy in `src/content/rooms.ts`
 * (see `src/cms/overrides.ts`), so a partly translated room never renders blank.
 *
 * The form is grouped into tabs by task. Tabs without a name only group the screen: the stored fields are unchanged.
 */
export const Rooms: CollectionConfig = {
  slug: "rooms",
  labels: { singular: "Room", plural: "Rooms" },
  admin: {
    group: "Website Content",
    hideAPIURL: true,
    description: "The description, photos and amenities of each room. Open a room and work through the tabs in order.",
    useAsTitle: "name",
    defaultColumns: ["name", "visible", "_status", "updatedAt"],
    listSearchableFields: ["slug", "name"],
  },
  // The six rooms already exist; only an administrator adds one (otherwise "Add new" would leave a blank draft room behind).
  access: { read: publishedOrStaff, create: isAdmin, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish],
    afterChange: [revalidateAfterChange("rooms")],
    afterDelete: [revalidateAfterDelete("rooms")],
  },
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "1. Basic Information",
          description: "The name and short descriptions shown in the room list and at the top of the room page.",
          fields: [
            { name: "name", type: "text", localized: true, label: "Room name" },
            { name: "titleLines", type: "textarea", localized: true, label: "Large heading", admin: { description: "Each new line of text becomes a new line of the heading, for example “Junior” and then “Suite”." } },
            { name: "feature", type: "text", localized: true, label: "Main feature", admin: { description: "A few words shown above the heading, for example “King-size bed”." } },
            { name: "sizeLabel", type: "text", localized: true, label: "Room size (as text)", admin: { description: "For example “Room size 37 m²”." } },
            { name: "summary", type: "textarea", localized: true, label: "Short description", admin: { description: "One or two sentences for the room list." } },
          ],
        },
        {
          label: "2. Room Description",
          description: "The full description of the room, one paragraph at a time. Write it separately for Bosnian and English (switch the language at the top).",
          fields: [
            {
              name: "description",
              type: "array",
              localized: true,
              label: "Description",
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              admin: { description: "Add as many paragraphs as you need. Drag them to change their order." },
              fields: [{ name: "text", type: "textarea", required: true, label: "Paragraph text" }],
            },
          ],
        },
        {
          label: "3. Photos",
          description: "The photos of the room. The first photo is the main one.",
          fields: [
            {
              name: "gallery",
              type: "array",
              label: "Room photos",
              labels: { singular: "Photo", plural: "Photos" },
              admin: { description: "If you leave this empty, the current photos stay. Once you add photos, they replace the current ones (the first is the main photo). Drag to reorder." },
              maxRows: 12,
              fields: [{ name: "image", type: "upload", relationTo: "media", required: true, label: "Photo" }],
            },
          ],
        },
        {
          label: "4. Amenities",
          description: "Highlights and the list of amenities of the room.",
          fields: [
            list("highlights", ["Highlight", "Highlights"], "Highlights (short, shown in the homepage carousel)"),
            list("amenities", ["Amenity", "Amenities"], "Amenities"),
          ],
        },
        { label: "5. Google & Search Appearance", description: "How this room looks in Google search. If left empty, the standard text is used.", fields: seoFields() },
        {
          label: "6. Advanced Settings",
          description: "Administrators only. These settings affect bookings and layout, so please do not change them without a reason.",
          admin: adminOnlyTab,
          fields: [
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Page URL",
              access: { update: adminFieldAccess },
              admin: { description: "The room's fixed address on the website. It cannot be changed." },
            },
            { name: "roomTypeId", type: "text", label: "Room code in the booking system", access: { ...privileged, read: adminFieldAccess }, admin: { description: "Administrators only. The website always uses the value stored in the code." } },
            { name: "sizeM2", type: "number", min: 5, max: 500, label: "Size (m²)", access: privileged, admin: { description: "Administrators only." } },
            { name: "order", type: "number", min: 1, max: 99, index: true, label: "Position in lists", access: privileged, admin: { description: "Position in the room list and carousel (1 = first). Administrators only." } },
            { name: "visible", type: "checkbox", defaultValue: true, label: "Show on the website", access: privileged, admin: { description: "Untick to take the room off the website (lists, carousel and site map). Administrators only." } },
          ],
        },
      ],
    },
  ],
};
