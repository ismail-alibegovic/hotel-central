import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, publishedOrStaff, staffUpdate } from "../access";
import { blocks } from "../blocks/config";
import { blockEditorPublish, requireEditorDraft } from "../hooks/blockEditorPublish";
import { statusNote, adminOnlyTab, draftButtons } from "../admin/fields";
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
  labels: { singular: "Page", plural: "Pages" },
  admin: {
    group: false,
    hideAPIURL: true,
    description: "The pages that are already on the website (About, Spa, Restaurant…). Open a page to change its texts, photos and the order of its sections.",
    useAsTitle: "slug",
    defaultColumns: ["slug", "_status", "updatedAt"],
    components: { ...draftButtons, beforeList: ["/cms/admin/AddedPagesLink#AddedPagesLink"] },
  },
  // The seven pages exist; "Add new" would only leave a blank draft page behind, so only an administrator may add one.
  access: { read: publishedOrStaff, create: isAdmin, update: staffUpdate, delete: isAdmin },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, maxPerDoc: 25 },
  hooks: {
    beforeOperation: [requireEditorDraft],
    beforeChange: [blockEditorPublish, refuseSamplePublish],
    afterChange: [revalidateAfterChange("pages")],
    afterDelete: [revalidateAfterDelete("pages")],
  },
  fields: [
    statusNote,
    {
      type: "tabs",
      tabs: [
        {
          label: "Page Sections",
          description: "Add, remove and reorder the sections of the page. Text is written separately for each language (switch the language at the top); the order of the sections is shared.",
          fields: [{ name: "layout", type: "blocks", blocks, minRows: 1, label: "Page Sections", labels: { singular: "Section", plural: "Sections" }, admin: { description: "Each section is one part of the page. Drag sections to change their order, or open one to edit its text and photos." } }],
        },
        { label: "Google & Search Appearance", description: "How this page looks in Google search. If left empty, the standard text is used.", fields: seoFields({ socialImage: true }) },
        {
          label: "Advanced Settings",
          description: "Administrators only.",
          admin: adminOnlyTab,
          fields: [
            {
              name: "slug",
              type: "text",
              required: true,
              unique: true,
              index: true,
              label: "Page",
              // URLs are fixed by the route table; only admins may change/allocate them (prevents collisions).
              access: { update: adminFieldAccess },
              admin: { description: "The page's fixed address key, for example “spa”. It cannot be changed.", components: { Cell: "/cms/admin/PageNameCell#PageNameCell" } },
            },
          ],
        },
      ],
    },
  ],
};
