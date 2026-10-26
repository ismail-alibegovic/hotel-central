import type { ServerProps } from "payload";
import { navItems } from "./navItems";
import { SideNavLinks } from "./SideNavLinks";
import type { Can, Role } from "./dashboardCards";

type Perms = { collections?: Record<string, { read?: boolean } | undefined>; globals?: Record<string, { read?: boolean } | undefined> } | undefined;
const allowed = (entry: { read?: boolean } | undefined) => Boolean(entry && entry.read !== false);

/**
 * The sidebar: one short list of destinations built from the signed-in person's permissions (server side, so nothing is decided
 * in the browser). Payload's own list of collections is switched off (`admin.group: false`) and replaced by this through the
 * supported `beforeNavLinks` slot; the navigation frame, the account menu and the mobile menu are Payload's.
 */
export function SideNav(props: ServerProps) {
  const perms = props.permissions as unknown as Perms;
  const user = props.user as { role?: Role } | null | undefined;
  const role: Role = user?.role === "admin" ? "admin" : "editor";
  const can: Can = {
    collection: (slug) => allowed(perms?.collections?.[slug]),
    global: (slug) => allowed(perms?.globals?.[slug]),
  };
  return <SideNavLinks model={navItems(can, role)} />;
}
