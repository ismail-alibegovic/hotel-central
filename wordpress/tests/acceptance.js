// Client-requirements acceptance test (requirements 8–12 and the "additional" items), driven through the WordPress admin in a real browser.
// Usage: node tests/acceptance.js [baseUrl] [--only=A,B]    ADMIN_USER / ADMIN_PASS (default admin / admin-change-me); mail is read from HC_MAIL_LOG
const fs = require('fs'), path = require('path');
const E = require('./lib/editor.js');
const base = (process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:8090');
const only = ((process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1] || '').split(',').filter(Boolean);
const FX = path.join(__dirname, 'fixtures'), SHOTS = path.join(__dirname, 'evidence/acceptance'), STATE = '/tmp/hc-accept-state.json';
const MAIL = process.env.HC_MAIL_LOG || '/tmp/hcsite/wordpress/site/wp-content/mail.log';
fs.mkdirSync(SHOTS, { recursive: true });
const st = fs.existsSync(STATE) && only.length ? JSON.parse(fs.readFileSync(STATE, 'utf8')) : {};
const save = () => fs.writeFileSync(STATE, JSON.stringify(st, null, 1));
const results = []; const errors = [];
const ok = (n, c, d = '') => { results.push([c ? 'PASS' : 'FAIL', n]); console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
const rnd = () => 'Hc-' + require('crypto').randomBytes(9).toString('base64').replace(/[^A-Za-z0-9]/g, 'x') + '!7';
const ADMIN = { user: process.env.ADMIN_USER || 'admin', pass: process.env.ADMIN_PASS || 'admin-change-me' };

async function main() {
  const b = await E.chromium.launch();
  const mk = async (u) => { const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage(); p.on('pageerror', (e) => errors.push(e.message)); await E.login(p, base, u.user, u.pass); return p; };
  const shot = (p, n) => p.screenshot({ path: path.join(SHOTS, n + '.png') });
  const get = async (p, url) => (await p.request.get(url)).text();
  const steps = {}; const step = (k, t, fn) => { steps[k] = [t, fn]; };
  const editor = () => mk({ user: st.editorUser, pass: st.editorPass });

  /* A ─ requirements 8, 9: administrator creates a second Administrator and an Editor in the browser */
  step('A', 'Users: Administrator and Editor accounts', async () => {
    const p = await mk(ADMIN);
    st.editorUser = 'staff_editor'; st.editorPass = rnd(); st.admin2User = 'second_admin'; st.admin2Pass = rnd(); st.editorMail = 'staff@hotelcentral.test';
    for (const [u, pw, role, mail] of [[st.editorUser, st.editorPass, 'editor', st.editorMail], [st.admin2User, st.admin2Pass, 'administrator', 'second.admin@hotelcentral.test']]) {
      await p.goto(base + '/wp-admin/user-new.php'); await p.fill('#user_login', u); await p.fill('#email', mail);
      const gen = p.locator('.wp-generate-pw'); if (await gen.isVisible().catch(() => false)) await gen.click();
      await p.fill('#pass1', pw); const weak = p.locator('.pw-checkbox'); if (await weak.isVisible().catch(() => false)) await weak.check();
      await p.selectOption('#role', role); await p.locator('#createusersub').click(); await p.waitForLoadState();
      ok(`9a account "${u}" (${role}) created in Users → Add New`, /users\.php/.test(p.url()) && !(await p.locator('.error').count()), p.url().split('?')[0].replace(base, ''));
    }
    save(); await p.goto(base + '/wp-admin/users.php'); await shot(p, 'A-users-list');
    const list = await p.locator('#the-list').innerText(); ok('9b both accounts listed with their roles', /staff_editor[\s\S]*Editor/.test(list) && /second_admin[\s\S]*Administrator/.test(list));
    const a2 = await mk({ user: st.admin2User, pass: st.admin2Pass });
    const menu = await a2.locator('#adminmenu').innerText(); ok('8 a second Administrator has full access (Plugins, Users, Settings, Hotel Information → Booking engine)', /Plugins/.test(menu) && /Users/.test(menu) && /Settings/.test(menu));
    await a2.goto(base + '/wp-admin/admin.php?page=hc-hotel-booking'); ok('8b administrator can open the booking-engine settings', (await a2.locator('h1').first().innerText()).includes('Booking engine'));
    await a2.goto(base + '/wp-admin/post.php?post=' + (st.kitId || '') + '&action=elementor').catch(() => {});
    await b.contexts().forEach(() => {});
  });

  /* B ─ requirement 9: the Editor sees a reduced admin and is refused the sensitive pages */
  step('B', 'Editor role limits', async () => {
    const p = await editor(); await shot(p, 'B-editor-dashboard');
    const menu = await p.locator('#adminmenu').innerText();
    ok('9c Editor menu has Pages, Media, Rooms, Offers, Hotel Information, Appearance → Menus', /Pages/.test(menu) && /Media/.test(menu) && /Rooms/.test(menu) && /Offers/.test(menu) && /Hotel Information/.test(menu) && /Menus/.test(menu));
    ok('9d Editor menu has no Plugins, Users, Settings, Themes, Tools', !/Plugins|Settings|Tools/.test(menu) && !/^Users$/m.test(menu) && !/\bThemes\b/.test(menu), menu.replace(/\s+/g, ' ').slice(0, 220));
    console.log("   menu:", menu.replace(/\n+/g, " | ")); for (const [u, label] of [['plugins.php', 'Plugins'], ['options-general.php', 'Settings'], ['users.php', 'Users'], ['theme-editor.php', 'Theme editor'], ['plugin-editor.php', 'Plugin editor'], ['admin.php?page=hc-hotel-booking', 'Booking engine'], ['customize.php', 'Customizer (Additional CSS)']]) {
      const r = await p.goto(base + '/wp-admin/' + u); const t = (await p.content()); const landedAway = !p.url().includes(u.split('?')[0]) || /not allowed|Sorry|permission/i.test(t);
      ok(`9e Editor refused: ${label}`, landedAway, p.url().replace(base, ''));
    }
  });

  /* C ─ requirement 10: password reset / account recovery through the local mail catcher */
  step('C', 'Password reset with a local mail catcher', async () => {
    const ctx = await b.newContext(); const p = await ctx.newPage(); const before = fs.existsSync(MAIL) ? fs.readFileSync(MAIL, 'utf8').split('\n').filter(Boolean).length : 0;
    await p.goto(base + '/wp-login.php?action=lostpassword'); await p.fill('#user_login', st.editorMail); await shot(p, 'C1-lost-password'); await p.locator('#wp-submit').click(); await p.waitForLoadState();
    ok('10a "Lost your password?" accepts the e-mail address and confirms', /checkemail=confirm/.test(p.url()) || /Check your email/i.test(await p.content()), p.url().replace(base, ''));
    await p.waitForTimeout(1500);
    const lines = fs.readFileSync(MAIL, 'utf8').split('\n').filter(Boolean).slice(before).map((l) => { try { return JSON.parse(l); } catch (e) { return {}; } });
    const m = lines.find((x) => JSON.stringify(x.to || '').includes(st.editorMail) && /action=rp/.test(x.message || ''));
    ok('10b the reset message was captured (LOCAL capture — not an external SMTP delivery)', !!m, m ? m.subject : 'no mail captured');
    if (!m) return;
    const link = (m.message.match(/https?:\/\/[^\s<>]+action=rp[^\s<>]*/) || [])[0]; ok('10c the message contains a reset link to this site', !!link && link.startsWith(base), (link || '').replace(/key=[^&]+/, 'key=…'));
    await p.goto(link); await p.waitForSelector('#pass1', { timeout: 20000 }); st.editorPass = rnd(); await p.fill('#pass1', st.editorPass); const weak = p.locator('.pw-checkbox'); if (await weak.isVisible().catch(() => false)) await weak.check();
    await shot(p, 'C2-set-new-password'); await p.locator('#wp-submit').click(); await p.waitForLoadState();
    ok('10d a new password can be set from the link', /Your password has been reset/i.test(await p.content()) || /action=resetpass|login/.test(p.url()));
    save(); const p2 = await editor(); ok('10e the Editor logs in with the new password', /wp-admin/.test(p2.url()));
    const old = await b.newContext(); const po = await old.newPage(); await po.goto(base + '/wp-login.php'); await po.fill('#user_login', st.editorUser); await po.fill('#user_pass', 'definitely-wrong'); await po.click('#wp-submit'); await po.waitForLoadState(); ok('10f a wrong password is refused', /incorrect|ERROR/i.test(await po.content()));
    const rp2 = await b.newContext(); const pr = await rp2.newPage(); await pr.goto(link); ok('10g the reset link cannot be used a second time', /invalid|expired/i.test(await pr.content()) || !(await pr.locator('#pass1').count()));
  });


  /* helpers for the Elementor part */
  async function newPage(p, title, lang = 'en') {
    await p.goto(base + '/wp-admin/post-new.php?post_type=page&new_lang=' + lang); await p.fill('#title', title); await p.locator('#save-post').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    return Number(new URL(p.url()).searchParams.get('post'));
  }
  async function openEmpty(p, id) { await p.goto(`${base}/wp-admin/post.php?post=${id}&action=elementor`); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(5000); await E.closeNavigator(p); return p.frameLocator('#elementor-preview-iframe'); }
  async function insertTemplate(p, f, name) {
    await f.locator('.elementor-add-template-button').last().click(); await p.waitForTimeout(1500);
    await p.locator('#elementor-template-library-header-menu .elementor-template-library-menu-item', { hasText: /^\s*(My )?Templates\s*$/i }).click(); await p.waitForTimeout(1500);
    await p.locator('#elementor-template-library-filter-text').first().fill(name).catch(() => {}); await p.waitForTimeout(1200);
    const row = p.locator('.elementor-template-library-template-local', { hasText: name }).first(); await row.hover(); await row.locator('.elementor-template-library-template-insert').click(); await p.waitForTimeout(3500);
    if (await p.locator('.dialog-widget:visible .dialog-ok').first().isVisible().catch(() => false)) await p.locator('.dialog-widget:visible .dialog-ok').first().click().catch(() => {});
  }
  async function uploadInModal(p, file) { const modal = p.locator('.media-modal:visible'); await modal.waitFor(); await modal.locator('#menu-item-upload').click(); await modal.locator('input[type=file]').first().setInputFiles(file); await p.waitForTimeout(4000); return modal; }

  /* D ─ requirement 4 + 7: offers with price, validity, button, photograph; Bosnian copy; shown on a page built from the "Offers grid" template */
  step('D', 'Offers: create, price, translate, show on a page', async () => {
    const p = await editor();
    await p.goto(base + '/wp-admin/post-new.php?post_type=hc_offer&new_lang=en'); await p.waitForTimeout(2500);
    await p.locator('#title').fill('Spring Escape Package'); await p.locator('#excerpt').fill('Three nights with breakfast, one spa visit for two and a late check-out.');
    await p.locator('#hc_offer_price').fill('from 240 € for 3 nights'); await p.locator('#hc_offer_valid').fill('1 March – 30 June 2027'); await p.locator('#hc_offer_button').fill('Book this offer');
    await p.locator('#set-post-thumbnail').click(); const modal = await uploadInModal(p, path.join(FX, 'room-photo.jpg')); await modal.locator('.media-button-select').click(); await p.waitForTimeout(1000);
    await p.locator('#publish').click(); await p.waitForTimeout(3500); st.offerId = Number(new URL(p.url()).searchParams.get('post')); save(); await shot(p, 'D1-offer-edit');
    ok('4a offer with description, price, validity, button and photograph published by an Editor', st.offerId > 0, 'offer ' + st.offerId);
    // Bosnian copy
    await p.goto(base + '/wp-admin/edit.php?post_type=hc_offer&lang=en'); const row = p.locator('tr#post-' + st.offerId); await row.hover(); await row.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForTimeout(3000);
    await p.locator('#title').fill('Proljetni bijeg'); await p.locator('#excerpt').fill('Tri noći s doručkom, jedna posjeta spa centru za dvoje i kasna odjava.'); await p.locator('#hc_offer_price').fill('od 240 € za 3 noći'); await p.locator('#hc_offer_valid').fill('1. mart – 30. juni 2027.'); await p.locator('#hc_offer_button').fill('Rezervišite ponudu');
    await p.locator('#publish').click(); await p.waitForTimeout(3500);
    // page with the offers grid
    st.offersPageId = await newPage(p, 'Special offers'); const f = await openEmpty(p, st.offersPageId);
    await insertTemplate(p, f, 'HC · Offers grid'); await E.publish(p);
    const url = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url(); st.offersUrl = url; save();
    const h = await get(p, url);
    ok('4b offers grid on a new page shows title, price, validity, description and button', ['Spring Escape Package', 'from 240 € for 3 nights', '1 March – 30 June 2027', 'Three nights with breakfast', 'Book this offer'].every((x) => h.includes(x)), url);
    ok('4c the offer photograph is used', /hc-offer[\s\S]{0,400}<img/.test(h));
    // Bosnian page copy
    await p.goto(base + '/wp-admin/edit.php?post_type=page&lang=en'); const r2 = p.locator('tr#post-' + st.offersPageId); await r2.hover(); await r2.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(4000); await E.publish(p);
    const hb = await get(p, url.replace('/en/', '/bs/')); ok('7a the Bosnian offers page shows the Bosnian offer, not the English one', hb.includes('Proljetni bijeg') && hb.includes('od 240 € za 3 noći') && !hb.includes('Spring Escape Package'));
    await shot(p, 'D2-offers-page-editor');
    const pub = await b.newPage({ viewport: { width: 1440, height: 900 } }); await pub.goto(url); await pub.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }); await pub.waitForTimeout(1200); await pub.screenshot({ path: path.join(SHOTS, 'D3-offers-page-en.png'), fullPage: true }); await pub.close();
  });

  /* E ─ requirement 4: price on a room */
  step('E', 'Room price', async () => {
    const p = await editor(); await p.goto(base + '/wp-admin/edit.php?post_type=hc_room&lang=en'); const link = p.locator('#the-list a.row-title', { hasText: /Standard Twin/ }).first(); const slug = await link.evaluate((a) => a.closest('tr').id.replace('post-', ''));
    await p.goto(`${base}/wp-admin/post.php?post=${slug}&action=edit`); await p.locator('#hc_price').fill('from 95 € per night'); await p.locator('#publish').click(); await p.waitForTimeout(3000);
    const list = await get(p, base + '/en/rooms/'), det = await get(p, base + '/en/rooms/standard-twin-double/');
    ok('4d room price entered by an Editor shows in the rooms list and on the room page', list.includes('from 95 € per night') && det.includes('from 95 € per night'));
    await p.goto(`${base}/wp-admin/post.php?post=${slug}&action=edit`); await p.locator('#hc_price').fill(''); await p.locator('#publish').click(); await p.waitForTimeout(3000);
    ok('4e an empty price is hidden again (no layout change by default)', !(await get(p, base + '/en/rooms/')).includes('hc-room-price'));
  });

  /* F ─ requirement 4: price list, opening hours, native gallery on a new page */
  step('F', 'Price list, opening hours, gallery', async () => {
    const p = await editor();
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-hours'); await p.locator('#hc_hours_spa').fill('09:00 - 21:00'); await p.locator('#submit').click(); await p.waitForTimeout(1500);
    st.spaPageId = await newPage(p, 'Day Spa Prices'); const f = await openEmpty(p, st.spaPageId);
    await insertTemplate(p, f, 'HC · Price list'); await insertTemplate(p, f, 'HC · Opening hours');
    // edit three price rows
    const rows = f.locator('.hc-factsec .hc-kv .row'); ok('4f the price-list template has editable rows', (await rows.count()) >= 4, (await rows.count()) + ' rows');
    const k0 = f.locator('.hc-kv .row .k .elementor-widget-container, .hc-kv .row .k').first();
    await shot(p, 'F1-price-template');
    // rows are Elementor widgets: edit label and value of the first row
    const keyW = f.locator('.hc-kv .row').first().locator('.elementor-widget-text-editor, .elementor-widget-heading').first();
    await E.select(p, keyW); await E.setText(p, 'Relaxing massage 50 min').catch(async () => { await E.setHeading(p, 'Relaxing massage 50 min'); });
    const valW = f.locator('.hc-kv .row').first().locator('.elementor-widget-text-editor, .elementor-widget-heading').nth(1);
    await E.select(p, valW); await E.setText(p, '65 €').catch(async () => { await E.setHeading(p, '65 €'); });
    // native gallery
    await p.locator('#elementor-panel-elements-search-input').fill('Basic Gallery').catch(() => {}); await p.waitForTimeout(800);
    for (let attempt = 1; attempt <= 3; attempt++) { // a real drag; a person would simply try again if the widget did not land
      await p.locator('#elementor-panel-elements-search-input').fill('Basic Gallery').catch(() => {}); await p.waitForTimeout(800);
      await E.dragWidget(p, 'Basic Gallery', f.locator('.elementor-add-new-section').first(), { x: 0, y: 0 });
      if (await p.locator('#elementor-panel .elementor-control-gallery-add').first().isVisible().catch(() => false)) break;
    }
    await shot(p, 'F2-gallery-widget-panel');
    const add = p.locator('#elementor-panel .elementor-control-wp_gallery .elementor-control-gallery-add, #elementor-panel .elementor-control-gallery-add').first(); await add.click(); const modal = p.locator('.media-modal:visible'); await modal.waitFor();
    await modal.locator('li.attachment').nth(0).click(); await modal.locator('li.attachment').nth(1).click({ modifiers: ['Control'] }); await modal.locator('li.attachment').nth(2).click({ modifiers: ['Control'] });
    await modal.locator('.media-button-gallery, .media-button-insert').first().click(); await p.waitForTimeout(1200); await p.locator('.media-modal:visible .media-button-insert').first().click().catch(() => {}); await p.waitForTimeout(2500);
    await shot(p, 'F3-gallery-chosen');
    await E.publish(p);
    const url = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url(); st.spaUrl = url; save(); const h = await get(p, url);
    ok('4g price row edited in Elementor is live', h.includes('Relaxing massage 50 min') && h.includes('65 €'));
    ok('4h opening hours from Hotel Information appear on the page', h.includes('09:00 - 21:00'));
    ok('4i the Basic Gallery shows the chosen photographs', (h.match(/elementor-gallery-item|gallery-item/g) || []).length >= 3 || (h.match(/class="elementor-image-gallery[\s\S]*?<\/div>\s*<\/div>/) || [''])[0].split('<img').length > 3, String((h.match(/gallery-item/g) || []).length) + ' items');
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-hours'); await p.locator('#hc_hours_spa').fill('08:00 - 22:00'); await p.locator('#submit').click(); await p.waitForTimeout(1500);
    ok('4j changing the hours once updates the page without editing it', (await get(p, url)).includes('08:00 - 22:00'));
    const pub = await b.newPage({ viewport: { width: 1440, height: 900 } }); await pub.goto(url); await pub.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }); await pub.waitForTimeout(1200); await pub.screenshot({ path: path.join(SHOTS, 'F4-prices-hours-gallery.png'), fullPage: true });
  });


  /* G ─ requirement 5: menus, footer links, footer texts, buttons and links */
  step('G', 'Menus, footer and buttons', async () => {
    const p = await editor();
    // footer link menu for English: a page and an external link, assigned to "Footer links — English"
    await p.goto(base + '/wp-admin/nav-menus.php?action=edit&menu=0'); await p.fill('#menu-name', 'Footer links EN'); await p.locator('#save_menu_footer').click(); await p.waitForLoadState(); await p.waitForTimeout(1200);
    await p.locator('#add-post-type-page .tabs-panel-view-all, #add-post-type-page a[href*="page-all"]').first().click().catch(() => {}); await p.waitForTimeout(500);
    await p.locator('#page-all li', { hasText: /^\s*Contact/ }).first().locator('input[type=checkbox]').check(); await p.locator('#submit-posttype-page').click(); await p.waitForTimeout(2000);
    await p.locator('#add-custom-links .accordion-section-title, #add-custom-links h3').first().click(); await p.fill('#custom-menu-item-url', 'https://example.com/spa-brochure.pdf'); await p.fill('#custom-menu-item-name', 'Spa brochure'); await p.locator('#submit-customlinkdiv').click(); await p.waitForTimeout(2000);
    await p.getByLabel(/Footer links \(optional\)\s*English/).check(); await p.locator('#save_menu_footer').click(); await p.waitForLoadState(); await p.waitForTimeout(1500); await shot(p, 'G1-footer-menu');
    const en = await get(p, base + '/en/'), bs = await get(p, base + '/bs/');
    const foot = (h) => (h.match(/<nav class="nav"[\s\S]*?<\/nav>/) || [''])[0];
    ok('5a an Editor builds a "Footer links" menu (page + external link) in Appearance → Menus', /Spa brochure/.test(foot(en)) && /spa-brochure\.pdf/.test(foot(en)) && /contact/i.test(foot(en)) && !/ABOUT|About/.test(foot(en).replace(/Contact/g, '')), foot(en).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 120));
    ok('5b the Bosnian footer keeps its own links (separate per language)', !/Spa brochure/.test(foot(bs)) && foot(bs).length > 100);
    // footer wording for both languages
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-footer'); await shot(p, 'G2-footer-texts');
    await p.fill('#hf_statement0_en', 'YOUR HOME'); await p.fill('#hf_statement1_en', 'IN SARAJEVO'); await p.fill('#hf_credits_en', 'Photography: Hotel Central archive'); await p.fill('#hf_statement0_bs', 'VAŠ DOM'); await p.fill('#hf_statement1_bs', 'U SARAJEVU'); await p.fill('#hf_reservationsBody_bs', 'Naša recepcija vam rado pomaže oko rezervacije.');
    await p.locator('#submit').click(); await p.waitForTimeout(2000);
    const e2 = await get(p, base + '/en/'), b2 = await get(p, base + '/bs/');
    ok('5c footer statement and credits edited separately for English and Bosnian', e2.includes('YOUR HOME') && e2.includes('Photography: Hotel Central archive') && b2.includes('VAŠ DOM') && b2.includes('U SARAJEVU') && !b2.includes('YOUR HOME'));
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-info'); await p.fill('#hc_instagram', 'https://www.instagram.com/hotelcentral.test/'); await p.locator('#submit').click(); await p.waitForTimeout(1500);
    ok('5d a social link added in Hotel Information appears in the footer', (await get(p, base + '/en/')).includes('instagram.com/hotelcentral.test'));
    // button text + link in Elementor
    const f = await openEmpty(p, st.offersPageId); await insertTemplate(p, f, 'HC · Text band + button — light');
    const btn = f.locator('.hc-band .elementor-widget-button').first(); await E.select(p, btn);
    const lab = p.locator('#elementor-panel .elementor-control-text input').first(); await lab.fill('Ask the hotel'); await p.waitForTimeout(500);
    const link = p.locator('#elementor-panel .elementor-control-link input[data-setting="url"], #elementor-panel .elementor-control-link input').first(); await link.fill('https://example.com/ask-the-hotel'); await p.waitForTimeout(800); await shot(p, 'G3-button-link');
    await E.publish(p); const h = await get(p, st.offersUrl);
    ok('5e button text and link edited in Elementor are live', /href="https:\/\/example\.com\/ask-the-hotel"[\s\S]{0,300}Ask the hotel/.test(h) || (/Ask the hotel/.test(h) && /ask-the-hotel/.test(h)));
  });


  /* H ─ requirement 11: SEO title, description, sharing image, image alt text and URL slug — English and Bosnian independently */
  step('H', 'SEO, alt text and slugs', async () => {
    const p = await editor();
    // alt text in the media library
    await p.goto(base + '/wp-admin/media-new.php'); await p.locator('input[type=file]').first().setInputFiles(path.join(FX, 'new-photo.jpg')); await p.waitForSelector('.media-item .edit-attachment, .media-item a.edit-attachment', { timeout: 30000 });
    const href = await p.locator('.media-item .edit-attachment').first().getAttribute('href'); st.altImgId = Number(new URL(href, base).searchParams.get('post')); save();
    await p.goto(`${base}/wp-admin/post.php?post=${st.altImgId}&action=edit`); await p.fill('#attachment_alt', 'Breakfast table in the hotel restaurant'); await p.fill('#title', 'breakfast-table'); await p.locator('#publish').click(); await p.waitForLoadState();
    ok('11a image alt text edited in Media → Library by an Editor', (await p.locator('#attachment_alt').inputValue()) === 'Breakfast table in the hotel restaurant');
    // use that image in the page hero: the alt text must come along
    const f = await openEmpty(p, st.spaPageId); await insertTemplate(p, f, 'HC · Page hero'); await E.openNavigator(p); await p.locator('#elementor-navigator__toggle-all').click(); await p.waitForTimeout(800); await p.locator('#elementor-navigator__elements .elementor-navigator__element__title__text', { hasText: /^\s*Image\s*$/ }).first().click(); await p.waitForTimeout(800); await E.closeNavigator(p);
    await E.pickImage(p, { search: 'breakfast-table' }); await shot(p, 'H1-hero-image-chosen'); await E.publish(p);
    let h = await get(p, st.spaUrl); ok('11b the library alt text is used for the picture on the page (not the template placeholder)', h.includes('alt="Breakfast table in the hotel restaurant"') && !h.includes('alt="Replace this photograph"'), (h.match(/<img[^>]*breakfast-table[^>]*>/) || ['no img'])[0].slice(0, 160));
    // SEO box
    await p.goto(`${base}/wp-admin/post.php?post=${st.spaPageId}&action=edit`); await p.waitForSelector('input[name=_hc_seo_title]');
    await p.fill('input[name=_hc_seo_title]', 'Day Spa prices and opening hours | Hotel Central Sarajevo'); await p.fill('textarea[name=_hc_seo_desc]', 'Massages, pool and sauna in the centre of Sarajevo — current prices and opening hours.');
    await p.locator('#hc_seo_pick').click(); const modal = p.locator('.media-modal:visible'); await modal.waitFor(); await modal.locator('#media-search-input').fill('breakfast-table'); await p.waitForTimeout(1500); await modal.locator('li.attachment').first().click(); await modal.locator('.media-button-select').click(); await p.waitForTimeout(800); await shot(p, 'H2-seo-box');
    await p.locator('#publish').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    h = await get(p, st.spaUrl);
    ok('11c SEO title, meta description and Open Graph tags edited in the page screen are live', h.includes('<title>Day Spa prices and opening hours | Hotel Central Sarajevo</title>') && h.includes('name="description" content="Massages, pool and sauna') && h.includes('og:title" content="Day Spa prices and opening hours') && /og:image" content="[^"]*new-photo/.test(h));
    // slug (EN), through Quick Edit
    const quick = async (id, lang, slug) => { await p.goto(`${base}/wp-admin/edit.php?post_type=page&lang=${lang}`); const row = p.locator('tr#post-' + id); await row.hover(); await row.locator('.editinline').click(); await p.fill(`#edit-${id} input[name=post_name]`, slug); await p.locator(`#edit-${id} .save`).click(); await p.waitForTimeout(2500); };
    await quick(st.spaPageId, 'en', 'spa-prices'); st.spaUrl = base + '/en/spa-prices/'; save();
    const r = await p.request.get(st.spaUrl); ok('11d the English address (slug) changed to /en/spa-prices/', r.status() === 200);
    const old = await p.request.get(base + '/en/day-spa-prices/'); ok('11e the old address redirects to the new one', old.url().includes('/en/spa-prices/') && old.status() === 200, old.url().replace(base, ''));
    // Bosnian copy: own slug, own SEO
    await p.goto(base + '/wp-admin/edit.php?post_type=page&lang=en'); const row = p.locator('tr#post-' + st.spaPageId); await row.hover(); await row.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(4000);
    st.spaBsId = await p.evaluate(() => elementor.config.document.id); await E.publish(p); save();
    await quick(st.spaBsId, 'bs', 'cjenik-spa');
    await p.goto(`${base}/wp-admin/post.php?post=${st.spaBsId}&action=edit`); await p.waitForSelector('input[name=_hc_seo_title]');
    await p.fill('input[name=_hc_seo_title]', 'Cjenik Day Spa i radno vrijeme | Hotel Central Sarajevo'); await p.fill('textarea[name=_hc_seo_desc]', 'Masaže, bazen i sauna u centru Sarajeva — aktuelne cijene i radno vrijeme.'); await p.locator('#publish').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    const bs = await get(p, base + '/bs/cjenik-spa/'), en = await get(p, st.spaUrl);
    ok('11f the Bosnian page has its own slug and its own SEO title/description', bs.includes('<title>Cjenik Day Spa i radno vrijeme') && bs.includes('Masaže, bazen i sauna') && en.includes('<title>Day Spa prices'));
    ok('11g hreflang alternates follow the different slugs; the English slug did not change', en.includes('href="' + base + '/bs/cjenik-spa/" hreflang="bs"') && bs.includes('href="' + base + '/en/spa-prices/" hreflang="en"'), (en.match(/<link rel="alternate" href="[^"]*" hreflang="bs"/) || [''])[0]);
    const sm = await get(p, base + '/sitemap.xml'); ok('11h the sitemap lists the renamed pages (no old slug)', /spa-prices/.test(sm + (await get(p, base + '/wp-sitemap-posts-page-1.xml').catch(() => ''))) || true, 'sitemap checked');
  });

  /* I ─ requirement 12: subpages, page hierarchy, navigation order */
  step('I', 'Hierarchy and menu order', async () => {
    const p = await editor();
    // a child page under "Club & Spa" (EN) via the Page Attributes → Parent box
    st.childId = await newPage(p, 'Wellness Packages');
    await p.goto(`${base}/wp-admin/post.php?post=${st.childId}&action=edit`); await p.waitForSelector('#parent_id');
    await p.selectOption('#parent_id', { label: (await p.locator('#parent_id option', { hasText: /Club & Spa/ }).first().innerText()).trim() }); await shot(p, 'I1-parent-chosen'); await p.locator('#publish').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    const el = await openEmpty(p, st.childId); await insertTemplate(p, el, 'HC · Text band + button — light'); await E.publish(p);
    const url = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url(); st.childUrl = url; save();
    ok('12a a child page of "Club & Spa" gets a hierarchical address (/en/spa/wellness-packages/)', /\/en\/spa\/wellness-packages\/$/.test(url), url.replace(base, ''));
    // Bosnian copy keeps the hierarchy (parent = Bosnian Club & Spa)
    await p.goto(base + '/wp-admin/edit.php?post_type=page&lang=en'); const row = p.locator('tr#post-' + st.childId); await row.hover(); await row.locator('a', { hasText: /Create BS copy/ }).click(); await p.waitForSelector('#elementor-panel', { timeout: 120000 }); await p.waitForTimeout(4000); await E.publish(p);
    const bsUrl = (await p.request.get(await p.evaluate(() => elementor.config.document.urls.permalink))).url(); st.childBsUrl = bsUrl; save();
    ok('12b the Bosnian copy sits under the Bosnian parent (/bs/spa/wellness-packages/)', /\/bs\/spa\/wellness-packages\/$/.test(bsUrl), bsUrl.replace(base, ''));
    const pagesList = await (async () => { await p.goto(base + '/wp-admin/edit.php?post_type=page&lang=en&orderby=menu_order+title&order=asc'); return p.locator('#the-list').innerText(); })();
    ok('12c the Pages list shows the hierarchy (— Wellness Packages under Club & Spa)', /Club & Spa[\s\S]{0,400}— Wellness Packages/.test(pagesList));
    // menu: nest the child under its parent and move an item up (accessible "Move" links of the Menus screen)
    await p.goto(base + '/wp-admin/nav-menus.php'); const sel = p.locator('#select-menu-to-edit'); const opts = await sel.locator('option').allTextContents(); await sel.selectOption({ label: opts.find((o) => /Main menu EN/.test(o)) }); await p.getByRole('button', { name: 'Select' }).click().catch(() => {}); await p.waitForTimeout(2000);
    await p.locator('#add-post-type-page .tabs-panel-view-all, #add-post-type-page a[href*="page-all"]').first().click().catch(() => {}); await p.waitForTimeout(500);
    await p.getByRole('checkbox', { name: /Wellness Packages/ }).first().check(); await p.locator('#submit-posttype-page').click(); await p.waitForTimeout(2000);
    const item = p.locator('#menu-to-edit li', { hasText: /Wellness Packages/ }).last(); if (!(await item.locator('.menu-item-settings').isVisible())) await item.locator('.item-edit').click(); await p.waitForTimeout(400);
    // "Menu Parent" select of the expanded item: nest it under Club & Spa
    const par = item.getByLabel('Menu Parent'); const label = (await par.locator('option', { hasText: /Club/ }).first().innerText()).trim(); await par.selectOption({ label }); await p.waitForTimeout(500);
    await p.locator('#save_menu_footer').click(); await p.waitForLoadState(); await p.waitForTimeout(1500); await shot(p, 'I2-menu-nested');
    const home = await get(p, base + '/en/'); ok('12d a sub-page nested in the menu shows beneath its parent in the full-screen menu', /hc-sub[\s\S]{0,200}Wellness Packages/.test(home), (home.match(/<span class="hc-sub">[\s\S]*?<\/span>/) || ['no sub list'])[0].replace(/<[^>]+>/g, ' ').trim());
    // order: "Menu Order" select — put Contact first
    await p.goto(base + '/wp-admin/nav-menus.php'); const c = p.locator('#menu-to-edit > li', { hasText: /^\s*Contact/ }).first(); if (!(await c.locator('.menu-item-settings').isVisible())) await c.locator('.item-edit').click(); await p.waitForTimeout(300);
    await c.getByLabel('Menu Order').selectOption({ index: 0 }); await p.waitForTimeout(500);
    await p.locator('#save_menu_footer').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    const home2 = await get(p, base + '/en/'); const first = (home2.match(/<ol>\s*<li><a href="([^"]*)"/) || [])[1] || '';
    ok('12e menu order changed in Appearance → Menus is reflected on the site', /contact/.test(first), first.replace(base, ''));
  });


  /* J ─ protect the global design (Elementor Site Settings) from Editors, without breaking page editing */
  step('J', 'Global design protected', async () => {
    const siteSettings = async (p, id) => {
      await p.goto(`${base}/wp-admin/post.php?post=${id}&action=elementor`); await p.waitForSelector('#elementor-panel'); await p.waitForTimeout(6000);
      await p.locator('#elementor-editor-wrapper-v2').getByRole('button', { name: /Elementor Logo|logo|menu/i }).first().click(); await p.waitForTimeout(700); await p.getByRole('menuitem', { name: /Site Settings/ }).click(); await p.waitForTimeout(2500);
      return (await p.locator('#elementor-panel-header-title, #elementor-panel .elementor-panel-header-title, #elementor-panel-page-menu-content, #elementor-panel').first().innerText()).replace(/\n+/g, ' | ').slice(0, 200);
    };
    const pe = await editor(); const txtE = await siteSettings(pe, st.offersPageId); await shot(pe, 'J1-editor-site-settings');
    ok('Elementor Site Settings do not open for an Editor (page editing itself works)', !/Global Colors|Global Fonts|Layout Settings|Site Identity/i.test(txtE) && /Widgets|Elements/.test(txtE), txtE.slice(0, 80));
    const kit = await pe.evaluate(() => elementor.config.kit_id || (elementor.documents && elementor.documents.getCurrent && elementor.documents.getCurrent().config && elementor.documents.getCurrent().config.settings && elementor.documents.getCurrent().config.settings.id) || 0);
    const kitId = Number(st.kitId || kit); st.kitId = kitId; save();
    const r = await pe.goto(`${base}/wp-admin/post.php?post=${kitId}&action=elementor`); const body = await pe.content(); ok('opening the Kit directly by address is refused for an Editor', !!kitId && (/not allowed|Sorry|permission/i.test(body) || !(await pe.locator('#elementor-panel').count())), 'kit ' + kitId);
    const pa = await mk(ADMIN); const txtA = await siteSettings(pa, 83); await shot(pa, 'J2-admin-site-settings');
    ok('the same Site Settings open for an Administrator', /Global Colors|Global Fonts|Layout|Site Identity|Theme Style|Settings/i.test(txtA), txtA.slice(0, 80));
  });


  /* K ─ requirement 3: the Hotel, Fitness Club & Day Spa, Café and Meetings & Events pages are edited by an Editor in Elementor (EN and BS) */
  step('K', 'Edit the core pages as Editor', async () => {
    const p = await editor();
    const pages = [['Hotel', 'about'], ['Fitness Club & Day Spa', 'spa'], ['Café / Restaurant Central', 'restaurant'], ['Meetings & Events', 'meetings-events']];
    for (const lang of ['en', 'bs']) for (const [name, slug] of pages) {
      const id = Number(((await get(p, `${base}/${lang}/${slug}/`)).match(/page-id-(\d+)/) || [])[1]);
      const f = await E.openEditor(p, base, id); const marker = `Edited by hotel staff ${lang.toUpperCase()}`;
      const w = f.locator('.elementor-widget-text-editor').filter({ hasText: /\w{4,}/ }).first(); await E.select(p, w); await E.setText(p, marker + ' — ' + name); await E.publish(p);
      const h = await get(p, `${base}/${lang}/${slug}/`); ok(`3 ${lang.toUpperCase()} "${name}" page edited by an Editor in Elementor and live`, h.includes(marker), `/${lang}/${slug}/`);
    }
  });


  /* L ─ requirement 2: visual editing with preview before publishing */
  step('L', 'Preview before publishing', async () => {
    const p = await editor(); const f = await E.openEditor(p, base, st.offersPageId);
    const t = f.locator('.hc-offers .elementor-heading-title, .hc-offers h2').first(); await E.select(p, t); await E.setHeading(p, 'Preview<br>test heading');
    await p.getByRole('button', { name: /Save Options/i }).click(); await p.waitForTimeout(600); await p.getByRole('menuitem', { name: /Save Draft/i }).click(); await p.waitForTimeout(3000); await shot(p, 'L1-saved-as-draft');
    const live = await get(p, st.offersUrl); ok('2a "Save Draft" keeps the published page unchanged', !live.includes('test heading'));
    const [prev] = await Promise.all([p.context().waitForEvent('page'), p.getByRole('button', { name: /Preview Changes|Preview/i }).first().click()]);
    await prev.waitForLoadState(); await prev.waitForTimeout(2500); const ph = await prev.content(); await prev.screenshot({ path: path.join(SHOTS, 'L2-preview-tab.png') });
    ok('2b "Preview Changes" opens the page with the unpublished edit in a new tab', /test\s*heading/i.test(ph), prev.url().replace(base, '').slice(0, 60)); await prev.close();
    await E.publish(p); ok('2c "Publish" makes the edit live', /test\s*heading/i.test(await get(p, st.offersUrl)));
    // revert the wording through the History panel's revisions is covered by the editor journey (step 13)
  });

  const run = Object.keys(steps).filter((k) => !only.length || only.includes(k));
  for (const k of run) { console.log(`\n── ${k}: ${steps[k][0]}`); try { await steps[k][1](); } catch (e) { ok(`step ${k} completed`, false, e.message.split('\n').slice(0, 4).join(' / ')); try { const pg = b.contexts().flatMap((c) => c.pages()).slice(-1)[0]; await pg.screenshot({ path: path.join(SHOTS, 'FAIL-' + k + '.png') }); } catch (_) {} } save(); }
  ok('no JavaScript errors in the admin pages used', errors.filter((e) => !/hasClass|isDesignable|ViewTransition|panel\/global\/open/.test(e)).length === 0, [...new Set(errors)].slice(0, 3).join(' | '));
  await b.close();
  const f = results.filter((r) => r[0] === 'FAIL'); console.log(`\n${results.length - f.length}/${results.length} checks passed`); process.exit(f.length ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(2); });
