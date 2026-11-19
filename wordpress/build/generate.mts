/**
 * Builds the WordPress + Elementor (free) version of the site from the same content as the Next.js site.
 *   npx tsx wordpress/build/generate.mts   →   wordpress/plugin/hotel-central-setup/data/site.json
 * The importer (wordpress/plugin/hotel-central-setup) turns site.json into pages, menus, media and settings.
 */
import fs from "node:fs";
import path from "node:path";
import { clubCopy, classTypes } from "../../src/content/club";
import { DAYSPA_BOOKING_URL, daySpaCopy, spaCategories, spaPackages } from "../../src/content/dayspa";
import { getDictionary } from "../../src/content/dictionary";
import { booking, hotel } from "../../src/content/hotel";
import { getPages } from "../../src/content/pages";
import { rooms } from "../../src/content/rooms";
import { accordion, box, button, gallery, heading, image, lines, list, map, page, paras, resetIds, shortcode, text, type El } from "./el.mts";

type Lang = "en" | "bs";
const LANGS: Lang[] = ["en", "bs"];
const L = <T,>(en: T, bs: T) => ({ en, bs });
const root = path.resolve(import.meta.dirname, "../..");

/* ─────────────────────────── Copy that exists only on the WordPress site (client change list) ─────────────────────────── */

const x = {
  // CH-006: "completely refurbished" is reworded.
  aboutRooms: L(
    { title: ["Comfort,", "thoughtfully designed"], body: ["Our 32 rooms and suites are designed with your comfort in mind, with modern amenities, quality beds and stylish decor.", "Start your day with a breakfast buffet and Bosnian coffee in our restaurant."] },
    { title: ["Udobnost", "do detalja"], body: ["Naše 32 sobe i apartmana uređeni su s mišlju na vašu udobnost, s modernim sadržajima, kvalitetnim krevetima i elegantnim enterijerom.", "Započnite dan doručkom na bazi švedskog stola i bosanskom kafom u našem restoranu."] },
  ),
  roomsIntro: L("Six room categories, from the single room to the presidential suite with its terrace.", "Šest kategorija soba, od jednokrevetne sobe do predsjedničkog apartmana s terasom."),
  // CH-007: Central Café (facts from the hotel's FAQ).
  cafe: L(
    {
      title: "Central Café", eyebrow: "On the ground floor of Hotel Central", intro: "Quality coffee, tea, cold drinks, cakes and sweet treats, in a welcoming city-centre setting.",
      offerTitle: "What we offer", offer: ["Coffee, including Bosnian coffee", "Tea", "Cold drinks", "Cakes and sweet treats"],
      hoursTitle: "Opening hours", body: ["Meet a friend, read the paper by the tall arched windows or take a break between meetings. The café is open to hotel guests and to everyone passing by on Ćumurija street."],
    },
    {
      title: "Central Café", eyebrow: "U prizemlju Hotela Central", intro: "Kvalitetna kafa, čajevi, hladni napici, kolači i slatke poslastice, u ugodnom ambijentu u samom centru grada.",
      offerTitle: "Šta nudimo", offer: ["Kafa, uključujući bosansku kafu", "Čajevi", "Hladni napici", "Kolači i slatke poslastice"],
      hoursTitle: "Radno vrijeme", body: ["Sretnite se s prijateljem, pročitajte novine uz visoke lučne prozore ili napravite pauzu između sastanaka. Kafić je otvoren za goste hotela i za sve prolaznike u Ćumuriji."],
    },
  ),
  faq: L({ title: "Frequently asked questions", eyebrow: "FAQ" }, { title: "Česta pitanja", eyebrow: "FAQ" }),
  // CH-014: what can be arranged (no prices: fees are agreed per request), and a prominent enquiry.
  conference: L(
    {
      offerTitle: "What we can arrange", offer: [
        { t: "Meeting room", d: "The conference room on the third floor, set up for your number of guests: theatre, classroom, U-shape or boardroom. Up to 60–70 seats, full IT equipment." },
        { t: "Coffee breaks & lunch", d: "Coffee breaks and catered lunches from Restaurant Central, with a menu made for your event." },
        { t: "Rooms for your guests", d: "32 rooms and suites in the same building, for speakers and delegates." },
      ], offerNote: "Every event is priced on request, depending on the room set-up, food and drinks and the rooms you need.",
      ctaTitle: "Plan your event with us", ctaBody: "Tell us the date, the number of guests and what you need. We will send you a proposal.", ctaMail: "Request a proposal", ctaCall: "Call us",
    },
    {
      offerTitle: "Šta možemo organizovati", offer: [
        { t: "Sala za sastanke", d: "Konferencijska sala na trećem spratu, postavljena prema broju gostiju: teatarski, učionički, U-oblik ili za sastanke. Do 60–70 mjesta, kompletna IT oprema." },
        { t: "Pauze za kafu i ručak", d: "Pauze za kafu i ručak iz Restorana Central, s menijem napravljenim za vaš događaj." },
        { t: "Sobe za vaše goste", d: "32 sobe i apartmana u istoj zgradi, za predavače i učesnike." },
      ], offerNote: "Cijena svakog događaja dogovara se na upit, prema postavci sale, hrani i pićima te sobama koje su vam potrebne.",
      ctaTitle: "Organizujte svoj događaj kod nas", ctaBody: "Javite nam datum, broj gostiju i šta vam je potrebno. Poslat ćemo vam ponudu.", ctaMail: "Zatražite ponudu", ctaCall: "Pozovite nas",
    },
  ),
  // CH-015: approximate wording, no prices the hotel could be held to; parking per the hotel's FAQ.
  transport: L(
    [
      { title: "Taxi", body: "Sarajevo International Airport is approx. 10–12 km away, about 20–25 minutes by car depending on traffic. A taxi can be booked through our reception; fares are approximate and may vary." },
      { title: "Airport coach", body: "Ask for the Hotel Central stop at the Latin Bridge or the Sacred Heart Cathedral. The coach runs daily according to flight times; fares and timetables are on centrotrans.com and may change." },
      { title: "Bus & tram", body: "Bus stops beside the hotel serve the centre and its surroundings. Tram no. 3 runs between Ilidža and Baščaršija (Old Town). Ticket prices may vary." },
      { title: "Sightseeing bus", body: "The Centrotrans sightseeing bus stops about 50 m from the hotel. Tours usually run in the summer season; please check times with reception." },
      { title: "By car & parking", body: "Enter “Hotel Central, Ćumurija 8, Sarajevo” as your destination. The hotel has no private parking, but several public and commercial car parks are nearby; reception will help you." },
    ],
    [
      { title: "Taksi", body: "Međunarodni aerodrom Sarajevo udaljen je približno 10–12 km, oko 20–25 minuta vožnje, zavisno od saobraćaja. Taksi možete naručiti preko recepcije; cijene su okvirne i mogu se razlikovati." },
      { title: "Aerodromski autobus", body: "Tražite stanicu kod Latinske ćuprije ili Katedrale. Autobus vozi svakodnevno prema redu letenja; cijene i red vožnje su na centrotrans.com i mogu se mijenjati." },
      { title: "Autobus i tramvaj", body: "Autobuske stanice pored hotela povezuju centar i okolinu. Tramvaj broj 3 vozi od Ilidže do Baščaršije. Cijene karata mogu se razlikovati." },
      { title: "Turistički autobus", body: "Centrotransov turistički autobus staje oko 50 m od hotela. Ture obično voze u ljetnoj sezoni; vrijeme provjerite na recepciji." },
      { title: "Automobilom i parking", body: "Kao odredište unesite „Hotel Central, Ćumurija 8, Sarajevo“. Hotel nema vlastiti parking, ali u blizini je nekoliko javnih i komercijalnih parkinga; recepcija će vam pomoći." },
    ],
  ),
  locationFacts: L(
    [{ k: "Airport", v: "approx. 10–12 km · 20–25 min" }, { k: "Airport coach", v: "Latin Bridge / Cathedral" }, { k: "Parking", v: "Public car parks nearby" }, { k: "Old Town", v: "A few minutes on foot" }],
    [{ k: "Aerodrom", v: "oko 10–12 km · 20–25 min" }, { k: "Aerodromski autobus", v: "Latinska ćuprija / Katedrala" }, { k: "Parking", v: "Javni parkinzi u blizini" }, { k: "Stari grad", v: "Nekoliko minuta pješice" }],
  ),
  // CH-016 / CH-017: new wording; phone and e-mail only, no form.
  contact: L(
    { title: ["Our team is standing by", "to answer your questions"], intro: "Call or write to us. We reply to every e-mail as soon as we can.", reception: "Reception & reservations", receptionBody: "General questions and room bookings, every day.", spa: "Central Day Spa", spaBody: "Treatments, availability and bookings.", club: "Central Fitness Club", clubBody: "Memberships, classes and tours of the club.", social: "Follow us", events: "Meetings & events", eventsBody: "Proposals for meetings, seminars and celebrations." },
    { title: ["Naš tim vam rado", "odgovara na pitanja"], intro: "Pozovite nas ili nam pišite. Na svaki e-mail odgovaramo što je prije moguće.", reception: "Recepcija i rezervacije", receptionBody: "Opća pitanja i rezervacija soba, svaki dan.", spa: "Central Day Spa", spaBody: "Tretmani, slobodni termini i rezervacije.", club: "Central Fitness Club", clubBody: "Članarine, časovi i obilazak kluba.", social: "Pratite nas", events: "Sastanci i događaji", eventsBody: "Ponude za sastanke, seminare i proslave." },
  ),
  // CH-020: privacy information, factual about what this website does; to be confirmed by the hotel's legal adviser.
  privacy: L(
    {
      title: "Privacy policy",
      body: [
        "<strong>Who we are.</strong> Hotel Central Sarajevo, Ćumurija 8, 71000 Sarajevo, Bosnia and Herzegovina. E-mail: info@hotelcentral.ba, telephone +387 33 561 800.",
        "<strong>What this website collects.</strong> The website has no contact form and no user accounts for guests. When you write to us by e-mail or call us, we use your details only to answer you and to handle your booking.",
        "<strong>Bookings.</strong> Room bookings are made in the secure booking system of our provider eZee (live.ipms247.com), and spa bookings in Lime Booking. Their own privacy terms apply to the data you enter there.",
        "<strong>Embedded content.</strong> The map on our pages is provided by Google Maps; Google may set cookies when the map loads. Links to Facebook and Instagram open those services.",
        "<strong>Your rights.</strong> You can ask us which personal data we hold about you, and ask us to correct or delete it, by writing to info@hotelcentral.ba.",
      ],
    },
    {
      title: "Politika privatnosti",
      body: [
        "<strong>Ko smo mi.</strong> Hotel Central Sarajevo, Ćumurija 8, 71000 Sarajevo, Bosna i Hercegovina. E-mail: info@hotelcentral.ba, telefon +387 33 561 800.",
        "<strong>Šta ova stranica prikuplja.</strong> Stranica nema kontakt formu niti korisničke račune za goste. Kada nam pišete ili nas pozovete, vaše podatke koristimo samo da vam odgovorimo i obradimo rezervaciju.",
        "<strong>Rezervacije.</strong> Sobe se rezervišu u sigurnom sistemu našeg partnera eZee (live.ipms247.com), a spa tretmani u sistemu Lime Booking. Za podatke koje tamo unosite važe njihovi uslovi privatnosti.",
        "<strong>Ugrađeni sadržaj.</strong> Mapu na našim stranicama prikazuje Google Maps; Google može postaviti kolačiće kada se mapa učita. Linkovi na Facebook i Instagram otvaraju te servise.",
        "<strong>Vaša prava.</strong> Možete tražiti informaciju koje vaše lične podatke imamo te njihovu ispravku ili brisanje, pišući na info@hotelcentral.ba.",
      ],
    },
  ),
  homeBrands: L(
    { eyebrow: "Club & Spa", title: ["Strength", "and calm"], body: "Two places of their own inside the hotel: a fitness club with a 25-metre pool, and a quiet day spa." },
    { eyebrow: "Club & Spa", title: ["Snaga", "i mir"], body: "Dva posebna mjesta u hotelu: fitness klub s bazenom od 25 metara i mirni day spa." },
  ),
  ui: L(
    { book: "Book now", bookStay: "Book your stay", rooms: "Rooms & suites", view: "View room", size: "Size", amenities: "Room facilities", other: "Other rooms", bookRoom: "Book this room", call: "Call", write: "Write to us", cafe: "Central Café", faq: "Frequently asked questions", more: "Read more", gallery: "Gallery", hours: "Opening hours" },
    { book: "Rezerviši", bookStay: "Rezervišite boravak", rooms: "Sobe i apartmani", view: "Pogledaj sobu", size: "Veličina", amenities: "Sadržaji sobe", other: "Ostale sobe", bookRoom: "Rezerviši ovu sobu", call: "Pozovite", write: "Pišite nam", cafe: "Central Café", faq: "Česta pitanja", more: "Saznajte više", gallery: "Galerija", hours: "Radno vrijeme" },
  ),
};

/* ─────────────────────────── Shared hotel sections ─────────────────────────── */

const img = (p: string) => p.replace(/^\/?images\//, "images/");
/** A note for the people editing the site: shown only to logged-in users (and in the Elementor editor), never to guests. */
const editorNote = (t: string) => text(`<p>${t}</p>`, "hc-editor-note");
const btn = (label: string, url: string, variant = "") => button(label, url, `hc-btn ${variant}`.trim());

function hero(bg: string, eyebrow: string, title: string[], intro?: string, ctas: El[] = []): El {
  return box("hc-hero", [box("hc-hero__inner", [heading(eyebrow, "p", "hc-eyebrow"), heading(lines(title), "h1", `hc-hero__title${title.join(" ").length > 28 ? " hc-hero__title--long" : ""}`), ...(intro ? [text(`<p>${intro}</p>`, "hc-hero__intro")] : []), ...(ctas.length ? [box("hc-btns", ctas, { row: true })] : [])])], { bg });
}

function split(o: { label: string; title: string[]; body: string[]; images: string[]; tone?: string; reverse?: boolean; ctas?: El[]; extra?: El[]; anchor?: string }): El {
  return box(
    `hc-split hc-tone-${o.tone ?? "ivory"}${o.reverse ? " is-reverse" : ""}`,
    [
      box("hc-split__media", o.images.map((p, i) => image(img(p), i ? "hc-split__img-b" : "hc-split__img-a"))),
      box("hc-split__text", [heading(o.label, "p", "hc-eyebrow"), heading(lines(o.title), "h2", "hc-display"), paras(o.body, "hc-body"), ...(o.extra ?? []), ...(o.ctas?.length ? [box("hc-btns", o.ctas, { row: true })] : [])]),
    ],
    { row: true, anchor: o.anchor },
  );
}

const facts = (items: { k: string; v: string }[], cls = "") => text(`<dl class="hc-facts">${items.map((f) => `<div><dt>${f.k}</dt><dd>${f.v}</dd></div>`).join("")}</dl>`, cls);

function finalBooking(lang: Lang, bg = "images/3075.jpg"): El {
  const f = getDictionary(lang).home.final;
  return box("hc-final", [box("hc-final__inner", [heading(f.label, "p", "hc-eyebrow"), heading(lines(f.title), "h2", "hc-display"), text(`<p>${f.body}</p>`, "hc-body"), btn(f.cta, booking.bookingUrl, "hc-btn--solid")])], { bg });
}

/* ─────────────────────────── Pages ─────────────────────────── */

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
      box("hc-hero hc-hero--home", [box("hc-hero__inner", [heading(d.heroLabel, "p", "hc-eyebrow"), heading(lines(d.heroTitle), "h1", "hc-hero__title"), text(`<p>${d.heroTagline}</p><p class="hc-small">${d.heroNote}</p>`, "hc-hero__intro"), box("hc-btns", [btn(u.bookStay, booking.bookingUrl, "hc-btn--solid"), btn(u.rooms, page("rooms"), "hc-btn--light")], { row: true })])], { bg: "images/3075.jpg" }),
      box("hc-intro", [
        box("hc-intro__head", [heading(d.hotel.metaRightSub, "p", "hc-eyebrow"), heading(lines(d.hotel.title), "h2", "hc-display hc-display--xl")]),
        box("hc-intro__photos", [image("images/hc26-lobby-windows.jpg"), image("images/hc26-facade-entrance.jpg"), image("images/hc26-restaurant.jpg")], { row: true }),
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
      split({ label: d.restaurant.metaLeft, title: d.restaurant.title, body: [d.restaurant.body, d.restaurant.body2], images: ["images/hc26-restaurant.jpg", "images/dorucak6.jpg"], ctas: [btn(d.restaurant.cta, page("restaurant"))] }),
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
    const u = x.ui[lang];
    const r = x.aboutRooms[lang];
    return [
      hero("images/hc26-facade-sky.jpg", a.hero.eyebrow, a.hero.title, a.hero.intro),
      split({ label: a.story.label.replace(/^\(\d+\)\s*/, ""), title: a.story.title, body: a.story.body, images: ["images/hc26-facade-entrance.jpg", "images/hc26-lobby.jpg"], extra: [facts(a.facts)] }),
      split({ label: a.rooms.label.replace(/^\(\d+\)\s*/, ""), title: r.title, body: r.body, images: ["images/hc26-bed.jpg", "images/hc26-room-door.jpg"], tone: "sage", reverse: true, ctas: [btn(a.rooms.cta, page("rooms"))] }),
      split({ label: a.wellness.label.replace(/^\(\d+\)\s*/, ""), title: a.wellness.title, body: a.wellness.body, images: ["images/hc26-pool-lanes.jpg", "images/hc26-dayspa-relax.jpg"], tone: "olive", ctas: [btn("Central Fitness Club", page("club"), "hc-btn--light"), btn("Central Day Spa", page("dayspa"), "hc-btn--light")] }),
      box("hc-teasers", [
        box("hc-teaser", [image("images/hc26-cafe-corner.jpg", "hc-teaser__img"), heading(u.cafe, "h3", "hc-teaser__title"), text(`<p>${x.cafe[lang].intro}</p>`, "hc-body"), btn(u.more, page("cafe"))]),
        box("hc-teaser", [image("images/hc26-reception.jpg", "hc-teaser__img"), heading(u.faq, "h3", "hc-teaser__title"), text(`<p>${lang === "en" ? "Check-in and check-out, breakfast, parking, the club and the spa: the answers to the questions we hear most." : "Prijava i odjava, doručak, parking, klub i spa: odgovori na pitanja koja najčešće čujemo."}</p>`, "hc-body"), btn(u.more, page("faq"))]),
      ], { row: true }),
      box("hc-gallery", [gallery(["images/hc26-lounge-window.jpg", "images/hc26-lobby-entrance.jpg", "images/hc26-stairs.jpg", "images/hc26-corridor.jpg", "images/p05.jpg", "images/hc26-keycard.jpg", "images/hc26-room-desk.jpg", "images/hc26-doormat.jpg"])]),
      finalBooking(lang, "images/hc26-lobby.jpg"),
    ];
  },
});

// Central Café (CH-007)
add({
  key: "cafe", brand: "hotel", parent: "about", slug: L("cafe", "central-cafe"), title: L("Central Café", "Central Café"),
  description: L(x.cafe.en.intro, x.cafe.bs.intro),
  build: (lang) => {
    const c = x.cafe[lang];
    return [
      hero("images/hc26-cafe-corner.jpg", c.eyebrow, [c.title], c.intro),
      split({ label: c.title, title: [c.offerTitle], body: c.body, images: ["images/hc26-cafe-guest.jpg", "images/hc26-lounge-window.jpg"], extra: [list(c.offer.map((t) => ({ text: t })), "hc-list"), heading(c.hoursTitle, "h3", "hc-subhead"), shortcode('[hc_hours place="cafe"]', "hc-hours")] }),
      box("hc-gallery", [gallery(["images/hc26-cafe-window.jpg", "images/hc26-lobby-lounge.jpg", "images/hc26-lobby-windows.jpg", "images/hc26-lobby.jpg"])]),
    ];
  },
});

// FAQ (from the hotel's own FAQ page)
function parseFaq(lang: Lang) {
  const raw = fs.readFileSync(path.join(root, `wordpress/content/faq.${lang}.txt`), "utf8").split("\n").map((s) => s.trim()).filter(Boolean);
  const sections: { title: string; items: { q: string; a: string }[] }[] = [];
  for (const line of raw) {
    const q = line.match(/^\d+\.\s+(.*)$/);
    if (q) sections[sections.length - 1].items.push({ q: q[1], a: "" });
    else {
      const s = sections[sections.length - 1];
      const last = s?.items[s.items.length - 1];
      if (last && !/\?$/.test(line) && (last.a === "" || !isHeader(line))) last.a = last.a ? `${last.a}</p><p>${line}` : line;
      else sections.push({ title: line, items: [] });
    }
  }
  return sections;
}
const isHeader = (l: string) => ["Central Fitness Club", "Day Spa", "Café & Additional Services", "Central Café i dodatne usluge"].includes(l);
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

// Restaurant
add({
  key: "restaurant", brand: "hotel", slug: L("restaurant", "restoran"), title: L("Restaurant Central", "Restoran Central"),
  description: L(getPages("en").restaurant.meta.description, getPages("bs").restaurant.meta.description),
  build: (lang) => {
    const r = getPages(lang).restaurant;
    return [
      hero("images/hc26-restaurant.jpg", r.hero.eyebrow, r.hero.title, r.hero.intro),
      split({ label: r.breakfast.label.replace(/^\(\d+\)\s*/, ""), title: r.breakfast.title, body: [...r.breakfast.body, lang === "en" ? "Breakfast is served every morning from 07:00 to 10:00 and is included in every stay." : "Doručak se služi svako jutro od 07:00 do 10:00 i uključen je u svaki boravak."], images: ["images/hc-comfort-2.jpg", "images/dorucak6.jpg"] }),
      box("hc-gallery", [gallery(["images/dorucak4.jpg", "images/dorucak1.jpg", "images/breakfast2.jpg", "images/dorucak2.jpg", "images/breakfast3.jpg", "images/hc26-restaurant.jpg"], "", 3)]),
      split({ label: r.catering.label.replace(/^\(\d+\)\s*/, ""), title: r.catering.title, body: r.catering.body, images: ["images/breakfast1.jpg", "images/dorucak3.jpg"], tone: "olive", reverse: true, ctas: [btn(r.catering.cta, page("contact"), "hc-btn--light")] }),
      finalBooking(lang),
    ];
  },
});

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
        card(c.spa, c.spaBody, [shortcode("[hc_contact what=spa_phone]", "hc-contact__line"), shortcode('[hc_hours place="spa"]', "hc-contact__line"), btn("Central Day Spa", page("dayspa"))]),
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
        box("ds-hero__text", [heading(c.hero.eyebrow, "p", "ds-eyebrow"), heading(lines(c.hero.title), "h1", "ds-hero__title"), box("ds-btns", [dsBtn(c.hero.cta, book, "ds-btn--light"), dsBtn(c.hero.prices, "#prices", "ds-btn--ghost")], { row: true })]),
        box("ds-glass", [heading(c.hero.perkTitle, "p", "ds-glass__title"), heading(c.hero.perkBig, "p", "ds-glass__big"), text(`<p>${c.hero.perkBody}</p>`, "ds-glass__body")]),
      ], { row: true, bg: "images/dayspa/guest-robe.jpg" }),
      box("ds-about", [
        box("ds-about__media", [image("images/dayspa/salt-lamp.jpg", "ds-fill"), image("images/dayspa/relax-room.jpg", "ds-fill")]),
        box("ds-about__text", [heading(c.about.label, "p", "ds-eyebrow"), heading(c.about.title, "h2", "ds-title"), text(`<p>${c.about.body}</p>`, "ds-muted"), list(c.about.features.map((f) => ({ text: `<strong>${f.title}</strong> — ${f.body}` })), "ds-features"), dsBtn(c.about.cta, book)]),
      ], { row: true, anchor: "about" }),
      box("ds-band", [heading(c.services.label, "p", "ds-eyebrow"), heading(lines(c.services.title), "h2", "ds-title")], { anchor: "treatments" }),
      box("ds-services", spaCategories.map((cat) => box("ds-service", [image(img(cat.image), "ds-service__img"), heading(`${c.services.from} ${min(cat.items)} KM`, "p", "ds-price-tag"), heading(cat.name[lang], "h3", "ds-service__title"), text(`<p>${cat.summary[lang]}</p>`, "ds-muted"), dsBtn(c.services.view, "#prices")])), { row: true }),
      box("ds-prices", [
        heading(c.prices.label, "p", "ds-eyebrow"), heading(c.prices.title, "h2", "ds-title"), text(`<p>${c.prices.intro}</p>`, "ds-muted"),
        ...spaCategories.map((cat) => box("ds-pricecat", [heading(cat.name[lang], "h3", "ds-pricecat__title"), ...cat.items.map((t) => box("ds-row", [heading(t.name[lang] + (t.note ? `<small>${t.note[lang]}</small>` : ""), "p", "ds-row__name"), heading(t.duration ?? "—", "p", "ds-row__dur"), heading(`${t.price} KM`, "p", "ds-row__price")], { row: true }))])),
      ], { anchor: "prices" }),
      box("ds-packages", [heading(c.packages.label, "p", "ds-eyebrow"), heading(c.packages.title, "h2", "ds-title"), box("ds-packages__grid", spaPackages.map((p, i) => box(`ds-package${i === 1 ? " is-featured" : ""}`, [heading(p.name[lang], "h3", "ds-package__name"), heading(`${p.price} KM <small>/ ${p.duration}</small>`, "p", "ds-package__price"), list(p.includes.map((t) => ({ text: t[lang] })), "ds-ticks"), dsBtn(c.packages.book, book, i === 1 ? "ds-btn--light" : "")])), { row: true })], { anchor: "packages" }),
      box("ds-why", [
        box("ds-why__text", [heading(c.why.label, "p", "ds-eyebrow"), heading(c.why.title, "h2", "ds-title"), text(`<p>${c.why.body}</p>`, "ds-muted"), list(c.why.ticks.map((t) => ({ text: t })), "ds-ticks ds-ticks--grid"), heading(c.footer.hours, "h3", "ds-subhead"), shortcode('[hc_hours place="spa"]', "ds-hours"), dsBtn(c.hero.cta, book)]),
        box("ds-why__media", [image("images/dayspa/serum-drop.jpg", "ds-fill"), image("images/dayspa/maderotherapy-tools.jpg", "ds-fill"), image("images/dayspa/corridor.jpg", "ds-fill ds-why__wide")], { row: true }),
      ], { row: true }),
      box("ds-gallery", [gallery(["images/dayspa/treatment-room.jpg", "images/dayspa/relax-lounger.jpg", "images/dayspa/candle.jpg", "images/dayspa/relax-lamp.jpg", "images/dayspa/facial-room.jpg", "images/dayspa/balneo-room.jpg", "images/dayspa/yin-yang.jpg", "images/dayspa/products.jpg"], "", 4)]),
      box("ds-cta", [heading(c.cta.eyebrow, "p", "ds-eyebrow"), heading(c.cta.title, "h2", "ds-title"), box("ds-btns", [dsBtn(c.cta.book, book, "ds-btn--light"), shortcode("[hc_contact what=spa_phone style=button]", "ds-cta__phone")], { row: true })], { bg: "images/dayspa/massage-room-oil.jpg", anchor: "book" }),
    ];
  },
});

/* ─────────────────────────── Central Fitness Club ─────────────────────────── */

const cfcBtn = (label: string, url: string, variant = "") => button(label, url, `cfc-btn ${variant}`.trim());
add({
  key: "club", brand: "club", slug: L("centralfitnessclub", "central-fitness-club"), title: L("Central Fitness Club", "Central Fitness Club"),
  description: L(clubCopy("en").meta.description, clubCopy("bs").meta.description),
  build: (lang) => {
    const c = clubCopy(lang);
    const cards = ["images/club/treadmill.jpg", "images/club/studio-stretch.jpg", "images/club/pool-lanes.jpg", "images/club/split.jpg"];
    return [
      box("cfc-hero", [heading(c.hero.eyebrow, "p", "cfc-eyebrow"), heading(c.hero.title, "h1", "cfc-hero__title"), heading(c.hero.tagline, "p", "cfc-hero__tagline"), text(`<p>${c.hero.body}</p>`, "cfc-hero__body")], { bg: "images/club/split.jpg" }),
      box("cfc-intro", [heading(c.intro.eyebrow, "p", "cfc-eyebrow"), heading(c.intro.title, "h2", "cfc-title cfc-title--caps"), text(`<p>${c.intro.body}</p>`, "cfc-muted"), box("cfc-stats", c.stats.map((s) => box("cfc-stat", [heading(s.big, "p", "cfc-stat__big"), heading(s.label, "p", "cfc-stat__label")])), { row: true })], { anchor: "club" }),
      box("cfc-green", [
        box("cfc-green__head", [heading(lines(c.spaces.title), "h2", "cfc-title"), box("cfc-green__aside", [text(`<p>${c.spaces.body}</p>`, "cfc-on-green"), cfcBtn(c.spaces.cta, page("club-membership"), "cfc-btn--cream")])], { row: true }),
        box("cfc-cards", c.spaces.cards.map((card, i) => box("cfc-card", [image(cards[i], "cfc-card__img"), heading(card.title, "h3", "cfc-card__title"), text(`<p>${card.body}</p>`, "cfc-card__body")])), { row: true }),
      ]),
      box("cfc-benefits", [
        box("cfc-benefits__media", [image("images/club/spin-window.jpg", "cfc-fill")]),
        box("cfc-benefits__text", [heading(c.benefits.eyebrow, "p", "cfc-eyebrow"), heading(c.benefits.title, "h2", "cfc-title"), list(c.benefits.items.map((t) => ({ text: t })), "cfc-numbered")]),
      ], { row: true }),
      box("cfc-pool", [
        box("cfc-pool__media", [image("images/club/pool-jets.jpg", "cfc-fill"), image("images/club/sauna.jpg", "cfc-fill")]),
        box("cfc-pool__text", [heading(c.pool.eyebrow, "p", "cfc-eyebrow"), heading(c.pool.title, "h2", "cfc-title"), text(`<p>${c.pool.body}</p>`, "cfc-muted"), box("cfc-zones", c.pool.zones.map((z) => box("cfc-zone", [heading(z.name, "h3", "cfc-zone__name"), text(`<p>${z.body}</p>`, "cfc-muted")])), { row: true }), cfcBtn(c.pool.spa, page("dayspa"), "cfc-btn--line")]),
      ], { row: true, anchor: "pool" }),
      box("cfc-classes", [
        box("cfc-classes__text", [heading(c.classes.eyebrow, "p", "cfc-eyebrow"), heading(c.classes.title, "h2", "cfc-title"), text(`<p>${c.classes.body}</p>`, "cfc-ink"), list(classTypes.map((t) => ({ text: t })), "cfc-chips"), cfcBtn(c.classes.cta, page("club-timetable"))]),
        image("images/club/kettlebells-rooftops.jpg", "cfc-fill cfc-fill--bleed"),
      ], { row: true, anchor: "classes" }),
      box("cfc-gallery", [gallery(["images/club/running.jpg", "images/club/strength-floor.jpg", "images/club/kettlebells.jpg", "images/club/pool-bench.jpg", "images/club/stairs.jpg", "images/club/dumbbells.jpg", "images/club/foam-roller.jpg", "images/club/feel-your-power.jpg"], "", 4)]),
      box("cfc-join", [box("cfc-join__text", [heading(c.join.eyebrow, "p", "cfc-eyebrow cfc-eyebrow--sun"), heading(c.join.title, "h2", "cfc-title"), text(`<p>${c.join.body}</p>`, "cfc-on-green"), box("cfc-btns", [cfcBtn(c.join.cta, page("club-membership"), "cfc-btn--cream"), shortcode("[hc_contact what=club_phone style=button]", "cfc-join__phone")], { row: true })]), image("images/club/bottles.jpg", "cfc-fill cfc-fill--bleed")], { row: true }),
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
      box("cfc-green", [heading(m.plansTitle, "h2", "cfc-title"), box("cfc-plans", m.defaultPlans.map((p) => box(`cfc-plan${p.highlight ? " is-featured" : ""}`, [heading(p.name, "h3", "cfc-plan__name"), heading(p.price ? `${p.price} KM` : m.onRequest, "p", "cfc-plan__price"), list(p.features.map((t) => ({ text: t })), "cfc-dashes"), box("cfc-btns", [shortcode("[hc_contact what=club_phone style=button]", ""), cfcBtn(m.ask, mail, "cfc-btn--line")], { row: true })])), { row: true }), text(`<p>${lang === "en" ? "Monthly and other memberships: ask at reception or call the club." : "Mjesečne i druge članarine: pitajte na recepciji ili pozovite klub."}</p>`, "cfc-on-green cfc-small"), editorNote(lang === "en" ? "Add each plan and its price here in Elementor: duplicate the yellow card, change the name, price and what it includes." : "Svaku članarinu i cijenu dodajte ovdje u Elementoru: duplicirajte žutu karticu i promijenite naziv, cijenu i šta uključuje.")]),
      box("cfc-benefits", [box("cfc-benefits__text", [heading(m.benefitsTitle, "h2", "cfc-title"), list(c.benefits.items.map((t) => ({ text: t })), "cfc-numbered")]), box("cfc-tour", [heading(m.tourTitle, "h3", "cfc-title"), text(`<p>${m.tourBody}</p>`, "cfc-on-green"), shortcode("[hc_contact what=club_phone style=button]", "")], { bg: "images/club/spin-window.jpg" })], { row: true }),
    ];
  },
});

add({
  key: "club-timetable", brand: "club", parent: "club", slug: L("timetable", "raspored"), title: L("Class timetable", "Raspored časova"),
  description: L(clubCopy("en").meta.timetableDescription, clubCopy("bs").meta.timetableDescription),
  build: (lang) => {
    const t = clubCopy(lang).timetable;
    const day = (d: number) => box("cfc-day", [heading(t.days[d], "h3", "cfc-day__name"), text(`<p>${t.noClasses}</p>`, "cfc-muted cfc-small")]);
    return [
      box("cfc-hero cfc-hero--page", [heading(t.eyebrow, "p", "cfc-eyebrow"), heading(t.title, "h1", "cfc-hero__title"), text(`<p>${t.body}</p>`, "cfc-hero__body")], { bg: "images/club/studio.jpg" }),
      box("cfc-week", [
        editorNote(lang === "en" ? "Fill in each day below in Elementor (one line per class: time, class, trainer), or replace this block with a picture of the monthly timetable." : "Upišite svaki dan ispod u Elementoru (jedan red po času: vrijeme, čas, trener) ili ovaj blok zamijenite slikom mjesečnog rasporeda."),
        box("cfc-week__grid", [0, 1, 2, 3, 4, 5, 6].map(day), { row: true }),
      ]),
      box("cfc-sunblock", [heading(t.emptyTitle, "h2", "cfc-title"), text(`<p>${t.emptyBody}</p>`, "cfc-ink"), shortcode("[hc_contact what=club_phone style=button]", ""), heading(t.typesTitle, "h3", "cfc-subhead"), list(classTypes.map((x) => ({ text: x })), "cfc-chips")]),
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
  menus: {} as Record<string, Record<Lang, { label: string; target: string }[]>>,
  settings: {
    phone: hotel.phoneDisplay,
    email: hotel.email,
    spa_phone: "+387 33 561 830",
    club_phone: hotel.phoneDisplay,
    booking_url: booking.bookingUrl,
    spa_booking_url: DAYSPA_BOOKING_URL,
    facebook: hotel.facebook,
    instagram_hotel: "https://www.instagram.com/hotelcentralsarajevo/",
    instagram_club: "https://www.instagram.com/central.fitness.club/",
    instagram_spa: "https://www.instagram.com/central.day.spa/",
    address: `${hotel.street}, ${hotel.postalCode} ${hotel.city}`,
    // Hours from the hotel's FAQ (Day Spa, breakfast, check-in). Café and club hours are filled in by the hotel.
    hours: {
      spa: L("Tuesday – Saturday: 11:00 – 20:00", "Utorak – subota: 11:00 – 20:00"),
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

const menu = (lang: Lang, items: [string, string][]) => items.map(([label, target]) => ({ label, target }));
const nav = (lang: Lang) => getDictionary(lang).nav;
out.menus.hotel = {
  en: menu("en", [["Home", "home"], ["About", "about"], ["Rooms & Suites", "rooms"], ["Fitness Club", "club"], ["Day Spa", "dayspa"], ["Restaurant", "restaurant"], ["Meetings & Events", "conference"], ["Location", "location"], ["Contact", "contact"]]),
  bs: menu("bs", [["Početna", "home"], ["O nama", "about"], ["Sobe i apartmani", "rooms"], ["Fitness Club", "club"], ["Day Spa", "dayspa"], ["Restoran", "restaurant"], ["Sastanci i događaji", "conference"], ["Lokacija", "location"], ["Kontakt", "contact"]]),
};
void nav;
out.menus.spa = {
  en: menu("en", [["Treatments", "dayspa#treatments"], ["Price list", "dayspa#prices"], ["Packages", "dayspa#packages"], ["About", "dayspa#about"], ["Contact", "dayspa#contact"]]),
  bs: menu("bs", [["Tretmani", "dayspa#treatments"], ["Cjenovnik", "dayspa#prices"], ["Paketi", "dayspa#packages"], ["O nama", "dayspa#about"], ["Kontakt", "dayspa#contact"]]),
};
out.menus.club = {
  en: menu("en", [["The club", "club#club"], ["Pool & saunas", "club#pool"], ["Classes", "club#classes"], ["Membership", "club-membership"], ["Timetable", "club-timetable"], ["Contact", "club#contact"]]),
  bs: menu("bs", [["Klub", "club#club"], ["Bazen i saune", "club#pool"], ["Časovi", "club#classes"], ["Članarine", "club-membership"], ["Raspored", "club-timetable"], ["Kontakt", "club#contact"]]),
};
out.menus.legal = { en: menu("en", [["Privacy policy", "privacy"], ["FAQ", "faq"], ["Central Café", "cafe"]]), bs: menu("bs", [["Politika privatnosti", "privacy"], ["Česta pitanja", "faq"], ["Central Café", "cafe"]]) };

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
