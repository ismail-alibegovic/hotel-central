import { describe, expect, it } from "vitest";
import { mergePlans, mergePriceList, mergeTimetable } from "@/cms/clubSpaMerge";
import { normaliseTime, timeProblem } from "@/cms/fitnessRules";
import { DaySpa } from "@/cms/globals/DaySpa";
import { FitnessClub } from "@/cms/globals/FitnessClub";
import { validateLink } from "@/cms/links";
import { builtInPriceList, getDaySpa, spaContact } from "@/content/dayspa";
import { builtInPlans, getFitness } from "@/content/fitness";

/** Shape of two values must match key-for-key (translations complete, nothing left in one language only). */
function sameShape(a: unknown, b: unknown, path = ""): string[] {
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length ? a.flatMap((x, i) => sameShape(x, b[i], `${path}[${i}]`)) : [`${path} length ${a.length} ≠ ${b.length}`];
  if (a && b && typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.join() !== kb.join()) return [`${path} keys differ`];
    return ka.flatMap((k) => sameShape((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k], `${path}.${k}`));
  }
  if (typeof a === "string" && typeof b === "string") return a.trim() && b.trim() ? [] : [`${path} empty`];
  return typeof a === typeof b ? [] : [`${path} type differs`];
}

describe("Central Fitness Club and Central Day Spa content", () => {
  it("is complete in both languages", () => {
    expect(sameShape(getFitness("en"), getFitness("bs"))).toEqual([]);
    expect(sameShape(getDaySpa("en"), getDaySpa("bs"))).toEqual([]);
    expect(sameShape(builtInPriceList("en"), builtInPriceList("bs"))).toEqual([]);
    expect(sameShape(builtInPlans("en"), builtInPlans("bs"))).toEqual([]);
  });

  it("invents no membership prices and no class times", () => {
    for (const l of ["en", "bs"] as const) {
      const annual = builtInPlans(l).find((p) => p.featured);
      expect(annual?.price).toBeUndefined();
    }
    expect(mergeTimetable(null).sessions).toEqual([]);
  });

  it("shows the verified October 2026 price list, the same prices in both languages", () => {
    const en = builtInPriceList("en");
    const bs = builtInPriceList("bs");
    expect(en.categories.flatMap((c) => c.items.map((i) => `${i.duration}|${i.price}`))).toEqual(bs.categories.flatMap((c) => c.items.map((i) => `${i.duration}|${i.price}`)));
    const relax = en.categories[0].items.filter((i) => i.name === "Relax Spa massage").map((i) => i.price);
    expect(relax).toEqual(["45 KM", "65 KM", "80 KM"]);
    expect(en.categories.find((c) => c.id === "nails")?.items.at(-1)).toEqual({ name: "Medical pedicure", duration: "60 min", price: "50–80 KM" });
  });

  it("links only to the spa's existing booking form, which editors may also use", () => {
    expect(spaContact.booking.en).toBe("https://form.lime-booking.com/en/HotelCentralSarajevo/service");
    expect(validateLink("external", spaContact.booking.bs)).toBe(true);
  });
});

describe("timetable rules", () => {
  it("accepts 24-hour times and rejects others", () => {
    expect(timeProblem("18:30", true)).toBeNull();
    expect(timeProblem("7.05", true)).toBeNull();
    expect(timeProblem("", true)).not.toBeNull();
    expect(timeProblem("", false)).toBeNull();
    expect(timeProblem("25:00", true)).not.toBeNull();
    expect(normaliseTime("7.05")).toBe("07:05");
  });

  it("sorts classes by day and time and leaves out incomplete or untranslated rows", () => {
    const t = mergeTimetable({
      month: " November 2026 ",
      sessions: [
        { day: "wed", start: "18:00", name: "Pilates" },
        { day: "mon", start: "19:00", end: "19:45", name: "HIIT", instructor: "A. B." },
        { day: "mon", start: "07:30", name: "Yoga" },
        { day: "tue", start: "10:00", name: "" }, // untranslated in this language
        { day: "xyz", start: "10:00", name: "Bad day" },
        { day: "fri", start: "lunch", name: "Bad time" },
      ],
    });
    expect(t.month).toBe("November 2026");
    expect(t.sessions.map((s) => `${s.day} ${s.start} ${s.name}`)).toEqual(["mon 07:30 Yoga", "mon 19:00 HIIT", "wed 18:00 Pilates"]);
    expect(t.sessions[1]).toMatchObject({ end: "19:45", instructor: "A. B." });
  });
});

describe("membership and price list from the CMS", () => {
  it("uses the CMS options when there are usable rows, the built-in ones otherwise", () => {
    expect(mergePlans("en", { plans: [] }).fromCms).toBe(false);
    const m = mergePlans("en", { plans: [{ name: "Monthly", price: "80 KM", period: "per month", includes: [{ text: "Gym" }, { text: "" }] }, { name: "" }] });
    expect(m.fromCms).toBe(true);
    expect(m.plans).toEqual([{ name: "Monthly", price: "80 KM", period: "per month", includes: ["Gym"] }]);
  });

  it("keeps the built-in spa list unless a category has at least one priced treatment", () => {
    expect(mergePriceList("en", { categories: [{ name: "Massages", items: [{ name: "Relax", price: "" }] }] }).fromCms).toBe(false);
    const p = mergePriceList("bs", { updated: "Novembar 2026.", categories: [{ name: "Masaže", items: [{ name: "Relax", duration: "30 min", price: "45 KM" }] }] });
    expect(p).toMatchObject({ fromCms: true, updated: "Novembar 2026.", categories: [{ name: "Masaže", items: [{ name: "Relax", duration: "30 min", price: "45 KM" }] }] });
  });

  it("the two globals follow the editors-draft / administrators-publish rules", () => {
    for (const g of [FitnessClub, DaySpa]) {
      expect(g.versions).toMatchObject({ drafts: expect.anything() });
      expect(g.hooks?.beforeOperation?.length).toBeGreaterThan(0);
      expect(g.hooks?.beforeChange?.length).toBeGreaterThan(0);
    }
  });
});
