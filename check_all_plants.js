const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Get all plant names and IDs
const plantDataIdx = h.indexOf('var plantData = {');
if (plantDataIdx < 0) {
  console.log('plantData not found');
  process.exit(1);
}

// Extract all plant IDs and names
const plantArea = h.substring(plantDataIdx, plantDataIdx + 30000);
const plantMatches = plantArea.match(/(\w+):\s*\{\s*name:\s*'([^']+)'/g) || [];

console.log('Total plants found:', plantMatches.length);
console.log('\nPlant names (English):');
plantMatches.forEach((m, i) => {
  const match = m.match(/(\w+):\s*\{\s*name:\s*'([^']+)'/);
  if (match) {
    console.log((i+1) + '. ' + match[1] + ' = ' + match[2]);
  }
});