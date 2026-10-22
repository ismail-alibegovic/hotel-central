# Quality gates and how to reproduce them

Requirements: Node 22, npm 10. Everything below runs from the repository root.

| Gate | Command | What it checks |
| --- | --- | --- |
| Install | `npm ci` | exact lockfile install |
| Lint | `npm run lint` | ESLint (`next/core-web-vitals`, `next/typescript`) |
| Types | `npm run typecheck` | `tsc --noEmit` |
| Build | `npm run build` | production build, 34 static pages (needs network for Google Fonts) |
| Smoke | `npm run test:e2e` | every EN/BS page and all 6 room pages at 390 / 768 / 1440 px: HTTP 200, one `<h1>`, correct `<html lang>`, no horizontal overflow, no broken images, no console errors or failed sub-requests; 404, root redirect, robots/sitemap, contact-API validation |
| Visual | `npm run test:visual` | above-the-fold screenshots of 11 pages × 3 widths against `tests/e2e/__screenshots__` (2 % pixel tolerance) |
| All static gates | `npm run check` | lint + typecheck + build |

The e2e commands start `next start` on port 3100 themselves, so run `npm run build` first.

## Browser setup
- Normal machine: `npx playwright install chromium`.
- Preinstalled Chromium (e.g. the cloud sandbox): `PW_CHROMIUM_PATH=/opt/pw-browsers/chromium npm run test:e2e`.

## Testing a deployment instead of a local build
`E2E_BASE_URL=https://hotel-central-pi.vercel.app npm run test:e2e` (read-only GETs plus one invalid contact POST that is rejected before any delivery). Do not point it at `hotelcentral.ba`.

## Visual baselines
Determinism measures: reduced motion forced (the site zeroes animation durations under `prefers-reduced-motion`), Playwright animation disabling, fixed locale and time zone, viewport-only captures (no parallax or lazy full-page drift), fonts awaited. Verified locally: baselines generated once, then two further runs were pixel-stable.

Baselines are platform-specific. They were generated on the Linux sandbox image, so the CI `visual` job is **informational (`continue-on-error`)** until its first green run on GitHub's runner. To adopt CI-rendered baselines: run the job, download the `playwright-report-visual` artifact (actual images), review them, commit them, then remove `continue-on-error`. After an intentional design change run `npm run test:visual:update`, review the image diff in the PR, and commit.

## CI
`.github/workflows/ci.yml` runs on every PR and push to `main`: `quality` (lint, typecheck, build) → `smoke` (blocking) and `visual` (informational). Failure reports are uploaded as artifacts. Enable branch protection on `main` requiring `quality` and `smoke` (repo owner action; not done here).

## Environment
`.env.example` lists variable names only. No variable is required to build or run the tests.
