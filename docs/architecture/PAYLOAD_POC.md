# Payload CMS proof of concept — status, how to run, evidence

Branch `feat/payload-poc` (stacked on `chore/next-16`). Implements Architecture A from `CMS_DECISION.md`:
Payload 3.92.0 inside the existing Next.js 16 app. **Opt-in:** with `CMS_ENABLED` unset the site is
byte-for-byte the static site (no Payload code runs, `/admin` and the CMS API return 404).

## What is in scope (and what is deliberately not)
| Requirement | Implementation | Status |
| --- | --- | --- |
| Payload + PostgreSQL | `src/payload.config.ts`, `@payloadcms/db-postgres` (was MongoDB until the Supabase move) | DONE (tested on disposable PostgreSQL databases) |
| BS/EN localized content | `localization: en, bs`, `fallback: false` (missing translation stays empty, never silently English) | DONE |
| Admin/editor access control | `src/cms/access.ts`, collections `Users`, `Pages`, `Rooms`, `Media` | DONE |
| Drafts and publish | `versions.drafts` (+ autosave) on Pages and Rooms; **only admins publish** | DONE |
| Live preview, secure | admin Live Preview → `/api/preview` (staff session required, internal `/en|/bs` paths only) → Draft Mode; drafts are served only if Draft Mode **and** a valid staff session | DONE |
| One page from CMS | `about` (hero eyebrow/title/intro + meta title/description) | DONE |
| Rooms from CMS | **all six rooms** (Phase 2): copy (name, title lines, feature, size label, summary, description, highlights, amenities — per language), photographs (Media, replace the static set when present), plus admin-only order/visibility/size/booking id; list page, detail page, home carousel, sitemap all follow the CMS | DONE |
| Static fallback | `getCmsDoc` returns `null` on disabled CMS / missing / unpublished / any error; blank fields fall back per field (`src/cms/overrides.ts`) | DONE |
| Media prepared for Vercel Blob | `vercelBlobStorage` enabled only when `BLOB_READ_WRITE_TOKEN` is set; otherwise local `MEDIA_DIR` (dev/test) | PREPARED — **no Blob store exists; real upload NOT TESTED (needs authorization)** |
| Supabase PostgreSQL (Free) | connection by `DATABASE_URL` only | see `docs/operations/CMS_STAGING.md` |
| Other rooms/pages, blocks, globals, redirects, SEO, seeding of all content | — | OUT OF SCOPE until the PoC is accepted (Phase 2) |

## Role model
| Capability | admin | editor | anonymous |
| --- | :-: | :-: | :-: |
| Read published pages/rooms | ✓ | ✓ | ✓ |
| Read drafts | ✓ | ✓ | ✗ |
| Edit **drafts** | ✓ | ✓ | ✗ |
| Add a page or a room ("Add new") | ✓ | ✗ | ✗ |
| Publish / unpublish / restore a live version | ✓ | ✗ | ✗ |
| Change a document's `slug`, the eZee `roomTypeId` (privileged) | ✓ | ✗ (silently ignored; field hidden) | ✗ |
| Delete documents / media | ✓ | ✗ | ✗ |
| Create/delete users, change roles | ✓ | ✗ (can edit own name/password only) | ✗ |
| Upload media (images only, alt text required) | ✓ | ✓ | ✗ |

The first account created becomes the administrator; later ones default to editor. Brute force:
5 failed logins lock an account for 10 minutes. Sessions 2 h, cookies `HttpOnly`, `SameSite=Lax`, `Secure` in production, CSRF origin allow-list from `NEXT_PUBLIC_SERVER_URL`.
GraphQL is disabled (one write path to defend). Admin and CMS API responses carry `X-Robots-Tag: noindex`.

### A bug the tests found (worth knowing)
With a pending draft on a live page, an editor's plain (non-draft) update arrived with `_status: "draft"`, **rewrote the live content and unpublished it**, and a hook looking only at `_status` could not see it. Fixed by `requireEditorDraft` (a `beforeOperation` hook that sees the real `draft` flag): every editor create/update/restore must be a draft save. Covered by Local-API and REST tests.

## How to run
Needs Node `^22.23.4 || >=24.22.1` (Payload's engine range).
```bash
npm ci
npm run test:int       # 30 tests: Local API + the real REST handlers, throw-away PostgreSQL databases (`HC_TEST_PG_URL`, see docs/TESTING.md)
npm run test:cms-e2e   # seeds, builds and starts the app with CMS_ENABLED=true, then 8 Playwright API/browser checks
npm run cms:generate   # regenerate src/payload-types.ts and the admin import map after config changes
npm run cms:seed       # idempotent: copies static about + junior-suite into the CMS; never overwrites existing docs
```
Manual use against your own database: copy `.env.example`, set `CMS_ENABLED=true`, `DATABASE_URL`, `PAYLOAD_SECRET`
(long random), `NEXT_PUBLIC_SERVER_URL`, optional `SEED_ADMIN_EMAIL/PASSWORD`, then `npm run cms:seed && npm run dev`.

`payload generate:types` / `payload run` fail in this toolchain ("Illegal constructor" in undici when tsx transpiles
`arguments[0]`); the `cms:*` scripts use the tsx CLI directly instead (`scripts/cms/*.mts`).

## Evidence (local Node 24.22.1 + GitHub Actions, Payload 3.92.0)
| Check | Result |
| --- | --- |
| `npm run lint`, `npx tsc --noEmit` | PASS |
| `npm run build`, CMS disabled / enabled | PASS; public routes stay prerendered (`●`) in both modes |
| Smoke (CMS off) | 99/99 — includes "CMS surface returns 404 when disabled" |
| Visual regression (CMS off), 13 pages × 3 widths incl. About EN/BS | blocking CI job; baselines rendered on the CI runner (locally set `E2E_BASELINES_DIR` to compare against your own renders) |
| `npm run test:int` | **58 tests / 8 files**: auth + lockout, role matrix, draft/publish, draft privacy on every REST read path (filters, sorts, versions, counts, search), no oracle on privileged fields, no user enumeration, locale isolation, media validation over REST (SVG, disguised HTML, 8 MB limit, traversal), persistence across restart, Blob wiring, env-secret hygiene |
| `npm run test:cms-e2e` | **38 tests**: 12 CMS-vs-static pixel parity (About + Junior Suite, EN/BS, 390/768/1440 against the static baselines), 14 browser admin tests (login, role views, draft/publish/BS-EN independence, room editing; mobile and desktop), 10 HTTP tests (CSRF, preview auth, stolen draft cookie, cache headers, booking form/link unchanged, fallback), 2 DB-outage tests (site rebuilt and served with the database stopped); plus client-bundle secret scan and server-runtime trace scan |
| `npm run cms:restore-drill` | PASS — dump → destroy → restore → verify (login with original password, both locales, pending draft, media file) |

### Dependency audit with Payload installed
Payload's tree adds findings that Next 16 alone did not have. Fixed: **DOMPurify (critical, via `monaco-editor` inside the admin UI)** by the `overrides.monaco-editor.dompurify ^3.4.17` entry.
Accepted, with no upstream fix available: **`braces` stack-exhaustion DoS (GHSA-vfj7-8cjw-p6xm, high)** reached through `@payloadcms/next → sass → chokidar` (build-time Sass watcher) and `@payloadcms/storage-vercel-blob → plugin-cloud-storage → find-node-modules → micromatch` (path discovery). The attack needs a deeply nested glob *pattern* chosen by the attacker; these libraries only match developer-controlled patterns, so no request data reaches them. npm reports it as 10 findings because it counts every package up the chain. Re-check on each Payload bump; do not apply `npm audit fix --force` (it proposes a 0.11 downgrade of the editor).

## NOT done / needs authorization
- Atlas M0 cluster, Vercel Blob store, a staging Vercel project, env vars on Vercel, any deployment: **not created** (explicitly requires separate approval).
- Browser-driven admin editing (clicking through the Payload UI, live-preview iframe, Lexical) — the admin login screen is verified, editing is verified over REST only. NOT TESTED in a browser.
- Real Blob upload/persistence across redeploys, Atlas backup/restore, production cost: NOT TESTED / BLOCKED.
- Visual parity of the CMS-rendered `about`/`junior-suite` against the static render is asserted by text only; add `/en/about` to the visual baselines before Phase 2.
- With the CMS enabled the public pages are still **prerendered** (verified: `●` SSG in the build output with `CMS_ENABLED=true`) and regenerated on demand: publish/unpublish/delete hooks call `revalidatePath` for the affected locale routes, and Draft Mode requests bypass the cache. Content therefore only reaches visitors after an admin publishes, and the public path does not hit the database per request. Consequence: `CMS_ENABLED` and `DATABASE_URL` must also be present at **build** time (a build against an unreachable database still succeeds and falls back to static content — tested).
- Email (password reset) uses Payload's console adapter; production needs Resend (BLOCKED: hotel domain).

## Rollback
Unset `CMS_ENABLED` (site returns to pure static, `/admin` + CMS API 404 again); reverting the PR removes everything.
Content read path is one function (`getCmsDoc`), so switching to Architecture B later changes one file.

## References used (MIT)
Official Payload Website Template (layout/admin/api route scaffolding, import-map convention) and the
DigitalVantage starter (localization config shape). No UI, styling or frontend components were taken from either.
