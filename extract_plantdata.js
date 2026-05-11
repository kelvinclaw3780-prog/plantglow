const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);

// Find plantData section and check it carefully
const pdStart = main.indexOf('var plantData');
const pdEnd = main.indexOf('};', pdStart) + 2;

console.log('plantData starts at offset:', pdStart);
console.log('plantData ends at offset:', pdEnd);
console.log('plantData length:', pdEnd - pdStart);

// Extract the plantData portion
const plantData = main.substring(pdStart, pdEnd);
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/plantdata_check.js', plantData);
console.log('plantData saved to file');

// Check just the plantData for syntax
try {
  new Function(plantData);
  console.log('plantData syntax: OK');
} catch(e) {
  console.log('plantData syntax ERROR:', e.message);
  
  // Find the problematic line
  const lines = plantData.split('\n');
  console.log('Total lines in plantData:', lines.length);
  
  // Try to find which plant might have an issue
  const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];
  plants.forEach(p => {
    const idx = plantData.indexOf(p + ': {');
    if (idx !== -1) {
      const lineNum = plantData.substring(0, idx).split('\n').length;
      console.log(p, 'starts at line', lineNum);
    }
  });
}