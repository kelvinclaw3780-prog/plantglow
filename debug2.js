const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Look for function renderPlantCard and getSavedPlants
const idx = c.indexOf('function getSavedPlants');
const idx2 = c.indexOf('function renderPlantCard');
console.log('getSavedPlants at:', idx);
console.log('renderPlantCard at:', idx2);

// Find all function definitions and their context
const re = /function (\w+)\(/g;
let match;
while ((match = re.exec(c)) !== null) {
  const pos = match.index;
  const end = c.indexOf('}', pos + 200);
  const snippet = c.substring(pos, pos + 100);
  console.log('\nFunction:', match[1], 'at pos:', pos);
  console.log('Snippet:', snippet.replace(/\n/g, ' '));
}