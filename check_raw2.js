const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the onclick="handlePlantClick
const idx = c.indexOf('onclick="handlePlantClick');
console.log('handlePlantClick onclick at:', idx);
const snippet = c.substring(idx, idx + 50);
console.log('Snippet:', JSON.stringify(snippet));
console.log('Raw:', snippet);
console.log('Char codes:', [...snippet].map(ch => ch.charCodeAt(0)));

// Show the exact bytes
const buf = Buffer.from(c.substring(idx, idx + 60), 'utf8');
console.log('Buffer hex:', buf.toString('hex'));