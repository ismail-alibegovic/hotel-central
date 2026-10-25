/** Admin screen components shared by the globals that have drafts: Publish (with a summary of what goes live) and Unpublish are shown to administrators only; "Save Changes" confirms that nothing is live yet. */
export const adminOnlyPublish = {
  elements: {
    PublishButton: "/cms/components/PublishForAdmins#PublishForAdmins",
    UnpublishButton: "/cms/components/PublishForAdmins#UnpublishForAdmins",
    SaveDraftButton: "/cms/admin/SaveChangesButton#SaveChangesButton",
  },
};
