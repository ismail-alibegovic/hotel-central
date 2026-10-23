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
