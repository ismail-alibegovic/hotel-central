# Round 1 — design correction, visual QA and WordPress integration (13 Nov 2026)

Three sources, three roles:

| Source | Role | Where |
| --- | --- | --- |
| Original `main` (Next.js, 26 Oct) | **Visual design authority** for the hotel site | branch `main` |
| 13 Nov Round 1 (Next.js) | **Client requirements and content** (sheet CH-001…CH-020) | branch `claude/tender-sagan-b4iz47` |
| WordPress + Elementor Free + Polylang | **Final delivery platform** | `wordpress/` on `claude/adoring-pasteur-dhsf07` |

Method: the three were rendered locally — `main` and 13 Nov as production Next.js builds (CMS off), WordPress on a disposable SQLite
database — and captured with the same script (`tests/qa-capture.js`) at 1440×900, 768×1024 and 390×844, full page plus header,
open menu and footer, 16 addresses each. Side-by-side sheets (original | 13 Nov | WordPress, made by `tests/qa-sheets.js`) are in `tests/evidence/round1-qa/`. Nothing on `main`, the 13 Nov branch,
production or any hosting was changed.

## 1. What changed on 13 Nov, and what WordPress does with it

| Element | Original `main` | 13 Nov | Classification | WordPress now |
| --- | --- | --- | --- | --- |
| Header logo | typeset "HOTEL CENTRAL" wordmark | image of the **Club & Spa** logo ("HOTEL CENTRAL — Club & Spa") | Required (CH-001 *add logo*) — **wrong asset: visual regression** | Official hotel logo (four stars, HOTEL CENTRAL, the building — the logo hotelcentral.ba itself uses) hangs from the bar at the top of each page; the original typeset wordmark takes over in the compact bar |
| Book now / Let's go | outlined pills (white/ink), link-style "Book now" in the header | solid gold `#CBAA5C` pills | CH-003 asked for *more visible*; gold = **unnecessary deviation** (no brand gold was supplied) | Original outlined pills everywhere; header "Book now" becomes an outlined pill (more visible, same design system); hero bar and phone book bar unchanged |
| Hero | night façade, dark veil, booking bar on the photo | daylight façade, light veil, booking bar on a frosted panel | Photo: **required** (CH-001 *brighter*, approved photo). Light veil + frosted panel: **deviation** | Daylight façade photo in the original composition and veil, booking bar as on `main` |
| Rooms carousel | feature line ("HIGH LARGE BED") as a huge display line overprinting the photo with a blend layer; long features collide and become unreadable | same | **Original layout weakness**, inherited by 13 Nov and WordPress | Feature is a small eyebrow with a hairline above the room name (the treatment the room pages already use); name sized to its column; nothing overlaps the photo; mobile identical logic |
| Club & Spa band (home) | one composition (title, pool, treatment room), one button | replaced by two light cards with logos and buttons | Two brands + two buttons: **required** (CH-004). New card layout and light band: **deviation** | Original composition kept (new approved photos); the two official logos with their own outlined buttons in a band directly below, same colour |
| Section order | … Location, Meetings | Meetings before Location | **Required** (CH-005) | Meetings before Location |
| Location band | dark | light | **Deviation** (13 Nov reading of "brighter") | dark, as on `main` |
| Full-screen menu | 8 large serif items, portrait photo | 8 items + tiny inline sub-links; same large type and photo | Sitemap: **required**. Composition: **regression** (weak hierarchy, crowded) | Restrained type (≈ 70 % of before), sub-pages as an indented second level with a hairline marker, smaller landscape photo seated above the contact block, focus outlines; BS/EN labels from the approved sitemap |
| Footer | giant "HOTEL CENTRAL" type | Club & Spa wordmark + two marks of equal weight; Day Spa logo inside its burgundy rectangle | Logo instead of type: **required** (CH-018). Wrong logo, flat hierarchy, rectangle: **regression** | Official hotel logo dominant; "Also at Hotel Central" with the Fitness Club and Day Spa marks as a secondary row (Day Spa without the rectangle); original info columns, language links and mobile stacking |
| Fitness Club / Day Spa | one "Club & Spa" page | two stand-alone branded sections | **Required** (CH-009/010/013) — allowed to differ | Own logo, colours (sampled from the logos), display face (Oswald / Cormorant Garamond, OFL, served locally), section menu under the bar, brand footer endorsed by the hotel logo; the hotel's menu, booking and usability stay — built from the hotel's own section types |
| Café, Conference, Contact, Location copy, redirects | — | `/about/cafe`, `/conference`, contact without form, no fares, 301s | **Required** | All present (EN + BS), same addresses and redirects |
| Split titles on Café | — | "EVERY MORNING" ran off the right edge until 13 Nov's second commit | **Visual regression** (fixed on 13 Nov) | Same fix ported: split titles never exceed their column (0 overflowing titles on 8 pages checked) |

## 2. Logos — what was found

* **Primary logo:** not in the hotel's Drive folder (it holds photos, two Fitness Club SVGs and the Day Spa file only). The logo in the
  header of hotelcentral.ba (`hotelcentral-retina.png`, 260×360, four gold stars + HOTEL CENTRAL + building) is byte-identical to the
  unused `public/brand/hotel-central-logo-stars.png` on 13 Nov — this is the official hotel logo and is used now.
* **Day Spa:** the Drive "Day spa SVG" is a 652×468 PNG with the burgundy background baked in — **no transparent original exists.**
  A background-only extraction is used (every pixel of the mark keeps its colour; nothing redrawn). **Approval needed.**
* **Dark grounds:** the hotel logo is dark ink; on the dark header/footer a single-colour reversal (ink → ivory, stars untouched) is used.
  **Approval needed.** Details and file list: `theme/hotel-central/assets/brand/README.md`.

## 3. Import / seeding (disposable database)

* The seeder now maps pages and menus **by key**, never by position (fixes the earlier risk R1), with parents for Café, Membership and
  Timetable, and builds the Fitness Club / Day Spa section menus.
* Tested as an **upgrade of a pre-Round-1 site** with a simulated staff edit on the Restaurant page: Restaurant → Café and Meetings →
  Conference were re-keyed in place (the edited page kept its text, got its new address and was reported as skipped), the combined Club &
  Spa page went to **Draft** (not deleted), unedited menus were rebuilt, edited menus would be left alone and reported.
* All 18 new addresses answer 200; `/en|bs/spa/`, `/restaurant/`, `/meetings-events/` and the legacy hotelcentral.ba addresses answer 301
  to the new pages.

## 4. Editing verified in a real browser (Editor role)

`tests/round1-editor.js` — see `tests/evidence/round1-editor/RESULT.txt` and screenshots. Day Spa price: Save Draft (live unchanged) →
Preview (new price) → Publish (live); Fitness Club title and photo (Media Library); Bosnian page edited independently; room size;
opening hours for Café / Day Spa / gym reaching EN and BS pages; Fitness Club section menu label; main menu sub-pages; a new page under the
club inherits the club's look and address. `tests/elementor-all.js` opens, edits, saves and restores every page in the Elementor editor.

What staff manage outside Elementor (by design): logos, colours and header/footer layout (theme), section menus (Appearance → Menus),
opening hours and contact data (Hotel Information), interface words (Languages → Translations, administrators).

### Test results (full output: `tests/evidence/round1-qa/TEST-RESULTS.md`)

| Suite | Result |
| --- | --- |
| `tests/round1-editor.js` — Round 1 workflows as an **Editor** | **17/17** |
| `tests/elementor-all.js` — all 22 pages (EN+BS) opened, edited, saved, verified live and restored in Elementor | **22/22** |
| `tests/functional.js` — menu + sub-pages, booking bar, carousel, contact without form, language switch, 301s, 404, JS errors | **22/22** |
| `tests/mobile.js` — mobile menu (11 links ≥ 40 px), language switch, booking sheet, sticky book bar, no horizontal scroll | **20/21** — see below |

* The one mobile failure — *"Let's go" opens the booking engine in a new tab* — happens only under the suite's stub of `live.ipms247.com`.
  Without the stub the tab opens in 0.9 s and reaches the engine; the desktop suite passes the same flow. Left failing and reported, not hidden.
* **External finding for the hotel:** `live.ipms247.com` now 302-redirects to `letsbook.me`, and after the redirect the engine showed
  *adults=2, children=0* although the search sent 3 adults / 1 child — the booking provider's redirect appears to drop the search details.
  This is the existing eZee integration (unchanged by this work); worth raising with eZee/the hotel.

### Found and fixed during the final pass
* **Header logo size:** the theme's base rule `.hc img{height:auto;max-width:100%}` outranked the logo's size, so on phones the logo
  rendered 199 px tall and swallowed taps meant for the booking sheet's backdrop. Rules now scoped (`.hc .hc-wordmark .hc-logo`); verified
  76 px on an emulated iPhone and the backdrop tap works. (Earlier 390 px screenshots used a desktop browser context and did not show it.)
* Mobile menu sub-page links were 27 px tall → 40 px touch targets.
* Header "Book now" pill wrapped on phones → never wraps.
* Fitness Club / Day Spa: the header call-to-action collided with the centred brand logo on phones → hidden below 768 px (it is in the page and section menu).

## 5. Open items

* **Design point for the hotel's review:** at the top of the homepage the hanging logo's building drawing sits over the photograph's own
  tower dome (both are centred). A darker crown of shade behind the bar keeps it legible; changing it further means recropping the approved
  photo or altering the logo, which needs the hotel's decision.

* **From the hotel:** vector logos (hotel incl. light version, Day Spa transparent) and approval of the two derived files; café/gym/pool/spa
  opening hours; membership options and prices; the monthly timetable; conference packages; Instagram links; privacy/legal pages; room
  review; Bosnian treatment names (see `docs/ROUND1_REQUIREMENTS_MATRIX.md` §4).
* Elementor shows its own promotional pop-ups to editors (e.g. an AI add-on); they are closed with ✕ (documented for staff).
* Not done here: Firefox/Safari/real devices, real SMTP, hosting/staging deployment (needs authorisation).

## 6. How to review

```bash
cd wordpress && ./scripts/setup.sh 8080                       # fresh local site (SQLite), seeded with Round 1
PHP_CLI_SERVER_WORKERS=6 php -S 0.0.0.0:8080 -t site scripts/router.php
```
Open http://localhost:8080/en/ (admin / `WP_ADMIN_PASS`, default `admin-change-me` — change it). Re-run checks:
`node tests/qa-capture.js out http://localhost:8080 wp` (screenshots), `node tests/functional.js`, `node tests/mobile.js`,
`node tests/round1-editor.js` (on a disposable copy), `node tests/elementor-all.js`, and the comparison sheets with
`node tests/qa-sheets.js out <mainUrl> <nov13Url> <wpUrl>` (build `main` and `claude/tender-sagan-b4iz47` with `npx next build` / `next start`).
Set `PW_CHROMIUM` to a Chromium binary if Playwright cannot find its own.
