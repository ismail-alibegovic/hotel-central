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
