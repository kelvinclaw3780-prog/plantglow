const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the actual onclick button in renderPlantCard
const btnIdx = c.indexOf("onclick=\"handleToggleSave");
console.log('Button onclick at:', btnIdx);
console.log('Context:', JSON.stringify(c.substring(btnIdx - 20, btnIdx + 80)));

// Also check handlePlantClick
const hpcIdx = c.indexOf("onclick=\"handlePlantClick");
console.log('\nPlantClick onclick at:', hpcIdx);
console.log('Context:', JSON.stringify(c.substring(hpcIdx - 20, hpcIdx + 80)));

// Check the raw bytes around the issue
const raw = c.substring(19830, 19830 + 50);
console.log('\nRaw bytes at 19830:', JSON.stringify(raw));
console.log('Char codes:', [...raw].map(ch => ch.charCodeAt(0)));