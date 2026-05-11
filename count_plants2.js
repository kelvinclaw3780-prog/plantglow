const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('var plantData');
const end = c.indexOf('};', idx);
const pd = c.substring(idx, end);

// Find all plant keys
const matches = pd.match(/\n\s+(\w+):\s*\{/g);
if (matches) {
  console.log('Plant count:', matches.length);
  matches.forEach((m, i) => {
    const name = m.match(/(\w+):/)[1];
    console.log((i+1) + '. ' + name);
  });
} else {
  console.log('No plants found');
}

// Also check VISIBLE_COUNT
const visIdx = c.indexOf('VISIBLE_COUNT');
if (visIdx !== -1) {
  const visLine = c.substring(visIdx, visIdx + 30).split('\n')[0];
  console.log('\nVISIBLE_COUNT:', visLine.trim());
}

// Count in plantIds
const pidIdx = c.indexOf('var plantIds = Object.keys(plantData)');
if (pidIdx !== -1) {
  console.log('plantIds from Object.keys');
}