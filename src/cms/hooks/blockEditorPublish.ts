import { APIError, type CollectionBeforeChangeHook, type CollectionBeforeOperationHook } from "payload";
import { roleOf } from "../access";

const refuse = () => new APIError("Editors can only save drafts. Ask an administrator to publish.", 403);

/**
 * Editors may only save DRAFTS. Two layers, because Payload derives `_status` from the request mode:
 *
 * 1. beforeOperation sees the real request mode (`draft` flag, set by REST `?draft=true` and the Local
 *    API `draft: true`). Every editor create / update / version-restore must be a draft save. This is
 *    what stops the sneaky case: with a pending draft on a live page, a plain (non-draft) update arrives
 *    with `_status: "draft"` yet rewrites and unpublishes the live document.
 * 2. beforeChange rejects any write that still carries `_status: "published"` (draft flag + explicit status).
 *
 * Admins and system code (no user) are unaffected. GraphQL is disabled in the config, so REST and the
 * Local API are the only write paths.
 */
export const requireEditorDraft: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (roleOf(req.user) !== "editor") return args;
  if (operation === "create" || operation === "update" || operation === "restoreVersion") {
    if (!(args as { draft?: boolean }).draft) throw refuse();
  }
  return args;
};

export const blockEditorPublish: CollectionBeforeChangeHook = ({ data, req }) => {
  if (roleOf(req.user) === "editor" && (data as { _status?: string })._status === "published") throw refuse();
  return data;
};
