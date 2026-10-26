# Hotel Central Sarajevo — website redesign

**A bilingual, editorial website redesign for Hotel Central Sarajevo, with an optional Payload CMS so hotel staff can edit pages, rooms and media themselves.** Built as a redesign proposal for the hotel; it is not yet the hotel's live site.

**Demo:** [hotel-central-pi.vercel.app](https://hotel-central-pi.vercel.app)

### Highlights

- **Faithful art direction** — homepage compositions are container-query "artboards" measured from the design reference, so type and frames scale exactly at every width.
- **Real booking integration** — the date picker posts the same fields as the hotel's existing eZee booking engine; room pages deep-link to room-specific availability.
- **Opt-in headless CMS** — Payload (Postgres, Vercel Blob storage, live preview) with role-based access, editable rooms, pages and SEO fields; the static site keeps working when the CMS is disabled.
- **Quality gates in CI** — lint, typecheck and build; Playwright smoke tests across EN/BS × mobile/tablet/desktop; CI-rendered visual-regression snapshots; Vitest CMS integration tests; scripted backup/restore drill.
- **Accessible, honest content** — `prefers-reduced-motion` support without hydration issues; every fact sourced from the hotel's own site, with open questions listed rather than invented.

---

## Design reference

Editorial, photography-led website for Hotel Central Sarajevo (Ćumurija 8), built as a
high-fidelity adaptation of the supplied Grand Emily Hotel reference: same composition,
type scale, section rhythm, colour system and photographic treatment, with the hotel's own
content and imagery.

## Stack

Next.js 16 (App Router, SSG, Turbopack) · TypeScript · Tailwind CSS v4 · Motion (`motion/react`) · `next/image` · `next/font`.

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /en (or /bs for bs/hr/sr browsers)
npm run build && npm start
npm run lint
npm run check         # lint + typecheck + build (what CI runs first)
```

## Routes

All routes exist in English (`/en/...`) and Bosnian (`/bs/...`); the language switcher keeps the current page.

| Route | Content |
| --- | --- |
| `/` | Hero + booking bar · The hotel · Rooms carousel · Club & Spa · Restaurant · Location · Meetings & Events · Final booking |
| `/about` | Story, facts, rooms, wellness, gallery |
| `/rooms`, `/rooms/[slug]` | Six room categories; detail pages with specs, full amenities, gallery, room-specific booking link, other rooms |
| `/spa` | Pool, facilities, gym, Wellness Day Spa (links to the hotel's live price list) |
| `/restaurant` | Breakfast, gallery, corporate catering |
| `/meetings-events` | Conference room, verified facts, enquiry |
| `/location` | Tinted Google map, directions link, arrival options, nearby landmarks |
| `/contact` | Click-to-call, mailto, directions, validated contact form |

## Structure

```
src/content/      hotel.ts (facts, booking, maps) · rooms.ts · dictionary.ts (UI/home copy) · pages.ts (page copy)
src/components/   Header · FullscreenMenu · LanguageSwitcher · Footer · Photo · Reveal · DecorativeLine · ui
  booking/        BookingBar · RangeCalendar
  home/           Hero · HotelExperience · RoomCarousel · SpaShowcase · RestaurantShowcase · LocationSection · EventsSection · FinalBooking
  page/           PageHero · EditorialSplit · FactList · Gallery · Statement
src/app/[locale]/ pages · api/contact · sitemap · robots · middleware (locale redirect)
```

Data is separated from presentation: every string and fact lives in `src/content`.

## Design system

- **Colours** (`globals.css` tokens): olive `#50563F`, white, ink `#020D10`, sage `#A1AA82`, deep olive `#363A2A`, warm ivory `#F4F0EC` (paper tone only).
- **Display type**: Balkind is a commercial font and no licensed file was supplied, so the site uses **Gilda Display** (OFL, via `next/font`), the closest high-contrast, wedge-serif match among the candidates tested (Italiana, Cormorant, Bodoni Moda, Bellefair, Prata…). To switch to Balkind, add the licensed files with `next/font/local` in `src/app/[locale]/layout.tsx` and point `--font-gilda` at it.
- **Interface type**: Helvetica Neue → Inter fallback; 9–12 px tracked uppercase labels.
- **Compositions**: the first three homepage sections are container-query artboards measured from the reference (1025×640). Frames are positioned in % and type in `cqw`, so the composition scales exactly. Where titles cross a photograph, an identical title layer is clipped to the photo rect (`.clip-rect`) — plain white on dark frames, `mix-blend-mode: difference` in the rooms carousel (the silvery "KING-SIZE BED" effect of the reference).
- **Photography**: the archive photos are very saturated; a restrained CSS grade (`.grade`, `.grade-dark`, hero filter) pulls them into the reference's muted palette without altering content.
- **Motion**: masked line reveals, clip-path image reveals with settle-scale, gentle parallax, hairline path drawing, cinematic carousel (clip-path wipe + title line swaps), menu clip reveal. `prefers-reduced-motion` zeroes all durations (hydration-safe hook `useReducedMotionSafe`). No scroll hijacking.

## Booking integration

The hotel uses eZee / ipms247 (hotel id `hotelcentralsarajevo`).

- **Book now** links go to `https://live.ipms247.com/booking/book-rooms-hotelcentralsarajevo` (the target of the hotel's own menu).
- **The hero booking bar** posts (new tab) to that URL with exactly the fields of the hotel's official widget (`resui_resbookingbox.js` on /book-now/): `eZ_chkin`, `eZ_chkout` (dd-mm-yyyy), `eZ_Nights`, `eZ_adult`, `eZ_child`, `eZ_room`, `calformat=dd-mm-yy`, `hidBodyLanguage`. Without dates it opens the calendar instead of submitting. Note: the hotel's live widget has the adults/children/rooms selectors switched off, so whether eZee applies those three values should be confirmed with one test search on the live engine.
- **Room pages / carousel** use the room-specific `roomwisedata.php?hid=…&roomtypeunkid=…` links copied from each room page.

## Contact form

`POST /api/contact` validates (shared rules in `src/lib/contact.ts`), has a honeypot and a simple rate limit, and delivers via Resend when `RESEND_API_KEY` + `CONTACT_FROM` are set (see `.env.example`). Unconfigured, it returns 503 and the form shows an honest "email or call us" message.

## Content provenance & open items

All copy, room sizes, amenities, facilities, capacities, transport info and contact details come from hotelcentral.ba (EN and BS, retrieved 2026-10-14). Nothing was invented: no prices, ratings, testimonials, menus, opening hours or walking distances.

To resolve with the hotel:
1. **Image resolution** — most room photos are 890–1200 px wide and restaurant photos 570 px; they look soft in full-bleed heroes on large/retina screens. Higher-resolution originals are needed (and ideally new shoots).
2. **Missing photography** — no gym photography (the site's only fitness image looks like stock, so it is not used) and no authentic Sarajevo city imagery; the location section uses the hotel façade and the map instead.
3. **Taxi price discrepancy** — EN page says ~15 € / 30 KM from the airport; BS page says ~18 € / 35 KM (and 15 € / 30 KM to the airport). Each language currently shows its own source.
4. **Booking guests/rooms parameters** — confirm with a test search (see above).
5. **Presidential suite** source slug is `presidental-suite`; the new site uses `presidential-suite`. Add a redirect at launch if the old URLs are kept.

## Quality gates, CMS and operations

- **Tests & CI:** `docs/TESTING.md` — lint, typecheck, build, Playwright smoke (EN/BS × mobile/tablet/desktop), CI-rendered visual regression, CMS integration and end-to-end suites, backup/restore drill. Node `^24.22.1` (or `^22.23.4`).
- **CMS (Payload, opt-in via `CMS_ENABLED`):** `docs/architecture/CMS_DECISION.md`, `docs/architecture/PAYLOAD_POC.md` (roles, what is editable, how to run), `docs/architecture/DEPENDENCY_AUDIT.md`.
- **Hosted staging runbook, env matrix, backup/restore, free tiers:** `docs/operations/CMS_STAGING.md`.
- **Audit baseline and legacy URL inventory:** `docs/audit/`.
- Indexing: the demo and previews are `noindex`; the site becomes indexable only when `NEXT_PUBLIC_SITE_URL` is set on the production deployment (`src/lib/site.ts`).
