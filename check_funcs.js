const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length);

// Check current JS functions
const funcs = c.match(/function \w+\(/g);
console.log('Functions found:', funcs);

// Find VISIBLE_COUNT
const visIdx = c.indexOf('var VISIBLE_COUNT');
console.log('\nVISIBLE_COUNT at:', visIdx);
console.log('Content:', c.substring(visIdx, visIdx + 30));

// Find renderPlants
const rpIdx = c.indexOf('function renderPlants()');
console.log('\nrenderPlants at:', rpIdx);
console.log('Content:', c.substring(rpIdx, rpIdx + 100));

// Find handleBrowseAll
const baIdx = c.indexOf('function handleBrowseAll()');
console.log('\nhandleBrowseAll at:', baIdx);

// Check if handlePlantSearch exists
console.log('\nhandlePlantSearch exists:', c.includes('function handlePlantSearch'));
console.log('getSavedPlants exists:', c.includes('function getSavedPlants'));
console.log('handleToggleSave exists:', c.includes('function handleToggleSave'));