# Progress (resume here)
Branch `claude/elegant-cerf-vj7kdw`. Next.js app untouched; everything is under `wordpress/`. Nothing deployed; production/DNS/hosting untouched.

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
