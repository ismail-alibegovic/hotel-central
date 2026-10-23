# Hotel Central Website Manager — admin experience

The Payload admin, presented as a purpose-built **Hotel Central Website Manager** for hotel staff with no technical background. Payload is unchanged underneath; this is branding, wording, a start page and regrouped forms. **No database change** (verified: `npm run cms:migrate -- create …` generates an empty migration), no new permissions for anyone, and the public website's design and CSS are untouched (the admin styles live in `src/app/(payload)/custom.css`, loaded by the admin layout only).

Screenshots (this folder): `login-*`, `start-page-*`, `room-form-*`, `rooms-list-desktop`.

## What staff see
| Where | Before | Now |
| --- | --- | --- |
| Sign-in | Payload logo and form | HOTEL CENTRAL wordmark, "Welcome", one line of guidance, help text (locked-account hint), website colours, `HC` favicon |
| After sign-in | Technical overview of all collections | **Start page**: one large button per task — Rooms, Pages, Photos & Media, Special Offers, Homepage, Navigation & Footer, Website Preview — shown only if the person may use it; the four-step routine (edit, save changes, preview, publish); a note saying whether they are an administrator or an editor |
| Sidebar | Collections / Globals | **Website Content**, **Website Settings**, **Administration** (administrators only) |
| Room form | One long list of fields | Six tabs: 1. Basic Information · 2. Room Description · 3. Photos · 4. Amenities · 5. Google & Search Appearance · 6. Advanced Settings (administrators only) |
| Page form | One long list | Tabs: Page Sections · Google & Search Appearance · Advanced Settings (administrators only) |
| Every form | Status buried in a toolbar | Banner: **Draft** / **Published** / **New**, the four steps, who publishes, and the shared BS/EN publishing note |
| Photo pickers | A drop-down of file names | The same list **plus a preview** of the chosen photo, and a clearly separate "Or upload a new photo" |

## Plain-English terminology
| Technical | Shown as |
| --- | --- |
| Slug | Page URL (built-in pages: "Page") |
| SEO | Google & Search Appearance |
| Blocks / layout | Page Sections |
| Collections | Website Content |
| Globals | Website Settings |
| Media | Photos & Media |
| Users | Team members |
| Save Draft | **Save Changes** |
| Publish changes | **Publish Changes** |
| Live Preview | **Preview Changes** |
| Versions | Earlier versions |
| Section types | e.g. "Large photo with heading", "Text with photos", "Special offers (cards)", "Banner with a button", "Frequently asked questions" |

"Save Changes" saves a **draft**. Visitors see nothing until an administrator uses "Publish Changes"; the banner says so on every form.

## Roles (unchanged, and still enforced by the server)
* **Administrator**: everything, including Publish Changes, Advanced Settings, Team members.
* **Editor**: Save Changes only. The Publish button, the Advanced Settings tab and Team members are not shown; the server still refuses an editor's publish request (API and integration tests).
* One tightening: **only administrators add rooms** (the six rooms exist; "Add new" used to leave a blank draft room behind).

## Languages
The admin is English only. The website's Bosnian and English **content** stays fully editable: every text field is labelled with its language ("— English" / "— Bosanski") and the language switch is at the top of each form. Translating the admin itself was deliberately not done.

## Limitations (honest list)
1. **Publishing is shared by Bosnian and English.** A document has one draft and one published state; publishing publishes both languages' changes. The banner says so. Per-language publishing is prototyped in draft PR #17 and not adopted.
2. **"Special Offers" is a page section, not a list.** Offers are added as "Special offers (cards)" on a page; there is no stand-alone Offers collection (PR #12 is not merged). The card on the start page explains this.
3. **Built-in pages show their key** ("contact") in the page header and breadcrumb; the list shows a friendly name ("Contact").
4. **Editors can still create blank draft pages** with "Add new" (existing behaviour that the API tests rely on). Recommendation: restrict page creation to administrators in a later change.
5. **Payload's own wording remains** for things this work did not override (some toolbar tooltips, validation messages produced by Payload itself, the "Locale:" label).
6. **Payload re-opens the tab each person used last**, a moment after a form loads. It can occasionally flip a tab right after a click; tests wait for the right tab.
7. **Sidebar** is collapsed behind the menu button at 1440 px wide and below (Payload's own breakpoint); the start page is the main menu either way.
8. **Section name box** (Payload's internal "block name") is hidden with CSS; the field still exists in the database.
9. **Visual-regression baselines for the admin screens are not committed**: they must be rendered on the CI runner (fonts). The existing public-site and CMS visual baselines are unchanged and pass.
10. Replacing a room photo takes 12 steps today (upload to the library, then choose it in the room). A direct "upload here" button on the room's Photos tab would shorten it.

## Usability check (an administrator doing real tasks in the browser)
| Task | Steps |
| --- | --- |
| Change a room description in Bosnian and publish | 8 (Edit rooms → room → language → Bosanski → tab 2 → type → Save Changes → Publish Changes) |
| Update a contact detail / opening hours and publish | 5 (Edit pages → Contact → type → Save Changes → Publish Changes) |
| Replace a room photograph | 12 |
| Create a draft special offer on a new page | 11 |
| Preview before publishing | the eye button on any form, or Website Preview on the start page |
| Switch between Bosnian and English | 2 (language switch → choose) |
| Log out and back in on a phone | covered by an automated test at 390 px |

Automated: `tests/cms-e2e/admin-ux.spec.ts` (phone, tablet and desktop) and `tests/int/admin-ux.int.spec.ts` (start-page rules, wording, tab structure).
