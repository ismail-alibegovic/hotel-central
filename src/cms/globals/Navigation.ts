import type { GlobalConfig, TextFieldSingleValidation } from "payload";
import { adminFieldAccess, isStaff, publishedOrStaff } from "../access";
import { blockEditorPublishGlobal, lockStructure, requireEditorDraftGlobal } from "../hooks/globalGuards";
import { adminOnlyPublish } from "./adminOnlyPublish";
import { statusNote } from "../admin/fields";
import { revalidateGlobalAfterChange } from "../hooks/revalidateGlobal";
import { validateLink } from "../links";

export const NAV_MAX_ITEMS = 12;

/**
 * Main menu (the full-screen menu and the footer "Explore" list) and the header/menu wording.
 * Wording is per language and editable by editors (as drafts). The structure — which entries exist, in what
 * order, where they lead and whether they are shown — is administrator-only. Booking links are not part of
 * this global: the "Book now" destination always comes from code.
 */
export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation (menu)",
  admin: { group: "Website Settings", hideAPIURL: true, description: "The menu entries and the wording in the header. Empty fields use the standard text.", components: adminOnlyPublish },
  // Not staffUpdate: for globals Payload evaluates update access against the stored document, which is "published", and
  // that would make the whole global read-only for editors. Editors are kept to drafts by the hooks below instead.
  access: { read: publishedOrStaff, update: isStaff },
  versions: { drafts: { autosave: { interval: 1500, showSaveDraftButton: true } }, max: 25 },
  hooks: {
    beforeOperation: [requireEditorDraftGlobal],
    beforeChange: [blockEditorPublishGlobal, lockStructure("items", ["path", "visible"], "the menu structure and destinations")],
    afterChange: [revalidateGlobalAfterChange],
  },
  fields: [
    statusNote,
    { name: "menuLabel", type: "text", localized: true, label: "Menu button", admin: { description: "e.g. “Menu”" } },
    { name: "closeLabel", type: "text", localized: true, label: "Close button", admin: { description: "e.g. “Close”" } },
    { name: "roomsLabel", type: "text", localized: true, label: "Header link to the rooms", admin: { description: "e.g. “Our rooms”" } },
    { name: "bookLabel", type: "text", localized: true, label: "Booking button", admin: { description: "The wording only. Where the button leads is fixed and cannot be changed here." } },
    { name: "skipLabel", type: "text", localized: true, label: "“Skip to content” (accessibility)" },
    { name: "languageLabel", type: "text", localized: true, label: "Language switcher label" },
    {
      name: "items",
      type: "array",
      label: "Menu entries",
      maxRows: NAV_MAX_ITEMS,
      labels: { singular: "Entry", plural: "Entries" },
      admin: { description: "Only administrators can add, remove, reorder, hide or redirect menu entries. Editors can change the wording.", initCollapsed: true },
      fields: [
        { name: "label", type: "text", localized: true, required: true, label: "Wording" },
        {
          name: "path",
          type: "text",
          localized: true,
          required: true,
          label: "Page URL",
          access: { update: adminFieldAccess, create: adminFieldAccess },
          admin: { description: "The page address without the language, e.g. /spa. “/” is the homepage. Pages you add yourself can have a different URL per language." },
          validate: ((value: string | null | undefined) => (!value ? "Enter a site path such as /spa." : validateLink("internal", value))) as TextFieldSingleValidation,
        },
        { name: "visible", type: "checkbox", defaultValue: true, label: "Show in menu", access: { update: adminFieldAccess, create: adminFieldAccess } },
      ],
    },
  ],
};

