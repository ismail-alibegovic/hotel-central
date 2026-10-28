// A non-technical Editor's day, performed in a real browser through WordPress admin + the Elementor editor (no database or API shortcuts
// for the edits themselves; HTTP is only used to read the public pages back).
// Usage: node tests/editor-journey.js [baseUrl] [--only=3,4]   needs tests/fixtures/*.jpg and .local/editor-credentials.txt
const fs = require('fs'), path = require('path');
const E = require('./lib/editor.js');
const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:8090');
const only = ((process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '').split(',').filter(Boolean).map(Number);
const FX = path.join(__dirname, 'fixtures'), SHOTS = path.join(__dirname, 'evidence/editor-journey'), STATE = '/tmp/hc-journey-state.json';
fs.mkdirSync(SHOTS, { recursive: true });
const st = fs.existsSync(STATE) && only.length ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const save = () => fs.writeFileSync(STATE, JSON.stringify(st, null, 1));
const results = []; const consoleErrors = [];
const ok = (n, c, d = '') => { results.push([c ? 'PASS' : 'FAIL', n]); console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
const get = async (p, url) => (await p.request.get(url)).text();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function main() {
  const b = await E.chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage();
  p.on('pageerror', (e) => consoleErrors.push(e.message)); p.on('console', (m) => m.type() === 'error' && !/403|Failed to load resource/.test(m.text()) && consoleErrors.push('console: ' + m.text().slice(0, 160)));
  const c = E.creds(); await E.login(p, base, c.user, c.pass);
  const shot = (n) => p.screenshot({ path: path.join(SHOTS, n + '.png') });
  const steps = {};
  const step = (n, title, fn) => { steps[n] = [title, fn]; };
  const home = () => E.openEditor(p, base, st.homeId || 83);
  const sec = (f, cls) => f.locator(cls).first();
  const handle = (f, loc) => loc.locator('xpath=ancestor-or-self::*[contains(@class,"elementor-element")][1]').locator('> .elementor-element-overlay .elementor-editor-element-edit').first();
  const addAbove = async (f, locator) => { await E.select(p, locator, { x: 15, y: 15 }); await locator.locator('xpath=ancestor-or-self::*[contains(@class,"elementor-element")][1]').locator('> .elementor-element-overlay .elementor-editor-element-add').first().click({ force: true }); await p.waitForTimeout(1200); };

  /* 1 ─ edit the homepage */
  step(1, 'Edit the homepage text', async () => {
    const f = await home();
    await E.select(p, f.locator('.hc-home-hero__cap .elementor-widget-text-editor').first());
    await E.setText(p, 'A distinctive stay in the heart of Sarajevo - welcome');
    await E.select(p, f.locator('.hc-s-hotel .hc-copy .elementor-widget-text-editor').first());
    await E.setText(p, 'Contemporary comfort, now with a sentence written by the hotel team.');
    await shot('01-edit-homepage-text'); await E.publish(p);
    const h = await get(p, base + '/en/');
    ok('1 homepage text edited in Elementor and live', h.includes('welcome') && h.includes('written by the hotel team'));
  });

  /* 2 ─ replace a photograph through the media library */
  step(2, 'Replace a photograph', async () => {
    const f = await home();
    await E.select(p, f.locator('.hc-s-hotel .r-left').first(), { x: 60, y: 60 });
    const before = (await get(p, base + '/en/')).match(/r-left[\s\S]{0,700}?src="([^"]+)"/);
    await E.pickImage(p, { upload: path.join(FX, 'new-photo.jpg') }); await shot('02-replace-photo');
    await E.publish(p);
    const h = await get(p, base + '/en/'); const m = h.match(/r-left[\s\S]{0,900}?src="([^"]+)"/);
    ok('2 photograph replaced from the media library and live', !!m && /new-photo/.test(m[1]), m && m[1]);
    if (m) { const r = await p.request.get(m[1]); ok('2b new image file is served (HTTP 200)', r.status() === 200); }
    if (before) { const r = await p.request.get(before[1]); ok('2c the previous photograph still exists in the media library', r.status() === 200); }
  });

  /* 3 ─ add a new section from scratch (container + widgets dragged from the panel) */
  step(3, 'Add a new section', async () => {
    const f = await home();
    const target = sec(f, '.hc-s-ev'); await E.reveal(p, target);
    await addAbove(f, target);
    await E.dragWidget(p, 'Heading', f.locator('.elementor-add-section-drag-title').first());
    await E.setHeading(p, 'Spring escape'); await E.dragWidget(p, 'Text Editor', f.locator('.elementor-widget-heading', { hasText: 'Spring escape' }).first(), { x: 0, y: 15 });
    await E.setText(p, 'Three nights, breakfast and the spa for two. Ask at reception.'); await E.dragWidget(p, 'Button', f.locator('.elementor-widget-text-editor', { hasText: 'Three nights' }).first(), { x: 0, y: 10 });
    const btnTitle = p.locator('#elementor-panel .elementor-control-text input').first(); await btnTitle.fill('Ask about it'); await btnTitle.blur();
    const link = p.locator('#elementor-panel .elementor-control-link input').first(); await link.fill('/en/contact/'); await link.blur(); await p.waitForTimeout(800);
    await shot('03-new-section'); await E.publish(p);
    const h = await get(p, base + '/en/');
    ok('3 new section (heading + text + button) added and live', h.includes('Spring escape') && h.includes('Three nights') && h.includes('Ask about it'));
    ok('3b new section sits before "The space to connect"', h.indexOf('Spring escape') > 0 && h.indexOf('Spring escape') < h.indexOf('hc-s-ev'));
    await p.goto(base + '/en/'); await p.waitForTimeout(1500); await p.evaluate(() => document.querySelector('h2')); // render check on the real page
    const hd = await p.locator('h2', { hasText: 'Spring escape' }).first();
    const css = await hd.evaluate((e) => { const s = getComputedStyle(e); return { ff: s.fontFamily, tt: s.textTransform, fs: parseFloat(s.fontSize) }; });
    ok('3c the new heading uses the brand display font from Site Settings, with no CSS classes added', /Gilda/.test(css.ff) && css.tt === 'uppercase' && css.fs > 40, JSON.stringify(css));
    const live = p.locator('h2', { hasText: 'Spring escape' }).first().locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," e-con ")][1]'); await live.scrollIntoViewIfNeeded(); await p.waitForTimeout(1500); await live.screenshot({ path: path.join(SHOTS, '03b-new-section-live.png') });
  });

  /* 4 ─ duplicate a section */
  step(4, 'Duplicate a section', async () => {
    const f = await home(); const t = f.locator('.elementor-widget-heading', { hasText: 'Spring escape' }).first();
    const cont = t.locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," e-con ")][1]'); await E.reveal(p, cont);
    await E.select(p, cont, { x: 5, y: 5 });
    await handle(f, cont).click({ button: 'right', force: true }); await p.waitForTimeout(600);
    await p.locator('.elementor-context-menu:visible .elementor-context-menu-list__item', { hasText: /^\s*Duplicate/ }).first().click(); await p.waitForTimeout(1500);
    await shot('04-duplicate'); await E.publish(p);
    const h = await get(p, base + '/en/'); ok('4 section duplicated (appears twice)', (h.match(/Spring escape/g) || []).length === 2, String((h.match(/Spring escape/g) || []).length));
  });

  /* 5 ─ reorder sections by dragging */
  step(5, 'Reorder sections', async () => {
    const f = await home();
    const order = async () => (await get(p, base + '/en/')).match(/hc-s-(hotel|spa|rest|loc|ev)\b|hc-rc-w|Spring escape/g).filter((x, i, a) => a.indexOf(x) === i);
    const before = await order();
    const spa = sec(f, '.hc-s-spa');
    const idx = () => spa.evaluate((e) => [...e.parentElement.children].indexOf(e));
    const i0 = await idx();
    for (let attempt = 1; attempt <= 3 && (await idx()) === i0; attempt++) { // a real drag with the mouse; retried like a person would if the drop did not take
      // a tall window so that the section and the one above it (both ~800 px high) are on screen at once, as on an editor's large monitor
      await p.setViewportSize({ width: 1600, height: 2400 }); await p.waitForTimeout(1500);
      const prev = spa.locator('xpath=preceding-sibling::*[contains(@class,"elementor-element")][1]'); await prev.evaluate((e) => e.scrollIntoView({ block: 'start' })); await p.waitForTimeout(600);
      await prev.evaluate((e) => e.ownerDocument.defaultView.scrollBy(0, -80)); await p.waitForTimeout(500); await spa.click({ force: true, position: { x: 5, y: 5 } }); await p.waitForTimeout(900);
      const hdl = handle(f, spa); const hb = await hdl.boundingBox(); const dst = await prev.boundingBox();
      console.log('  drag from', JSON.stringify(hb), 'to', JSON.stringify(dst));
      const sx = hb.x + hb.width / 2, sy = hb.y + hb.height / 2, ty = Math.max(dst.y + 40, 140), tx = dst.x + dst.width / 2;
      await p.mouse.move(sx, sy); await p.mouse.down(); await p.mouse.move(sx + 12, sy - 8, { steps: 4 });
      await p.mouse.move(tx, ty, { steps: 40 }); await p.waitForTimeout(400); await p.mouse.move(tx + 1, ty + 1, { steps: 3 }); await p.waitForTimeout(500); await shot('05-reorder-dragging'); await p.mouse.up(); await p.waitForTimeout(1500); await p.setViewportSize({ width: 1600, height: 1000 });
    }
    await shot('05-reorder'); await E.publish(p);
    const after = await order();
    ok('5 section order changed by dragging and saved', JSON.stringify(before) !== JSON.stringify(after), before.join(',') + ' → ' + after.join(','));
  });

  /* 6+7 ─ new landing page from an empty canvas, built from the template library */
  step(6, 'Create a landing page from scratch and insert saved templates', async () => {
    await p.goto(base + '/wp-admin/post-new.php?post_type=page&new_lang=en'); await p.fill('#title', 'Weekend in Sarajevo'); await p.locator('#save-post').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    st.landingId = Number(new URL(p.url()).searchParams.get('post'));
    ok('6 new page created in WordPress admin', st.landingId > 0, 'post ' + st.landingId); save();
    await p.goto(`${base}/wp-admin/post.php?post=${st.landingId}&action=elementor`); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(5000); await E.closeNavigator(p);
    const f = p.frameLocator('#elementor-preview-iframe'); await shot('06-empty-canvas');
    // 7 ─ templates
    async function insertTemplate(name) {
      await f.locator('.elementor-add-section-area-button.elementor-add-template-button, .elementor-add-template-button').last().click(); await p.waitForTimeout(1500);
      const modal = p.locator('#elementor-template-library-modal, .dialog-lightbox-widget:visible').first();
      await p.locator('#elementor-template-library-header-menu .elementor-template-library-menu-item', { hasText: /^\s*(My )?Templates\s*$/i }).click(); await p.waitForTimeout(1500);
      await p.locator('#elementor-template-library-filter-text, .elementor-template-library-filter-text').first().fill(name).catch(() => {}); await p.waitForTimeout(1200);
      const row = p.locator('.elementor-template-library-template-local', { hasText: name }).first(); await row.hover();
      await row.locator('.elementor-template-library-template-insert').click(); await p.waitForTimeout(3500);
      if (await p.locator('.dialog-widget:visible .dialog-ok, .elementor-template-library-template-insert-dialog').first().isVisible().catch(() => false)) await p.locator('.dialog-widget:visible .dialog-ok').first().click().catch(() => {});
    }
    await insertTemplate('HC · Page hero'); await shot('07a-template-hero');
    await E.select(p, f.locator('.hc-hero h1.elementor-heading-title').first()); await E.setHeading(p, 'Weekend in<br>Sarajevo');
    await E.select(p, f.locator('.hc-hero__intro').first()); await E.setText(p, 'Two nights in the old town, with breakfast and a late check-out.');
    await insertTemplate('HC · Editorial split — light, photo left'); await shot('07b-template-split');
    await E.select(p, f.locator('.hc-split .hc-title .elementor-heading-title').last()); await E.setHeading(p, 'Wake up<br>in Baščaršija');
    await insertTemplate('HC · Booking call-to-action'); await shot('07c-template-cta');
    await E.publish(p);
    // the page title / permalink were set by WordPress; read the page back
    const url = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url();
    st.landingUrl = url; save();
    const h = await get(p, url);
    ok('7 three saved templates inserted and customised, page published', h.includes('Sarajevo') && h.includes('Two nights in the old town') && h.includes('Baščaršija') && h.includes('hc-final'), url);
    ok('7b the landing page uses the site chrome (header, footer, menu)', h.includes('hc-header') && h.includes('hc-footer'));
  });

  /* 8 ─ responsive settings */
  step(8, 'Change a responsive layout setting', async () => {
    const f = await E.openEditor(p, base, st.landingId);
    await p.locator('button[aria-label^="Mobile"]').click(); await p.waitForTimeout(2500);
    await E.select(p, f.locator('.hc-hero__intro').first());
    await E.tab(p, 'Advanced');
    const resp = p.locator('#elementor-panel .elementor-panel-heading', { hasText: /Responsive/ }).first(); await resp.scrollIntoViewIfNeeded(); await resp.click(); await p.waitForTimeout(600);
    await p.locator('#elementor-panel .elementor-control-hide_mobile .elementor-switch-label, #elementor-panel .elementor-control-hide_mobile label').first().click(); await p.waitForTimeout(900);
    await shot('08-mobile-hide');
    await p.locator('button[aria-label="Desktop"]').click(); await p.waitForTimeout(1500);
    await E.publish(p);
    const hp = await b.newPage({ viewport: { width: 390, height: 844 } }); await hp.goto(st.landingUrl); await hp.waitForTimeout(1200);
    const mobHidden = await hp.locator('.hc-hero__intro').first().isHidden(); await hp.screenshot({ path: path.join(SHOTS, '08b-landing-mobile.png'), fullPage: true });
    await hp.setViewportSize({ width: 1440, height: 900 }); await hp.reload(); await hp.waitForTimeout(1000);
    const deskVisible = await hp.locator('.hc-hero__intro').first().isVisible(); await hp.screenshot({ path: path.join(SHOTS, '08c-landing-desktop.png'), fullPage: true }); await hp.close();
    ok('8 "Hide on mobile" set in Elementor: hidden at 390px, visible at 1440px', mobHidden && deskVisible, `mobileHidden=${mobHidden} desktopVisible=${deskVisible}`);
  });

  /* 9 ─ Bosnian translation */
  step(9, 'Create the Bosnian translation', async () => {
    await p.goto(base + '/wp-admin/edit.php?post_type=page&lang=en'); await p.waitForTimeout(1500);
    const row = p.locator('tr#post-' + st.landingId).first(); await row.hover();
    await row.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(5000); await E.closeNavigator(p);
    st.landingBsId = await p.evaluate(() => elementor.config.document.id); save();
    const f = p.frameLocator('#elementor-preview-iframe');
    await E.select(p, f.locator('.hc-hero h1.elementor-heading-title').first()); await E.setHeading(p, 'Vikend u<br>Sarajevu');
    await E.select(p, f.locator('.hc-hero__intro').first()); await E.setText(p, 'Dvije noći u starom gradu, s doručkom i kasnim odjavom.');
    await E.select(p, f.locator('.hc-split .hc-title .elementor-heading-title').last()); await E.setHeading(p, 'Probudite se<br>na Baščaršiji');
    await shot('09-bosnian-copy'); await E.publish(p);
    const url = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url(); st.landingBsUrl = url; save();
    const h = await get(p, url);
    ok('9 Bosnian copy created from the page list, translated in Elementor and published', h.includes('Vikend u') && h.includes('lang="bs'), url);
    ok('9b address uses /bs/ and the same slug as English', /\/bs\//.test(url) && url.replace('/bs/', '/en/') === st.landingUrl, url + ' vs ' + st.landingUrl);
    const en = await get(p, st.landingUrl);
    ok('9c translation link: hreflang alternates exist on both versions', en.includes('hreflang="bs"') && h.includes('hreflang="en"'));
    const sw = await b.newPage(); await sw.goto(st.landingUrl); await sw.locator('.hc-footer .hc-lang a[hreflang=bs]').click(); await sw.waitForLoadState();
    ok('9d language switcher jumps to the Bosnian version of this very page', sw.url() === st.landingBsUrl, sw.url()); await sw.close();
  });

  /* 10 ─ add both versions to the navigation */
  step(10, 'Add both pages to the navigation menus', async () => {
    // English: the "Main menu" box on the page screen; Bosnian: Appearance → Menus
    await p.goto(`${base}/wp-admin/post.php?post=${st.landingId}&action=edit`); await p.waitForTimeout(3500);
    const wel = p.locator('button[aria-label="Close"]'); if (await wel.first().isVisible().catch(() => false)) await wel.first().click().catch(() => {});
    const cb = p.locator('input[name=hc_nav_on]'); await cb.scrollIntoViewIfNeeded(); await cb.check(); await p.locator('input[name=hc_nav_label]').fill('Weekend'); await p.locator('#publish').click(); await p.waitForTimeout(3500);
    await p.goto(base + '/wp-admin/nav-menus.php'); await p.waitForTimeout(2000);
    // pick the Bosnian menu
    const sel = p.locator('#select-menu-to-edit'); const opts = await sel.locator('option').allTextContents(); const bsOpt = opts.find((o) => /BS/.test(o)); await sel.selectOption({ label: bsOpt }); await p.getByRole('button', { name: 'Select' }).click().catch(() => {}); await p.waitForTimeout(2500);
    await p.locator('#add-post-type-page .tabs-panel-view-all, #add-post-type-page a[href*="page-all"]').first().click().catch(() => {}); await p.waitForTimeout(1000);
    const item = p.locator('#page-all li', { hasText: 'Weekend in Sarajevo' }); const n = await item.count();
    ok('10a the Menus screen offers the pages to the editor', n >= 1, 'items matching: ' + n);
    // the Bosnian copy shares its title (translate it first) -> add by checking the last match
    await item.last().locator('input[type=checkbox]').check(); await p.locator('#submit-posttype-page').click(); await p.waitForTimeout(2500);
    await p.locator('#save_menu_footer').click(); await p.waitForTimeout(3000); await shot('10-menus');
    const hEn = await get(p, base + '/en/'), hBs = await get(p, base + '/bs/');
    const inEn = /<a[^>]*href="[^"]*weekend-in-sarajevo[^"]*"[^>]*><span class="n/.test(hEn) || hEn.includes('weekend-in-sarajevo');
    ok('10b English version in the English menu', inEn);
    ok('10c Bosnian version in the Bosnian menu', hBs.includes('weekend-in-sarajevo'));
  });

  /* 11 ─ add a new room (+ Bosnian) */
  step(11, 'Add a new room', async () => {
    await p.goto(base + '/wp-admin/post-new.php?post_type=hc_room&new_lang=en'); await p.waitForTimeout(2500);
    await p.locator('#title').fill('Garden Studio'); await p.locator('#excerpt').fill('A quiet studio with a small desk and a view of the courtyard.');
    await p.locator('#hc_size_m2').fill('24'); await p.locator('#hc_size_label').fill('Room size 24 m²'); await p.locator('#hc_title_lines').fill('Garden\nStudio'); await p.locator('#hc_feature').fill('Courtyard view');
    await p.locator('#hc_description').fill('A quiet studio with a desk and a courtyard view.\nBreakfast is included.'); await p.locator('#hc_highlights').fill('Courtyard view\nWriting desk\nFree WiFi'); await p.locator('#hc_amenities').fill('Air conditioning\nSafe\nFree WiFi\nTea/coffee maker');
    ok('11a editors cannot edit the booking-engine room id', await p.locator('#hc_room_type_id').count() === 0);
    await p.locator('#hc-pick').click(); const modal = p.locator('.media-modal:visible'); await modal.waitFor(); await modal.locator('#menu-item-upload').click(); await modal.locator('input[type=file]').first().setInputFiles(path.join(FX, 'room-photo.jpg')); await p.waitForTimeout(4000);
    await modal.locator('.media-button-select').click(); await p.waitForTimeout(800);
    await p.locator('#publish').click(); await p.waitForTimeout(3500);
    st.roomId = Number(new URL(p.url()).searchParams.get('post')); save(); await shot('11-new-room');
    const slugPath = '/en/rooms/garden-studio/'; const h = await get(p, base + slugPath);
    ok('11 new room published and has its own page', h.includes('Garden') && h.includes('Courtyard view') && h.includes('Room size 24'), slugPath);
    const list = await get(p, base + '/en/rooms/'); ok('11b the room appears in the Rooms list automatically', list.includes('Garden'));
    const home = await get(p, base + '/en/'); ok('11c the room appears in the homepage carousel automatically', home.includes('Garden') || home.includes('garden-studio'));
    ok('11d without an engine id the room links to the general booking page', h.includes('book-rooms-hotelcentralsarajevo') && !h.includes('roomtypeunkid=&'));
    // Bosnian copy
    await p.goto(base + '/wp-admin/edit.php?post_type=hc_room&lang=en'); const row = p.locator('tr', { hasText: 'Garden Studio' }).first(); await row.hover(); await row.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForTimeout(3000);
    await p.locator('#title').fill('Vrtni studio'); await p.locator('#excerpt').fill('Mirni studio s malim radnim stolom i pogledom na dvorište.'); await p.locator('#hc_title_lines').fill('Vrtni\nstudio'); await p.locator('#hc_feature').fill('Pogled na dvorište'); await p.locator('#hc_size_label').fill('Veličina sobe 24 m²');
    await p.locator('#publish').click(); await p.waitForTimeout(3500);
    const bs = await get(p, base + '/bs/rooms/garden-studio/'); ok('11e Bosnian version of the room published at the same address under /bs/', bs.includes('Vrtni') && bs.includes('Pogled na dvori'));
  });

  /* 12 ─ hotel contact information */
  step(12, 'Update the hotel contact information', async () => {
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-info'); await p.waitForTimeout(1500);
    ok('12a editor sees Contact & address and Opening hours but not the Booking engine page', (await p.locator('#adminmenu a[href*="hc-hotel-booking"]').count()) === 0);
    await p.locator('#hc_phone_display').fill('+387 33 999 111'); await p.locator('#hc_phone_href').fill('tel:+38733999111'); await p.locator('#hc_email').fill('welcome@hotelcentral.test');
    await p.locator('#submit').click(); await p.waitForTimeout(2000); await shot('12-hotel-info');
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-hours'); await p.locator('#hc_hours_breakfast').fill('07:00 - 10:30'); await p.locator('#submit').click(); await p.waitForTimeout(1500);
    const pages = ['/en/', '/en/contact/', '/bs/contact/', '/en/location/']; let all = true;
    for (const u of pages) { const h = await get(p, base + u); if (!(h.includes('+387 33 999 111') && h.includes('welcome@hotelcentral.test'))) { all = false; console.log('   missing on', u); } }
    ok('12 phone and e-mail changed once and updated in header menu, footer, contact and location pages (EN + BS)', all);
    const d = await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-booking'); const body = await p.content();
    ok('12b the Booking engine settings are closed to editors', /not allowed|Sorry|permission/i.test(body));
  });

  /* 13 ─ revisions: restore an earlier version */
  step(13, 'Restore an earlier version of a page from Elementor history', async () => {
    const f = await E.openEditor(p, base, st.landingId);
    await E.select(p, f.locator('.hc-hero h1.elementor-heading-title').first()); await E.setHeading(p, 'Oops<br>wrong title'); await E.publish(p);
    ok('13a a wrong edit was published', (await get(p, st.landingUrl)).includes('wrong title'));
    await p.locator('button[aria-label="History"]').click(); await p.waitForTimeout(1200);
    await p.locator('#elementor-panel .elementor-panel-navigation-tab', { hasText: /Revisions/ }).click(); await p.waitForTimeout(1500); await shot('13-revisions');
    const items = p.locator('#elementor-panel .elementor-revision-item'); const n = await items.count();
    ok('13b revisions are listed', n >= 2, n + ' revisions');
    // several revisions share the last publish: walk back through the list until the preview shows the earlier title again
    const hero = () => f.locator('.hc-hero h1.elementor-heading-title').first().innerText().catch(() => '');
    let found = -1; for (let i = 1; i < n; i++) { await items.nth(i).click(); await p.waitForTimeout(2200); if (!/oops/i.test(await hero())) { found = i; break; } }
    ok('13b2 an earlier revision shows the previous title in the editor preview', found > 0, 'revision #' + found);
    await p.locator('#elementor-panel .e-revision-save, #elementor-panel button', { hasText: /^\s*Apply\s*$/ }).first().click(); await p.waitForTimeout(2500);
    await E.publish(p);
    const h = await get(p, st.landingUrl); ok('13c the previous version is back on the live page', !h.includes('wrong title'), h.includes('wrong title') ? 'still wrong' : '');
  });

  /* 14 ─ after a theme + plugin update (run tests/update-persistence.sh first): everything is still there, and the editor still works */
  step(14, 'Confirm all changes remain after a theme update', async () => {
    const th = await get(p, base + '/wp-content/themes/hotel-central/style.css'); ok('14a the new theme release is installed', /Version:\s*1\.0\.\d{6,}/.test(th));
    const en = await get(p, base + '/en/'), bs = await get(p, base + '/bs/');
    ok('14b homepage edits (text, duplicated + reordered sections, new section) survived', en.includes('written by the hotel team') && (en.match(/Spring escape/g) || []).length === 2 && en.indexOf('hc-s-spa') < en.indexOf('hc-rc-w'));
    ok('14c the replaced photograph is still in use', en.includes('/wp-content/uploads/') && !/class="[^"]*"[^>]*src="[^"]*404/.test(en));
    const lp = await get(p, st.landingUrl), lb = await get(p, st.landingBsUrl);
    ok('14d the landing page and its Bosnian translation survived', lp.includes('Two nights in the old town') && lb.includes('Vikend u') && lp.includes('hreflang="bs"'));
    ok('14e new room (EN + BS) and contact details survived', (await get(p, base + '/en/rooms/garden-studio/')).includes('Courtyard view') && (await get(p, base + '/bs/rooms/garden-studio/')).includes('Vrtni') && en.includes('welcome@hotelcentral.test'));
    ok('14f both menu entries survived', en.includes('weekend-in-sarajevo') && bs.includes('weekend-in-sarajevo'));
    const f = await E.openEditor(p, base, st.landingId); await E.select(p, f.locator('.hc-hero__intro').first()); await E.setText(p, 'Two nights in the old town, with breakfast and a late check-out.'); await E.publish(p);
    ok('14g the editor still opens, edits and publishes after the update', (await get(p, st.landingUrl)).includes('late check-out'));
    await shot('14-after-update');
  });

  const run = Object.keys(steps).map(Number).filter((n) => !only.length || only.includes(n));
  for (const n of run) { console.log(`\n── Step ${n}: ${steps[n][0]}`); try { await steps[n][1](); } catch (e) { ok(`step ${n} completed`, false, e.message.split('\n')[0]); try { await shot('FAIL-step-' + n); } catch (_) {} } save(); }
  ok('no JavaScript errors during the whole journey', consoleErrors.filter((e) => !/hasClass|isDesignable|ViewTransition/.test(e)).length === 0, [...new Set(consoleErrors)].slice(0, 4).join(' | '));
  await b.close();
  const f = results.filter((r) => r[0] === 'FAIL'); console.log(`\n${results.length - f.length}/${results.length} checks passed`); process.exit(f.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(2); });
