# Verification (2026-10-27, headless Chromium/Playwright; PHP 8.3 built-in server)

Run everything: `node tests/functional.js`, `node tests/mobile.js`, `node tests/elementor-all.js`, `AXE=…/axe.min.js node tests/axe.js`, `node tests/lighthouse.js`, `node tests/compare.js` (needs the Next.js app on :3100).

| Area | Result |
| --- | --- |
| **Fidelity vs Next.js** (390/768/1440, 11 pages) | height within ±1.2 %, element probes match on hero/title/spacing/typography — docs/FIDELITY.md; sheets in `tests/evidence/compare/` |
| **Database** | SQLite (default) **and MariaDB 10.11** (`WP_DB_NAME=hotel WP_DB_USER=hc WP_DB_PASS=… WP_DB_HOST=127.0.0.1:3307 ./scripts/setup.sh`): functional 18/18, mobile suite pass, editor open/edit/save pass |
| **Elementor Free** — open, edit, save, restore every page | 16/16 pages (home, about, rooms, spa, restaurant, meetings-events, location, contact × EN/BS); slugs unchanged after save |
| Elementor editor console error `Cannot read properties of undefined (reading 'hasClass')` | comes from WordPress core `wp-includes/js/wp-auth-check.min.js` (heartbeat tick handler); appears intermittently in long editor sessions on any theme; saving, editing and rendering unaffected. Not caused by the theme/plugin |
| **Mobile navigation + booking** (iPhone-13 emulation, 21 checks) | menu open/close/scroll-lock, 46 px links, navigation, language switch from menu; booking bottom sheet (full width, one month, 44 px days), range → nights, steppers, scrim, eZee POST fields + new tab, no-dates hint; sticky book bar show/hide; no horizontal scroll |
| Desktop functional (18 checks) | menu, booking bar, carousel, contact form delivery/validation, EN↔BS, redirects, 404, no JS errors |
| **Accessibility** (axe-core, WCAG 2 A/AA + best practice, 12 URLs × 1440/390) | **0 violations** after fixes (decorative overprint clones made `inert`, footer headings → text, book bar as labelled `aside`). Manual: skip link, focus trap in menu, `Esc`, visible focus outline, `prefers-reduced-motion`, `lang` per language, alt text from the media library |
| Lighthouse (simulated, staging = `noindex`) | accessibility 96–97, best-practices 100, SEO 69 (only because staging is `noindex`; 100 expected at launch) |
| Lighthouse performance (local PHP dev server, no caching/CDN, simulated 4G/CPU) | mobile 79 (home) / 84 (rooms) / 92 (room) / 94 (contact); desktop 60 / 62 / 76 / 63. Home LCP is the hero caption, which the design fades in after 1.6 s (same choreography as the Next.js site); TBT ≤ 40 ms; CLS 0. Page weight 0.3–1.0 MB mobile, photographs ≤ 710 KB. Elementor front-end JS removed from public pages. Expect better with page caching, gzip/brotli and a CDN |
| Seeding safety | first run creates; re-run refreshes only unedited pages and reports skipped ones; `HC_SEED_RESET=1` refused when `WP_ENVIRONMENT_TYPE=production`, allowed for local/development/staging |

## Not verified / known limitations
* Firefox and Safari (only Chromium installed), real phones, screen readers (NVDA/VoiceOver).
* Motion timing is ported (same durations/easings) but not frame-compared with the Next.js build.
* Real e-mail delivery (mail is logged to `wp-content/mail.log` in dev), the live eZee engine (POST intercepted), Google Maps offline in the sandbox.
* Performance numbers are from a local PHP built-in server; re-measure on the real host.
* Elementor Free has no Theme Builder: header/footer/menu are theme code.
* Production migration, DNS and hosting untouched; need explicit approval.

## Elementor editing system (third pass) — real-browser editor journey
Environment: WordPress 6.9.4, Elementor 4.3.5 Free (e_atomic_elements / v4 opt-in off → classic widgets), Polylang 3.9.1 Free, **MariaDB 10.11** (also SQLite for the regression suites), PHP 8.3, headless Chromium (Playwright) at 1600 px. A separate **Editor-role** user (`hotel_editor`, random password in the git-ignored `wordpress/.local/editor-credentials.txt`) performs every step through wp-admin and the Elementor editor — mouse/keyboard only; HTTP is used only to read published pages back.

`tests/journey-all.sh <site> <url>` = reset to seeded state → steps 1–13 → install a new theme + plugin release as real copies (`wp theme install --force`) → step 14. Latest run: **34/34 checks (steps 1–13) + 8/8 (step 14) + 12/12 update-persistence**. Evidence: `tests/evidence/editor-journey/` (RESULT.txt, RESULT-update.txt, step screenshots, `new-landing-{en,bs}-{desktop,tablet,mobile}.png`).

| # | Action (as Editor) | Verified |
|---|---|---|
| 1 | edit homepage text in Elementor | live on `/en/` |
| 2 | replace a photograph (media library upload) | new file served 200, old file still in library |
| 3 | add a section by dragging Heading/Text/Button | live, correct position, brand font from Site Settings with no classes |
| 4 | duplicate a section (context menu) | appears twice |
| 5 | reorder sections by mouse drag | order changed and saved |
| 6–7 | new page from empty canvas; insert 3 saved templates; customise; publish | live, site chrome present, page uses global styling, axe 0 violations at 1440/390 |
| 8 | "Hide on mobile" | hidden at 390, visible at 1440 |
| 9 | Create BS copy → translate → publish | `/bs/<same-slug>/`, hreflang both ways, footer language switch lands on the sibling page |
| 10 | add both pages to menus | EN menu/footer and BS menu/footer |
| 11 | new room (EN) + BS copy | in rooms list and homepage carousel, `/en|bs/rooms/garden-studio/`, books via general booking page; room-type-id field absent for Editors |
| 12 | change phone/e-mail/hours | header, menu, footer, contact, location (EN+BS); booking-engine screen refused for Editors; booking write via POST ignored |
| 13 | publish a wrong edit, restore from Revisions | previous title live again |
| 14 | theme + plugin update, seeder re-run | pages/templates (edited ones), Kit, hotel info, menus, translations, rooms, media identical; editor still opens, edits, publishes |

Regression after the refactor (SQLite site): functional 18/18, mobile suite pass, `elementor-all` 16/16 pages edit/save/restore with slugs unchanged, axe 0 violations (12 URLs × 2 widths), fidelity vs Next.js page-height difference ≤ 1.1 % at 390/768/1440 (`tests/compare.js`), 31 templates render without horizontal overflow at 1440/390 (`tests/templates-preview.js`).

Defects found and fixed by the journey: image reveal animation never fired (IntersectionObserver ignores fully clipped targets and `display:contents` parents); hotel-information save was discarded for Editors (three sanitisers on one option); new pages/rooms take the language of the admin-bar filter (documented, `new_lang`); `openEditor` waited for an element on empty pages; template names matched case-insensitively ("Homepage hero" for "Page hero"). Not testable here: Firefox/Safari, real SMTP, production hosting.

## Client acceptance audit (fourth pass)
`tests/acceptance-all.sh` — 65/65 checks as an Editor/Administrator in the browser (users, roles, local-mail password reset, offers + prices, price list, opening hours, Basic Gallery, menus, footer, SEO/alt/slug, hierarchy, protected Site Settings, preview before publish, core pages EN+BS). Results and per-requirement mapping: docs/CLIENT_ACCEPTANCE.md. Regression after the changes: editorial journey 34/34 + 8/8 + update-persistence 12/12, functional/mobile/axe/elementor-all green on the SQLite site, fidelity ≤ 1.1 % vs Next.js. Real e-mail delivery (SMTP) remains unverified; the reset mail is captured locally.
