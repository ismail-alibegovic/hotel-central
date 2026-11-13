// Side-by-side fidelity check: Next.js reference (NEXT) vs WordPress (WP). Usage: node tests/compare.js outDir [pageFilter] [width]
const { chromium } = require('playwright');
const NEXT = process.env.NEXT_URL || 'http://localhost:3100', WP = process.env.WP_URL || 'http://localhost:8080';
const out = process.argv[2] || '/tmp/cmp', filt = process.argv[3], wf = process.argv[4];
const pages = ['', 'about', 'rooms', 'rooms/standard-twin-double', 'spa', 'restaurant', 'meetings-events', 'location', 'contact'].map((p) => ['en', p]).concat([['bs', ''], ['bs', 'rooms/superior-double-room']]);
const widths = [[1440, 900], [768, 1024], [390, 844]];
async function shot(b, base, w, h, path, file) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' }); const pg = await ctx.newPage();
  await pg.goto(base + path, { waitUntil: 'load' }); await pg.waitForTimeout(800);
  await pg.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } scrollTo(0, 0); });
  await pg.waitForTimeout(1200);
  // section tops: direct children sections of main
  const tops = await pg.evaluate(() => [...document.querySelectorAll('main section, main > div > div[data-elementor-type] > *, main > section')].map((e) => Math.round(e.getBoundingClientRect().top + scrollY)));
  const hh = await pg.evaluate(() => document.documentElement.scrollHeight);
  await pg.screenshot({ path: file, fullPage: true }); await ctx.close(); return { hh, tops };
}
(async () => {
  const b = await chromium.launch(); require('fs').mkdirSync(out, { recursive: true });
  for (const [w, h] of widths) { if (wf && +wf !== w) continue;
    for (const [l, p] of pages) { const key = `${l}_${p.replace(/\//g, '_') || 'home'}`; if (filt && !key.includes(filt)) continue;
      const n = await shot(b, NEXT, w, h, `/${l}${p ? '/' + p : ''}`, `${out}/${key}_${w}_next.png`);
      const q = await shot(b, WP, w, h, `/${l}/${p ? p + '/' : ''}`, `${out}/${key}_${w}_wp.png`);
      console.log(`${w} ${key}: next=${n.hh} wp=${q.hh} diff=${q.hh - n.hh} (${((q.hh / n.hh - 1) * 100).toFixed(1)}%)`);
    } }
  await b.close();
})();
