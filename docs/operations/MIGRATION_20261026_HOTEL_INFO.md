# Migration review — `20261026_092546_hotel_info`

Status: **written, reviewed and tested on disposable local PostgreSQL databases only. Not applied to the hosted Supabase database.**
Applying it needs the owner's approval and follows `docs/operations/CMS_STAGING.md` §3a.

## What it does
Creates the storage for the new **Hotel Information** global (`src/cms/globals/HotelInfo.ts`). Generated with
`npm run cms:migrate -- create hotel_info` from the config; the SQL was read line by line.

| Kind | Count | Objects |
| --- | --- | --- |
| `CREATE TYPE … AS ENUM` | 5 | `enum_hotel_info_hours_facility`, `enum_hotel_info_status`, and the three `enum__hotel_info_v_*` copies for versions |
| `CREATE TABLE` | 20 | `hotel_info`, `hotel_info_locales`, `hotel_info_phones(_locales)`, `hotel_info_emails(_locales)`, `hotel_info_hours(_locales)`, `hotel_info_hours_rows(_locales)` and the same ten as `_hotel_info_v*` (drafts / version history) |
| `ADD CONSTRAINT … FOREIGN KEY` | 18 | only between the new tables (child → parent, `ON DELETE cascade`) |
| `CREATE [UNIQUE] INDEX` | 44 | only on the new tables |

**Not touched:** every existing table, column, type, constraint and row. The existing `_locales` enum is referenced, not altered.
No `ALTER TABLE` on an existing table, no `DROP`, no `UPDATE`/`INSERT`/`DELETE` (the migration writes no data).

## Test on a disposable database (local PostgreSQL 16)
1. Fresh database; `main`'s migrations and `main`'s `cms:seed` (rooms, pages, navigation, footer, homepage, an administrator): 188 tables, 2 160 data lines.
2. **Up** (`npm run cms:migrate`): 120 ms. 208 tables (+20). `pg_dump --data-only` of every pre-existing table **byte-identical** to step 1;
   pre-existing schema identical (only the new objects added).
3. **Down** (adapter `migrateDown`): 95 ms. Back to 188 tables, no `hotel_info` table or enum left; data **and** schema byte-identical to step 1.
4. **Up again**: same as step 2 (repeatable).
5. The integration and browser suites run on databases built by the committed migrations (the test harness migrates every throw-away
   database), so every test also exercised this migration.

## Order of deployment (when approved)
The new code reads `hotel_info` through `getCmsGlobal`, which already treats any database error as "no CMS value": if the code were
deployed first by mistake, pages would show the built-in details (no outage) and the admin screen would fail until the migration runs.
Still, follow the normal order:
1. `pg_dump --format=custom` of the hosted database (keep the file).
2. Apply on a restored copy first (`cms:restore-drill` covers dump/restore), then on the hosted database: `DATABASE_URL=<pooler> npm run cms:migrate`.
3. Deploy the code.
4. Optional: `npm run cms:seed` fills Hotel Information with the verified details (idempotent; leaves every other existing content alone).
   Without it the form starts empty and the website keeps showing the verified details.

## Rollback
* **Code only** (most likely): redeploy the previous deployment. The new tables are simply unused; nothing else depends on them.
* **Schema**: `migrateDown` (or the `down()` SQL: `DROP TABLE … CASCADE` of the 20 new tables and `DROP TYPE` of the 5 new enums).
  This **deletes whatever staff entered in Hotel Information** (all versions); take a `pg_dump` first. The website then shows the
  built-in details again. Never roll the schema back while the new code is deployed (the admin screen would fail).
* Lock and duration: creating empty tables takes a fraction of a second and only locks the new objects; no table rewrite.

## Risks considered
| Risk | Assessment |
| --- | --- |
| Data loss on existing content | None: no existing object is altered (proved by the byte comparison above). |
| Enum changes later | Adding a "place" type later (e.g. "bar") is an `ALTER TYPE … ADD VALUE`: additive, but a migration. |
| Name length | All identifiers ≤ 63 characters (one index name is truncated by the generator, as in the initial migration; harmless). |
| Supabase pooler (transaction mode) | Plain DDL in one transaction; no `CONCURRENTLY`, no session state; same as the initial migration. |
