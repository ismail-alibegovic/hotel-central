// Helpers for driving WordPress admin + the Elementor editor like a person would (used by tests/editor-journey.js).
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
function creds() {
  const f = path.join(__dirname, '../../.local/editor-credentials.txt');
  const o = {}; fs.readFileSync(f, 'utf8').split('\n').forEach((l) => { const m = /^(\w+)=(.*)$/.exec(l); if (m) o[m[1]] = m[2]; });
  return { user: process.env.WP_EDITOR_USER || o.WP_EDITOR_USER, pass: process.env.WP_EDITOR_PASS || o.WP_EDITOR_PASS };
}
async function login(page, base, user, pass) {
  await page.goto(base + '/wp-login.php'); await page.fill('#user_login', user); await page.fill('#user_pass', pass); await page.click('#wp-submit'); await page.waitForURL(/wp-admin/);
}
async function openEditor(page, base, postId) {
  await page.goto(`${base}/wp-admin/post.php?post=${postId}&action=elementor`);
  await page.waitForSelector('#elementor-panel', { timeout: 120000 });
  await page.locator('#elementor-preview-iframe').waitFor();
  const f = page.frameLocator('#elementor-preview-iframe');
  await f.locator('.elementor-element, .elementor-add-new-section').first().waitFor({ timeout: 120000 });
  await page.waitForTimeout(3500);
  await closeNavigator(page);
  return f;
}
async function closeNavigator(page) { const c = page.locator('#elementor-navigator__close'); if (await c.isVisible().catch(() => false)) { await c.click(); await page.waitForTimeout(500); } }
async function openNavigator(page) { if (!(await page.locator('#elementor-navigator').isVisible().catch(() => false))) { await page.locator('#elementor-editor-wrapper-v2 [aria-label="Structure"], button[aria-label="Structure"]').first().click(); await page.waitForTimeout(700); } }
const publishBtn = (page) => page.getByRole('button', { name: /^(Publish|Update)$/ });
async function publish(page) {
  await publishBtn(page).click();
  await page.waitForTimeout(2500);
}
module.exports = { chromium, creds, login, openEditor, publish, publishBtn, closeNavigator, openNavigator };

/* ───────── Elementor panel helpers ───────── */
async function reveal(page, loc) { await loc.first().evaluate((e) => e.scrollIntoView({ block: 'center', inline: 'nearest' })); await page.waitForTimeout(500); }
async function select(page, loc, position) { await reveal(page, loc); await loc.click({ force: true, position }); await page.waitForTimeout(900); }
async function tab(page, name) { await page.locator('#elementor-panel .elementor-panel-navigation-tab', { hasText: new RegExp('^\\s*' + name + '\\s*$', 'i') }).click(); await page.waitForTimeout(500); }
/** Heading widget: Title textarea. */
async function setHeading(page, text) { const ta = page.locator('#elementor-panel .elementor-control-title textarea').first(); await ta.fill(text); await ta.blur(); await page.waitForTimeout(700); }
/** Text Editor widget: type into the visual (TinyMCE) editor like a person would. */
async function setText(page, text) {
  const ifr = page.frameLocator('#elementor-panel iframe[id$="_ifr"]').first();
  await ifr.locator('body').click(); await page.keyboard.press('Control+A'); await page.keyboard.type(text, { delay: 5 }); await page.waitForTimeout(1200);
}
/** Choose or upload an image for the selected Image widget / background control through the real media modal. */
async function pickImage(page, { upload, search, preview = '#elementor-panel .elementor-control-media__preview' } = {}) {
  await page.locator(preview).first().click();
  const modal = page.locator('.media-modal:visible'); await modal.waitFor({ timeout: 30000 });
  if (upload) {
    await modal.locator('#menu-item-upload, button:has-text("Upload files")').first().click();
    await modal.locator('input[type=file]').first().setInputFiles(upload);
    await page.waitForTimeout(4000);
  } else {
    await modal.locator('#menu-item-browse, button:has-text("Media Library")').first().click();
    if (search) { await modal.locator('#media-search-input').fill(search); await page.waitForTimeout(1500); }
    await modal.locator('.attachments .attachment').first().click();
  }
  await modal.locator('.media-button-select').click(); await page.waitForTimeout(1500);
}
async function frontHtml(page, url) { const r = await page.request.get(url); return r.text(); }
module.exports = Object.assign(module.exports, { reveal, select, tab, setHeading, setText, pickImage, frontHtml });

/** Drag a widget from the Elementor panel (e.g. "Heading") onto a target inside the preview, with real mouse events. */
async function dragWidget(page, title, target, offset = { x: 0, y: 0 }) {
  const item = page.locator('#elementor-panel .elementor-element-wrapper', { hasText: new RegExp('^\\s*' + title + '\\s*$') }).first();
  if (!(await item.isVisible().catch(() => false))) { await page.locator('button[aria-label="Add Element"]').click(); await page.waitForTimeout(1200); }
  await item.scrollIntoViewIfNeeded(); const a = await item.boundingBox(), t = await target.boundingBox();
  if (!a || !t) throw new Error('drag: no box for ' + title);
  const sx = a.x + a.width / 2, sy = a.y + a.height / 2, tx = t.x + t.width / 2 + offset.x, ty = t.y + t.height / 2 + offset.y;
  await page.mouse.move(sx, sy); await page.mouse.down(); await page.mouse.move(sx + 12, sy + 8, { steps: 4 });
  await page.mouse.move(tx, ty, { steps: 25 }); await page.waitForTimeout(400); await page.mouse.move(tx + 1, ty + 1, { steps: 3 }); await page.waitForTimeout(300);
  await page.mouse.up(); await page.waitForTimeout(1500);
}
module.exports.dragWidget = dragWidget;
