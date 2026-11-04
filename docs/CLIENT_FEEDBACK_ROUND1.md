# Client feedback — round 1 (CH-001 … CH-020)

Branch `claude/hotel-central-client-feedback-764i2a`. Source: the client's sheet *Hotel_Website_sitemap.xlsx* (tabs Current
Sitemap, PROPOSED Sitemap, Website Changes, Global Elements, Instructions), reviewed in full. Facts were checked against
hotelcentral.ba (EN + BS, retrieved 2026-11-04) and the logo files the hotel supplied (Hotel Central, Central Fitness Club,
Central Day Spa). Instagram profiles (@hotelcentralsarajevo, @central.fitness.club, @central.day.spa) require a login and
could **not** be reviewed; only the logos taken from them were used.

Nothing was deployed. No production hosting, database, credentials or booking configuration was changed.

## Status

| ID | Change | Status | What was done / what is open |
| --- | --- | --- | --- |
| CH-001 | Logo in header, brighter homepage, correct colour | **Done** (colour HEX: see decision D1) | Official logo in header and footer (`public/brand`). Homepage brightened inside the existing palette (approved with the agency): daytime façade in the hero, lighter veils, rooms carousel olive instead of deep, location on sage, lighter page heroes. |
| CH-002 | Review homepage room information | **Done** | Homepage rooms text rewritten without "completely refurbished"; carousel uses the corrected room data (CH-008). |
| CH-003 | Book now / Check availability far more visible | **Done** | The booking button is the only filled button on the site (header, hero search, rooms, final banner, footer, phone bar). Hero search framed as a panel with "Check availability". Booking engine and its fields unchanged. |
| CH-004 | Club & Spa preview: branding, images, two buttons | **Done** | Two distinct areas with their own logos, colours, photos and buttons (`/centralfitnessclub`, `/dayspa`). Texts and photos editable in the CMS (Homepage → section 4). |
| CH-005 | Meetings & Events before Location | **Done** | Order swapped, section numbers updated. |
| CH-006 | Reword "Completely refurbished" | **Done** | About section rewritten (EN/BS); same wording removed from rooms meta/intro and homepage. |
| CH-007 | Central Café subpage under About | **Draft (awaiting approval)** | `/about/cafe` prepared: FAQ description only, `noindex`, not linked, not in the sitemap. Restaurant Central untouched. Opening hours, menu and café photos missing. |
| CH-008 | Review room information | **Done (some facts to confirm)** | See "Room corrections". All six pages and their booking links unchanged. |
| CH-009 | Split Club & Spa into two branded pages | **Done** | `/spa` now redirects (308) to `/dayspa`; the CMS "Spa" page is no longer shown. |
| CH-010 | Central Fitness Club as a standalone-feeling site | **Done (photos pending)** | Own navigation under a slim hotel bar, club green, condensed typeface, club logo. No authentic gym photos exist: the gym section is typographic until photos arrive. |
| CH-011 | Membership: types, prices, benefits | **Partly done — prices blocked** | Layout, verified benefits, included facilities, enquiry. Only the annual membership and hotel-guest access are published; **no prices** exist anywhere, so "Price on request" is shown. Staff can add options and prices in the CMS (Central Fitness Club → Membership). |
| CH-012 | Monthly timetable | **Done — data blocked** | Responsive week grid (desktop) / day lists (phone), edited in the CMS (Central Fitness Club → Class timetable). No schedule is published, so the page says the timetable is on its way. |
| CH-013 | Central Day Spa page with prices and booking | **Done** | Calm editorial design, spa logo, full October 2026 price list (editable in the CMS), facilities, gallery. Booking only through existing methods: Lime Booking form (already linked from the hotel's site), +387 33 561 830, +387 62 769 249 (WhatsApp/Viber), dayspa.hotelcentral@gmail.com. Hours from the FAQ. |
| CH-014 | Meetings: up to date, packages, prominent enquiry | **Done (no packages published)** | `/conference` (old `/meetings-events` redirects). Filled enquiry button right after the hero and at the end. "Corporate & meeting packages" lists only verified components; the hotel publishes no fixed packages. |
| CH-015 | Location: review, no exact prices | **Done** | No private parking (FAQ 2026-10-14) — the old "secure, gated car park" claim is removed everywhere. Fares given as approximate ranges with "prices may vary"; airport 10–12 km / 20–25 min. EN/BS taxi discrepancy resolved. |
| CH-016 | Replace "We're standing by" | **Done** | "Our team is here for you" / "Naš tim je tu za Vas" with "Our team is here to answer your questions…". |
| CH-017 | Remove contact form; phone/e-mail only | **Done** | Form, `/api/contact`, validation and Resend variables removed. Large tap-to-call and tap-to-mail tiles; reservations, spa phone, social links. |
| CH-018 | Footer: logo instead of large text, smaller | **Done** | Full logo (≈130 px) plus the Fitness Club and Day Spa marks. |
| CH-019 | New high-definition photos | **Blocked — client to supply** | Existing authentic photos re-selected and re-graded (no stock). Gym photos, café photos and high-resolution originals needed. |
| CH-020 | Privacy policy and legal links | **Blocked — client to supply** | The hotel's current site has no privacy policy or terms page to reuse (it does load a CookieYes banner). Nothing was invented; links will be added once texts exist. |

## Decisions that need the client's approval

* **D1 — brand colours.** The hotel pages keep the existing palette (agency decision). The green **#093128** and burgundy
  **#3f171f** were sampled from the logo artwork supplied for the Fitness Club and the Day Spa and are used only on their
  pages and cards. Please confirm against official brand guidelines (and supply vector logos).
* **D2 — `/conference` as the canonical address** (proposed sitemap) with a permanent redirect from `/meetings-events`.
* **D3 — `/spa` redirects to `/dayspa`.** Alternative: send it to `/centralfitnessclub`.
* **D4 — Central Café** stays a draft until "Discuss" is resolved; publishing = add it to the menu/sitemap and remove `noindex`.
* **D5 — conflicting published facts** (the newest source was used; please confirm):
  * Spa hours: FAQ (Oct 2026) "Tuesday–Saturday 11:00–20:00" vs June 2025 price list "daily incl. Sunday 10:00–21:30, closed Mondays".
  * Spa prices: the spa page still shows the old June 2025 list next to the October 2026 list; only October 2026 is used.
  * Fitness: "three floors" (pool & spa page, About) vs "four floors" (Club & Spa page); "20 classes a week" vs "over 80 a month" (consistent, shown as "around 20 a week").
  * Membership benefits come from the older "West Wood Club & Spa" pages (e.g. "annual membership to both the Health Club and Day Spa") — please confirm they still apply.
  * Family room: BS page says "2 bathrooms", EN page says "sofa bed"; neither is shown as a highlight until confirmed.

## Room corrections (CH-008)

* Junior Suite: "King-size bed" → "Queen/King-size bed" (source: "Queen/King size beds (> 2 m)"); BS highlight "Sofa na rasklapanje" → "Sofa" to match EN.
* Family Room: highlights now list only facts both languages state (air conditioning instead of "sofa bed" / "dva kupatila"); "2 kupatila" removed from the BS description pending confirmation.
* Superior Double: BS amenity "tuš/kada" → "sa tušem" (both descriptions say shower).
* Not changed (booking configuration): the Junior Suite booking id `18019000000000000010` has one digit more than the others but is exactly what hotelcentral.ba uses — please confirm with a test booking.

## Materials needed from Hotel Central

1. Vector logos (Hotel Central, Central Fitness Club, Central Day Spa) and brand guidelines with colour codes.
2. Membership types and **prices**, joining terms, opening hours of the club.
3. The monthly **class timetable** (class, day, time, instructor, studio) — or a staff member to enter it in the CMS.
4. Photos: gym floors and studios, Central Café, high-resolution room and restaurant photos (CH-019).
5. Confirmation of spa opening hours and that the October 2026 price list is current.
6. Meeting/corporate **packages**, if any exist (otherwise the page stays "by individual request").
7. Café opening hours, menu and photos (if CH-007 is approved).
8. Privacy policy, terms, cookie policy and company details for the footer (CH-020).

## Content management

* New CMS globals (no paid plugins): **Central Fitness Club** (class timetable, membership options) and **Central Day Spa**
  (price list). Editors save drafts; administrators publish. Empty = the verified built-in content. Both preview on their own page.
* Homepage global: new section "4 · Central Fitness Club & Central Day Spa"; the old "Club & Spa" texts are hidden (kept, not deleted).
* Migration `20261104_124659_fitness_club_day_spa` is **additive only** (new tables and homepage columns, no DROP). It was
  generated and applied on a local PostgreSQL 16. It must be applied to the hosted CMS database deliberately
  (`docs/operations/CMS_STAGING.md` §3a: back up, then `npm run cms:migrate`) — not done here.
* On a CMS that was already seeded, the **stored** texts win over the new built-in ones. After migrating, an editor should
  update in the admin: Homepage → Rooms text ("completely refurbished"), Location facts (parking, airport), section numbers
  (Events 05, Location 06); Pages → About (rooms section), Rooms (intro), Meetings & Events and Location (transport, parking),
  Contact (hero "We're standing by"); Navigation → add Central Fitness Club, Central Day Spa, change `/meetings-events` to
  `/conference` and remove `/spa`; Footer → add Instagram. Without a CMS (the public demo) all of this is already live.

## Checks run

* `npm run lint`, `npm run typecheck`, `next build` — pass (all routes statically generated).
* Playwright smoke, EN/BS × mobile/tablet/desktop against the production build — **159 passed** (new checks: no contact form,
  redirects, homepage order and buttons, café noindex/sitemap, spa prices and booking link, sub-site navigation).
* Vitest integration suite on a local PostgreSQL 16 (incl. the new `club-spa.int.spec.ts`) — **26 files, 294 tests passed**.
* Visual regression baselines (`tests/e2e/__screenshots__`) are CI-rendered and will differ by design; regenerate them with the
  "update visual baselines" workflow after review.
