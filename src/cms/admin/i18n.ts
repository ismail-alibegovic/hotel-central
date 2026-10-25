import { en } from "@payloadcms/translations/languages/en";

/**
 * Administration language: plain English only, with the technical vocabulary replaced by everyday words
 * (Globals → Website Settings, Save Draft → Save Changes, Live Preview → Preview Changes …). It is independent of the
 * website's own Bosnian / English content languages, which stay fully editable.
 */
export const adminI18n = {
  fallbackLanguage: "en" as const,
  supportedLanguages: { en },
  translations: {
    en: {
      general: {
        collections: "Website Content",
        globals: "Website Settings",
        dashboard: "Home",
        livePreview: "Preview Changes",
        createNew: "Add new",
        createNewLabel: "Add new {{label}}",
        addNew: "Add new",
        addNewLabel: "Add {{label}}",
        noResults: "Nothing here yet ({{label}}). Add the first one, or try a different search.",
        deleteLabel: "Delete {{label}}",
        confirmDeletion: "Please confirm deletion",
        documentLocked: "Someone else is editing this right now",
        takeOver: "Take over editing",
        unsavedChanges: "You have changes that are not saved. Save them or discard them before you continue.",
        status: "Status",
        // Words that belong to the software rather than to the hotel
        payloadSettings: "Account settings",
        locale: "Editing language",
        backToDashboard: "Back to the start page",
        noLabel: "Not filled in",
        updatedAt: "Last changed",
        createdAt: "Added on",
        perPage: "Rows per page: {{limit}}",
      },
      version: {
        draft: "Draft (not visible to visitors)",
        published: "Published (visible to visitors)",
        saveDraft: "Save Changes",
        publishChanges: "Publish Changes",
        unpublish: "Unpublish (take offline)",
        versions: "Earlier versions",
        revertToPublished: "Discard changes and go back to the published version",
        autosave: "Automatic saving",
        autosavedSuccessfully: "Changes saved automatically.",
        savedSuccessfully: "Changes saved. Visitors will not see them until an administrator publishes.",
        publishedSuccessfully: "Published. Visitors can now see these changes.",
        aboutToPublishSelection: "You are about to publish. Visitors will see these changes straight away.",
        aboutToUnpublish: "You are about to unpublish. This will no longer be visible to visitors.",
        aboutToRevertToPublished: "This discards your unpublished changes and goes back to the version visitors see now.",
        noFurtherVersionsFound: "There are no earlier versions.",
        currentDraft: "Latest saved changes",
        versionID: "Version number",
      },
      upload: {
        selectFile: "Choose a photo",
        addImage: "Add a photo",
        dragAndDrop: "drag and drop a photo",
        dragAndDropHere: "or drag and drop a photo here",
        bulkUpload: "Upload several photos",
      },
      fields: {
        chooseFromExisting: "Choose from the photo library",
      },
    },
  },
};
