import type { CollectionConfig } from "payload";
import { adminFieldAccess, isAdmin, isAdminUser, isStaff } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", defaultColumns: ["email", "name", "role"] },
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
    admin: ({ req }) => isStaff({ req } as never) as boolean,
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
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      options: [
        { label: "Administrator (can publish)", value: "admin" },
        { label: "Editor (drafts only)", value: "editor" },
      ],
      // Nobody but an admin can grant or change a role, so editors cannot escalate themselves.
      access: { create: adminFieldAccess, update: adminFieldAccess },
    },
  ],
};
