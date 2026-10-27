# Verification — what was actually run (2026-10-27, headless Chromium via Playwright, PHP 8.3 built-in server, SQLite)

| Check | Result |
| --- | --- |
| Clean install with `scripts/setup.sh` into an empty directory, then `tests/functional.js` against it | 18/18 pass |
| WordPress renders all 12 URLs (EN/BS pages, room detail) at 390 / 768 / 1440 px, no horizontal overflow, no JS errors | pass — screenshots in `tests/evidence/` |
| **Elementor Free editor** opens a seeded page (92 elements), selecting a heading opens its panel, editing + *Publish/Update* persists and renders on the front end (`tests/elementor-editor.js`) | pass |
| Menu opens/closes (Esc), 8 items; booking bar: range select → "3 nights" → POST fields `eZ_chkin/eZ_chkout/eZ_Nights/eZ_adult/eZ_child/eZ_room/calformat` open `live.ipms247.com/booking/book-rooms-hotelcentralsarajevo` in a new tab | pass |
| Rooms carousel advances (text + photo swap) | pass |
| Contact form: validation messages, delivery (mail captured by the dev mail log), honeypot/rate-limit implemented | pass (delivery with a real mail server not tested) |
| EN↔BS language switch keeps the page; BS content/UI strings | pass |
| Redirects: legacy `/club-spa/` → `/en/spa/`, typo slug `/rooms/presidental-suite/`, `/about/` → `/en/about/`; 404 page | pass |
| SEO: title/description/canonical/OG/hreflang/JSON-LD present; sitemap lists EN+BS pages (when indexing is enabled); staging is `noindex` | pass |

## Not verified / known limitations
* **No pixel comparison against the Next.js build** (not built in this environment). Layout follows the Next.js components' measurements; small differences are possible (spacing, hero overlay, Elementor wrapper behaviour).
* Google Maps iframe and the eZee engine are external and unreachable in the test sandbox (map renders blank there). The booking POST was intercepted, not submitted to the live engine.
* Real e-mail delivery, Safari/Firefox and real mobile devices, accessibility audit (axe), performance (Lighthouse) — not run.
* Elementor logs one internal console error (`reading 'hasClass'`) inside its own editor; no effect observed.
* Re-running `seed.php` overwrites Elementor edits on the seeded pages. Elementor Free has no Theme Builder, so header/footer/menu are theme code (text via Hotel Information, Menus and Polylang strings).
* Display font is Gilda Display (OFL), as in the Next.js site; Balkind is unlicensed.
* Production migration, DNS and hosting were not touched and need explicit approval.
