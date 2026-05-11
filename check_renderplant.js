const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find renderPlantCard and show everything up to the card div return
const idx = c.indexOf('function renderPlantCard(id, plant)');
console.log('renderPlantCard start:');
console.log(JSON.stringify(c.substring(idx, idx + 600)));