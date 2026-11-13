# Progress (resume here)
Branch `claude/elegant-cerf-vj7kdw`. Next.js app untouched; everything is under `wordpress/`. Nothing deployed; production/DNS/hosting untouched.

**2026-11-13:** combined with the Round 1 client changes on `claude/adoring-pasteur-dhsf07`. WordPress is the final CMS. Plan and risks: `docs/ARCHITECTURE_RECOVERY.md` (repo root).

**2026-11-13 (later) — Round 1 ported in the original design language** (details: `docs/ROUND1_DESIGN_QA.md`):
- [x] Seeder maps pages and menus **by key** with parents (risk R1 fixed); upgrade of a pre-Round-1 site tested with a staff edit (kept); Club & Spa page → Draft; redirects for old addresses (EN + BS)
- [x] New sitemap: Central Café (`/about/cafe`), Central Fitness Club (+ Membership, Class timetable), Central Day Spa (editable price list, Lime Booking), Conference (`/conference`, proposal band), Contact without form, Meetings before Location, daylight hero photo
- [x] Official Hotel Central logo (from hotelcentral.ba) in header and footer; Club & Spa logo removed; footer hierarchy hotel → Fitness Club / Day Spa; Day Spa without its rectangle (derived file, needs approval) — `theme/hotel-central/assets/brand/README.md`
- [x] No gold: original outlined pills; header "Book now" as an outlined pill (CH-003)
- [x] Rooms carousel: feature as eyebrow above the name, no overprint, sized to the column; split titles fit their column (13 Nov fix ported)
- [x] Full-screen menu: restrained type, sub-pages as a second level, smaller photo
- [x] Fitness Club / Day Spa: own logo, colours, display face (OFL fonts, local), section menus (Appearance → Menus), brand footer; pages under them inherit the brand
- [x] Opening hours per place (Café, gym, pool, Day Spa) in Hotel Information → `[hc_hours places=… fallback=…]`
- [x] Visual QA of `main` vs 13 Nov vs WordPress at 1440/768/390 (`tests/qa-capture.js`, sheets in `tests/evidence/round1-qa/`)
- [x] Editor-role browser test of the Round 1 workflows: `tests/round1-editor.js` (17/17); `tests/functional.js` updated for the new sitemap
- Note: run the local server with `PHP_CLI_SERVER_WORKERS=6` — the single-process server makes the Elementor editor ~3× slower.

## Done
- [x] Foundation, theme, core plugin, 16 Elementor pages (EN+BS), rooms CPT, booking, forms, SEO, redirects (see README / docs/ARCHITECTURE)
- [x] **Fidelity pass (this session)**: Next.js rendered next to WordPress at 390/768/1440; every page ≤ 1.2 % height difference; element-level fixes — docs/FIDELITY.md, sheets in tests/evidence/compare/
- [x] **Safe seeding**: `seed.php` never overwrites edited content (pages hash-checked, rooms/menus/settings/translations only created when missing); explicit `HC_SEED_RESET=1`, refused on `production` environment type
- [x] **MariaDB 10.11** install verified (`WP_DB_NAME=… ./scripts/setup.sh`): 18/18 functional, mobile suite, editor save
- [x] **All 16 pages** open, edit and save in the Elementor editor (`tests/elementor-all.js`), slugs unchanged after save (fix: `wp_unique_post_slug` guard — saving /en/about/ used to become /en/about-2/)
- [x] Mobile navigation + booking suite (`tests/mobile.js`, 21 checks)
- [x] Accessibility: axe-core 0 violations on 12 URLs × 2 widths (`tests/axe.js`); Lighthouse a11y 96–97, best-practices 100 (`tests/lighthouse.js`)
- [x] Elementor console error traced to WordPress core `wp-auth-check.min.js` (heartbeat), not our code, no functional effect
- [x] Performance: Elementor front-end JS dequeued on the public site; results in docs/VERIFICATION.md

- [x] **Complete Elementor Free editing system (this session)**: Kit design system, 31-template library, editor admin hardening (Hotel Information split, room-type lock, Create-BS-copy, Main menu box), full 14-step Editor journey in a real browser incl. theme-update persistence — docs/EDITING.md, docs/ELEMENTOR-SYSTEM.md, docs/VERIFICATION.md
- [x] **Client acceptance audit (15 requirements)**: 14 PASS, 1 PARTIAL (external SMTP) — docs/CLIENT_ACCEPTANCE.md, Bosnian guide docs/UPUTSTVO.md, training plan docs/TRAINING.md, tests/acceptance-all.sh (65/65)

## Open
- Offers section has no sample content (post type + `[hc_offers]` exist)
- Firefox/Safari/real devices, real SMTP, motion frame-comparison: not done
- Production hosting/DNS/redirect review need the hotel (docs/LAUNCH.md)
