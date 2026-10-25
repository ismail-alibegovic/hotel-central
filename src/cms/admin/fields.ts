import type { Field } from "payload";

/** Banner at the top of an editing form: draft or published, who publishes, and the shared BS/EN publishing note. Display only; stores nothing. */
export const statusNote: Field = {
  name: "statusNote",
  type: "ui",
  admin: { components: { Field: "/cms/admin/StatusNote#StatusNote" } },
};

/** Tab shown to administrators only. The fields inside keep their own server-side access rules. */
export const adminOnlyTab = {
  condition: (_data: unknown, _sibling: unknown, ctx: { user?: { role?: string } | null }) => ctx?.user?.role === "admin",
};

/**
 * Save and Publish buttons of the collections with drafts. "Save Changes" confirms that nothing is live yet; "Publish Changes"
 * (administrators only) first lists what will go live in each language. Both send Payload's own requests.
 */
export const draftButtons = {
  edit: {
    PublishButton: "/cms/components/PublishForAdmins#PublishForAdmins",
    SaveDraftButton: "/cms/admin/SaveChangesButton#SaveChangesButton",
  },
};
