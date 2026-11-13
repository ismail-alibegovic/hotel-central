// Automated accessibility audit (axe-core, WCAG 2 A/AA + best-practice). Usage: AXE=/path/to/axe.min.js node tests/axe.js [baseUrl]
const { chromium } = require('playwright'); const fs = require('fs');
const base = process.argv[2] || 'http://localhost:8080', axeSrc = fs.readFileSync(process.env.AXE || require.resolve('axe-core/axe.min.js'), 'utf8');
const pages = ['en/', 'en/about/', 'en/rooms/', 'en/rooms/standard-twin-double/', 'en/spa/', 'en/restaurant/', 'en/meetings-events/', 'en/location/', 'en/contact/', 'bs/', 'bs/contact/', 'en/nope/'];
(async () => {
  const b = await chromium.launch(); const sum = {};
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
    for (const u of pages) {
      await p.goto(`${base}/${u}`); await p.waitForTimeout(700);
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); }); await p.waitForTimeout(1300);
      await p.evaluate(axeSrc);
      const r = await p.evaluate(() => axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'], resultTypes: ['violations'] }));
      for (const v of r.violations) { const k = `${v.impact} ${v.id}`; (sum[k] = sum[k] || { help: v.help, pages: new Set(), n: 0, ex: v.nodes[0].target.join(' ') + ' | ' + (v.nodes[0].failureSummary || '').split('\n')[1] }); sum[k].pages.add(`${w}:${u}`); sum[k].n += v.nodes.length; }
      console.log(`${w} ${u}: ${r.violations.length} violation types`);
    }
    await ctx.close();
  }
  console.log('\nSUMMARY'); for (const [k, v] of Object.entries(sum)) console.log(`${k} ×${v.n} on ${v.pages.size} pages — ${v.help}\n    e.g. ${v.ex}`);
  await b.close();
})();
