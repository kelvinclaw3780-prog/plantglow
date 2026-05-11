const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check current state of the onclick handlers
const hpcIdx = c.indexOf('handlePlantClick');
console.log('handlePlantClick context:');
console.log(JSON.stringify(c.substring(hpcIdx - 5, hpcIdx + 50)));

const htsIdx = c.indexOf('handleToggleSave');
console.log('\nhandleToggleSave context:');
console.log(JSON.stringify(c.substring(htsIdx - 5, htsIdx + 50)));

// Find the exact byte sequences
const hpcSection = c.substring(hpcIdx, hpcIdx + 40);
console.log('\nhandlePlantClick bytes:');
for (let i = 0; i < hpcSection.length; i++) {
  console.log(i, ':', hpcSection.charCodeAt(i), '=', JSON.stringify(hpcSection[i]));
}