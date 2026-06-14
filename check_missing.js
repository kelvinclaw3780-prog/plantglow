const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find plantData area
const plantDataIdx = h.indexOf('var plantData = {');
const plantDataArea = h.substring(plantDataIdx, plantDataIdx + 25000);

// Find all plant IDs
const idMatches = plantDataArea.match(/(\w+):\s*\{/g) || [];
console.log('Total plant IDs found:', idMatches.length);

// Find all plants with nameZh
const zhMatches = h.match(/nameZh:\s*'([^']+)'/g) || [];
console.log('Plants with nameZh:', zhMatches.length);

// Find which ones are missing nameZh
const allIds = idMatches.map(m => m.replace(':', ''));
const zhIds = (h.match(/(\w+):\s*\{[\s\S]*?nameZh:/g) || []).map(m => m.replace(/:\s*\{[\s\S]*?nameZh:/, ''));

console.log('\nAll plant IDs:', allIds.join(', '));
console.log('\nPlants with nameZh:', zhIds.join(', '));

// Find missing ones
const missing = allIds.filter(id => !zhIds.includes(id));
console.log('\nMissing nameZh:', missing.join(', '));