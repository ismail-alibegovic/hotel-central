import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isAdminUser, isStaffUser } from "../access";

/**
 * Payload lets ANYONE register the first account on an empty database, and that account becomes the
 * administrator. That is a takeover window between "deployed" and "seeded", so the endpoint is closed
 * unless ALLOW_FIRST_REGISTER=true. The first admin is created with `npm run cms:seed` (SEED_ADMIN_*).
 */
const closedFirstRegister = {
  path: "/first-register",
  method: "post" as const,
  handler: () => Response.json({ errors: [{ message: "First-user registration is disabled. Seed the administrator with `npm run cms:seed`." }] }, { status: 403 }),
};

export const Users: CollectionConfig = {
  slug: "users",
  endpoints: process.env.ALLOW_FIRST_REGISTER === "true" ? [] : [closedFirstRegister],
  labels: { singular: "Team member", plural: "Team members" },
  admin: {
    group: false,
    hideAPIURL: true,
    description: "People who can edit the website. Administrators can publish changes; editors can only save changes for an administrator to publish.",
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
    // Editors only need their own account (reachable from the account menu); the list is for administrators.
    hidden: ({ user }) => (user as { role?: string } | null)?.role !== "admin",
  },
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2 h sessions
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000,
    cookies: { secure: process.env.NODE_ENV === "production", sameSite: "Lax" },
  },
  access: {
    // Payload's first-user bootstrap does not use this; after that only admins create accounts.
    create: isAdmin,
    delete: isAdmin,
    // Editors can open the admin UI but only read and change their own profile.
    admin: ({ req }) => isStaffUser(req.user),
    read: ({ req }) => (isAdminUser(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isAdminUser(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
  },
  hooks: {
    beforeChange: [
      // The very first account becomes the administrator; later accounts default to editor.
      async ({ data, operation, req }) => {
        if (operation !== "create") return data;
        const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
        return { ...data, role: totalDocs === 0 ? "admin" : (data.role ?? "editor") };
      },
    ],
  },
  fields: [
    { name: "name", type: "text", label: "Full name" },
    {
      name: "role",
      type: "select",
      required: true,
      label: "Role",
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Administrator (can publish changes)", value: "admin" },
        { label: "Editor (can save changes, cannot publish)", value: "editor" },
      ],
      // Nobody but an admin can grant or change a role, so editors cannot escalate themselves.
      access: { create: adminFieldAccess, update: adminFieldAccess },
    },
  ],
};
