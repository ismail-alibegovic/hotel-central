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
| Room photos | A list of empty picture slots | Four plain steps, a large **Upload photos** button (several photos at once, or drag them onto the box), the photos on the website now, and a note that added photos replace the original ones |

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

### Saving and publishing, step by step (what staff see)
1. **Save Changes** → a message appears on screen and stays in the banner at the top of the form: *"Saved as draft — not visible to guests yet."* (and, when the page was published before, *"The website still shows the published version."*). Changes are also saved as a draft automatically while typing; nothing is ever published by saving.
2. **Preview Changes** (eye button) shows the draft to staff only.
3. **Publish Changes** (administrators only) does **not** publish at once. A box lists what is about to go live, **per language**: *"Bosnian (Bosanski): 1 change — Description"*, *"English: no changes"*, plus changes to untranslated settings such as "Show on the website". It says in bold that **Bosnian and English are published together**. The safe choice (Cancel, also Escape) is focused first; *"Publish in both languages"* sends Payload's own publish request. Afterwards the banner says *"Published — guests can see this now, in Bosnian and English."*
4. Payload's extra "Publish in English" entry (a drop-down arrow next to Publish) was removed: it contradicted the shared publishing described here.

The comparison uses the **saved** draft against the published version (both fetched with all languages), so it is accurate to within the automatic save (about 1.5 seconds). For a page that has never been published it says everything saved goes live. If the comparison cannot be loaded, the box still explains the rule and publishing still works.

## Roles (unchanged, and still enforced by the server)
* **Administrator**: everything, including Publish Changes, Advanced Settings, Team members.
* **Editor**: Save Changes only. The Publish button, the Advanced Settings tab and Team members are not shown; the server still refuses an editor's publish request (API and integration tests).
* One tightening: **only administrators add rooms** (the six rooms exist; "Add new" used to leave a blank draft room behind).

## Languages
The admin is English only. The website's Bosnian and English **content** stays fully editable: every text field is labelled with its language ("— English" / "— Bosanski") and the language switch is at the top of each form. Translating the admin itself was deliberately not done.

## Limitations (honest list)
1. **Publishing is shared by Bosnian and English.** A document has one draft and one published state; publishing publishes both languages' changes. The banner and the publish confirmation (which lists the changes per language) say so. Per-language publishing is prototyped in draft PR #17 and deliberately not adopted.
2. **"Special Offers" is a page section, not a list.** Offers are added as "Special offers (cards)" on a page; there is no stand-alone Offers collection (PR #12 is not merged). The card on the start page explains this.
3. **Built-in pages show their key** ("contact") in the page header and breadcrumb; the list shows a friendly name ("Contact").
4. **Editors can still create blank draft pages** with "Add new" (existing behaviour that the API tests rely on). Recommendation: restrict page creation to administrators in a later change.
5. **Payload's own wording remains** for things this work did not override (some toolbar tooltips, validation messages produced by Payload itself, the "Locale:" label).
6. **Payload re-opens the tab each person used last**, a moment after a form loads. It can occasionally flip a tab right after a click; tests wait for the right tab.
7. **Sidebar** is collapsed behind the menu button at 1440 px wide and below (Payload's own breakpoint); the start page is the main menu either way.
8. **Section name box** (Payload's internal "block name") is hidden with CSS; the field still exists in the database.
9. **Visual-regression baselines for the admin screens are not committed**: they must be rendered on the CI runner (fonts). The existing public-site and CMS visual baselines are unchanged and pass.
10. A room's photos replace the built-in ones **as a set**: once the list has photos, only those are shown. The Photos tab says so and shows the original photos until the list is used; it cannot copy the built-in photos into the list (they are files in the website, not entries in the photo library).

## Usability check (an administrator doing real tasks in the browser)
| Task | Steps |
| --- | --- |
| Change a room description in Bosnian and publish | 8 (Edit rooms → room → language → Bosanski → tab 2 → type → Save Changes → Publish Changes) |
| Update a contact detail / opening hours and publish | 5 (Edit pages → Contact → type → Save Changes → Publish Changes) |
| Replace a room photograph (Photos tab → Upload photos) | 9: Rooms → room → Photos tab → Upload photos → choose file → describe it → Save → Publish Changes → confirm. Before: 13 (Photos & Media → Create new → choose file → describe → Save → Rooms → room → Photos tab → Add Photo → Choose from existing → pick → Save Changes → Publish). Each further photo adds only its description, and several photos go in at once |
| Create a draft special offer on a new page | 11 |
| Preview before publishing | the eye button on any form, or Website Preview on the start page |
| Switch between Bosnian and English | 2 (language switch → choose) |
| Log out and back in on a phone | covered by an automated test at 390 px |

Automated: `tests/cms-e2e/admin-ux.spec.ts` (phone, tablet and desktop) and `tests/int/admin-ux.int.spec.ts` (start-page rules, wording, tab structure).

## Photos of a room (how the Photos tab works)
* **Upload photos** opens Payload's own upload box with the chosen files (the same box as "Add new"), so storage (Vercel Blob), the file-type list, the 8 MB limit, access rules and the required photo description are unchanged. When the box is saved, each uploaded photo is added to the room's list; nothing is saved to the room or published until **Save Changes** (the form also saves a draft by itself after a moment) and an administrator publishes.
* **Checked before anything is sent**, with advice in plain words: iPhone **HEIC** photos ("share it as a JPG, or set the camera to Most Compatible"), other file types (JPG, PNG, WebP or AVIF only), files over 8 MB, more than 12 photos in a room. One bad file does not stop the others.
* **Previews**: the chosen photos show as thumbnails in the list; before any are added the panel shows the room's original website photos.
* **Success and error messages**: "2 photos added to this room. Click Save Changes to keep them."; failed uploads are counted and can be retried.
* **Replacing one photo**: remove it with the X in its row and use the row's upload buttons, or upload the new one and drag it into place. **Order**: drag rows; the first photo is the main one.
* Limits: a room's photos replace the built-in set (see limitation 10); descriptions are required per photo and are typed in the language currently shown (switch the language at the top to add the other).
