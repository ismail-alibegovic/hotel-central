import { APIError, type GlobalBeforeChangeHook, type GlobalBeforeOperationHook } from "payload";
import { roleOf } from "../access";

const refusePublish = () => new APIError("Editors can only save drafts. Ask an administrator to publish.", 403);
const refuseStructure = (what: string) => new APIError(`Only administrators can change ${what}.`, 403);

/** Global counterpart of requireEditorDraft: every editor write must be a draft save. */
export const requireEditorDraftGlobal: GlobalBeforeOperationHook = ({ args, operation, req }) => {
  if (roleOf(req.user) !== "editor") return args;
  if (operation === "update" && !(args as { draft?: boolean }).draft) throw refusePublish();
  return args;
};

export const blockEditorPublishGlobal: GlobalBeforeChangeHook = ({ data, req }) => {
  if (roleOf(req.user) === "editor" && (data as { _status?: string })._status === "published") throw refusePublish();
  return data;
};

type Row = { id?: string | null } & Record<string, unknown>;
const rowsOf = (v: unknown): Row[] => (Array.isArray(v) ? (v as Row[]) : []);

/**
 * Editors may change wording but not structure. Rejects an editor write that adds, removes or reorders rows of
 * `field`, or changes any of the `locked` keys of an existing row (destinations, visibility). A key an editor does
 * not send is "unchanged"; field-level access already drops locked keys, this is the second, independent layer.
 */
export const lockStructure =
  (field: string, locked: string[], what: string): GlobalBeforeChangeHook =>
  ({ data, originalDoc, req }) => {
    if (roleOf(req.user) !== "editor") return data;
    const incoming = (data as Record<string, unknown>)[field];
    if (incoming === undefined) return data;
    const before = rowsOf((originalDoc as Record<string, unknown> | undefined)?.[field]);
    const after = rowsOf(incoming);
    if (after.length !== before.length) throw refuseStructure(what);
    after.forEach((row, i) => {
      if (row.id && before[i].id && row.id !== before[i].id) throw refuseStructure(what);
      for (const key of locked) {
        if (row[key] !== undefined && JSON.stringify(row[key]) !== JSON.stringify(before[i][key])) throw refuseStructure(what);
      }
    });
    return data;
  };
