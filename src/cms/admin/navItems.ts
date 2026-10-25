import type { Can, Role } from "./dashboardCards";

/**
 * The sidebar of the admin, in the order staff think about their work. Pure so the rules can be tested: a destination is listed
 * only when it exists and the signed-in person may open it. Pages created in the CMS are reached from the Pages list (one entry
 * for regular users, not two), and Offers / Hotel Information have no screen of their own yet, so they are not listed.
 */
export type NavLink = { id: string; label: string; href: string };
export type NavSection = { id: string; label: string; links: NavLink[] };
export type NavModel = { top: NavLink[]; sections: NavSection[] };

const link = (id: string, label: string, href: string): NavLink => ({ id, label, href });

export function navItems(can: Can, role: Role): NavModel {
  const top: NavLink[] = [link("dashboard", "Dashboard", "/admin")];
  if (can.global("homepage")) top.push(link("homepage", "Homepage", "/admin/globals/homepage"));
  if (can.collection("rooms")) top.push(link("rooms", "Rooms", "/admin/collections/rooms"));
  if (can.collection("pages")) top.push(link("pages", "Pages", "/admin/collections/pages"));
  else if (can.collection("custom-pages")) top.push(link("pages", "Pages", "/admin/collections/custom-pages"));
  if (can.collection("media")) top.push(link("media", "Photos & Media", "/admin/collections/media"));

  const settings: NavLink[] = [];
  if (can.global("navigation")) settings.push(link("navigation", "Navigation", "/admin/globals/navigation"));
  if (can.global("footer")) settings.push(link("footer", "Footer", "/admin/globals/footer"));
  if (role === "admin" && can.collection("users")) settings.push(link("users", "Team members", "/admin/collections/users"));

  return { top, sections: settings.length ? [{ id: "settings", label: "Website Settings", links: settings }] : [] };
}
