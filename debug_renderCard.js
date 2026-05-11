const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('function renderPlantCard');
const end = c.indexOf('function renderPlants', idx);
console.log('renderPlantCard full code (', end - idx, 'chars):');
console.log(c.substring(idx, end));