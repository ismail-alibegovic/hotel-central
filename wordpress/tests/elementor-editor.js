// Verifies that Elementor Free really opens and saves the seeded pages. Usage: node tests/elementor-editor.js [baseUrl] [pageId]
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080', id = process.argv[3] || '102';
const pass = process.env.WP_ADMIN_PASS || 'admin-change-me';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(base + '/wp-login.php'); await p.fill('#user_login', 'admin'); await p.fill('#user_pass', pass); await p.click('#wp-submit'); await p.waitForURL(/wp-admin/);
  await p.goto(`${base}/wp-admin/post.php?post=${id}&action=elementor`);
  await p.waitForSelector('#elementor-panel', { timeout: 90000 });
  const frame = p.frameLocator('#elementor-preview-iframe');
  await frame.locator('.elementor-widget-heading').first().waitFor({ timeout: 90000 });
  const n = await frame.locator('.elementor-element').count(); console.log('PASS editor loaded, elements in preview:', n);
  await p.screenshot({ path: '/tmp/shots/editor.png' });
  await p.waitForTimeout(4000);
  // edit the hero title through the panel
  await frame.locator('h1.elementor-heading-title').first().click();
  await p.waitForSelector('.elementor-control-title textarea', { timeout: 30000 });
  const ta = p.locator('.elementor-control-title textarea').first();
  const old = await ta.inputValue(); console.log('PASS panel opened for widget, title =', JSON.stringify(old));
  const marker = old + ' EDITED'; await ta.fill(marker); await p.waitForTimeout(800);
  await p.getByRole('button', { name: /^(Publish|Update)$/ }).click(); await p.waitForTimeout(3000);
  const html = await (await p.request.get(`${base}/?page_id=${id}`)).text();
  const saved = html.includes('EDITED'); console.log(saved ? 'PASS edit saved and rendered on the front end' : 'FAIL edit not found on front end');
  // restore
  await frame.locator('h1.elementor-heading-title').first().click(); await p.locator('.elementor-control-title textarea').first().fill(old); await p.waitForTimeout(600);
  await p.getByRole('button', { name: /^(Publish|Update)$/ }).click(); await p.waitForTimeout(2500);
  console.log('page errors:', errs.filter((e) => !/google|gstatic/.test(e)).slice(0, 3).join(' | ') || 'none');
  await b.close(); process.exit(saved ? 0 : 1);
})();
