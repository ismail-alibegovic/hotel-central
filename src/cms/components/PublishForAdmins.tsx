import { PublishButton, UnpublishButton } from "@payloadcms/ui";
import type { PublishButtonServerProps, UnpublishButtonServerProps } from "payload";

/**
 * Payload cannot hide the Publish control of a global from users who may not publish (it evaluates update access against the
 * stored, already published document). Editors would see buttons that only ever answer 403, so they are rendered for
 * administrators only. These are server components: the role comes from the authenticated request, so nothing is switched on
 * the client and administrators get Payload's own, unmodified buttons. The server still refuses every editor publish
 * (requireEditorDraftGlobal / blockEditorPublishGlobal).
 */
const isAdmin = (user: unknown) => (user as { role?: string } | null | undefined)?.role === "admin";

export function PublishForAdmins({ user }: PublishButtonServerProps) {
  return isAdmin(user) ? <PublishButton /> : null;
}

export function UnpublishForAdmins({ user }: UnpublishButtonServerProps) {
  return isAdmin(user) ? <UnpublishButton /> : null;
}
