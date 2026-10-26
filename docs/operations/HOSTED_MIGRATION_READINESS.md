# Hosted database readiness — Hotel Information migration

Status: **rehearsed on a PostgreSQL 17 replica; nothing has been applied to, or written to, the hosted database or the hosted code.**
Everything below that touches the hosted project was a read-only metadata query (table list, role and privilege catalogs, deployment
records) — no table content was read and nothing was changed. The remaining step needs the owner's approval (§8).

## 1. What the hosted environment is (observed, read-only)
| | |
| --- | --- |
| Database | Supabase project `hotel-central-cms` (`aflyyamnwmpphocsakud`), eu-central-1, **PostgreSQL 17.11**, status healthy |
| Schema state | **188 tables** in `public` — exactly the initial schema of `main`; none of the 20 new Hotel Information tables exist; `payload_migrations` has **1** row (the initial migration). The Hotel Information migration is the only one pending. |
| Role the app uses | `hc_cms` (login role, not superuser, no `BYPASSRLS`, no connection limit, may create tables in `public`). It **owns all 188 tables**; they carry no extra grants. |
| Server limits | `max_connections` = 60 (direct connections; the pooler is separate) |
| Staging code | Vercel project `hotel-central-cms-demo`, latest production deployment = commit `4f2e651` (the old `main`, before #30/#31), functions in **fra1** (same region as the database) |
| Other projects in the account | `Estateline`, `Riverina Residence`: unrelated, not touched |

## 2. The migration and its rollback
Full review: `docs/operations/MIGRATION_20261026_HOTEL_INFO.md` (5 enum types, 20 tables, 18 foreign keys, 44 indexes — all new, nothing existing altered).

**Rollback options, cheapest first**
1. *Code only* — redeploy the previous deployment (it never reads the new tables). The new tables stay, unused. No data risk.
2. *Schema* — `DATABASE_URL=<hc_cms pooler string> npm run cms:migrate -- down --yes` (new in this change: rolls back the last batch). It drops
   the 20 tables and 5 types and whatever staff entered in Hotel Information. Take a backup first. Rehearsed: the database returns to the
   restored state **byte for byte** (rows and schema), and the migration then applies again.
3. *Disaster* — restore the pre-migration backup into a new project (§4).

## 3. Role used to run the migration matters (important)
The default privileges of the Supabase `public` schema give **every table created by `postgres` or `supabase_admin` full read/write rights
for `anon` and `authenticated`** (the roles behind the public Data API). The existing 188 tables are safe from that only because the app
role `hc_cms` created them, and no default privileges exist for `hc_cms`.

> **Run the migration with the same connection string the app uses (`hc_cms`).** Not through the Supabase dashboard SQL editor, not as `postgres`.
> A table created as `postgres` would be created with grants for `anon`/`authenticated`, would be owned by the wrong role (the app could then be refused),
> and — with Row Level Security off — would be readable and **writable** through the public Data API if that API is enabled.

After applying, run the two catalog checks of §7.1; both must report zero tables for `anon`/`authenticated`.

## 4. Backup and isolated restore
Procedure and the three pitfalls (PostgreSQL 17 tools, session-mode connection, schema `public` only + table-of-contents restore) are in
`docs/operations/CMS_STAGING.md` §4. The rehearsal is one command (`npm run cms:rehearse`); it is read-only on the source.

**Verified on a PostgreSQL 17.9 replica** built from `main`'s own migration and seed plus staff-style activity (second user, a new page with
drafts in both languages, edited drafts, a published edit): 188 tables, 1 982 rows.

| Check (26, all passed) | Result |
| --- | --- |
| Backup file readable and complete | 949 702 bytes, sha256 recorded, data for 188 of 188 tables, 0.2 s |
| Restore into an isolated scratch database | 1.5 s |
| Restored copy = source | same 188 tables; every table has the same row count **and** checksum (1 982 rows); same 2 862 column/index/constraint/enum definitions; same applied migrations |
| Pending migration on the copy | applies; adds only 20 new `hotel_info` tables; changes **no existing row** and **no existing column, index, constraint or enum** |
| Rollback | `cms:migrate -- down --yes` runs; copy equals the restored state again (tables, rows, checksums, definitions, migrations) |
| Re-apply | applies again; schema equals the first application (208 tables) |
| `cms:seed` after the migration | runs; changes only the new tables |
| CMS on the copy | boots; counts equal the database (2 users, 7 pages, 6 rooms, 1 added page); every global (navigation, footer, homepage, Hotel Information) reads; published About page present in both languages |

**The rehearsal can fail (proven):** PostgreSQL 16 tools against the 17 source → refused with an explanation; a transaction-pooler source (port 6543) →
refused; a non-local restore target → refused; a source edited while the backup runs → the changed table is named and two checks fail; a deliberately bad
migration (an `ALTER TABLE rooms` plus a touched row) → "changed no existing row" and "changed no existing column…" fail.
Also run on PostgreSQL 17.9: the whole integration suite, **285/285 passed** (CI uses PostgreSQL 16; see §6 for the recommendation to align it).

**Not yet done (needs the owner's connection string, which I do not have and must not ask for in chat):** running `npm run cms:rehearse` against the hosted
database itself. The command is in `CMS_STAGING.md` §4; use the **session-mode pooler string** of the `hc_cms` role. It only reads. **Media**: the Blob store holds 0 files, and the
Blob download path of `cms:backup-media` has still never run against a real store.
**No scheduled backup exists.** Supabase Free does not provide one you can rely on; until a schedule is approved, the manual backup before each change is the only one.

## 5. Concurrent-write timeout (investigation)
POOL_SECTION_PLACEHOLDER

## 6. Risks
| # | Risk | Likelihood / impact | Mitigation |
| - | --- | --- | --- |
| 1 | Migration run as the wrong role (`postgres`/dashboard) exposes the 20 new tables to `anon`/`authenticated` and can lock the app out | Medium (easy mistake) / high | §3: run with the app's `hc_cms` string; verify with §7.1 afterwards |
| 2 | Row Level Security is off on all 188 tables (Supabase's critical advisory). **Not exploitable today**: `anon`/`authenticated` hold no privileges on any of them (checked with `has_table_privilege`). It is one grant away from being exposed. | Low / high | §7.2, optional, needs approval; does not affect the app (the owner role bypasses RLS) |
| 3 | A 16-based backup/restore procedure fails on the 17 server | Was certain / medium | Fixed in the runbook; rehearsal enforces matching versions |
| 4 | The backup was never run against the hosted database | Certain until done / medium | Run `npm run cms:rehearse` against it first (read-only) |
| 5 | CI tests PostgreSQL 16, the hosted database is 17 | Low (285/285 pass on 17.9) / medium | Change `postgres:16` to `postgres:17` in `.github/workflows/ci.yml` (separate change, not made here) |
| 6 | Pool exhaustion under concurrent staff edits (§5) | Medium on Fluid compute / medium | §5 |
| 7 | Rolling the schema back deletes what staff entered in Hotel Information | Low / low | Backup first; prefer code-only rollback |
| 8 | Code deployed before the migration | Low / low (site falls back to the built-in details; the admin screen errors until the migration runs) | Order in §8 |

## 7. Verification SQL (read-only; run after the migration, and before it for the baseline)
### 7.1 No public exposure of the CMS tables
```sql
-- both rows must show 0 and 0
select r.rolname,
  count(*) filter (where has_table_privilege(r.rolname, c.oid, 'SELECT')) as tables_readable,
  count(*) filter (where has_table_privilege(r.rolname, c.oid, 'INSERT') or has_table_privilege(r.rolname, c.oid, 'UPDATE') or has_table_privilege(r.rolname, c.oid, 'DELETE')) as tables_writable
from pg_roles r cross join pg_class c join pg_namespace n on n.oid = c.relnamespace
where r.rolname in ('anon', 'authenticated') and n.nspname = 'public' and c.relkind = 'r'
group by r.rolname order by r.rolname;
-- the new tables must belong to the app role (expected: only hc_cms)
select pg_get_userbyid(relowner) as owner, count(*) from pg_class c join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relkind = 'r' group by 1;
```
Before the migration: 188 tables owned by `hc_cms`, 0/0 readable/writable. After: 208 owned by `hc_cms`, still 0/0.

### 7.2 Optional hardening (needs approval; **not applied**)
Turning Row Level Security on for every table, run as `hc_cms` (the owner, so the app keeps full access; `ENABLE`, never `FORCE`), makes the Supabase advisory go away and
keeps the tables closed even if a grant is added later:
```sql
do $$ declare t text; begin
  for t in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', t);
  end loop;
end $$;
```
Test it first on the restored copy with a login that mimics the app (a role that owns the tables); it is reversible with `disable row level security`.
It is Supabase-specific hardening and is deliberately **not** part of the portable Payload migration.

## 8. Exact sequence once you approve (nothing below has been done)
1. **You or I, with the owner's session-mode connection string for `hc_cms` in an environment variable:** `npm run cms:rehearse` against the hosted database → all checks must pass; keep the `.dump` and report (passwords never appear in them; the dump contains password hashes, so store it like a secret).
2. Run the §7.1 queries as the baseline (188 tables, 0/0).
3. Fresh `npm run cms:rehearse` immediately before the change (nobody editing), or at least a fresh `pg_dump`.
4. `DATABASE_URL=<hc_cms pooler string> npm run cms:migrate` (applies only the pending migration).
5. Re-run §7.1 (208 tables, owner `hc_cms`, 0/0).
6. Optionally `npm run cms:seed` (fills Hotel Information with the verified details; idempotent).
7. Deploy the new code to staging (fast-forward `staging` to `main`, production-target deployment, as in `CMS_STAGING.md` §3a); run the staging checklist D3 (`docs/admin-ux/STAGING_ACCEPTANCE.md`).
8. Rollback if anything is wrong: redeploy the previous deployment (§2.1).
