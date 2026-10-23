# Proposal: per-language publishing (mitigation for document-level publishing)

## The limitation
Publishing in Payload is document-level. When an administrator publishes (in either language) everything pending in the document is published, **including a draft someone else saved in the other language**. In the admin form the administrator sees the pending draft; an API call that carries only one language does the same. It is documented and tested (`tests/int/home.int.spec.ts`, "publishing is document-level").

## Recommended mitigation (prototype in this branch)
Turn on Payload's per-locale status: `experimental: { localizeStatus: true }` plus `versions.drafts.localizeStatus: true` on Pages, Rooms, New pages, Navigation, Footer and Home page. Each language then has its own draft/published state; publishing Bosnian can no longer publish an English draft and vice versa.

Evidence (this branch, Node 24):
- `test:int` 220/220 (the one test that pinned the old behaviour now asserts isolation: a Bosnian publish leaves the English draft a draft).
- `test:cms-e2e` projects html-parity, admin-*, api, chrome-api, sections-api, custom-pages-api, home-api: 88/88, after adjusting two specs to the new semantics (below). Public reads, drafts/preview, roles, sitemap, hreflang and revalidation all work per language unchanged.

## What changes for editors and administrators (decide before adopting)
1. **Structure is shared, publication is not.** Re-ordering or adding sections published in English does not change the published Bosnian page until Bosnian is published as well. Until then the two languages can show different section orders. (Spec updated: publish both.)
2. **Unpublish is per language**: unpublishing English leaves Bosnian live (and its sitemap entry). (Spec updated.)
3. The admin shows per-language publish controls ("publish this language" / "all languages"). Editors still cannot publish (hooks unchanged).
4. Sitemap, alternates and the language switcher already work per language, so a page can exist in one language only by design.

## Risks / why it is a proposal, not merged
- It is **experimental** in Payload 3.92 (`experimental.localizeStatus`); behaviour may change in minor releases. Pin the version and re-run the suite on upgrade.
- It changes the persisted shape of `_status` (per-locale). **No environment has data yet** (the CMS has never been enabled anywhere), so adopting it before first seeding needs no migration; adopting it later needs Payload's `localizeStatus` migration (template ships with Payload).
- Soak it on the protected staging CMS first (see `docs/operations/`), including the admin UI at 390 px and 1440 px.

## Interim safeguards if it is not adopted before launch
- Keep the documented rule: review both languages before publishing; the admin form shows pending drafts.
- Administrators publish through the admin UI (which shows pending drafts), not through ad-hoc API calls.
