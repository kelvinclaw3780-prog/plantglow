const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('plant-search');
console.log('plant-search found at:', idx);
if (idx !== -1) console.log(JSON.stringify(c.substring(idx - 30, idx + 100)));

// Also check renderPlants function
const rpIdx = c.indexOf('grid.innerHTML = plantsToShow');
console.log('\nrenderPlants at:', rpIdx);
if (rpIdx !== -1) console.log(JSON.stringify(c.substring(rpIdx - 50, rpIdx + 150)));