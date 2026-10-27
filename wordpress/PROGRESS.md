# Progress (resume here)
Branch `claude/elegant-cerf-vj7kdw`. Next.js app untouched; everything is under `wordpress/`.

## Done
- [x] Foundation: WP 6.9.4 + Elementor 4.3.5 + Polylang 3.9.1 (+ SQLite integration for zero-dependency local runs) via `scripts/setup.sh` (verified on a clean directory: install + seed ≈ 15 s)
- [x] Theme `hotel-central`: tokens, type, pills, hairline loops, artboard compositions, header, full-screen menu, footer, mobile book bar, animations, reduced-motion
- [x] Core plugin: Rooms/Offers/Enquiries CPTs, Hotel Information, booking bar (eZee POST), rooms carousel, rooms list, contact form (REST), SEO/OG/JSON-LD, redirects, same-slug routing for Polylang
- [x] Pages (EN + BS, genuine Elementor documents): home, about, rooms, spa, restaurant, meetings-events, location, contact; room detail template; 404
- [x] Content exported from Next.js source (`content/*.json`; regenerate from repo root with `npx tsx --tsconfig tsconfig.json wordpress/scripts/dump-content.ts`, then copy to `plugin/hotel-central-core/data/`)
- [x] Tests: `tests/functional.js` (18 checks), `tests/elementor-editor.js` (real Elementor editor open/edit/save), `tests/shots.js` + `tests/evidence/*.jpg` (12 pages × 390/768/1440)
- [x] Docs: README, docs/INSTALL, ARCHITECTURE, EDITING, LAUNCH, VERIFICATION; `scripts/package.sh` builds the migration package

## Open / ideas
- Pixel-diff against a rendered Next.js build (needs `npm ci` + build; not done — comparison was by reading the components and visual review)
- Offers: post type + `[hc_offers]` exist; no sample offers were created (the Next.js site only had flagged demo content)
- Real SMTP, production hosting, DNS, redirects review: need the hotel (see docs/LAUNCH.md)
