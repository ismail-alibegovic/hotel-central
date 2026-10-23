// Compares the visitor-observable HTML of every public page of two running sites (EN + BS).
// Usage: node scripts/audit/compare-html.mjs http://localhost:3300 http://localhost:3301
// Used to prove a refactor changes nothing: build `main` and the branch with the CMS off, start both, compare.
const [A, B] = process.argv.slice(2);
if (!A || !B) throw new Error("usage: compare-html.mjs <baseUrlA> <baseUrlB>");
const rooms = ["single-room","standard-twin-double","superior-double-room","family-room","junior-suite","presidential-suite"];
const sections = ["","/about","/rooms","/spa","/restaurant","/meetings-events","/location","/contact"];
const paths = ["en","bs"].flatMap(l=>[...sections.map(s=>`/${l}${s}`),...rooms.map(r=>`/${l}/rooms/${r}`)]);
function normalise(html){const grab=re=>(html.match(re)??[]).join("\n");const body=(html.match(/<body[\s\S]*<\/body>/i)?.[0]??"").replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<!--[\s\S]*?-->/g,"").replace(/\/_next\/static\/[^"'\s)]+/g,"/_next/static/X").replace(/\s+/g," ").replace(/> </g,">\n<");const head=[grab(/<html[^>]*lang="[^"]*"/i),grab(/<title>[\s\S]*?<\/title>/i),grab(/<meta (?:name|property)="(?:description|robots|og:[a-z:]+|twitter:[a-z:]+)"[^>]*>/gi),grab(/<link rel="(?:canonical|alternate)"[^>]*>/gi)].join("\n");return head+"\n"+body;}
let bad=0;
for(const p of paths){const [a,b]=await Promise.all([fetch(A+p).then(r=>r.text()),fetch(B+p).then(r=>r.text())]);const x=normalise(a),y=normalise(b);if(x!==y){bad++;const xs=x.split("\n"),ys=y.split("\n");const i=xs.findIndex((l,n)=>l!==ys[n]);console.log("DIFF",p,"line",i,"\n main:",xs[i]?.slice(0,300),"\n new :",ys[i]?.slice(0,300));}}
console.log(paths.length,"pages compared;",bad,"differ");
process.exit(bad ? 1 : 0);
