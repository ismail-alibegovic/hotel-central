# CMS Architecture Decision — Payload for Hotel Central

Status: **APPROVED 2026-10-23** (Option A; MongoDB Atlas M0 for dev/staging; Vercel Blob for staging media; admins publish, editors draft only) — subject to successful integration tests. Date: 2026-10-23
Scope: Phase 1 decision input (`HOTEL_CENTRAL_CMS_IMPLEMENTATION_PLAN.md` §Phase 1). No CMS code, no database, no deployment, no paid resource was created for this document.

Evidence legend: **[V]** verified in this session (command/source named) · **[S]** verified by a throwaway spike in a scratch copy · **[U]** unverified / from general knowledge — re-check before relying on it (mainly prices and plan limits).

## 1. Facts that drive the decision

1. **Payload does not support Next.js 15.5.x at all.** [V] `npm view @payloadcms/next@3.92.0 peerDependencies.next` (3.92.0 is current, published 2026-10-22):
   `>=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.3.3 <17.0.0`.
   The same gap (15.5 excluded) is present in 3.80, 3.85, 3.90 and 3.91. Hotel Central is on `next@15.5.28` (patched in PR #3), so it is **outside the supported range** and cannot host Payload as-is. The two supported options are Next **15.4.11+** (older line, security-patch status for that line not verified) or Next **16.3.3+**.
2. **Payload 3.92 needs a newer Node:** [V] `engines.node: ^22.23.4 || >=24.22.1`. The Vercel project already runs Node 24.x [V], but the CI workflow (PR #2) uses Node 22 floating and the local sandbox has 22.22.0, which is *below* the floor. CI must pin `22.23.4+` or `24`.
3. **Spike: this app on Next 16.4.2 + React 19.2.0 works.** [S] In a scratch copy (not in the repo): production build passes (33/33 pages); Playwright smoke **96/96 passed**; visual tests **33/33 matched the baselines generated on Next 15** (no pixel regressions at 390/768/1440). `npm audit --omit=dev`: 0 vulnerabilities. Required changes found:
   - `eslint-config-next@16` is a native flat config: `eslint.config.mjs` must drop `FlatCompat` (2-line change).
   - New React-hooks rule `react-hooks/set-state-in-effect` flags `src/components/Header.tsx:28` and `src/lib/useReducedMotionSafe.ts:14` (two errors, behaviour-preserving fix needed, e.g. `useSyncExternalStore`).
   - `middleware.ts` still works but Next 16 labels it "Proxy (Middleware)" — rename to `proxy.ts` is advisable (deprecation).
   - Next 16 auto-edited `tsconfig.json` (`jsx: react-jsx`, extra `include`).
4. **Both templates are Next 16.** [V] DigitalVantage `next ^16.2.5`, `payload ^3.84.1`, React 19.2; official Website template `next 16.4.2`, React 19.3.1, Node `>=24.22.1`. Both use `@payloadcms/db-mongodb`. Neither lists a cloud storage adapter in `package.json`.
5. **Neither template gives us what Hotel Central needs for routing/design:**
   - *DigitalVantage starter* [V, README + `payload.config.ts`]: localization `pl` (default) + `en`, **no URL-prefixed locales** (cookie → `Accept-Language`, uses `next-intl`; README says per-URL locales are "intentionally left to you"); Docker/Coolify deployment with a persistent volume for uploads (not serverless-friendly); 14 commits, 0 stars/forks, 2 open issues (maintenance posture: single-author, young). MIT licence.
   - *Official Website template* [V, `payload.config.ts`]: **no `localization` key** (EN only); otherwise the most complete reference for pages/blocks/redirects/SEO/search/form-builder/draft preview; maintained with Payload itself; MIT.
   - Hotel Central already has `/[locale]/…` prefixed routing for `en|bs`, so we must write the locale wiring ourselves whichever template is used. Adopting either template wholesale would also bring its own UI/blocks/Tailwind components that conflict with the existing design ("do not replace the frontend with a template design").
6. **Current content model** is TypeScript constants (`src/content/*.ts`, ≈1,030 lines, `Localized<T> = {en, bs}`), 6 rooms, ~130 static JPGs in git, 34 statically generated pages, `dynamicParams = false` in the locale layout [V, BASELINE.md F5].

## 2. Options compared

**A. Same application** — upgrade Hotel Central to Next 16.3.3+ (spike used 16.4.2), embed Payload (admin at `/admin`, API at `/api`), read content through Payload's Local API (in-process, no HTTP).
**B. Separate service** — new Payload/Next 16 project (own Vercel project + repo or monorepo package); the existing frontend stays on Next 15.5.28 and fetches over REST/GraphQL with a read token.
**(C. Other CMS)** — not evaluated in depth: A or B satisfy the plan's compatibility gate, so the plan's condition for considering alternatives ("only if the first options materially fail") is not met.

### Decision matrix (5 = best)

| Criterion | A. Same app (Next 16) | B. Separate service | Notes |
| --- | :-: | :-: | --- |
| Compatibility / migration risk | 3 | 4 | A needs a framework major upgrade, but the spike showed 96/96 smoke, 33/33 visual match; remaining work ≈ 3 small code edits. B leaves the frontend untouched (zero UI risk) but a separate Payload app is still a new Next 16 project. |
| Design preservation | 4 | 5 | Both keep components. A shares one React tree for live preview; B renders only via the existing frontend, same result. Visual tests gate both. |
| BS/EN locale routing | 5 | 4 | A: `[locale]` segment maps directly to Payload `locale` in Local API calls. B: same mapping but over HTTP with `?locale=&fallback-locale=` and duplicated type definitions. |
| Drafts & live preview | 5 | 3 | A: same origin, Next `draftMode()` with a signed token, `@payloadcms/live-preview-react` iframe works without CORS/cookie gymnastics. B: cross-origin preview cookies/CORS and a second set of secrets; workable but more moving parts. |
| Cache invalidation after publish | 5 | 3 | A: `afterChange` hooks call `revalidateTag/Path` in-process. B: webhook from CMS → frontend revalidate route (needs shared secret, retries). |
| Auth & admin roles | 4 | 4 | Identical Payload auth/access model. B isolates admin attack surface from the public site; A relies on route-level separation + Vercel protection on staging. |
| Hosting complexity & cost | 5 | 3 | A: one Vercel project, one build. B: two projects/builds/env sets and two things to monitor . |
| Operations / failure isolation | 3 | 4 | In A a CMS bug or heavy admin bundle shares the function runtime with the public site; B isolates them (public site could keep serving cached pages if CMS is down — A can too if pages stay static/ISR). |
| Developer experience / types | 5 | 3 | A: generated Payload types used directly by components. B: type duplication or a shared package. |
| Rollback | 4 | 5 | A: the Next 16 upgrade lands in its own PR and can be reverted independently before any CMS code; CMS code gated by a feature flag with static `src/content` fallback. B: frontend untouched; rollback = stop calling the API. |
| **Total (/50)** | **43** | **38** | |

Scores are unweighted judgement calls, not measurements. A leads by 5 points; the margin is modest and comes mainly from preview/revalidation simplicity and having one deployable. B wins on failure isolation and zero frontend-upgrade risk.

### Starter/template comparison

| | DigitalVantage starter | Official Website template | Recommendation |
| --- | --- | --- | --- |
| Payload / Next | 3.84.1 / 16.2.5 (ranges `^`) | monorepo `workspace:*` / 16.4.2 | both compatible with Next 16.3.3+ only if bumped (DV's `^16.2.5` resolves upward) |
| Localization | `pl`+`en`, cookie-based, no URL prefix | none | write our own `bs`/`en` config + `[locale]` wiring |
| Deployment assumption | Docker + Coolify + persistent volume | Vercel-friendly | use Vercel + object storage |
| Maintenance | 14 commits, 0 stars, one author | upstream Payload team | prefer upstream |
| Reuse value | localization config shape, form-builder/search/redirect plugin wiring, Vitest+Playwright layout | collections, blocks, preview, SEO, redirects, revalidation hooks | **Use the official template as a reference only; copy patterns file-by-file, keep MIT notices. Do not fork either as the base.** |

## 3. Database: MongoDB Atlas vs PostgreSQL

| | MongoDB (Atlas) | PostgreSQL (Neon / Supabase / Vercel-marketplace) |
| --- | --- | --- |
| Payload fit [V, Payload docs] | Docs recommend it "for simplicity, heavy localization, or many arrays, blocks, `hasMany`" — exactly our content shape (localized block pages) | Docs recommend it for DB-enforced consistency and many relations; requires managing migrations |
| Both starters | `db-mongodb` | — (would be our own divergence from both) |
| Schema evolution | none to manage | Drizzle migrations must be run on every deploy and in staging/prod in sync |
| Backups/restore | Free M0 tier has no continuous backup [U]; production-grade backup = paid dedicated tier [U]; `mongodump/mongorestore` works anywhere | `pg_dump/pg_restore` universal; provider PITR varies by plan [U] |
| Serverless connections | Atlas handles many short connections; cache the client | needs a pooled/serverless driver (Neon/Supabase pooler) |
| Migration cost later | Content is seeded idempotently from `src/content` (Phase 2), so switching DB before launch is a re-seed, not a data migration | same |

**Recommendation: MongoDB Atlas for the PoC and staging** (matches Payload guidance for localized block content and both templates; no migration overhead while the schema is still moving). **The production-database choice stays open until Phase 4**, when the hotel's budget and the backup/restore requirement (plan Phase 4 §5: *a restore must be executed before claiming backups work*) are known; the only hard rule is that production cannot rely on a free tier without tested backups. This is an explicit decision, not a silent one; Postgres remains the fallback if Atlas backup pricing is unacceptable to the hotel.

## 4. Remaining design answers

- **Locale routing:** keep `/{en|bs}/…`. Payload `localization: { locales: ['bs','en'], defaultLocale: 'en', fallback: false }` — `fallback: false` so a missing BS translation is explicit, never silently English (plan Phase 2 §6). The `[locale]` param is passed to every Local API call; hreflang/canonical stay in `src/lib/seo.ts`.
- **Route structure (A):** Next requires distinct root layouts for the public site and Payload admin: move the current app into a `(frontend)` route group and add `(payload)` for `/admin` + `/api`. `dynamicParams = false` must change to `true` (with `generateStaticParams` from CMS slugs) before CMS-created pages can exist.
- **Design preservation:** CMS drives *data*; existing components stay. Blocks map 1:1 to existing components (hero, split, gallery, room list, FAQ, CTA, …). Static `src/content` remains as the fallback while CMS is behind a flag. Every PR must pass `npm run test:visual` (PR #2) with zero unexplained diffs.
- **Media & Vercel:** serverless filesystem is ephemeral, so uploads go through an official storage adapter [V — Payload lists S3, Azure, GCS, Uploadthing, Vercel Blob]. Staging: **Vercel Blob** (`@payloadcms/storage-vercel-blob`), keeping `next/image` with `remotePatterns`. Existing ~130 JPGs remain in git and are migrated to Media in Phase 2 by script. Per-locale `alt` text field, MIME/size limits.
- **Auth & roles:** Payload `users` with `roles: ['admin','editor']`; role field writable only by admins (field-level access); editors cannot touch globals marked privileged (booking config) or user management; no public registration; secure cookies; login lockout enabled. Staging admin additionally behind Vercel Deployment Protection; no shared/hard-coded passwords. Password reset email via Resend test sandbox only.
- **Drafts / preview:** `versions.drafts` (+ autosave) on Pages and Rooms; preview URL signed with `PREVIEW_SECRET`, enables `draftMode()`; public routes never read drafts (explicit `_status: 'published'` filter + tests).
- **Booking & contact:** untouched in Phase 1. Booking settings become a privileged global in Phase 2.
- **Deployment:** new Vercel *staging* project (not the current production demo), Vercel Deployment Protection on, `NEXT_PUBLIC_SITE_URL` unset (stays noindex per PR #3). Production domain/DNS untouched.

## 5. Cost and operations (indicative, all **[U]** — confirm before quoting to the hotel)

| Item | Staging/PoC | Production (estimate to validate in Phase 4) |
| --- | --- | --- |
| Vercel | Existing team; Hobby is licensed for non-commercial use only | Pro plan (≈ US$20/seat/month) is expected for a commercial hotel site |
| Database | Atlas M0 free | Atlas dedicated tier with backups (low tens of USD/month) *or* Postgres tier with PITR |
| Media | Vercel Blob, minimal | usage-based; ~130 photos is small |
| Email | Resend free tier | free tier likely sufficient for contact + password reset; domain verification BLOCKED (hotel) |
| Monitoring | Vercel + free tier error reporting | same |
| Backups | none on free tier — **not a production posture** | required; restore must be rehearsed |

## 6. Recommended implementation (pending your approval)

**Choose Option A — single application, Next 16, Payload 3.92 (pinned exactly, all `@payloadcms/*` identical), MongoDB Atlas for staging, official Website template as a pattern reference, Vercel Blob for media.**

Small reviewable PRs (each green on `npm run check`, smoke, visual):
1. **Done:** PR #1 (audit), #3 (security/noindex) and #2 (CI/tests, Node `^24.22.1`, blocking visual regression) are merged.
2. **`chore/next-16`**: Next 16.4.2 + React 19.2 only; flat ESLint config; fix the two hook-rule errors; `middleware.ts`→`proxy.ts`. Gate: smoke 96/96 and visual 33/33 with no baseline updates. This is the rollback boundary: nothing CMS-related exists yet.
3. **`feat/payload-poc`** (Phase 1 proper): `(frontend)`/`(payload)` route groups, Payload config (bs/en, `users` with roles, `media` → Vercel Blob, `pages`, `rooms` with drafts), one room + one page read via Local API behind `CMS_ENABLED`, static fallback preserved, preview route, tests for: login, editor cannot publish/escalate (publish is admin-only), draft isolation, per-locale independence, preview token, redeploy persistence. **Stop expansion if the PoC fails** (plan rule).
4. Then Phase 2 per plan.

Triggers to switch to Option B: the Next 16 PR cannot get visual/smoke parity; Payload's function bundle exceeds Vercel limits for the combined app; or the hotel wants the CMS operated/hosted separately from the website. Reverting from A to B is cheap before launch because content access goes through one `getPage/getRoom` data layer and the content is re-seedable.

## 7. Open questions / blockers (need a human)

| # | Item | Owner |
| --- | --- | --- |
| 1 | ~~Approve Option A, Atlas, Blob~~ **Approved**; | you |
| 2 | Creating a **free** Atlas M0 cluster, a new Vercel staging project and a Blob store requires your accounts/consent (not done; nothing created) | you |
| 3 | Production DB/backup budget, Vercel Pro plan, billing owner | hotel — BLOCKED: HOTEL ACCESS REQUIRED |
| 4 | ~~Editor publish rights~~ **Resolved:** admins publish; editors create/edit drafts only and cannot publish, manage users or change privileged settings | decided |
| 5 | Verify all **[U]** prices/limits on the vendors' current pricing pages | me, at provisioning |
| 6 | Security-patch status of Next 15.4.x line (only relevant if B-with-downgrade is ever considered) | n/a unless needed |
