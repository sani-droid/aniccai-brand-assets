const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const variants = [
  { out: 'facebook-1080x1350.png', w: 1080, h: 1350, vars: '--w:1080px;--h:1350px;--s:1;--pad:72px;--cols:2;--wave-top:990px;--wave-h:200px;--bet:block' },
  { out: 'linkedin-1200x627.png', w: 1200, h: 627, vars: '--w:1200px;--h:627px;--s:.6;--pad:44px 52px;--cols:4;--wave-top:330px;--wave-h:150px' },
];
(async () => {
  const b = await chromium.launch();
  for (const v of variants) {
    const p = await b.newPage({ viewport: { width: v.w, height: v.h }, deviceScaleFactor: 1 });
    await p.goto('file://' + path.resolve('card.html'));
    await p.evaluate(s => document.documentElement.setAttribute('style', s), v.vars);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    await p.screenshot({ path: v.out });
  }
  await b.close();
})();
