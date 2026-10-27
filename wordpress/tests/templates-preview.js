// Renders every Saved Template (as stored in Elementor → Templates) at 1440 and 390 px. Usage: node tests/templates-preview.js [baseUrl] [outDir]
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080', out = process.argv[3] || 'tests/evidence/templates', pass = process.env.WP_ADMIN_PASS || 'admin-change-me';
(async () => {
  const b = await chromium.launch(); require('fs').mkdirSync(out, { recursive: true });
  const ctx0 = await b.newContext(); const p0 = await ctx0.newPage();
  await p0.goto(base + '/wp-login.php'); await p0.fill('#user_login', 'admin'); await p0.fill('#user_pass', pass); await p0.click('#wp-submit'); await p0.waitForURL(/wp-admin/);
  const nonce = await (await p0.request.get(base + '/wp-admin/admin-ajax.php?action=rest-nonce')).text();
  const list = await (await p0.request.get(base + '/wp-json/wp/v2/elementor_library?per_page=100&_fields=id,link,title', { headers: { 'X-WP-Nonce': nonce } })).json();
  console.log('templates:', list.length);
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', storageState: await ctx0.storageState() }); const p = await ctx.newPage();
    for (const t of list) {
      await p.goto(t.link); await p.waitForTimeout(500);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); }); await p.waitForTimeout(900);
      const slug = t.title.rendered.replace(/&[^;]+;/g, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 60);
      const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      await p.screenshot({ path: `${out}/${w}-${slug}.jpg`, fullPage: true, type: 'jpeg', quality: 50 });
      console.log(`${w} ${t.id} ${slug} overflow=${ov} h=${await p.evaluate(() => document.body.scrollHeight)}`);
    }
    await ctx.close();
  }
  await b.close();
})();
