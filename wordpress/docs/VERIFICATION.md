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
