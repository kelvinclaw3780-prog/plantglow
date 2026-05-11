const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the renderPlants function and see the full button visibility block
const rpIdx = c.indexOf('function renderPlants()');
// Get the section from after grid.innerHTML to the end of renderPlants
const gridIH = c.indexOf('grid.innerHTML', rpIdx);
const afterGrid = c.indexOf('lucide.createIcons', gridIH);
console.log('renderPlants button logic (from after grid.innerHTML to lucide.createIcons):');
console.log(JSON.stringify(c.substring(gridIH, afterGrid + 50)));