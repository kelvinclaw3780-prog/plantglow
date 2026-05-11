const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the renderPlantCard function
const rpcIdx = c.indexOf('function renderPlantCard');
const rpcEnd = c.indexOf('function getSavedPlants');
const rpcContent = c.substring(rpcIdx, rpcEnd);
console.log('renderPlantCard length:', rpcContent.length);

// Show first 600 chars of it
console.log('\nFirst 600 chars:');
console.log(rpcContent.substring(0, 600));