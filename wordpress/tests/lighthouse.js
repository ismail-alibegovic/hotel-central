// Lighthouse (mobile + desktop) on key pages. Usage: CHROME_PATH=… node tests/lighthouse.js [baseUrl]
const lighthouse = require('lighthouse').default || require('lighthouse'); const chromeLauncher = require('chrome-launcher');
const base = process.argv[2] || 'http://localhost:8080';
(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  for (const u of ['en/', 'en/rooms/', 'en/rooms/standard-twin-double/', 'en/contact/']) for (const form of ['mobile', 'desktop']) {
    const r = await lighthouse(`${base}/${u}`, { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], formFactor: form, screenEmulation: form === 'desktop' ? { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false } : undefined, throttlingMethod: 'simulate' });
    const c = r.lhr.categories, a = r.lhr.audits;
    console.log(`${form.padEnd(7)} ${u.padEnd(34)} perf=${Math.round(c.performance.score * 100)} a11y=${Math.round(c.accessibility.score * 100)} bp=${Math.round(c['best-practices'].score * 100)} seo=${Math.round(c.seo.score * 100)} | FCP ${a['first-contentful-paint'].displayValue} LCP ${a['largest-contentful-paint'].displayValue} TBT ${a['total-blocking-time'].displayValue} CLS ${a['cumulative-layout-shift'].displayValue} | ${(a['total-byte-weight'].numericValue / 1048576).toFixed(1)} MB`);
  }
  await chrome.kill();
})();
