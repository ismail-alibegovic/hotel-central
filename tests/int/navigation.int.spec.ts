import { describe, expect, it } from "vitest";
import type { Can } from "@/cms/admin/dashboardCards";
import { navItems } from "@/cms/admin/navItems";

const all: Can = { collection: () => true, global: () => true };
const only = (collections: string[], globals: string[] = []): Can => ({ collection: (s) => collections.includes(s), global: (s) => globals.includes(s) });
const labels = (m: ReturnType<typeof navItems>) => [...m.top.map((l) => l.label), ...m.sections.flatMap((s) => [s.label, ...s.links.map((l) => l.label)])];

describe("sidebar", () => {
  it("lists the working destinations for an administrator, in task order, with one Pages entry", () => {
    expect(labels(navItems(all, "admin"))).toEqual(["Dashboard", "Homepage", "Rooms", "Pages", "Photos & Media", "Website Settings", "Hotel Information", "Navigation", "Footer", "Team members"]);
  });

  it("does not offer Team members to an editor, and never lists Offers (no screen of its own yet)", () => {
    const editor = labels(navItems(all, "editor"));
    expect(editor).not.toContain("Team members");
    expect(editor).toContain("Hotel Information");
    for (const l of labels(navItems(all, "admin"))) expect(l).not.toMatch(/offers|new pages/i);
  });

  it("omits anything the person may not open, and the settings group when it would be empty", () => {
    expect(labels(navItems(only(["rooms"]), "editor"))).toEqual(["Dashboard", "Rooms"]);
    expect(labels(navItems(only([], ["footer"]), "editor"))).toEqual(["Dashboard", "Website Settings", "Footer"]);
  });

  it("points only at screens that exist", () => {
    const m = navItems(all, "admin");
    const hrefs = [...m.top, ...m.sections.flatMap((s) => s.links)].map((l) => l.href);
    expect(hrefs).toEqual(["/admin", "/admin/globals/homepage", "/admin/collections/rooms", "/admin/collections/pages", "/admin/collections/media", "/admin/globals/hotel-info", "/admin/globals/navigation", "/admin/globals/footer", "/admin/collections/users"]);
  });
});
