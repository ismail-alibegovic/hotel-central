# Phase 2 readiness report — Hotel Central CMS

Status: **implementation complete, CMS still OFF by default.** Nothing here enables the CMS on the public demo, provisions cloud services, or touches `hotelcentral.ba`, booking identifiers or production environment variables.

## What Phase 2 delivered
| Area | Result | Where |
| --- | --- | --- |
| SEO fields, sitemap, content-model docs | merged (#11) | `docs/architecture/CMS_CONTENT_MODEL.md` |
| Navigation + footer (BS/EN, admin-only structure) | PR stack #13 | `src/cms/globals/{Navigation,Footer}.ts`, `src/cms/chromeMerge.ts` |
| Offers, FAQ, CTA sections (DEMO / SAMPLE guarded) | PR stack #14 | `src/cms/blocks/config.ts`, `src/components/blocks/Sections.tsx`, `src/cms/hooks/sampleGuard.ts` |
| Pages created in the CMS (localized addresses, preview, sitemap, revalidation) | PR stack #15 | `src/cms/collections/CustomPages.ts`, `src/app/(frontend)/[locale]/[slug]/page.tsx` |
| Home page CMS (text + photographs) | PR stack (last) | `src/cms/globals/Homepage.ts`, `src/cms/homeMerge.ts` |
| CI hardening (Playwright install stall) | in #13 | `scripts/ci/install-playwright.sh` |

All collections, globals and blocks are documented in `docs/architecture/CMS_CONTENT_MODEL.md`.

## Roles and permissions — verified
| Action | Anonymous | Editor | Administrator | Verified by |
| --- | --- | --- | --- | --- |
| Read published content | yes | yes | yes | every `*.int.spec.ts`, HTML parity |
| Read drafts | no | yes (Draft Mode + session) | yes | `chrome-api`, `custom-pages-api`, `home-api` (stolen draft cookie shows nothing) |
| Save draft content (copy, photographs, sections) | no | yes | yes | `chrome.int`, `home.int`, `sections.int`, `custom-pages.int`, UI specs |
| Publish / unpublish | no | **no** (API 403, with or without the draft flag) | yes | same specs |
| Create / delete pages created in the CMS, set their addresses | no | **no** | yes | `custom-pages.int`, `custom-pages-api` |
| Menu structure, destinations, visibility, footer social links | no | **no** (field access drops values; guard rejects structural changes) | yes | `chrome.int`, `chrome-api` |
| Manage users, roles | no | no | yes | existing `security`/`rest` specs |
| Booking ids, contact details, booking address | no | no | **no (code only)** | `cms.spec` booking test, `sections.int` (booking button from code) |
| Publish DEMO / SAMPLE sections | no | no | **no** unless `CMS_ALLOW_SAMPLE_PUBLISH=true` (staging only) | `sections.int`, `sections-api`, `custom-pages.int`, `preflight.int` |

## Draft isolation — verified
- Collection/global read access limits the public to `_status: published`; drafts need Draft Mode **and** a valid staff session (re-checked on every read), responses are `no-store`, previews are `noindex`.
- Tests: editor draft invisible on public pages and in the sitemap; stolen draft-mode cookie shows nothing; never-published pages 404 in every language; unpublishing removes a page everywhere; editors cannot publish by any route.
- Known property (documented, tested): publishing is document-level — an administrator's publish also publishes the pending draft of the other language.

## Database outage
`tests/cms-e2e/outage.spec.ts` stops MongoDB, **rebuilds and restarts** the app (every CMS page is prerendered against a dead database): built-in pages render their static content, pages created in the CMS answer a plain 404 (never 500), the sitemap still lists the built-in pages, the admin API reports an error without leaking connection details, all within a fail-fast budget (selection timeout 4 s, read timeout 5 s).

## Static fallback / CMS off
- CMS off: `/admin` and `/api/*` (except `/api/contact`) are 404; unknown addresses are plain 404s.
- CMS-off HTML of all 28 public pages is identical to the pre-Phase-2-Task-5 build (`scripts/audit/compare-html.mjs`: 28 compared, 0 differ); seeded CMS-on pages are identical to the CMS-off build (`html-parity.spec.ts`).

## Verification results
Local (Node 24.22.1, this repository, final branch):
| Gate | Result |
| --- | --- |
| `npm run lint` / `npm run typecheck` | clean |
| `npm run build` (CMS off) | succeeds |
| `npm run test:int` | 220 passing (18 files) |
| `npm run test:e2e` (smoke, static build) | 117 passing |
| `npm run test:cms-e2e` (all projects except pixel parity, which needs CI-rendered fonts) | 116 passing + outage phase |
| CMS visual specs | 18 stable on regeneration and comparison; baselines rendered by the CI runner |

CI results per PR are recorded in the PR descriptions and checks.

## Risks and limitations (honest list)
1. **Document-level publishing** (above). Mitigation: review both languages; Payload's per-locale status is an option for a later phase.
2. **Pages created in the CMS are one segment deep** (`/en/offers`) and rendered per request (DB read per view, capped at 5 s; a down database gives 404). Chosen over ISR because a cached 404 survived publication.
3. **Language switcher** for pages with different addresses is corrected on the client; the server-rendered link is the prefix swap (hreflang/canonical are correct server-side).
4. **Replacement homepage photographs share one file across languages**; alt text is per language and must be written in both.
5. **Branch protection** on `main` is not enabled (repository owner action).
6. **Editors see a Publish button on globals** (Payload cannot hide it for globals); the server refuses it (tested).
7. CI: the Ubuntu package mirror is intermittently slow; the install script retries with cleanup (see TESTING.md).

## Approvals still needed before the CMS can go live (none done)
- Provision staging resources (MongoDB Atlas, Vercel Blob, staging Vercel project) per `docs/operations/`; run `npm run cms:preflight`.
- Enable branch protection on `main` (require `quality`, `smoke`, `visual`, `cms`).
- Decide when to run `cms:seed` on staging and who the first administrators are.
