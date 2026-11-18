# Migration 2026-11-17 — Central Day Spa, Central Fitness Club and new hotel photographs

`src/migrations/20261117_235839_brands_and_photos.ts`, generated with `npm run cms:migrate -- create brands_and_photos`.

## What it changes

* **Two new settings screens (globals)**, each with drafts and versions like Hotel Information:
  * `day-spa` — **Central Day Spa**: price-list categories with treatments (name, duration, price, note) and packages.
  * `fitness-club` — **Central Fitness Club**: membership plans, the weekly class timetable and an optional timetable picture.
* **New photographs selectable in the page editors**: 31 `hc26-*.jpg` files (the hotel's 2026 shoot) are added to every
  `…_static_path` enum with `ALTER TYPE … ADD VALUE`. Existing values and rows are not touched.

Nothing is renamed or dropped. Existing content is unchanged.

## Verified locally (PostgreSQL 16)

1. Up on a database with the two earlier migrations: applied cleanly.
2. Down (adapter `migrateDown`): schema identical to step 1 (`pg_dump -s`, only the dump's random `\restrict` token differs).
3. Up again: applied cleanly. `cms:migrate -- create` afterwards produces an empty migration (config and migrations in sync).
4. `npm run test:int` (every test database is built by the committed migrations): 293/293.

## Applying it

Same as every migration (see `CMS_STAGING.md` §3a): restore-drill copy first, then
`DATABASE_URL=<pooler> npm run cms:migrate`. Deploy the code after the migration.

## Rollback

`migrateDown`. The down step recreates the photo enums without the `hc26-*` values, so first switch any page section that
uses an `hc26-*` photograph back to another photo, or the type change will refuse to run.

## After deploying

* The old `/en/spa` and `/bs/spa` addresses redirect (308) to `/…/centralfitnessclub`. A saved menu entry pointing at
  `/spa` is shown as the two new entries (Fitness Club, Day Spa); update the Navigation screen when convenient.
* The "Club & Spa" page document stays in the database (listed as "Club & Spa (old page, not shown)"); it is no longer used.
* Run the **Update visual baselines** workflow: the header, footer, home page and the new pages changed on purpose.
