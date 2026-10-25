import type { Page } from "@playwright/test";

/**
 * Click a save control. "Save Changes" (#action-save-draft) saves at once. "Publish Changes" (#action-save) opens a confirmation
 * that lists what goes live in each language, so the confirmation is clicked too: the request the tests wait for is sent by it.
 * If an earlier attempt left the confirmation open, it is simply confirmed.
 */
export async function clickSave(page: Page, selector: string) {
  const confirm = page.locator("#action-publish-confirm");
  if (selector === "#action-save" && (await confirm.isVisible())) return confirm.click();
  await page.locator(selector).click();
  if (selector === "#action-save") await confirm.click();
}
