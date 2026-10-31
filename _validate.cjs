const fs = require('fs');
const html = fs.readFileSync('train/index.html', 'utf8');
const m = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (!m) { console.error('No module script found'); process.exit(1); }
fs.writeFileSync('_extracted.mjs', m[1], 'utf8');
console.log('Extracted', m[1].length, 'chars to _extracted.mjs');
