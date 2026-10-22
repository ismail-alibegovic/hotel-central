import { createRequire } from 'module';
const require = createRequire('/opt/node22/lib/node_modules/');
let chromium; try { ({chromium} = require('playwright')); } catch { ({chromium} = require('/home/user/hotel-central/node_modules/playwright')); }
const base = process.argv[2];
const paths = ['/en','/bs','/en/rooms','/en/rooms/single-room','/en/rooms/standard-twin-double','/en/rooms/superior-double-room','/en/rooms/family-room','/en/rooms/junior-suite','/en/rooms/presidential-suite','/en/spa','/en/restaurant','/en/meetings-events','/en/location','/en/contact','/bs/rooms','/bs/contact'];
const sizes = [[390,844],[768,1024],[1440,900]];
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const out=[];
for (const [w,h] of sizes){
  const ctx = await b.newContext({viewport:{width:w,height:h}});
  for (const p of paths){
    const pg = await ctx.newPage(); const errs=[]; const bad=[];
    pg.on('pageerror',e=>errs.push(e.message)); pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
    pg.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url())});
    let status='?';
    try{ const r = await pg.goto(base+p,{waitUntil:'networkidle',timeout:45000}); status=r.status();
      const ov = await pg.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);
      const h1 = await pg.evaluate(()=>document.querySelectorAll('h1').length);
      const broken = await pg.evaluate(()=>[...document.images].filter(i=>i.complete&&i.naturalWidth===0).length);
      out.push({w,p,status,overflowX:ov,h1,brokenImgs:broken,errs:errs.slice(0,2),bad:bad.slice(0,2)});
    }catch(e){out.push({w,p,status:'ERR '+e.message.slice(0,80)})}
    await pg.close();
  }
  await ctx.close();
}
await b.close();
console.log(JSON.stringify(out));
