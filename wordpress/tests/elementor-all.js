// Opens, edits, saves (and restores) EVERY seeded Elementor page in the real editor.
// Usage: node tests/elementor-all.js [baseUrl]   (admin password from WP_ADMIN_PASS, default admin-change-me)
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080', pass = process.env.WP_ADMIN_PASS || 'admin-change-me';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage();
  let errs = []; p.on('pageerror', (e) => errs.push(e.message + ' @ ' + (e.stack || '').split('\n')[1]?.trim()));
  await p.goto(base + '/wp-login.php'); await p.fill('#user_login', 'admin'); await p.fill('#user_pass', pass); await p.click('#wp-submit'); await p.waitForURL(/wp-admin/);
  const nonce = await (await p.request.get(base + '/wp-admin/admin-ajax.php?action=rest-nonce')).text();
  const pages = await (await p.request.get(base + '/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,lang,link&context=view', { headers: { 'X-WP-Nonce': nonce } })).json();
  const only = (process.env.ONLY || '').split(',').filter(Boolean).map(Number); const real = pages.filter((x) => (!only.length || only.includes(x.id)) && ['home','about','rooms','spa','restaurant','meetings-events','location','contact'].includes(x.slug));
  console.log('pages found:', real.length);
  let ok = 0; const allErr = {};
  for (const pg of real.sort((a, b) => a.id - b.id)) {
    errs = [];
    try {
      await p.goto(`${base}/wp-admin/post.php?post=${pg.id}&action=elementor`);
      await p.waitForSelector('#elementor-panel', { timeout: 90000 });
      const f = p.frameLocator('#elementor-preview-iframe');
      const h = f.locator('.elementor-widget-heading .elementor-heading-title').first(); await h.waitFor({ timeout: 90000 }); await p.waitForTimeout(3500);
      const n = await f.locator('.elementor-element').count();
      await h.click(); await p.waitForSelector('.elementor-control-title textarea', { timeout: 30000 });
      const ta = p.locator('.elementor-control-title textarea').first(); const old = await ta.inputValue();
      await ta.fill(old + ' ZZEDIT'); await p.waitForTimeout(800);
      await p.getByRole('button', { name: /^(Publish|Update)$/ }).click(); await p.waitForTimeout(3000);
      const html = await (await p.request.get(`${base}/?page_id=${pg.id}`)).text();
      const saved = html.includes('ZZEDIT');
      await h.click(); await p.waitForSelector('.elementor-control-title textarea'); await p.locator('.elementor-control-title textarea').first().fill(old); await p.waitForTimeout(800);
      await p.getByRole('button', { name: /^(Publish|Update)$/ }).click(); await p.waitForTimeout(2500);
      const html2 = await (await p.request.get(`${base}/?page_id=${pg.id}`)).text();
      const restored = !html2.includes('ZZEDIT');
      const good = saved && restored; if (good) ok++;
      console.log(`${good ? 'PASS' : 'FAIL'} #${pg.id} ${pg.lang || ''}/${pg.slug}: editor opened (${n} elements), edit saved=${saved}, restored=${restored}`);
    } catch (e) { console.log(`FAIL #${pg.id} ${pg.slug}: ${e.message.split('\n')[0]}`); }
    for (const e of errs) allErr[e] = (allErr[e] || 0) + 1;
  }
  console.log(`${ok}/${real.length} pages opened, edited, saved and restored`);
  console.log('editor page errors:', JSON.stringify(allErr, null, 1));
  await b.close(); process.exit(ok === real.length ? 0 : 1);
})();
