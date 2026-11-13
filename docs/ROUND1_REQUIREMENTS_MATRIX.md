# Round 1 — client requirements, status and evidence

**Source of truth:** Google Sheet "Hotel Website sitemap" (owner: the hotel; tabs *Current Sitemap*, *PROPOSED Sitemap*,
*Website Changes*, *Global Elements*, *Instructions*), read in full on 2026-11-13 — all 5 tabs, rows CH-001…CH-020
(CH-021…CH-035 are empty), no cell comments. Assets: Drive folder "Images" (subfolders *HOTEL images*, *SPA images*,
*GYM images*), reviewed on 2026-11-13.

Statuses: **COMPLETE** · **PARTIAL** · **BLOCKED** (needs content/access from the hotel) · **CONFIRM** (implemented, the hotel
should confirm wording or an interpretation). Nothing on the site was invented: every fact, price and photo is from the
hotel's sheet, Drive folder or its own website (hotelcentral.ba). Draft wording that needs approval is listed in §4.

## 1. Requirements matrix (sheet tab "Website Changes")

| ID | Page | Requirement (sheet) | Status | What was done | Verified by |
| --- | --- | --- | --- | --- | --- |
| CH-001 | Home | Add logo to header; brighten the homepage, correct brand colour | COMPLETE / CONFIRM | Header shows the hotel's logo (wordmark from hotelcentral.ba — no vector supplied). Hero uses the approved daylight façade photo with a light veil; Club & Spa and Location bands are now light; photo grades lifted. Brand gold `#CBAA5C` (the accent of the hotel's current website) is used for booking buttons. **Confirm the official brand hex** — none was given in the sheet. | Screenshots desktop/mobile; smoke tests |
| CH-002 | Home | Review room information for accuracy | BLOCKED | Room data is unchanged and still sourced from hotelcentral.ba. "Completely refurbished" removed site-wide. The hotel must review room sizes, beds and amenities (`src/content/rooms.ts` or CMS → Rooms). | — |
| CH-003 | Home | Make Book now / Check availability far more visible | COMPLETE | Solid gold "Book now" button in the header on every hotel page and in the phone booking bar; hero booking bar on a frosted panel with a larger gold "Let's go"; gold primary in contact and conference bands. | Smoke (header booking link visible at all sizes) |
| CH-004 | Home / Club & Spa | More branding and images; two separate buttons (club, spa) | COMPLETE | New band with the two official logos, each brand's colour and 2026 photo, and its own button (→ Fitness Club, → Day Spa). Title/intro still CMS-editable. | Screenshots |
| CH-005 | Home | Meetings & Events before Location | COMPLETE | Section order swapped. | Screenshot |
| CH-006 | About | Reword the "Completely refurbished" section | COMPLETE / CONFIRM | Section rewritten ("Thirty-two rooms & suites"); "refurbished" removed from home, rooms and meta descriptions in both languages. Draft copy — see §4. | grep: no "refurbish"/"renovir" left |
| CH-007 | About / Central Café | Rename to "Central Café"; sub-page of About with opening times and offer | PARTIAL → BLOCKED (hours) | `/about/cafe` (EN/BS) replaces Restaurant Central (old address redirects). Offer = the hotel's published breakfast, Bosnian coffee and catering copy, new café photos. Opening hours are read from CMS → Hotel Information → Opening hours (Café); until entered, the page says hours are being confirmed and gives the reception number. **Needs: café opening hours; confirm the café replaces the restaurant and still serves breakfast.** | Smoke `/en|bs/about/cafe` |
| CH-008 | Rooms | Review all room information | BLOCKED | As CH-002 — awaiting the hotel's review. | — |
| CH-009 | Club & Spa | Split into two stand-alone pages with their own branding (per proposed sitemap); review the IG pages | COMPLETE / PARTIAL (IG) | Combined `/spa` retired (redirects to `/dayspa`). Two sections with their own header, footer, colours, typeface and logos. **Instagram:** no handle for either brand could be found (not on hotelcentral.ba, not in search); branding was derived from the official logos and the Drive photos instead. **Needs: Instagram links.** | Smoke + microsite chrome test |
| CH-010 | Central Fitness Club | Feels like a separate website with our branding | COMPLETE | `/centralfitnessclub`: own header (logo, Club / Membership / Timetable, CTA, way back to the hotel, language switch), own footer, club green `#214832` (sampled from the logo), condensed display face, 11 new gym photos. Content: gym over three floors, two air-conditioned studios, equipment, classes, pool & wellness, opening hours (CMS), join/contact. | Screenshots; smoke |
| CH-011 | Fitness / Membership | Membership types, pricing, benefits | BLOCKED (prices) | `/centralfitnessclub/membership` lists what membership includes (from the hotel's membership page) and renders membership cards automatically once `memberships` in `src/content/club.ts` is filled; until then it says prices are being finalised with call/e-mail buttons. **Needs: membership types, prices, periods, benefits (EN/BS).** | Smoke |
| CH-012 | Fitness / Timetable | Monthly timetable page | BLOCKED (timetable) | `/centralfitnessclub/timetable` renders a 7-day grid once `timetable` in `src/content/club.ts` is filled; until then it lists the club's classes and says how to check today's classes. **Needs: the monthly timetable.** | Smoke |
| CH-013 | Central Day Spa | Separate-feeling site, current pricing and treatments, link to booking and contact, peaceful feel | COMPLETE / CONFIRM | `/dayspa`: own chrome, wine `#411216` (logo) and the booking system's colours, airy serif, full current price list (57 items in 6 groups, from the hotel's list updated 2026-10-13), "2 hours pool access" perk, **online booking** via the hotel's Lime Booking form (EN/BS), phone, e-mail, opening hours (CMS). **Confirm prices are current and approve the Bosnian treatment names (§4).** | Smoke; booking link test |
| CH-014 | Meetings & Events | Up-to-date info, show packages, make enquiry button the focus | PARTIAL → BLOCKED (packages) | Now at `/conference`. A gold "Request a proposal" band sits directly under the hero (CMS-editable CTA section), and the proposal buttons go straight to e-mail/phone. **Needs: the packages to show.** | Screenshot |
| CH-015 | Location | Review info; no exact prices the hotel can be held to | COMPLETE / CONFIRM | All fares removed (taxi, airport coach, city transport); fixed sightseeing-bus times generalised. This also resolves the old EN/BS taxi-fare mismatch. | grep: no "€"/"KM" fares |
| CH-016 | Contact | Replace "We're standing by" | COMPLETE / CONFIRM | EN: "We're here to help — Our team is standing by to answer your questions, by phone or by e-mail." BS heading kept ("Tu smo za Vas"). | Screenshot |
| CH-017 | Contact | Remove the contact form; phone or e-mail only | COMPLETE | Form removed; two large tap targets (phone, e-mail) lead the page, then reservations, address, social. `/api/contact` is kept but unused (safe to delete later). | Smoke "no form" test |
| CH-018 | Footer | Replace the large text with the hotel logo, smaller | COMPLETE | Giant "HOTEL CENTRAL" type replaced by the logo (340 px) plus the two sub-brand marks linking to their sections. | Screenshot |
| CH-019 | Photos | Newer, higher-definition photos (to be taken and provided) | PARTIAL | The 2026 Drive photos (3024×4032 originals) are now used across the Club, Spa, Café and home. Older archive photos remain elsewhere until the professional shoot. | — |
| CH-020 | Footer | Confirm privacy policy and legal links | BLOCKED | hotelcentral.ba has no privacy/legal pages (only a CookieYes banner), so no links were invented. **Needs: privacy policy, cookie policy and company/legal details (EN/BS).** | — |

**Global Elements tab:** header (logo, nav, language, book now) ✔ · footer (contact, social; legal = CH-020) · booking (eZee
engine unchanged; spa → Lime Booking) ✔ · languages (every new page in EN and BS) ✔ · SEO (title, description, canonical,
hreflang on every new page; sitemap.xml updated) ✔ · accessibility (alt text on every new photo, keyboard menus, skip links,
gold button contrast 8.8:1 with ink text; white on club green 10.3:1, on spa wine 15.9:1) ✔ · analytics/cookies — no tool chosen by the hotel; not added.

## 2. Sitemap (tab "PROPOSED Sitemap") vs. implementation

| ID | Page | Proposed URL | Implemented (EN and BS) | Note |
| --- | --- | --- | --- | --- |
| 01 | Home | — | `/en`, `/bs` | |
| 02 | About | /about | `/about` | |
| 02.1 | Central Café | /about/cafe | `/about/cafe` | Decision "Discuss"; implemented per CH-007 — confirm |
| 03–03.6 | Rooms & six rooms | /rooms/… | unchanged | |
| 04 | Central Fitness Club | /centralfitnessclub | `/centralfitnessclub` | |
| 04.1 | Membership | /centralfitnessclub/membership | ✔ | |
| 04.2 | Class Timetable | /centralfitnessclub/timetable | ✔ | |
| 05 | Central Day Spa | /dayspa | `/dayspa` | |
| 06 | Meetings & Events | /conference | `/conference` | old `/meetings-events` redirects |
| 07 | Location | /location | unchanged | |
| 08 | Contact | /contact | unchanged | |
| — | (Restaurant, Club & Spa) | not in proposal | removed | `/restaurant` → `/about/cafe`, `/spa` → `/dayspa` (308) |

Menu: Home · About (→ Central Café) · Rooms & Suites · Central Fitness Club (→ Membership, Class timetable) · Central Day Spa ·
Meetings & Events · Location · Contact. The footer lists the same pages. CMS navigation entries remain editable; the
sub-page links come from the built-in dictionary. Bosnian URLs use the same paths as English (as before).

## 3. Assets used (Drive "Images")

| Folder | Reviewed | Used | Where |
| --- | --- | --- | --- |
| GYM images | 36 photos + `CFC SVG.svg`, `CFC SVG Green.svg`, 2 PDFs, 1 PNG | 11 photos; both SVGs | Fitness Club pages, home Club & Spa band, menu preview |
| SPA images | 44 photos + `Day spa SVG.svg` | 11 photos; logo | Day Spa page, home band, footer |
| HOTEL images | 34 photos | 8 photos | Café, Fitness Club pool section |

* Large originals (≈1 MB, 3024×4032) were chosen over the small WhatsApp-recompressed duplicates; byte-identical duplicates
  skipped. Masters are stored at 1800 px wide in `public/images/{club,dayspa,hotel}/`; `next/image` serves AVIF/WebP at
  responsive sizes, lazy-loads below the fold and reserves space (no layout shift).
* **Logos.** The CFC SVGs are auto-traced files with a solid background square and no `viewBox` (they cannot scale). Only the
  background square was removed and a tight `viewBox` added (`public/brand/central-fitness-club-{green,white}.svg`); the
  mark itself is untouched. The "Day spa SVG" is a 652×468 **PNG wrapped in an SVG** (not vector); the embedded image is used
  as `public/brand/day-spa.png` on a panel of its exact edge colour. **The main Hotel Central logo is not in the folder**;
  the wordmark from hotelcentral.ba (1120×236 PNG) is used, plus a dark recolour for light grounds. **Request vector (SVG/PDF)
  versions of the hotel logo and the Day Spa logo.**
* Not used: photos with third-party branding prominent (a luxury tote bag, fast-food signage) as heroes; motion-blurred or
  partially obstructed shots; strongly blue-lit lounge photos next to the warm Day Spa palette.

## 4. Draft text for the hotel's approval

* About → rooms section (CH-006), EN and BS.
* Café hero line, "What we offer" label (CH-007).
* Club & Spa home band texts; Fitness Club page copy (hero "Feel your power" / "Osjetite svoju snagu" — taken from the gym's
  own wall sign); Day Spa intro and booking texts.
* Bosnian names of spa treatments not given in the hotel's list (e.g. "Masaža vrućim kamenjem", "Hemijski piling").
* Conference enquiry band; Contact headline (CH-016); Location transport wording (CH-015).

## 5. Open items for the hotel (round 2 inputs)

1. Brand colour hex(es) and vector logos (hotel, Day Spa).
2. Opening hours: café, gym, pool, spa (enter in CMS → Hotel Information → Opening hours; the pages update themselves).
3. Membership types and prices; the monthly class timetable.
4. Conference packages.
5. Room information review (CH-002/CH-008).
6. Privacy / cookie / legal pages (CH-020).
7. Instagram links for the Fitness Club and Day Spa (CH-009) — they could then be added to the section footers.
8. Confirm: Café replaces Restaurant Central (breakfast still served there?); Day Spa prices current.
