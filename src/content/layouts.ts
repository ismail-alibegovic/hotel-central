import type { Block, Img, PageKey, PageLayout, Cta, SplitBlock } from "@/cms/blocks/types";
import { getDictionary } from "@/content/dictionary";
import { hotel } from "@/content/hotel";
import { clientCopy } from "@/content/clientCopy";
import { faqSections } from "@/content/faq";
import { getPages } from "@/content/pages";
import { href, type Locale } from "@/lib/i18n";

/**
 * The static page layouts, expressed as the same blocks the CMS edits. These are (1) what every page
 * renders when the CMS is off, unreachable or has no document, (2) the source of the CMS seed, and
 * (3) the fallback for blocks an editor leaves untranslated. The words come from `pages.ts` / `dictionary.ts`;
 * photographs and their alt text live here (they used to be inlined in each page file).
 */
const img = (src: string, alt: string, position?: string): Img => ({ src: `/images/${src}`, alt, ...(position ? { position } : {}) });

/** The hotel's own treatment & price list (prices change; we link rather than copy). */
const DAY_SPA_URL = "https://www.hotelcentral.ba/facilities/wellness-day-spa/";

const internal = (locale: Locale, path: string): Cta["link"] => ({ kind: "internal", href: href(locale, path), external: false });

export const pagePaths: Record<PageKey, string> = {
  about: "/about",
  rooms: "/rooms",
  spa: "/spa",
  restaurant: "/about/cafe", // CH-022: no restaurant page any more; /restaurant redirects to the café
  cafe: "/about/cafe",
  "meetings-events": "/meetings-events",
  location: "/location",
  contact: "/contact",
};

export function staticLayout(page: PageKey, locale: Locale): PageLayout {
  const dict = getDictionary(locale);
  const p = getPages(locale);
  const split = (b: Omit<SplitBlock, "type" | "reverse" | "tone"> & Partial<Pick<SplitBlock, "reverse" | "tone">>): Block => ({ type: "split", tone: "ivory", reverse: false, ...b });

  switch (page) {
    case "about": {
      const a = p.about;
      return {
        meta: a.meta,
        ogImage: "/images/3064.jpg",
        blocks: [
          { type: "hero", image: img("3064.jpg", "Hotel Central's façade and corner tower on Ćumurija street", "55% 35%"), eyebrow: a.hero.eyebrow, title: a.hero.title, intro: a.hero.intro, meta: ["Hotel Central", "(01–03)", "Ćumurija 8"] },
          split({ label: a.story.label, index: "Hotel Central, Sarajevo", title: a.story.title, body: a.story.body, line: "hotel", images: [img("hc26-facade-entrance.jpg", "A guest entering Hotel Central under its iron canopy", "50% 55%"), img("hc26-lobby.jpg", "The lobby with its wave-shaped ceiling and white leather armchairs")], facts: a.facts }),
          split({ tone: "deep", reverse: true, label: a.rooms.label, title: a.rooms.title, body: a.rooms.body, line: "rooms", images: [img("hc26-bed.jpg", "A double bed with a metallic headboard and burgundy curtains"), img("hc26-room-door.jpg", "A guest opening the door of room 108")], primary: { label: a.rooms.cta, link: internal(locale, "/rooms") } }),
          { type: "statement", text: a.statement, label: "(—)", tone: "ivory" },
          split({ tone: "olive", label: a.wellness.label, title: a.wellness.title, body: a.wellness.body, line: "spa", images: [img("hc26-pool-lanes.jpg", "The heated 25-metre pool of Central Fitness Club", "50% 60%"), img("hc26-dayspa-relax.jpg", "The relaxation room of Central Day Spa")], primary: { label: "Central Fitness Club", link: internal(locale, "/centralfitnessclub") }, secondary: { label: "Central Day Spa", link: internal(locale, "/dayspa") } }),
          { type: "gallery", tone: "ivory", images: [img("hc26-lounge-window.jpg", "The lounge under a tall arched window"), img("hc26-reception.jpg", "Checking in at reception"), img("hc26-restaurant.jpg", "Restaurant Central with its arched windows"), img("hc26-stairs.jpg", "The staircase with its magenta carpet"), img("p05.jpg", "Living room of the presidential suite")] },
          // CH-029: "Good to know" is the FAQ itself, opened in place (no café teaser, no separate page to open).
          {
            type: "faq",
            label: "(—) FAQ",
            title: [locale === "en" ? "Good to know" : "Dobro je znati"],
            tone: "ivory",
            sample: false,
            items: faqSections[locale].flatMap((sec) => sec.items),
          },
          // CH-030: a brighter, more welcoming photograph than the night façade.
          { type: "finalBooking", image: "/images/hc26-lobby-windows.jpg", alt: "The sunlit lounge with its tall arched windows and plants" },
        ],
      };
    }
    case "rooms": {
      const r = p.rooms;
      return {
        meta: r.meta,
        ogImage: "/images/p05.jpg",
        blocks: [
          { type: "hero", image: img("3067.jpg", "A suite at Hotel Central"), eyebrow: r.hero.eyebrow, title: r.hero.title, intro: r.hero.intro, meta: ["Hotel Central", "({roomCount})", dict.home.rooms.metaCenter] },
          { type: "roomList" },
          { type: "finalBooking" },
        ],
      };
    }
    case "spa": {
      const s = p.spa;
      return {
        meta: s.meta,
        ogImage: "/images/3069.jpg",
        blocks: [
          { type: "hero", image: img("3069.jpg", "The heated 25-metre indoor pool with a wave mosaic", "50% 60%"), eyebrow: s.hero.eyebrow, title: s.hero.title, intro: s.hero.intro, meta: ["25 m", "(Club & Spa)", "Sauna · Steam · Caldarium"] },
          split({ tone: "olive", label: s.pool.label, title: s.pool.title, body: s.pool.body, line: "spa", images: [img("pool-03.jpg", "Curved pool edge with tiled benches"), img("bazen.jpg", "Pool hall with mosaic wall")] }),
          { type: "facts", label: s.facilities, items: s.facts },
          split({ tone: "deep", reverse: true, label: s.gym.label, title: s.gym.title, body: s.gym.body, line: "rooms", images: [img("pool-04.jpg", "The pool hall of the Club & Spa"), img("pool-08.jpg", "Guests in the hydrotherapy pool")] }),
          split({
            label: s.dayspa.label,
            title: s.dayspa.title,
            body: s.dayspa.body,
            line: "restaurant",
            images: [img("final-6230.jpg", "Relaxation lounge with a forest mural"), img("final-6202.jpg", "Treatment room of the day spa")],
            primary: { label: s.dayspa.cta, link: { kind: "external", href: DAY_SPA_URL, external: true } },
            secondary: { label: hotel.phoneDisplay, link: { kind: "phone", href: hotel.phoneHref, external: false } },
          }),
          { type: "gallery", tone: "olive", images: [img("central-spa_relax-room.jpg", "Spa relaxation room"), img("final-6211.jpg", "Spa bath detail"), img("central-spa_bath.jpg", "Spa bathing room with curtains"), img("final-6167.jpg", "Spa reception"), img("pool-05.jpg", "The pool and its mosaic wall")] },
          { type: "finalBooking", image: "/images/3069.jpg", alt: "The indoor pool" },
        ],
      };
    }
    case "restaurant": {
      const r = p.restaurant;
      return {
        meta: r.meta,
        ogImage: "/images/hc26-restaurant.jpg",
        blocks: [
          { type: "hero", variant: "warm", image: img("hc26-restaurant.jpg", "Restaurant Central: black tables, orange chairs and tall arched windows", "50% 62%"), eyebrow: r.hero.eyebrow, title: r.hero.title, intro: r.hero.intro, meta: ["Hotel Central", "(Restaurant)", dict.home.restaurant.metaRight] },
          split({ label: r.breakfast.label, title: r.breakfast.title, body: r.breakfast.body, line: "restaurant", images: [img("hc-comfort-2.jpg", "Breakfast tray with tea and croissants"), img("dorucak6.jpg", "Bosnian coffee in a copper džezva")] }),
          { type: "gallery", tone: "deep", images: [img("dorucak4.jpg", "Breakfast buffet"), img("dorucak1.jpg", "Fresh fruit platter at breakfast"), img("breakfast2.jpg", "Fried eggs served at breakfast"), img("dorucak2.jpg", "Cheese selection at the buffet"), img("breakfast3.jpg", "Eggs with asparagus")] },
          split({ tone: "olive", reverse: true, label: r.catering.label, title: r.catering.title, body: r.catering.body, line: "spa", images: [img("breakfast1.jpg", "Omelette served at breakfast"), img("dorucak3.jpg", "Cheese and cold cuts at the buffet")], primary: { label: r.catering.cta, link: internal(locale, "/contact") } }),
          { type: "finalBooking" },
        ],
      };
    }
    case "cafe": {
      const k = p.cafe;
      return {
        meta: k.meta,
        ogImage: "/images/hc26-cafe-corner.jpg",
        blocks: [
          { type: "hero", variant: "warm", image: img("hc26-cafe-corner.jpg", "Armchairs with pink cushions by the café's tall windows on Ćumurija street", "50% 78%"), eyebrow: "Hotel Central · Ćumurija 8", title: k.hero.title, intro: k.hero.intro, meta: ["Hotel Central", "(Café)", "Ćumurija 8"] },
          split({ label: k.cafe.label, title: k.cafe.title, body: k.cafe.body, bullets: { title: k.cafe.offerTitle, items: k.cafe.offer }, line: "restaurant", images: [img("hc26-cafe-guest.jpg", "A guest with a laptop at a café table with orange chairs", "50% 55%")] }),
          // CH-022: the hotel runs the café, not a restaurant; catering for guests and corporate events is on request.
          split({
            tone: "olive",
            reverse: true,
            label: k.catering.label,
            title: k.catering.title,
            body: k.catering.body,
            line: "spa",
            images: [img("dorucak4.jpg", "A buffet laid out for guests"), img("dorucak6.jpg", "Bosnian coffee in a copper džezva")],
            primary: { label: k.catering.cta, link: { kind: "email", href: `mailto:${hotel.email}`, external: false } },
            secondary: { label: k.catering.events, link: internal(locale, "/meetings-events") },
          }),
          { type: "statement", text: k.statement, label: "(—)", tone: "ivory" },
          split({ tone: "deep", label: k.lounge.label, title: k.lounge.title, body: k.lounge.body, line: "hotel", images: [img("hc26-lobby-windows.jpg", "The lounge with its arched windows and plants", "50% 50%")] }),
          { type: "finalBooking" },
        ],
      };
    }
    case "meetings-events": {
      const e = p.events;
      const cf = clientCopy.conference[locale];
      return {
        meta: e.meta,
        ogImage: "/images/hc26-conference.jpg",
        blocks: [
          { type: "hero", image: img("hc26-conference.jpg", "The conference room set up in a U shape with two projection screens", "50% 55%"), eyebrow: e.hero.eyebrow, title: e.hero.title, intro: e.hero.intro, meta: ["60–70", "(Meetings & events)", dict.home.events.metaRight] },
          split({ tone: "deep", label: e.room.label, title: e.room.title, body: e.room.body, line: "rooms", images: [img("hc26-conference-u.jpg", "The conference room with its patterned wallpaper"), img("hc26-conference-foyer.jpg", "The bar in the conference foyer")], facts: e.facts }),
          { type: "gallery", tone: "ivory", images: [img("img_9226.jpg", "Conference chairs in soft focus"), img("img_9235.jpg", "Projector detail"), img("img_9216.jpg", "Seating with delegate microphones"), img("img_9180.jpg", "Reception counter in the conference area"), img("img_9271.jpg", "Rows of conference chairs")] },
          split({
            tone: "olive",
            reverse: true,
            label: e.business.label,
            title: e.business.title,
            body: e.business.body,
            line: "spa",
            images: [img("img_9223.jpg", "Microphone on the conference desk"), img("img_9236.jpg", "Projection screen")],
            primary: { label: e.business.cta, link: internal(locale, "/contact") },
            secondary: { label: hotel.email, link: { kind: "email", href: `mailto:${hotel.email}`, external: false } },
          }),
          // CH-014: what can be arranged (no prices: fees are agreed per request), and a prominent enquiry.
          {
            type: "offers",
            label: "(03)",
            title: [cf.offerTitle],
            intro: cf.offerNote,
            tone: "ivory",
            sample: false,
            // The CMS's defaults for the row labels (not shown: these items have no validity or price).
            validityLabel: locale === "en" ? "Valid" : "Važi",
            priceLabel: locale === "en" ? "Price" : "Cijena",
            items: cf.offer.map((o) => ({ title: o.t, description: o.d })),
          },
          {
            type: "cta",
            title: [cf.ctaTitle],
            body: cf.ctaBody,
            tone: "deep",
            sample: false,
            primary: { label: cf.ctaMail, link: { kind: "internal", href: "#enquiry", external: false } },
            secondary: { label: `${cf.ctaCall} ${hotel.phoneDisplay}`, link: { kind: "phone", href: hotel.phoneHref, external: false } },
          },
          { type: "finalBooking" },
        ],
      };
    }
    case "location": {
      const l = p.location;
      return {
        meta: l.meta,
        ogImage: "/images/3064.jpg",
        blocks: [
          { type: "hero", image: img("hc26-facade-sky.jpg", "The CENTRAL letters on the hotel's façade under a summer sky", "50% 45%"), eyebrow: l.hero.eyebrow, title: l.hero.title, intro: l.hero.intro, meta: [hotel.street, "(Location)", `${hotel.postalCode} ${hotel.city}`] },
          { type: "arrival", label: l.arrive, transport: clientCopy.transport[locale] }, // CH-015: approximate wording, parking per the FAQ
          split({ tone: "deep", label: l.walk.label, title: l.walk.title, body: l.walk.body, line: "rooms", images: [img("hc26-street-view.jpg", "The view from the hotel's door: a red Austro-Hungarian building and the cathedral's spire", "50% 60%"), img("hc26-cafe-window.jpg", "A guest working by the café window on Ćumurija street")], bullets: { title: l.nearby, items: l.landmarks } }),
          { type: "finalBooking" },
        ],
      };
    }
    case "contact": {
      const c = p.contact;
      return {
        meta: c.meta,
        ogImage: "/images/3075.jpg",
        blocks: [
          { type: "hero", image: img("hc26-reception.jpg", "A guest at the reception desk of Hotel Central", "50% 40%"), eyebrow: c.hero.eyebrow, title: clientCopy.contact[locale].title, intro: clientCopy.contact[locale].intro, meta: [hotel.phoneDisplay, "(Contact)", hotel.email] },
          { type: "contact", office: { label: c.office, body: c.officeBody }, reservations: { label: c.reservations, body: c.reservationsBody }, write: { label: c.write }, social: { label: c.social, body: c.socialBody } },
        ],
      };
    }
  }
}
