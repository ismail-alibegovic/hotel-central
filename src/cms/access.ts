import type { Access, FieldAccess, PayloadRequest } from "payload";

/**
 * Role model (decided with the hotel owner):
 *  - admin:  full control, the only role that may publish, manage users and edit privileged fields
 *  - editor: create and edit drafts only
 * Anonymous visitors only ever see published documents.
 */
export type Role = "admin" | "editor";

type MaybeUser = (PayloadRequest["user"] & { role?: Role; collection?: string }) | null | undefined;

export const roleOf = (user: MaybeUser): Role | null =>
  user && user.collection === "users" && (user.role === "admin" || user.role === "editor") ? user.role : null;

export const isAdminUser = (user: MaybeUser) => roleOf(user) === "admin";
export const isStaffUser = (user: MaybeUser) => roleOf(user) !== null;

export const isAdmin: Access = ({ req }) => isAdminUser(req.user);
export const isStaff: Access = ({ req }) => isStaffUser(req.user);
export const adminFieldAccess: FieldAccess = ({ req }) => isAdminUser(req.user);

/** Public readers get published documents only; staff also see drafts. */
export const publishedOrStaff: Access = ({ req }) => (isStaffUser(req.user) ? true : { _status: { equals: "published" } });

/** Staff may update; editors are additionally refused outright when the request itself asks to publish (defence in depth, see blockEditorPublish). */
export const staffUpdate: Access = ({ req, data }) =>
  isStaffUser(req.user) && !(roleOf(req.user) === "editor" && (data as { _status?: string } | undefined)?._status === "published");
