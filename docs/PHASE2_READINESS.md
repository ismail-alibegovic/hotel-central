# Phase 2 readiness report — Hotel Central CMS

Status: **integrated into `main` (final integration SHA `09ad307`), CMS still OFF by default.** Nothing here enables the CMS on the public demo, provisions cloud services, or touches `hotelcentral.ba`, booking identifiers or production environment variables.

## What Phase 2 delivered
| Area | Result | Where |
| --- | --- | --- |
| SEO fields, sitemap, content-model docs | merged (#11, `e5c31be`) | `docs/architecture/CMS_CONTENT_MODEL.md` |
| Navigation + footer (BS/EN, admin-only structure) | merged (#13, `ffe96b0`) | `src/cms/globals/{Navigation,Footer}.ts`, `src/cms/chromeMerge.ts` |
| Offers, FAQ, CTA sections (DEMO / SAMPLE guarded) | merged (#14, `43f257b`) | `src/cms/blocks/config.ts`, `src/components/blocks/Sections.tsx`, `src/cms/hooks/sampleGuard.ts` |
| Pages created in the CMS (localized addresses, preview, sitemap, revalidation) | merged (#15, `d2919e9`) | `src/cms/collections/CustomPages.ts`, `src/app/(frontend)/[locale]/[slug]/page.tsx` |
| Home page CMS (text + photographs) | merged (#16, `09ad307`) | `src/cms/globals/Homepage.ts`, `src/cms/homeMerge.ts` |
| CI hardening (Playwright install stall) | merged (#13) | `scripts/ci/install-playwright.sh` |

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
`tests/cms-e2e/outage.spec.ts` points the app at an unreachable PostgreSQL port, **rebuilds and restarts** the app (every CMS page is prerendered against a dead database): built-in pages render their static content, pages created in the CMS answer a plain 404 (never 500), the sitemap still lists the built-in pages, the admin API reports an error without leaking connection details, all within a fail-fast budget (selection timeout 4 s, read timeout 5 s).

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

Final integration: every PR was merged only with all four required jobs green on its current head (quality, smoke, visual, cms). Pre-Phase-2 build vs final `main` (CMS off): 28 pages compared, 0 differ; no pre-existing visual baseline was modified (36 baselines added, 0 changed); live production smoke (16 pages × 3 widths) clean; the live demo answers 404 on `/admin`, `/api/*` (except `/api/contact`) and `/api/preview`, i.e. the CMS is disabled there.

## Risks and limitations (honest list)
1. **Document-level publishing** (above). Mitigation proposed and prototyped in draft PR #17 (Payload `localizeStatus`, tests green, trade-offs documented in `docs/architecture/PROPOSAL_PER_LANGUAGE_PUBLISHING.md`); not merged — it is experimental and should soak on staging first. Until then: review both languages and publish from the admin UI.
2. **Pages created in the CMS are one segment deep** (`/en/offers`) and rendered per request (DB read per view, capped at 5 s; a down database gives 404). Chosen over ISR because a cached 404 survived publication.
3. **Language switcher** for pages with different addresses is corrected on the client; the server-rendered link is the prefix swap (hreflang/canonical are correct server-side).
4. **Replacement homepage photographs share one file across languages**; alt text is per language and must be written in both.
5. **Branch protection** on `main` is not enabled (repository owner action).
6. ~~Editors saw a Publish button on globals~~ — fixed in #16: Publish/Unpublish are server components that render for administrators only; editors get a Save Draft button. The server still refuses every editor publish (tested). Residual Payload quirk: after an autosave the admin UI occasionally (about 1 in 25 local runs) ignores one click on Publish with no message; reloading (the autosaved draft is intact) and clicking again works.
7. CI: the Ubuntu package mirror is intermittently slow; the install script retries with cleanup (see TESTING.md).

## Approvals still needed before the CMS can go live (none done)
- Provision staging resources (MongoDB Atlas, Vercel Blob, staging Vercel project) per `docs/operations/`; run `npm run cms:preflight`.
- Enable branch protection on `main` (require `quality`, `smoke`, `visual`, `cms`).
- Decide when to run `cms:seed` on staging and who the first administrators are.
