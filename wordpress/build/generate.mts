/**
 * Builds the WordPress + Elementor (free) version of the site from the same content as the Next.js site.
 *   npx tsx wordpress/build/generate.mts   →   wordpress/plugin/hotel-central-setup/data/site.json
 * The importer (wordpress/plugin/hotel-central-setup) turns site.json into pages, menus, media and settings.
 */
import fs from "node:fs";
import path from "node:path";
import { CLUB_BOOKING_URL, classInfo, classTypes, clubCopy, defaultClasses } from "../../src/content/club";
import { clientCopy } from "../../src/content/clientCopy";
import { faqSections } from "../../src/content/faq";
import { DAYSPA_BOOKING_URL, daySpaCopy, spaCategories, spaPackages } from "../../src/content/dayspa";
import { getDictionary } from "../../src/content/dictionary";
import { booking, hotel } from "../../src/content/hotel";
import { getPages } from "../../src/content/pages";
import { rooms } from "../../src/content/rooms";
import { accordion, box, button, gallery, heading, image, lines, list, map, page, paras, resetIds, shortcode, text, type El } from "./el.mts";

type Lang = "en" | "bs";
const LANGS: Lang[] = ["en", "bs"];
const L = <T,>(en: T, bs: T) => ({ en, bs });
const x = clientCopy;
const root = path.resolve(import.meta.dirname, "../..");

/* ─────────────────────────── Copy that exists only on the WordPress site (client change list) ─────────────────────────── */

/* ─────────────────────────── Shared hotel sections ─────────────────────────── */

const img = (p: string) => p.replace(/^\/?images\//, "images/");
/** A note for the people editing the site: shown only to logged-in users (and in the Elementor editor), never to guests. */
const editorNote = (t: string) => text(`<p>${t}</p>`, "hc-editor-note");
const btn = (label: string, url: string, variant = "") => button(label, url, `hc-btn ${variant}`.trim());

function hero(bg: string, eyebrow: string, title: string[], intro?: string, ctas: El[] = []): El {
  return box("hc-hero", [box("hc-hero__inner", [heading(eyebrow, "p", "hc-eyebrow"), heading(lines(title), "h1", `hc-hero__title${title.join(" ").length > 28 ? " hc-hero__title--long" : ""}`), ...(intro ? [text(`<p>${intro}</p>`, "hc-hero__intro")] : []), ...(ctas.length ? [box("hc-btns", ctas, { row: true })] : [])])], { bg });
}

/** The light hero of the café and the restaurant: the photograph in its own colours, only the title over it. */
function heroNatural(bg: string, eyebrow: string, title: string[], cls = ""): El {
  return box(`hc-hero hc-hero--natural ${cls}`.trim(), [box("hc-hero__inner", [heading(eyebrow, "p", "hc-eyebrow"), heading(lines(title), "h1", "hc-hero__title")])], { bg });
}

function split(o: { label: string; title: string[]; body: string[]; images: string[]; tone?: string; reverse?: boolean; ctas?: El[]; extra?: El[]; anchor?: string }): El {
  return box(
    `hc-split hc-tone-${o.tone ?? "ivory"}${o.reverse ? " is-reverse" : ""}`,
    [
      box(o.images.length > 1 ? "hc-split__media" : "hc-split__media is-single", o.images.map((p, i) => image(img(p), i ? "hc-split__img-b" : "hc-split__img-a"))),
      box("hc-split__text", [heading(o.label, "p", "hc-eyebrow"), heading(lines(o.title), "h2", "hc-display"), paras(o.body, "hc-body"), ...(o.extra ?? []), ...(o.ctas?.length ? [box("hc-btns", o.ctas, { row: true })] : [])]),
    ],
    { row: true, anchor: o.anchor },
  );
}

const facts = (items: { k: string; v: string }[], cls = "") => text(`<dl class="hc-facts">${items.map((f) => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join("")}</dl>`, cls);

/** CH-030: a bright, welcoming photograph by default (it used to be the façade at night). */
function finalBooking(lang: Lang, bg = "images/home/facade-warm.jpg"): El {
  const f = getDictionary(lang).home.final;
  return box("hc-final", [box("hc-final__inner", [heading(f.label, "p", "hc-eyebrow"), heading(lines(f.title), "h2", "hc-display"), text(`<p>${f.body}</p>`, "hc-body"), btn(f.cta, booking.bookingUrl, "hc-btn--solid")])], { bg });
}

/* ─────────────────────────── Pages ─────────────────────────── */

const parseFaq = (lang: Lang) => faqSections[lang].map((sec) => ({ title: sec.title, items: sec.items.map((i) => ({ q: i.q, a: i.a.join("</p><p>") })) }));

type PageDef = { key: string; brand: "hotel" | "spa" | "club"; parent?: string; slug: Record<Lang, string>; title: Record<Lang, string>; description: Record<Lang, string>; build: (lang: Lang) => El[]; front?: boolean };
const pages: PageDef[] = [];
const add = (p: PageDef) => pages.push(p);

const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "dj").replace(/Đ/g, "dj").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const roomSlug = (r: (typeof rooms)[number], lang: Lang) => (lang === "en" ? r.slug : slugify(r.name.bs));

// Home
add({
  key: "home", brand: "hotel", front: true, slug: L("home", "pocetna"), title: L("Home", "Početna"),
  description: L(getDictionary("en").meta.description, getDictionary("bs").meta.description),
  build: (lang) => {
    const d = getDictionary(lang).home;
    const u = x.ui[lang];
    const b = x.homeBrands[lang];
    return [
      box("hc-hero hc-hero--home", [box("hc-hero__inner", [heading(d.heroLabel, "p", "hc-eyebrow"), heading(lines(d.heroTitle), "h1", "hc-hero__title"), text(`<p>${d.heroTagline}</p><p class="hc-small">${d.heroNote}</p>`, "hc-hero__intro"), box("hc-btns", [btn(u.bookStay, booking.bookingUrl, "hc-btn--solid"), btn(u.rooms, page("rooms"), "hc-btn--light")], { row: true })])], { bg: "images/home/facade-warm.jpg" }), // CH-023: the bright, warm façade
      box("hc-intro", [
        box("hc-intro__head", [heading(d.hotel.metaRightSub, "p", "hc-eyebrow"), heading(lines(d.hotel.title), "h2", "hc-display hc-display--xl")]),
        box("hc-intro__photos", [image("images/hc26-lobby-windows.jpg"), image("images/hc26-facade-entrance.jpg"), image("images/hc26-cafe-corner.jpg")], { row: true }),
        box("hc-intro__foot", [text(`<p>${d.hotel.body}</p>`, "hc-body"), btn(d.hotel.cta, page("about"))], { row: true }),
      ]),
      box("hc-roomgrid", [
        box("hc-section-head", [heading(d.rooms.metaCenter.replace(/[()]/g, ""), "p", "hc-eyebrow"), heading(u.rooms, "h2", "hc-display"), text(`<p>${d.rooms.body}</p>`, "hc-body")]),
        box("hc-cards", rooms.map((r) => box("hc-card", [image(img(r.images[0].src), "hc-card__img"), heading(r.name[lang], "h3", "hc-card__title"), text(`<p>${r.sizeLabel[lang]}</p>`, "hc-card__meta"), button(u.view, page(`room-${r.slug}`), "hc-link")])), { row: true }),
      ]),
      box("hc-brands", [
        box("hc-section-head", [heading(b.eyebrow, "p", "hc-eyebrow"), heading(lines(b.title), "h2", "hc-display"), text(`<p>${b.body}</p>`, "hc-body")]),
        box("hc-doors", [
          box("hc-door hc-door--club", [image("brand/cfc-white.png", "hc-door__logo"), heading(d.spa.club.name, "h3", "hc-door__title"), text(`<p>${d.spa.club.body}</p>`, "hc-door__body"), btn(d.spa.club.cta, page("club"), "hc-btn--light")], { bg: "images/club/feel-your-power.jpg" }),
          box("hc-door hc-door--spa", [image("brand/dayspa-on-dark.png", "hc-door__logo"), heading(d.spa.dayspa.name, "h3", "hc-door__title"), text(`<p>${d.spa.dayspa.body}</p>`, "hc-door__body"), btn(d.spa.dayspa.cta, page("dayspa"), "hc-btn--light")], { bg: "images/dayspa/treatment-room.jpg" }),
        ], { row: true }),
      ]),
      // CH-022: Central Café (no restaurant), with catering on request.
      split({ label: d.restaurant.metaLeft, title: d.restaurant.title, body: [d.restaurant.body, d.restaurant.body2], images: ["images/hc26-cafe-corner.jpg", "images/dorucak6.jpg"], ctas: [btn(d.restaurant.cta, page("cafe"))] }),
      // CH-005: meetings & events before location.
      split({ label: d.events.metaLeft, title: d.events.title, body: [d.events.body], images: ["images/hc26-conference.jpg", "images/hc26-conference-foyer.jpg"], tone: "sage", reverse: true, ctas: [btn(d.events.cta, page("conference"))] }),
      box("hc-location", [
        box("hc-location__text", [heading(d.location.metaLeft, "p", "hc-eyebrow"), heading(lines(d.location.title), "h2", "hc-display"), text(`<p>${d.location.body}</p>`, "hc-body"), facts(x.locationFacts[lang]), btn(d.location.cta, page("location"))]),
        map(hotel.street + ", " + hotel.postalCode + " " + hotel.city, "hc-location__map"),
      ], { row: true }),
      finalBooking(lang),
    ];
  },
});

// About
add({
  key: "about", brand: "hotel", slug: L("about", "o-nama"), title: L("About", "O nama"),
  description: L(getPages("en").about.meta.description, getPages("bs").about.meta.description),
  build: (lang) => {
    const a = getPages(lang).about;
    const r = x.aboutRooms[lang];
    return [
      hero("images/hc26-facade-sky.jpg", a.hero.eyebrow, a.hero.title, a.hero.intro),
      split({ label: a.story.label.replace(/^\(\d+\)\s*/, ""), title: a.story.title, body: a.story.body, images: ["images/hc26-facade-entrance.jpg", "images/hc26-lobby.jpg"], extra: [facts(a.facts)] }),
      split({ label: a.rooms.label.replace(/^\(\d+\)\s*/, ""), title: r.title, body: r.body, images: ["images/hc26-bed.jpg", "images/hc26-room-door.jpg"], tone: "sage", reverse: true, ctas: [btn(a.rooms.cta, page("rooms"))] }),
      split({ label: a.wellness.label.replace(/^\(\d+\)\s*/, ""), title: a.wellness.title, body: a.wellness.body, images: ["images/hc26-pool-lanes.jpg", "images/hc26-dayspa-relax.jpg"], tone: "olive", ctas: [btn("Central Fitness Club", page("club"), "hc-btn--light"), btn("Central Day Spa", page("dayspa"), "hc-btn--light")] }),
      // CH-029: "Good to know" is the FAQ itself, opened in place (no café teaser).
      box("hc-faq hc-faq--about", [heading("FAQ", "p", "hc-eyebrow"), heading(lang === "en" ? "Good to know" : "Dobro je znati", "h2", "hc-display"), accordion(parseFaq(lang).flatMap((sec) => sec.items), "hc-accordion")], { anchor: "faq" }),
      box("hc-gallery", [gallery(["images/hc26-lounge-window.jpg", "images/hc26-lobby-entrance.jpg", "images/hc26-stairs.jpg", "images/hc26-corridor.jpg", "images/p05.jpg", "images/hc26-keycard.jpg", "images/hc26-room-desk.jpg", "images/hc26-doormat.jpg"])]),
      finalBooking(lang, "images/hc26-lobby.jpg"),
    ];
  },
});

// Central Café (CH-007), with the restaurant folded in: drinks, sweet treats and catering on request (CH-022)
add({
  key: "cafe", brand: "hotel", parent: "about", slug: L("cafe", "central-cafe"), title: L("Central Café", "Central Café"),
  description: L(getPages("en").cafe.meta.description, getPages("bs").cafe.meta.description),
  build: (lang) => {
    const c = x.cafe[lang];
    const k = getPages(lang).cafe.catering;
    return [
      heroNatural("images/hc26-cafe-corner.jpg", "Hotel Central · Ćumurija 8", ["Central", "Café"], "is-cafe"),
      split({ label: c.title, title: [c.offerTitle], body: c.body, images: ["images/hc26-cafe-guest.jpg"], extra: [list(c.offer.map((t) => ({ text: t })), "hc-list"), heading(c.hoursTitle, "h3", "hc-subhead"), shortcode('[hc_hours place="cafe"]', "hc-hours")] }),
      split({ label: k.label.replace(/^\(\d+\)\s*/, ""), title: k.title, body: k.body, images: ["images/dorucak4.jpg", "images/dorucak6.jpg"], tone: "olive", reverse: true, ctas: [btn(k.cta, `mailto:${hotel.email}?subject=${encodeURIComponent(k.cta)}`, "hc-btn--light"), btn(k.events, page("conference"), "hc-btn--light")] }),
      box("hc-gallery", [gallery(["images/hc26-cafe-window.jpg", "images/hc26-lobby-lounge.jpg", "images/hc26-lobby-windows.jpg", "images/hc26-lobby.jpg"])]),
      finalBooking(lang, "images/hc26-lobby-windows.jpg"),
    ];
  },
});

// FAQ (from the hotel's own FAQ page)
add({
  key: "faq", brand: "hotel", parent: "about", slug: L("faq", "cesta-pitanja"), title: L("FAQ", "Česta pitanja"),
  description: L("Answers about Hotel Central Sarajevo: check-in, breakfast, parking, Central Fitness Club, Central Day Spa and the café.", "Odgovori o Hotelu Central Sarajevo: prijava, doručak, parking, Central Fitness Club, Central Day Spa i kafić."),
  build: (lang) => [
    hero("images/hc26-reception.jpg", x.faq[lang].eyebrow, [x.faq[lang].title]),
    box("hc-faq", parseFaq(lang).map((s) => box("hc-faq__group", [heading(s.title, "h2", "hc-subhead"), accordion(s.items, "hc-accordion")]))),
  ],
});

// Rooms
add({
  key: "rooms", brand: "hotel", slug: L("rooms", "sobe"), title: L("Rooms & Suites", "Sobe i apartmani"),
  description: L(getPages("en").rooms.meta.description, getPages("bs").rooms.meta.description),
  build: (lang) => {
    const r = getPages(lang).rooms;
    const u = x.ui[lang];
    return [
      hero("images/hc26-bed.jpg", r.hero.eyebrow, r.hero.title, x.roomsIntro[lang], [btn(u.book, booking.bookingUrl, "hc-btn--solid")]),
      box("hc-roomlist", rooms.map((room, i) =>
        split({ label: room.sizeLabel[lang], title: [room.name[lang]], body: [room.summary[lang]], images: [img(room.images[0].src), img((room.images[1] ?? room.images[0]).src)], tone: i % 2 ? "sage" : "ivory", reverse: i % 2 === 1, ctas: [btn(u.view, page(`room-${room.slug}`)), btn(u.bookRoom, booking.roomUrl(room.roomTypeId), "hc-btn--solid")] }),
      )),
    ];
  },
});

for (const room of rooms) {
  add({
    key: `room-${room.slug}`, brand: "hotel", parent: "rooms", slug: L(roomSlug(room, "en"), roomSlug(room, "bs")), title: L(room.name.en, room.name.bs),
    description: L(room.summary.en, room.summary.bs),
    build: (lang) => {
      const u = x.ui[lang];
      const others = rooms.filter((o) => o.slug !== room.slug);
      return [
        hero(img(room.images[0].src), room.sizeLabel[lang], [room.name[lang]], room.feature[lang], [btn(u.bookRoom, booking.roomUrl(room.roomTypeId), "hc-btn--solid")]),
        box("hc-room", [
          box("hc-room__text", [paras(room.description[lang], "hc-body hc-body--lg")]),
          box("hc-room__amenities", [heading(u.amenities, "h2", "hc-subhead"), list(room.amenities[lang].map((t) => ({ text: t })), "hc-list hc-list--cols")]),
        ], { row: true }),
        box("hc-gallery", [gallery(room.images.map((i) => img(i.src)), "", 3)]),
        box("hc-roomgrid hc-roomgrid--small", [heading(u.other, "h2", "hc-subhead"), box("hc-cards", others.map((o) => box("hc-card", [image(img(o.images[0].src), "hc-card__img"), heading(o.name[lang], "h3", "hc-card__title"), button(u.view, page(`room-${o.slug}`), "hc-link")])), { row: true })]),
        finalBooking(lang),
      ];
    },
  });
}

// Restaurant: no page of its own any more (CH-022); the café page under About covers drinks and catering.

// Meetings & events (CH-014)
add({
  key: "conference", brand: "hotel", slug: L("conference", "konferencije"), title: L("Meetings & Events", "Sastanci i događaji"),
  description: L(getPages("en").events.meta.description, getPages("bs").events.meta.description),
  build: (lang) => {
    const e = getPages(lang).events;
    const c = x.conference[lang];
    const mail = `mailto:${hotel.email}?subject=${encodeURIComponent(lang === "en" ? "Meeting / event enquiry" : "Upit za sastanak / događaj")}`;
    return [
      hero("images/hc26-conference.jpg", e.hero.eyebrow, e.hero.title, e.hero.intro, [btn(c.ctaMail, mail, "hc-btn--solid"), btn(`${c.ctaCall} ${hotel.phoneDisplay}`, hotel.phoneHref, "hc-btn--light")]),
      split({ label: e.room.label.replace(/^\(\d+\)\s*/, ""), title: e.room.title, body: e.room.body, images: ["images/hc26-conference-u.jpg", "images/hc26-conference-foyer.jpg"], extra: [facts(e.facts)] }),
      box("hc-offer", [heading(c.offerTitle, "h2", "hc-display"), box("hc-offer__cards", c.offer.map((o) => box("hc-offer__card", [heading(o.t, "h3", "hc-card__title"), text(`<p>${o.d}</p>`, "hc-body")])), { row: true }), text(`<p>${c.offerNote}</p>`, "hc-small")]),
      box("hc-cta-band", [heading(lines([c.ctaTitle]), "h2", "hc-display"), text(`<p>${c.ctaBody}</p>`, "hc-body"), box("hc-btns", [btn(c.ctaMail, mail, "hc-btn--solid"), btn(`${c.ctaCall} ${hotel.phoneDisplay}`, hotel.phoneHref, "hc-btn--light")], { row: true })], { bg: "images/hc26-conference.jpg" }),
    ];
  },
});

// Location (CH-015)
add({
  key: "location", brand: "hotel", slug: L("location", "lokacija"), title: L("Location", "Lokacija"),
  description: L(getPages("en").location.meta.description, getPages("bs").location.meta.description),
  build: (lang) => {
    const l = getPages(lang).location;
    return [
      hero("images/hc26-street-view.jpg", l.hero.eyebrow, l.hero.title, l.hero.intro),
      box("hc-transport", [heading(l.arrive, "h2", "hc-display"), box("hc-transport__grid", x.transport[lang].map((t) => box("hc-transport__item", [heading(t.title, "h3", "hc-card__title"), text(`<p>${t.body}</p>`, "hc-body")])), { row: true })]),
      split({ label: l.walk.label.replace(/^\(\d+\)\s*/, ""), title: l.walk.title, body: [lang === "en" ? "Sarajevo suits the walker. We're in the city centre and almost all sights are within walking distance." : "Sarajevo je grad za šetnju. Nalazimo se u centru i skoro sve znamenitosti su na pješačkoj udaljenosti.", l.walk.body[1]], images: ["images/hc26-facade-sky.jpg", "images/hc26-cafe-window.jpg"], tone: "sage", extra: [heading(l.nearby, "h3", "hc-subhead"), list(l.landmarks.slice(0, 3).map((t) => ({ text: t })), "hc-list")] }),
      box("hc-mapband", [map(`${hotel.name}, ${hotel.street}, ${hotel.postalCode} ${hotel.city}`, "hc-map")]),
    ];
  },
});

// Contact (CH-016, CH-017)
add({
  key: "contact", brand: "hotel", slug: L("contact", "kontakt"), title: L("Contact", "Kontakt"),
  description: L(getPages("en").contact.meta.description, getPages("bs").contact.meta.description),
  build: (lang) => {
    const c = x.contact[lang];
    const u = x.ui[lang];
    const card = (title: string, body: string, rows: El[]) => box("hc-contact__card", [heading(title, "h3", "hc-card__title"), text(`<p>${body}</p>`, "hc-body"), ...rows]);
    return [
      hero("images/hc26-reception.jpg", lang === "en" ? "Contact" : "Kontakt", c.title, c.intro, [btn(`${u.call} ${hotel.phoneDisplay}`, hotel.phoneHref, "hc-btn--solid"), btn(hotel.email, `mailto:${hotel.email}`, "hc-btn--light")]),
      box("hc-contact", [
        card(c.reception, c.receptionBody, [shortcode("[hc_contact what=phone]", "hc-contact__line"), shortcode("[hc_contact what=email]", "hc-contact__line"), btn(u.book, booking.bookingUrl, "hc-btn--solid")]),
        card(c.events, c.eventsBody, [shortcode("[hc_contact what=email]", "hc-contact__line"), btn(lang === "en" ? "Meetings & events" : "Sastanci i događaji", page("conference"))]),
        card(c.spa, c.spaBody, [shortcode("[hc_contact what=spa_phone]", "hc-contact__line"), shortcode("[hc_contact what=spa_email]", "hc-contact__line"), shortcode('[hc_hours place="spa"]', "hc-contact__line"), btn("Central Day Spa", page("dayspa"))]),
        card(c.club, c.clubBody, [shortcode("[hc_contact what=club_phone]", "hc-contact__line"), btn("Central Fitness Club", page("club"))]),
        card(c.social, "", [shortcode("[hc_social]", "hc-contact__line")]),
      ], { row: true }),
      box("hc-mapband", [map(`${hotel.name}, ${hotel.street}, ${hotel.postalCode} ${hotel.city}`, "hc-map")]),
    ];
  },
});

// Privacy (CH-020)
add({
  key: "privacy", brand: "hotel", slug: L("privacy-policy", "politika-privatnosti"), title: L("Privacy policy", "Politika privatnosti"),
  description: L("How Hotel Central Sarajevo handles personal data.", "Kako Hotel Central Sarajevo postupa s ličnim podacima."),
  build: (lang) => [box("hc-legal", [heading(x.privacy[lang].title, "h1", "hc-display"), paras(x.privacy[lang].body, "hc-body hc-body--lg")])],
});

/* ─────────────────────────── Central Day Spa ─────────────────────────── */

const dsBtn = (label: string, url: string, variant = "") => button(label, url, `ds-btn ${variant}`.trim());
add({
  key: "dayspa", brand: "spa", slug: L("dayspa", "day-spa"), title: L("Central Day Spa", "Central Day Spa"),
  description: L(daySpaCopy("en").meta.description, daySpaCopy("bs").meta.description),
  build: (lang) => {
    const c = daySpaCopy(lang);
    const book = DAYSPA_BOOKING_URL.replace("/en/", `/${lang}/`);
    const min = (items: { price: string }[]) => Math.min(...items.map((i) => parseFloat(i.price)).filter((n) => !Number.isNaN(n)));
    return [
      box("ds-hero", [
        box("ds-hero__text", [heading(c.hero.eyebrow, "p", "ds-eyebrow"), heading(`${c.hero.title[0]}<br><em>${c.hero.title[1]}</em>`, "h1", "ds-hero__title"), box("ds-btns", [dsBtn(c.hero.cta, book, "ds-btn--light"), dsBtn(c.hero.prices, "#prices", "ds-btn--ghost")], { row: true })]),
        box("ds-glass", [heading(c.hero.perkBig, "p", "ds-glass__big"), box("ds-glass__text", [heading(c.hero.perkTitle, "p", "ds-glass__title"), text(`<p>${c.hero.perkBody}</p>`, "ds-glass__body")]), button("Central Fitness Club →", page("club"), "ds-glass__link")], { row: true }),
      ], { bg: "images/dayspa/guest-robe.jpg" }),
      box("ds-about", [
        box("ds-about__media", [image("images/dayspa/salt-lamp.jpg", "ds-fill"), image("images/dayspa/relax-room.jpg", "ds-fill")]),
        box("ds-about__text", [heading(c.about.label, "p", "ds-eyebrow"), heading(c.about.title, "h2", "ds-title"), text(`<p>${c.about.body}</p>`, "ds-muted"), list(c.about.features.map((f) => ({ text: `<strong>${f.title}</strong> — ${f.body}` })), "ds-features"), dsBtn(c.about.cta, book)]),
      ], { row: true, anchor: "about" }),
      box("ds-band", [heading(c.services.label, "p", "ds-eyebrow"), heading(lines(c.services.title), "h2", "ds-title")], { anchor: "treatments" }),
      box("ds-services", spaCategories.map((cat) => box("ds-service", [image(img(cat.image), "ds-service__img"), heading(`${c.services.from} ${min(cat.items)} KM`, "p", "ds-price-tag"), heading(cat.name[lang], "h3", "ds-service__title"), text(`<p>${cat.summary[lang]}</p>`, "ds-muted"), dsBtn(c.services.view, "#prices")])), { row: true }),
      box("ds-prices", [
        box("ds-prices__head", [box("ds-prices__intro", [heading(c.prices.label, "p", "ds-eyebrow"), heading(c.prices.title, "h2", "ds-title")]), text(`<p>${c.prices.intro}</p>`, "ds-muted")], { row: true }),
        text(`<nav class="ds-pricenav" aria-label="${c.prices.label}">${spaCategories.map((cat, i) => `<a href="#prices-${cat.id}"><span>${String(i + 1).padStart(2, "0")}</span>${cat.name[lang]}</a>`).join("")}</nav>`, "ds-pricenav-wrap"),
        ...spaCategories.map((cat) => box("ds-pricecat", [heading(cat.name[lang], "h3", "ds-pricecat__title"), text(`<p>${cat.summary[lang]}</p>`, "ds-pricecat__summary"), ...cat.items.map((t) => box("ds-row", [heading(t.name[lang] + (t.note ? `<small>${t.note[lang]}</small>` : ""), "p", "ds-row__name"), heading(t.duration ?? "", "p", "ds-row__dur"), heading(`${t.price} KM`, "p", "ds-row__price")], { row: true }))], { anchor: `prices-${cat.id}` })),
      ], { anchor: "prices" }),
      box("ds-packages", [heading(c.packages.label, "p", "ds-eyebrow"), heading(c.packages.title, "h2", "ds-title"), box("ds-packages__grid", spaPackages.map((p, i) => box(`ds-package${i === 1 ? " is-featured" : ""}`, [...(i === 1 ? [heading(c.packages.popular, "p", "ds-package__badge")] : []), heading(p.name[lang], "h3", "ds-package__name"), heading(`${p.price} KM <small>/ ${p.duration}</small>`, "p", "ds-package__price"), list(p.includes.map((t) => ({ text: t[lang] })), "ds-ticks"), dsBtn(c.packages.book, book, i === 1 ? "ds-btn--light" : "")])), { row: true })], { anchor: "packages" }),
      box("ds-members", [heading(ig[lang].members.eyebrow, "p", "ds-eyebrow"), heading(ig[lang].members.title, "h2", "ds-title"), text(`<p>${ig[lang].members.body}</p>`, "ds-members__body"), editorNote(ig[lang].members.note),
        box("ds-members__grid", ig[lang].members.items.map((m) => box("ds-member", [heading(m.name, "h3", "ds-member__name"), text(`<p>${m.what}</p>`, "ds-member__what"), heading(`${m.price} KM`, "p", "ds-member__price")])), { row: true }),
        dsBtn(c.hero.cta, book, "ds-btn--light")], { anchor: "members" }),
      box("ds-why", [
        box("ds-why__text", [heading(c.why.label, "p", "ds-eyebrow"), heading(c.why.title, "h2", "ds-title"), text(`<p>${c.why.body}</p>`, "ds-muted"), list(c.why.ticks.map((t) => ({ text: t })), "ds-ticks ds-ticks--grid"), heading(c.footer.hours, "h3", "ds-subhead"), shortcode('[hc_hours place="spa"]', "ds-hours"), dsBtn(c.hero.cta, book)]),
        box("ds-why__media", [image("images/dayspa/serum-drop.jpg", "ds-fill"), image("images/dayspa/maderotherapy-tools.jpg", "ds-fill"), image("images/dayspa/corridor.jpg", "ds-fill ds-why__wide")], { row: true }),
      ], { row: true }),
      box("ds-gallery", [gallery(["images/dayspa/treatment-room.jpg", "images/dayspa/relax-lounger.jpg", "images/dayspa/candle.jpg", "images/dayspa/relax-lamp.jpg", "images/dayspa/facial-room.jpg", "images/dayspa/balneo-room.jpg", "images/dayspa/yin-yang.jpg", "images/dayspa/products.jpg"], "", 4)]),
      box("ds-cta", [heading(c.cta.eyebrow, "p", "ds-eyebrow"), heading(c.cta.title, "h2", "ds-title"), box("ds-btns", [dsBtn(c.cta.book, book, "ds-btn--light"), shortcode("[hc_contact what=spa_phone style=button]", "ds-cta__phone"), shortcode("[hc_contact what=spa_email style=button]", "ds-cta__phone")], { row: true })], { bg: "images/dayspa/massage-room-oil.jpg", anchor: "book" }),
    ];
  },
});

/* ─────────────────────────── Central Fitness Club ─────────────────────────── */

const cfcBtn = (label: string, url: string, variant = "") => button(label, url, `cfc-btn ${variant}`.trim());
const clubBook = (lang: Lang) => CLUB_BOOKING_URL.replace("/en/", `/${lang}/`);

/* From the club's and the spa's Instagram (checked 2026-11-20): members' treatments, the Sunday Running Club, online class booking. */
const ig = L(
  {
    bookClass: "Book a class online",
    members: { eyebrow: "For Central Fitness Club members", title: "Members' treatments", body: "Recovery made for training days, at member prices. Show your membership card when you book.", items: [{ name: "Express Recovery", what: "30-minute massage", price: "30" }, { name: "Heat & Reset", what: "Iyashi Dome session and a massage", price: "45" }, { name: "Central Recovery", what: "Cupping therapy and a massage", price: "60" }], note: "Check these treatments and prices against the current members' offer before publishing.", club: "Members' treatments at Central Day Spa, from 30 KM" },
    run: { eyebrow: "Sunday Running Club", title: "Run with us", body: "Every Sunday the club runs together. Meet at 9:30, start at 10:00. Free for everyone who joins, members or not.", facts: [{ k: "Meet", v: "Sunday, 9:30" }, { k: "Start", v: "10:00" }, { k: "Price", v: "Free" }], cta: "Dates on Instagram" },
    timetable: { title: "Book your class online", body: "See this week's classes and book your place online, or call the club." },
  },
  {
    bookClass: "Rezervišite čas online",
    members: { eyebrow: "Za članove Central Fitness Cluba", title: "Tretmani za članove", body: "Oporavak za dane treninga, po cijenama za članove. Pokažite člansku kartu pri rezervaciji.", items: [{ name: "Express Recovery", what: "Masaža od 30 minuta", price: "30" }, { name: "Heat & Reset", what: "Iyashi Dome i masaža", price: "45" }, { name: "Central Recovery", what: "Cupping terapija i masaža", price: "60" }], note: "Prije objave provjerite ove tretmane i cijene prema aktuelnoj ponudi za članove.", club: "Tretmani za članove u Central Day Spa, od 30 KM" },
    run: { eyebrow: "Sunday Running Club", title: "Trčite s nama", body: "Svake nedjelje klub trči zajedno. Okupljanje u 9:30, start u 10:00. Besplatno za sve učesnike, članove i nečlanove.", facts: [{ k: "Okupljanje", v: "Nedjelja, 9:30" }, { k: "Start", v: "10:00" }, { k: "Cijena", v: "Besplatno" }], cta: "Termini na Instagramu" },
    timetable: { title: "Rezervišite čas online", body: "Pogledajte časove ove sedmice i rezervišite mjesto online ili pozovite klub." },
  },
);
add({
  key: "club", brand: "club", slug: L("centralfitnessclub", "central-fitness-club"), title: L("Central Fitness Club", "Central Fitness Club"),
  description: L(clubCopy("en").meta.description, clubCopy("bs").meta.description),
  build: (lang) => {
    const c = clubCopy(lang);
    const cards = ["images/club/treadmill.jpg", "images/club/studio-stretch.jpg", "images/club/pool-lanes.jpg", "images/club/split.jpg"];
    return [
      box("cfc-hero", [
        box("cfc-hero__inner", [heading(c.hero.eyebrow, "p", "cfc-eyebrow cfc-eyebrow--sun"), heading(c.hero.title.replace(" ", "<br>"), "h1", "cfc-hero__title"), heading(c.hero.tagline, "p", "cfc-hero__tagline"), text(`<p>${c.hero.body}</p>`, "cfc-hero__body"), box("cfc-btns", [cfcBtn(c.nav.join, page("club-membership"), "cfc-btn--volt"), shortcode("[hc_contact what=club_phone style=button]", "cfc-hero__phone")], { row: true })]),
        box("cfc-stats", c.stats.map((s) => box("cfc-stat", [heading(s.big, "p", "cfc-stat__big"), heading(s.label, "p", "cfc-stat__label")])), { row: true }),
      ], { bg: "images/club/split.jpg" }),
      box("cfc-intro", [box("cfc-intro__head", [heading(c.intro.eyebrow, "p", "cfc-eyebrow"), heading(c.intro.title, "h2", "cfc-title")]), text(`<p>${c.intro.body}</p>`, "cfc-muted")], { row: true, anchor: "club" }),
      box("cfc-green", [
        box("cfc-green__head", [heading(lines(c.spaces.title), "h2", "cfc-title"), box("cfc-green__aside", [text(`<p>${c.spaces.body}</p>`, "cfc-on-green"), cfcBtn(c.spaces.cta, page("club-membership"), "cfc-btn--volt")])], { row: true }),
        box("cfc-cards", c.spaces.cards.map((card, i) => box("cfc-card", [image(cards[i], "cfc-card__img"), heading(String(i + 1).padStart(2, "0"), "p", "cfc-card__num"), heading(card.title, "h3", "cfc-card__title"), text(`<p>${card.body}</p>`, "cfc-card__body")])), { row: true }),
      ]),
      box("cfc-benefits", [
        box("cfc-benefits__media", [image("images/club/spin-window.jpg", "cfc-fill")]),
        box("cfc-benefits__text", [heading(c.benefits.eyebrow, "p", "cfc-eyebrow"), heading(c.benefits.title, "h2", "cfc-title"), list(c.benefits.items.map((t) => ({ text: t })), "cfc-numbered")]),
      ], { row: true }),
      box("cfc-run", [box("cfc-run__text", [heading(ig[lang].run.eyebrow, "p", "cfc-eyebrow cfc-eyebrow--sun"), heading(ig[lang].run.title, "h2", "cfc-title"), text(`<p>${ig[lang].run.body}</p>`, "cfc-on-green")]), box("cfc-run__side", [facts(ig[lang].run.facts, "cfc-run__facts"), cfcBtn(ig[lang].run.cta, "https://www.instagram.com/central.fitness.club/", "cfc-btn--volt")])], { row: true, anchor: "running" }),
      box("cfc-pool", [
        box("cfc-pool__media", [image("images/club/pool-jets.jpg", "cfc-fill"), image("images/club/sauna.jpg", "cfc-fill")]),
        box("cfc-pool__text", [heading(c.pool.eyebrow, "p", "cfc-eyebrow"), heading(c.pool.title, "h2", "cfc-title"), text(`<p>${c.pool.body}</p>`, "cfc-muted"), box("cfc-zones", c.pool.zones.map((z) => box("cfc-zone", [heading(z.name, "h3", "cfc-zone__name"), text(`<p>${z.body}</p>`, "cfc-muted")])), { row: true }), cfcBtn(c.pool.spa, page("dayspa"), "cfc-btn--line cfc-btn--on-dark")]),
      ], { row: true, anchor: "pool" }),
      box("cfc-classes", [
        box("cfc-classes__text", [heading(c.classes.eyebrow, "p", "cfc-eyebrow"), heading(c.classes.title, "h2", "cfc-title"), text(`<p>${c.classes.body}</p>`, "cfc-ink"), list(classTypes.map((t) => ({ text: t })), "cfc-chips"), box("cfc-btns", [cfcBtn(ig[lang].bookClass, clubBook(lang)), cfcBtn(c.classes.cta, page("club-timetable"), "cfc-btn--line")], { row: true })]),
        image("images/club/kettlebells-rooftops.jpg", "cfc-fill cfc-fill--bleed"),
      ], { row: true, anchor: "classes" }),
      box("cfc-gallery", [gallery(["images/club/running.jpg", "images/club/strength-floor.jpg", "images/club/kettlebells.jpg", "images/club/pool-bench.jpg", "images/club/stairs.jpg", "images/club/dumbbells.jpg", "images/club/foam-roller.jpg", "images/club/feel-your-power.jpg"], "", 4)]),
      box("cfc-join", [box("cfc-join__text", [heading(c.join.eyebrow, "p", "cfc-eyebrow cfc-eyebrow--sun"), heading(c.join.title, "h2", "cfc-title"), text(`<p>${c.join.body}</p>`, "cfc-on-green"), box("cfc-btns", [cfcBtn(c.join.cta, page("club-membership"), "cfc-btn--volt"), shortcode("[hc_contact what=club_phone style=button]", "cfc-join__phone")], { row: true })]), image("images/club/bottles.jpg", "cfc-fill cfc-fill--bleed")], { row: true }),
    ];
  },
});

add({
  key: "club-membership", brand: "club", parent: "club", slug: L("membership", "clanarine"), title: L("Membership", "Članarine"),
  description: L(clubCopy("en").meta.membershipDescription, clubCopy("bs").meta.membershipDescription),
  build: (lang) => {
    const c = clubCopy(lang);
    const m = c.membership;
    const mail = `mailto:${hotel.email}?subject=${encodeURIComponent("Central Fitness Club")}`;
    return [
      box("cfc-hero cfc-hero--page", [heading(m.eyebrow, "p", "cfc-eyebrow"), heading(m.title, "h1", "cfc-hero__title"), text(`<p>${m.body}</p>`, "cfc-hero__body")], { bg: "images/club/member-tshirt.jpg" }),
      box("cfc-green", [heading(m.plansTitle, "h2", "cfc-title"), box("cfc-plans", m.defaultPlans.map((p) => box(`cfc-plan${p.highlight ? " is-featured" : ""}`, [heading(p.name, "h3", "cfc-plan__name"), heading(p.price ? `${p.price} KM` : m.onRequest, "p", "cfc-plan__price"), list(p.features.map((t) => ({ text: t })), "cfc-dashes"), box("cfc-btns", [shortcode("[hc_contact what=club_phone style=button]", ""), cfcBtn(m.ask, mail, "cfc-btn--line")], { row: true })])), { row: true }), editorNote(lang === "en" ? "Add each plan and its price here in Elementor: duplicate the yellow card, change the name, price and what it includes." : "Svaku članarinu i cijenu dodajte ovdje u Elementoru: duplicirajte žutu karticu i promijenite naziv, cijenu i šta uključuje.")]),
      box("cfc-benefits", [box("cfc-benefits__text", [heading(m.benefitsTitle, "h2", "cfc-title"), list(c.benefits.items.map((t) => ({ text: t })), "cfc-numbered"), cfcBtn(ig[lang].members.title, page("dayspa", "#members"), "cfc-btn--line")]), box("cfc-tour", [heading(m.tourTitle, "h3", "cfc-title"), text(`<p>${m.tourBody}</p>`, "cfc-on-green"), shortcode("[hc_contact what=club_phone style=button]", "")], { bg: "images/club/spin-window.jpg" })], { row: true }),
    ];
  },
});

add({
  key: "club-timetable", brand: "club", parent: "club", slug: L("timetable", "raspored"), title: L("Classes & timetable", "Časovi i raspored"),
  description: L(clubCopy("en").meta.timetableDescription, clubCopy("bs").meta.timetableDescription),
  build: (lang) => {
    const t = clubCopy(lang).timetable;
    // CH-043: the club's own weekly timetable and class descriptions; staff edit both in Elementor.
    const day = (d: number) => {
      const items = defaultClasses.filter((k) => k.day === d).sort((a, b) => a.time.localeCompare(b.time));
      return box("cfc-day", [heading(t.days[d], "h3", "cfc-day__name"), items.length ? list(items.map((k) => ({ text: `<strong>${k.time}</strong> ${k.name}${k.duration ? ` <small>· ${k.duration}</small>` : ""}` })), "cfc-day__list") : text(`<p>${t.noClasses}</p>`, "cfc-muted cfc-small")]);
    };
    return [
      box("cfc-hero cfc-hero--page", [heading(t.eyebrow, "p", "cfc-eyebrow"), heading(t.title, "h1", "cfc-hero__title"), text(`<p>${t.body}</p>`, "cfc-hero__body")], { bg: "images/club/studio.jpg" }),
      box("cfc-sunblock", [heading(ig[lang].timetable.title, "h2", "cfc-title"), text(`<p>${ig[lang].timetable.body}</p>`, "cfc-ink"), box("cfc-btns", [cfcBtn(ig[lang].bookClass, clubBook(lang)), shortcode("[hc_contact what=club_phone style=button]", "")], { row: true }), heading(t.typesTitle, "h3", "cfc-subhead"), list(classTypes.map((x) => ({ text: x })), "cfc-chips")]),
      box("cfc-week", [
        editorNote(lang === "en" ? "When the timetable changes, edit the days below in Elementor (one line per class: time, class, duration)." : "Kada se raspored promijeni, uredite dane ispod u Elementoru (jedan red po času: vrijeme, čas, trajanje)."),
        box("cfc-week__grid", [0, 1, 2, 3, 4, 5, 6].map(day), { row: true }),
      ]),
      box("cfc-classinfo", [heading(t.typesTitle, "h2", "cfc-title"), text(`<p>${t.typesBody}</p>`, "cfc-muted"), box("cfc-classinfo__grid", classInfo.filter((k) => k.about).map((k) => box("cfc-classcard", [heading(`${k.name}${k.minutes ? ` <small>${k.minutes} min</small>` : ""}`, "h3", "cfc-classcard__name"), text(`<p>${k.about![lang]}</p>`, "cfc-muted")])), { row: true })], { anchor: "classes" }),
    ];
  },
});

/* ─────────────────────────── Output ─────────────────────────── */

const out = {
  generatedFrom: "src/content (Next.js site) + wordpress/build/generate.mts",
  languages: [
    { slug: "en", name: "English", locale: "en_GB", default: true },
    { slug: "bs", name: "Bosanski", locale: "bs_BA" },
  ],
  pages: [] as unknown[],
  menus: {} as Record<string, Record<Lang, { label: string; target: string; parent?: string }[]>>,
  settings: {
    phone: hotel.phoneDisplay,
    email: hotel.email,
    spa_phone: "+387 33 561 830",
    spa_email: "dayspa@hotelcentral.ba", // CH-054
    club_phone: hotel.phoneDisplay,
    booking_url: booking.bookingUrl,
    spa_booking_url: DAYSPA_BOOKING_URL,
    club_booking_url: CLUB_BOOKING_URL,
    facebook: hotel.facebook,
    instagram_hotel: "https://www.instagram.com/hotelcentralsarajevo/",
    instagram_club: "https://www.instagram.com/central.fitness.club/",
    instagram_spa: "https://www.instagram.com/central.day.spa/",
    address: `${hotel.street}, ${hotel.postalCode} ${hotel.city}`,
    // Hours from the hotel's FAQ (Day Spa, breakfast, check-in). Café and club hours are filled in by the hotel.
    hours: {
      spa: L("Tuesday – Saturday: 11:00 – 20:00\nSunday, Monday: Closed", "Utorak – subota: 11:00 – 20:00\nNedjelja, ponedjeljak: Zatvoreno"), // CH-055
      breakfast: L("Every day: 07:00 – 10:00", "Svaki dan: 07:00 – 10:00"),
      checkin: L("Check-in from 15:00 · check-out until 11:00", "Prijava od 15:00 · odjava do 11:00"),
      cafe: L("", ""),
      club: L("", ""),
    },
  },
};

pages.forEach((p, i) => {
  out.pages.push({
    key: p.key, brand: p.brand, parent: p.parent ?? null, front: p.front ?? false,
    translations: Object.fromEntries(LANGS.map((lang) => {
      resetIds((i + 1) * 0x100000 + (lang === "bs" ? 0x80000 : 0));
      return [lang, { slug: p.slug[lang], title: p.title[lang], description: p.description[lang], elementor: p.build(lang) }];
    })),
  });
});

const menu = (lang: Lang, items: ([string, string] | [string, string, string])[]) => items.map(([label, target, parent]) => ({ label, target, ...(parent ? { parent } : {}) }));
const nav = (lang: Lang) => getDictionary(lang).nav;
out.menus.hotel = {
  // CH-021: full brand names; CH-022: the café (with catering) sits under About, no restaurant entry.
  en: menu("en", [["Home", "home"], ["About", "about"], ["Central Café", "cafe", "about"], ["Rooms & Suites", "rooms"], ["Central Fitness Club", "club"], ["Central Day Spa", "dayspa"], ["Meetings & Events", "conference"], ["Location", "location"], ["Contact", "contact"]]),
  bs: menu("bs", [["Početna", "home"], ["O nama", "about"], ["Central Café", "cafe", "about"], ["Sobe i apartmani", "rooms"], ["Central Fitness Club", "club"], ["Central Day Spa", "dayspa"], ["Sastanci i događaji", "conference"], ["Lokacija", "location"], ["Kontakt", "contact"]]),
};
void nav;
out.menus.spa = {
  en: menu("en", [["Treatments", "dayspa#treatments"], ["Price list", "dayspa#prices"], ["Packages", "dayspa#packages"], ["About", "dayspa#about"], ["Contact", "dayspa#contact"]]),
  bs: menu("bs", [["Tretmani", "dayspa#treatments"], ["Cjenovnik", "dayspa#prices"], ["Paketi", "dayspa#packages"], ["O nama", "dayspa#about"], ["Kontakt", "dayspa#contact"]]),
};
out.menus.club = {
  // CH-043: the timetable is under "Classes" (one entry), not a separate option.
  en: menu("en", [["The club", "club#club"], ["Pool & sauna", "club#pool"], ["Classes", "club-timetable"], ["Membership", "club-membership"], ["Contact", "club#contact"]]),
  bs: menu("bs", [["Klub", "club#club"], ["Bazen i sauna", "club#pool"], ["Časovi", "club-timetable"], ["Članarine", "club-membership"], ["Kontakt", "club#contact"]]),
};
out.menus.legal = { en: menu("en", [["Privacy policy", "privacy"], ["FAQ", "about#faq"]]), bs: menu("bs", [["Politika privatnosti", "privacy"], ["Česta pitanja", "about#faq"]]) };

// Every photograph the pages use, with a description (the importer imports each once).
const used = new Set<string>();
JSON.stringify(out.pages, (_k, v) => {
  if (typeof v === "string" && v.startsWith("hc-media://")) used.add(v.slice("hc-media://".length));
  return v;
});
const alts = new Map<string, string>();
for (const r of rooms) for (const i of r.images) alts.set(img(i.src), i.alt.en);
const media = [...used].sort().map((p) => ({ path: p, alt: alts.get(p) ?? "" }));
for (const m of media) if (!fs.existsSync(path.join(root, "public", m.path))) throw new Error(`missing photo ${m.path}`);

const dest = path.join(root, "wordpress/plugin/hotel-central-setup/data/site.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify({ ...out, media }, null, 1));
console.log(`site.json: ${out.pages.length} pages × 2 languages, ${media.length} photos`);
