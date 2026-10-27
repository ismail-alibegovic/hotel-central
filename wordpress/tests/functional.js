// Functional browser checks against a running site. Usage: node tests/functional.js [baseUrl]
const { chromium } = require('playwright');
const base = process.argv[2] || 'http://localhost:8080';
const results = []; const ok = (n, c, d = '') => { results.push([c ? 'PASS' : 'FAIL', n, d]); console.log((c ? 'PASS ' : 'FAIL ') + n + (d ? ' — ' + d : '')); };
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } }); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  // menu
  await p.goto(base + '/en/'); await p.waitForTimeout(1200);
  await p.click('[data-menu-btn]'); await p.waitForTimeout(1200);
  ok('menu opens', await p.getAttribute('[data-menu-btn]', 'aria-expanded') === 'true');
  ok('menu lists 8 items', (await p.$$('#site-menu nav a')).length === 8);
  await p.keyboard.press('Escape'); await p.waitForTimeout(300);
  ok('menu closes on Escape', await p.getAttribute('[data-menu-btn]', 'aria-expanded') === 'false');
  await ctx.route('**/live.ipms247.com/**', (r) => r.fulfill({ status: 200, body: 'ok' }));
  // booking bar → posts to eZee in new tab
  await p.click('.hc-bb__field[data-panel=dates]'); await p.waitForSelector('.hc-bb__panel .hc-cal__day:not(:disabled)');
  await p.locator('.hc-bb__panel .hc-cal__day:not(:disabled)').nth(3).click(); await p.waitForTimeout(100);
  await p.locator('.hc-bb__panel .hc-cal__day:not(:disabled)').nth(6).click();
  ok('date range shows nights', /3 nights/.test(await p.textContent('.hc-bb__head')));
  await p.click('.hc-bb__field[data-panel=guests]'); await p.click('.hc-bb__panel [data-d="1"] >> nth=0');
  const [req] = await Promise.all([ctx.waitForEvent('page', { timeout: 5000 }).catch(() => null), p.click('[data-go]')]);
  if (req) { await req.waitForLoadState('domcontentloaded').catch(() => {}); }
  const form = await p.$eval('.hc-bb form', (f) => Object.fromEntries(new FormData(f)));
  ok('booking form has eZee fields', form.eZ_chkin && form.eZ_chkout && form.eZ_Nights === '3' && form.eZ_adult === '3' && form.calformat === 'dd-mm-yy', JSON.stringify(form));
  ok('booking opens in new tab to ipms247', !!req && /ipms247/.test(req.url()), req ? req.url() : 'no popup');
  // carousel
  await p.goto(base + '/en/'); await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('.hc-rc').scrollIntoView()); await p.waitForTimeout(600);
  const t0 = await p.textContent('[data-live]'); await p.click('.hc-rc__next'); await p.waitForTimeout(1700);
  const t1 = await p.textContent('[data-live]'); ok('carousel advances', t0 !== t1, `${t0} → ${t1}`);
  // contact form
  await p.goto(base + '/en/contact/'); await p.waitForTimeout(500);
  await p.click('.hc-form button[type=submit]'); ok('contact validation errors', (await p.$$('.hc-form .err:not([hidden])')).length >= 3);
  await p.fill('[name=name]', 'Test Guest'); await p.fill('[name=email]', 'guest@example.com'); await p.fill('[name=message]', 'Hello, a test message for the hotel.'); await p.check('[name=consent]');
  await p.click('.hc-form button[type=submit]'); await p.waitForTimeout(1500);
  ok('contact form delivers', /Thank you/.test(await p.textContent('[data-status]')), await p.textContent('[data-status]'));
  // language switch + BS content
  await p.goto(base + '/en/rooms/'); await p.click('.hc-footer .hc-lang a[hreflang=bs]'); await p.waitForLoadState();
  ok('language switch keeps page (EN rooms → BS rooms)', /\/bs\/rooms\/$/.test(p.url()), p.url());
  ok('BS content', /Sobe i apartmani|SOBE/i.test(await p.textContent('h1')), await p.textContent('h1'));
  // room detail, redirects, 404
  const r1 = await p.goto(base + '/en/rooms/presidential-suite/'); ok('room detail 200', r1.status() === 200);
  ok('room detail has book link', (await p.$$('a[href*="roomwisedata.php"]')).length >= 1);
  const r2 = await p.request.get(base + '/club-spa/', { maxRedirects: 0 }); ok('legacy redirect /club-spa/ → /en/spa/', r2.status() === 301 && /\/en\/spa\/$/.test(r2.headers().location || ''), r2.headers().location);
  const r3 = await p.request.get(base + '/rooms/presidental-suite/', { maxRedirects: 0 }); ok('legacy typo slug redirect', r3.status() === 301 && /presidential-suite/.test(r3.headers().location || ''), r3.headers().location);
  const r4 = await p.request.get(base + '/about/', { maxRedirects: 0 }); ok('unprefixed /about/ → /en|bs/about/ (language cookie / Accept-Language)', r4.status() === 301 && /\/(en|bs)\/about\/$/.test(r4.headers().location || ''), r4.headers().location);
  const r5 = await p.goto(base + '/en/nope/'); ok('404 page', r5.status() === 404);
  ok('no JS errors', errs.length === 0, errs.join(' | '));
  await b.close();
  process.exit(results.some((r) => r[0] === 'FAIL') ? 1 : 0);
})();
