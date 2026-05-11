const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all occurrences of "handlePlantSearch"
let pos = 0;
while (pos < c.length) {
  const idx = c.indexOf('handlePlantSearch', pos);
  if (idx === -1) break;
  console.log('Found at', idx, ':', JSON.stringify(c.substring(idx - 5, idx + 50)));
  pos = idx + 1;
}

// Also check where handleBrowseAll is
const hba = c.indexOf('function handleBrowseAll');
console.log('\nhandleBrowseAll at:', hba);
if (hba !== -1) {
  console.log(JSON.stringify(c.substring(hba, hba + 200)));
}

// Check what's between renderPlants and handleBrowseAll
const rpIdx = c.indexOf('function renderPlants');
const hbaIdx = c.indexOf('function handleBrowseAll');
console.log('\nBetween renderPlants and handleBrowseAll:');
console.log(JSON.stringify(c.substring(rpIdx, hbaIdx + 100)));