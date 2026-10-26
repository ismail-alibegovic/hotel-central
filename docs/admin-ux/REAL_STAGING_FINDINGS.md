# Real staging findings — what the owner met, why, and what was done

The owner tested the deployed Website Manager by hand. The automated tests had passed, because they never watched what a person watches:
the preview next to the form, an empty photo library, a menu that does not match the tasks. Each finding below was **reproduced first**, on a
production build against PostgreSQL, before anything was changed. Screenshots: `docs/admin-ux/real-staging/`.

## 1. Live Preview: "editing does not visibly update the preview"

**What the preview is.** The preview next to the form (the eye button, "Preview Changes") is a *server-rendered* preview: it shows the
**saved draft** of the page, not the keystrokes. The form saves a draft by itself 1.5 seconds after typing stops (autosave); the preview
should then reload. It was never meant to change on every keystroke (that needs the page to be built from client-side components, which
the existing, unchanged public design is not).

**Reproduction** (Contact page, English): type in "Reception — address and opening hours", wait. The autosave request is sent after ~1.8 s
(200 OK) and the draft is saved, yet in **about every second attempt the preview never changed** (checked 6 times, repeatedly, and after 20 s).
A full reload of the preview always showed the new text, so the draft was saved and served correctly.

**Root cause (confirmed in Payload's code and with a message trace).** The admin tells the preview "the document was saved" with a
`payload-document-event` message. Payload sends it from the end of an *asynchronous* step after a save (it first fetches fresh form state);
when the form changes again just after an autosave, Payload abandons that step and **the message is never sent**. In the failing runs the
preview window received only the two messages sent at load and nothing after the save. Nothing else was involved: Draft Mode, the preview
cookie, the iframe (same origin, `X-Frame-Options: SAMEORIGIN`), caching and revalidation all behaved correctly (a manual reload shows the
draft; anonymous visitors still get 401 from `/api/preview` and never see a draft).

**Two more defects found while fixing it.**
* A refresh request sent while the preview page was still loading (for example right after "Refresh preview") is lost: the page was not
  listening yet.
* On a screen narrower than 1024 px Payload shows the preview **instead of** the form, and remembers that it was open. A person who comes back
  to a page then sees **no form at all** (the screenshot `preview-narrow-open-tablet.png` is exactly that).

**What was changed** (small, in the admin and the preview page only; the public design and the data are untouched)
1. After **every successful save of the open document** (automatic draft, "Save Changes", publish) the admin itself asks the preview to
   reload, with a numbered request. The preview answers with the same number once the new page has really arrived.
2. Unanswered requests are repeated after 2 s and 4 s, turned into a full reload after 7 s, and after 16 s the bar says so and asks the person
   to click **Refresh preview**. The preview page announces when it starts listening, so a request is not lost while it loads.
3. A bar pinned above the form says what the preview is and what it is doing: *"Preview of your saved draft. It reloads about 2 seconds after
   you stop typing. Updated at 14:03:22."* with a **Refresh preview** button (full reload, always works).
4. On a narrow screen the preview starts **closed** (the form comes first); the eye opens it full-screen and the eye closes it again. The banner
   explains this in one sentence.

**Verified** (browser tests `tests/cms-e2e/preview.spec.ts`, desktop and tablet, production build): four consecutive edits each appear in the
preview within seconds; Bosnian edits appear in the Bosnian page (`/bs/contact`, `lang="bs"`) and nowhere public; "Save Changes" and
"Refresh preview" work; an editor can preview a draft too, and an anonymous request to `/api/preview` is refused with 401; on a narrow
screen the form is shown first, the preview shows the saved draft, and coming back later shows the form again.

**Limits to know.** The preview shows the *saved* draft, about 2 seconds behind typing. Payload's automatic save does not notice typing a
text back to exactly what it started with straight after a manual "Save Changes" (click Save Changes again). Not exercised on the hosted
staging site (needs a signed-in person; the checklist covers it).

## 2. Photos & Media "appears empty"

**Confirmed facts** (checked against the hosted staging resources, without reading any secret):
* The staging database has **0 rows** in the photo library table.
* The Vercel Blob store `hotel-central-cms-demo-media` exists, is **public** (the Payload adapter needs a public store), is connected to the
  staging project (production, preview and development), its token is valid (not expired), billing is active, and it holds **0 files**.
* The website's own photographs (119 files in the website's `public/images`) are **not library entries**: they are files of the website,
  chosen in page sections through "Photo already on the website". They were never part of the library, by design.
* Permissions are not the cause: administrators and editors may create photos; only administrators may delete them.

**Root cause.** Nothing has ever been uploaded, so the library is truly empty, and the screen gave no explanation: the generic "No results"
message did not say what the library is, why it is empty, where the website's photos are, or how to add one.

**What was changed.** The top of Photos & Media now says *"Your photo library is empty. Nothing has been uploaded yet."*, explains that the
website's own photos are built in (and lists them, read only, in a collapsible block, so nothing is a mystery), and offers one obvious
**Add photos** action (several files, or drag them in). Files are checked first with plain advice (iPhone HEIC, wrong type, over 8 MB); uploading
uses Payload's own upload box, so storage, limits and access rules are unchanged. Once photos exist, the same place shows the count and the
button. The photo description is explained in plain words ("read aloud to visitors who cannot see the photo, and helps Google"). Nothing is
imported, changed or deleted.

**Real Blob upload: not verified on the hosted site, and why.** An upload to the hosted store needs a signed-in staff session on the staging
site (protected by Vercel Authentication, which must stay on) and the store's secret token, which I do not have and must not read. The
configuration is right (store public, connected, token valid), but no file has ever been written to it. The first real photo uploaded by a
signed-in person is the verification: **Photos & Media → Add photos → choose a JPG → describe it → Save**, then check that the photo shows in
the library and that the file appears in the Blob store (it reports count 1). The local tests cover everything up to the storage call (the
adapter configuration, the 8 MB and file-type limits, access rules and the whole upload dialog against the local file store).

**Left for a decision.** Importing the website's 119 photos into the library would make them selectable like uploaded ones, but it would
write 119 rows and files to the hosted database and store, so it needs explicit approval (not done).

## 3. Navigation: the sidebar

**What was wrong.** The sidebar was Payload's own grouped list (Website Content / Website Settings / Administration) with *Pages* and
*New pages* side by side, and the Homepage filed under "Website Settings". Staff cannot guess that "New pages" are pages that were added later.

**Proposed and built** (PR "simpler sidebar"): one short list, built on the server from the signed-in person's permissions through
Payload's supported `beforeNavLinks` slot (Payload's own list is switched off with `admin.group: false`; the frame, account menu and phone drawer are Payload's).

| Entry | Administrator | Editor |
| --- | --- | --- |
| Dashboard, Homepage, Rooms, Pages, Photos & Media | yes | yes |
| Website Settings → Navigation, Footer | yes | yes |
| Website Settings → Team members | yes | no |

Pages created in the CMS are reached from a line at the top of the Pages list ("Open added pages"); there is one Pages entry, and it stays highlighted while an added page is open.

**Deliberately not listed** (nothing to open yet; each needs a content model, so it is a follow-up for approval, not a migration slipped in here):
* **Offers**: offers are a section of a page (`OFFER_EXPIRY_PROPOSAL.md`). A stand-alone Offers list with expiry dates is that proposal.
* **Hotel Information** (phone, e-mail, address): fixed in code today (see `STAGING_ACCEPTANCE.md` D3).
* **Google & SEO**: a tab on every page and room, not a destination.

## 4. Editing photos

**What was wrong.** A photo field showed a drop-down of file names, a separate "Or upload a new photo" box, a long accessibility label and crop text, in that order.

**Built** (PR "simpler photo field"): every photo field opens with **the photo guests see now** and one button, **Replace photo** (or **Add photo**), plus
**Go back to the website's photo / Remove photo** for an uploaded one; then the **Photo description** in plain language. The website photo list,
the library chooser and the crop setting are folded under **More photo options**; file names are not shown. The stored values are unchanged (no migration).

**Not done.** Putting each page form in the order *title and text → photos → other sections → Google & SEO → advanced*: a page's content is one ordered list of sections, and the
fields inside a section are set by the section type, so a reorder would change the section definitions and their tests; it is recorded as a follow-up rather than forced.

## 5. Contact page and permissions: verified in a real browser

`tests/cms-e2e/contact.spec.ts` runs at 1440 px and 390 px (phone), against a production build and a disposable database:

* **Administrator**, Bosnian: edit the reception text → *Save Changes* ("Saved as draft") → the public Bosnian **and** English pages do not change → the staff preview
  (`/api/preview`) shows the draft on the **Bosnian** page (`lang="bs"`) and not on the English one → *Publish Changes* lists "Bosnian: 1 change" and "English: no changes" → the public Bosnian page changes, the English page does not.
* **English** is edited and published the same way: the Bosnian text is not in the English form, and the English edit changes only the English page. The hotel's own text is put back and published at the end.
* **Editor**: sees the form and *Save Changes*, no *Publish Changes*; the draft is not public; the server answers **403** to a publish and to adding a page; the editor sees only their own account; no Team members entry; no *Add new* on the pages list.
* No horizontal scroll at 390 px.
Adding or replacing photos is verified on the Homepage (`admin-ux.spec.ts`, "photo field") and on rooms ("Photos tab"), because the Contact page has no photo section.

## 6. Still needs a decision or a person

1. **Real Blob upload** on the hosted staging site (section 2). Needs a signed-in staff session; nothing was uploaded to the hosted store.
2. **Importing the 119 built-in photos** into the library (section 2).
3. **Offers as their own list, with expiry dates** (`OFFER_EXPIRY_PROPOSAL.md`): two nullable columns; migration needs approval.
4. **Hotel Information** (phone, e-mail, address) as editable settings: new content model; needs approval.
5. **Page-form section order** (section 4).
6. **Merging and deploying** PRs #25 to the Contact PR, in order, and a staging redeploy: nothing has been merged or deployed. PR #17 (per-language publishing) is still not to be merged.
