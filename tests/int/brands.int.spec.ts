import { describe, expect, it } from "vitest";
import { brandContact, clubLabels, spaLabels } from "@/components/brands/contact";
import { groupRows } from "@/components/dayspa/PriceList";
import { builtInSpa, mergeClub, mergeSpa } from "@/cms/brandsMerge";
import { priceProblem, timeProblem } from "@/cms/globals/Brands";
import { builtInContact } from "@/cms/hotelInfoMerge";
import { clubCopy } from "@/content/club";
import { spaCategories } from "@/content/dayspa";
import type { DaySpa, FitnessClub } from "@/payload-types";

describe("Central Day Spa price list", () => {
  it("built in: every treatment has a name in both languages and a valid price", () => {
    for (const cat of spaCategories) for (const t of cat.items) {
      expect(t.name.en.trim() && t.name.bs.trim()).toBeTruthy();
      expect(priceProblem(t.price)).toBeNull();
    }
    expect(builtInSpa("bs").categories.flatMap((c) => c.items)).toHaveLength(spaCategories.flatMap((c) => c.items).length);
  });

  it("uses the CMS list only when it has a complete entry in this language; invalid rows are left out", () => {
    const doc = {
      categories: [
        { name: "Masaže", treatments: [{ name: "Relax", duration: "30 min", price: "45" }, { name: "Bad", price: "45 KM" }, { name: "", price: "10" }] },
        { name: "", treatments: [{ name: "x", price: "1" }] },
      ],
      packages: [{ name: "Detox", price: "120", includes: [{ text: "Drenaža" }, { text: " " }] }],
    } as unknown as DaySpa;
    const m = mergeSpa("bs", doc);
    expect(m.categories).toHaveLength(1);
    expect(m.categories[0].items).toEqual([{ name: "Relax", duration: "30 min", price: "45" }]);
    expect(m.packages).toEqual([{ name: "Detox", duration: "", price: "120", includes: ["Drenaža"] }]);
    // nothing usable: the built-in list stays
    expect(mergeSpa("en", { categories: [{ name: "", treatments: [] }] } as unknown as DaySpa).categories).toEqual(builtInSpa("en").categories);
    expect(mergeSpa("en", null)).toEqual(builtInSpa("en"));
  });

  it("shows one treatment offered in several lengths as one row with several prices", () => {
    const g = groupRows([{ name: "Relax", duration: "30 min", price: "45" }, { name: "Relax", duration: "45 min", price: "65" }, { name: "Gold", duration: "60 min", price: "100" }]);
    expect(g.map((r) => [r.name, r.options.length])).toEqual([["Relax", 2], ["Gold", 1]]);
  });

  it("accepts prices as plain numbers or ranges, and times on the 24-hour clock", () => {
    for (const ok of ["45", "50–80", "50-80", "1200", "12,50"]) expect(priceProblem(ok)).toBeNull();
    for (const bad of ["45 KM", "free", "-", "€45"]) expect(priceProblem(bad)).not.toBeNull();
    for (const ok of ["07:30", "18:00", "23:59"]) expect(timeProblem(ok)).toBeNull();
    for (const bad of ["7:30", "24:00", "18h", "18.00"]) expect(timeProblem(bad)).not.toBeNull();
  });
});

describe("Central Fitness Club memberships and timetable", () => {
  const defaults = clubCopy("en").membership.defaultPlans;

  it("never invents a price: the built-in plan says “price on request”", () => {
    for (const l of ["en", "bs"] as const) for (const p of clubCopy(l).membership.defaultPlans) expect(p.price).toBeUndefined();
    expect(mergeClub(null, defaults).plans).toBe(defaults);
  });

  it("keeps valid plans and classes, drops broken ones, sorts nothing away", () => {
    const doc = {
      plans: [{ name: "Monthly", price: "90", period: "month", features: [{ text: "Gym" }] }, { name: "Odd", price: "ninety" }, { name: "" }],
      classes: [{ day: "0", time: "18:00", name: "Pilates", duration: "50 min" }, { day: "2", time: "7:30", name: "Bad time" }, { day: "9", time: "08:00", name: "Bad day" }],
      timetableNote: "  December  ",
    } as unknown as FitnessClub;
    const m = mergeClub(doc, defaults);
    expect(m.plans).toEqual([
      { name: "Monthly", price: "90", period: "month", features: ["Gym"], highlight: false },
      { name: "Odd", features: [], highlight: false },
    ]);
    expect(m.timetable.classes).toEqual([{ day: 0, time: "18:00", name: "Pilates", duration: "50 min" }]);
    expect(m.timetable.note).toBe("December");
  });
});

describe("brand contact details", () => {
  it("use a number labelled for the spa or club, otherwise the hotel's main one", () => {
    const base = builtInContact("en");
    const contact = { ...base, phones: [base.phone, { label: "Spa", display: "+387 33 000 001", href: "tel:+38733000001" }] };
    expect(brandContact(contact, spaLabels, ["spa"]).phone.display).toBe("+387 33 000 001");
    expect(brandContact(contact, clubLabels, ["gym"]).phone).toBe(base.phone);
  });
});
