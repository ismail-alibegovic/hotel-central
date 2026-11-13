// Round 1 (Nov 2026) editing workflows, performed as an Editor-role user in a real browser through WordPress admin and the
// Elementor editor. The edits themselves never use the database or the API; HTTP only reads the public pages back.
// Usage: node tests/round1-editor.js [baseUrl]    needs .local/editor-credentials.txt (WP_EDITOR_USER / WP_EDITOR_PASS)
// Run it on a disposable copy: it changes content (prices, titles, photos, hours, a menu label) and creates a page.
const fs = require('fs'), path = require('path');
const E = require('./lib/editor.js');
const base = process.argv[2] || 'http://localhost:8080';
const SHOTS = path.join(__dirname, 'evidence/round1-editor'); fs.mkdirSync(SHOTS, { recursive: true });
const results = [];
const ok = (n, c, d = '') => { results.push([c ? 'PASS' : 'FAIL', n, d]); console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&#8211;/g, '–').replace(/\s+/g, ' ');

(async () => {
  const b = await E.chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});
  const p = await (await b.newContext({ viewport: { width: 1600, height: 1000 } })).newPage();
  const errors = []; p.on('pageerror', (e) => errors.push(e.message));
  const shot = (n) => p.screenshot({ path: path.join(SHOTS, n + '.png') });
  const get = async (u) => (await p.request.get(base + u)).text();
  const c = E.creds(); await E.login(p, base, c.user, c.pass);
  ok('0 logged in as an Editor (not an administrator)', (await p.locator('#adminmenu a[href="plugins.php"]').count()) === 0, c.user);
  // page ids by address, read from the public pages (body class page-id-N)
  const idOf = async (u) => +((await get(u)).match(/page-id-(\d+)/) || [])[1];
  const ids = { spaEn: await idOf('/en/dayspa/'), spaBs: await idOf('/bs/dayspa/'), club: await idOf('/en/centralfitnessclub/') };

  /* 1 ─ Day Spa price list: change one price, save as draft, preview, then publish */
  try {
    const f = await E.openEditor(p, base, ids.spaEn);
    const cell = f.locator('.hc-price .p').first();
    const before = (await cell.innerText()).trim();
    await E.select(p, cell); await E.setText(p, 'KM 42'); await shot('01-spa-price-edit');
    await p.getByRole('button', { name: /Save Options/i }).click(); await p.waitForTimeout(600);
    await p.getByRole('menuitem', { name: /Save Draft/i }).click(); await p.waitForTimeout(3000);
    const live1 = strip(await get('/en/dayspa/'));
    ok('1a "Save Draft" keeps the published price unchanged', live1.includes('Reflexology massage 30 min ' + before) && !live1.includes('Reflexology massage 30 min KM 42'), before);
    const [prev] = await Promise.all([p.context().waitForEvent('page'), p.getByRole('button', { name: /Preview Changes|Preview/i }).first().click()]);
    await prev.waitForLoadState(); await prev.waitForTimeout(2500);
    ok('1b "Preview Changes" shows the new price before it is published', strip(await prev.content()).includes('KM 42')); await prev.screenshot({ path: path.join(SHOTS, '01b-spa-preview.png') }); await prev.close();
    await E.publish(p);
    ok('1c after "Publish" the new price is live', strip(await get('/en/dayspa/')).includes('Reflexology massage 30 min KM 42'));
  } catch (e) { await shot('fail-1').catch(() => {}); ok('1 Day Spa price edit', false, e.message.split('\n')[0]); }

  /* 2 ─ Fitness Club: edit the hero title and replace a photograph from the Media Library */
  try {
    const f = await E.openEditor(p, base, ids.club);
    await E.select(p, f.locator('.hc-hero h1.elementor-heading-title').first()); await E.setHeading(p, 'Feel<br>stronger');
    await E.select(p, f.locator('.hc-split .main').first(), { x: 60, y: 60 });
    await E.pickImage(p, { search: 'merch' }); await shot('02-club-title-photo');
    await E.publish(p);
    const h = await get('/en/centralfitnessclub/');
    ok('2a Fitness Club title edited in Elementor and live', /Feel[\s\S]{0,80}stronger/.test(h));
    const m = h.match(/hc-split__media[\s\S]{0,900}?src="([^"]+)"/);
    ok('2b Fitness Club photograph replaced from the Media Library and live', !!m && /merch/.test(m[1]), m && m[1].replace(base, ''));
  } catch (e) { await shot('fail-2').catch(() => {}); ok('2 Fitness Club edit', false, e.message.split('\n')[0]); }

  /* 3 ─ Bosnian Day Spa edited independently of the English one */
  try {
    const f = await E.openEditor(p, base, ids.spaBs);
    await E.select(p, f.locator('.hc-hero__intro').first()); await E.setText(p, 'Dobro došli u Central Day Spa – izmjena urednika.'); await E.publish(p);
    ok('3a Bosnian page changed', strip(await get('/bs/dayspa/')).includes('izmjena urednika'));
    ok('3b English page unchanged', !strip(await get('/en/dayspa/')).includes('izmjena urednika'));
    ok('3c language switcher links the two Day Spa pages', /hreflang="bs"[^>]*href="[^"]*\/bs\/dayspa\/|href="[^"]*\/bs\/dayspa\/"[^>]*hreflang="bs"/.test(await get('/en/dayspa/')));
  } catch (e) { await shot('fail-3').catch(() => {}); ok('3 Bosnian edit', false, e.message.split('\n')[0]); }

  /* 4 ─ Room content (Rooms & Suites → room form) */
  try {
    const room = await idOf('/en/rooms/single-room/') || +(((await get('/en/rooms/single-room/')).match(/postid-(\d+)/) || [])[1]);
    await p.goto(`${base}/wp-admin/post.php?post=${room}&action=edit`); await p.waitForTimeout(1500);
    await p.locator('[name="hc_size_label"]').fill('Room size 16 m²'); await shot('04-room-form');
    await p.locator('#publish').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    ok('4a room detail page shows the edited size', (await get('/en/rooms/single-room/')).includes('Room size 16 m²'));
    ok('4b homepage rooms carousel uses the same room data', (await get('/en/')).includes('Room size 16 m'));
  } catch (e) { await shot('fail-4').catch(() => {}); ok('4 room edit', false, e.message.split('\n')[0]); }

  /* 5 ─ Services' opening hours (Hotel Information → Opening hours) reach Café, Day Spa and Fitness Club in both languages */
  try {
    await p.goto(base + '/wp-admin/admin.php?page=hc-hotel-hours'); await p.waitForTimeout(1000);
    await p.locator('#hc_hours_cafe').fill('07:00 – 22:00'); await p.locator('#hc_hours_dayspa').fill('10:00 – 21:00'); await p.locator('#hc_hours_gym').fill('06:30 – 22:30');
    await shot('05-opening-hours'); await p.locator('#submit').click(); await p.waitForTimeout(1500);
    ok('5a Café page shows the café hours (EN + BS)', strip(await get('/en/about/cafe/')).includes('07:00 – 22:00') && strip(await get('/bs/about/cafe/')).includes('07:00 – 22:00'));
    ok('5b Day Spa page shows the spa hours', strip(await get('/en/dayspa/')).includes('10:00 – 21:00'));
    ok('5c Fitness Club page shows the gym hours (BS)', strip(await get('/bs/centralfitnessclub/')).includes('06:30 – 22:30'));
  } catch (e) { await shot('fail-5').catch(() => {}); ok('5 opening hours', false, e.message.split('\n')[0]); }

  /* 6 ─ Menus: rename an item of the Fitness Club section menu; the main menu shows the sub-pages */
  try {
    await p.goto(base + '/wp-admin/nav-menus.php'); const sel = p.locator('#select-menu-to-edit');
    const opts = await sel.locator('option').allTextContents(); await sel.selectOption({ label: opts.find((o) => /Fitness Club menu EN/.test(o)).trim() });
    await p.getByRole('button', { name: 'Select' }).click().catch(() => {}); await p.waitForTimeout(2000);
    const it = p.locator('#menu-to-edit > li', { hasText: /Timetable/ }).first(); if (!(await it.locator('.menu-item-settings').isVisible())) await it.locator('.item-edit').click(); await p.waitForTimeout(400);
    await it.locator('input.edit-menu-item-title').fill('Weekly timetable'); await shot('06-club-menu');
    await p.locator('#save_menu_footer').click(); await p.waitForLoadState(); await p.waitForTimeout(1500);
    ok('6a Fitness Club section menu label changed by the Editor', /hc-subnav[\s\S]{0,1200}Weekly timetable/.test(await get('/en/centralfitnessclub/')));
    const home = strip(await get('/en/'));
    ok('6b main menu shows Central Café under About and Membership / Class timetable under the Fitness Club', /About Central Café/.test(home) && /Central Fitness Club Membership Class timetable/.test(home));
  } catch (e) { await shot('fail-6').catch(() => {}); ok('6 menus', false, e.message.split('\n')[0]); }

  /* 7 ─ A new page created under Central Fitness Club takes the club's brand automatically */
  try {
    await p.goto(base + '/wp-admin/post-new.php?post_type=page&lang=en'); await p.waitForTimeout(2500);
    await p.locator('#title').fill('Personal training'); await p.locator('#parent_id').selectOption({ label: 'Central Fitness Club' });
    await p.locator('#publish').click(); await p.waitForLoadState(); await p.waitForTimeout(2000);
    const h = await get('/en/centralfitnessclub/personal-training/');
    ok('7 new sub-page of the club: own address under /centralfitnessclub/ and club branding', /hc-brand-club/.test(h), (h.match(/<title>[^<]*/) || [''])[0]);
  } catch (e) { await shot('fail-7').catch(() => {}); ok('7 new branded page', false, e.message.split('\n')[0]); }

  const fail = results.filter((r) => r[0] === 'FAIL').length;
  const out = results.map((r) => r.join(' | ')).join('\n') + `\n\n${results.length - fail}/${results.length} passed` + (errors.length ? `\npage errors: ${[...new Set(errors)].slice(0, 5).join(' | ')}` : '');
  fs.writeFileSync(path.join(SHOTS, 'RESULT.txt'), out + '\n'); console.log(`\n${results.length - fail}/${results.length} passed`);
  await b.close(); process.exit(fail ? 1 : 0);
})();
