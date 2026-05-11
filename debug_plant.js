const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lines = c.split('\n');

// Check DOMContentLoaded listener
console.log('Lines 341-347 (init):');
for (let i = 340; i <= 346; i++) console.log(i + ':', JSON.stringify(lines[i]));

// Check VISIBLE_COUNT
const visLine = lines.findIndex((l, i) => l.includes('VISIBLE_COUNT'));
console.log('\nVISIBLE_COUNT line:', visLine + 1, JSON.stringify(lines[visLine]));

// Check plantData exists
const plantDataLine = lines.findIndex((l, i) => l.includes('plantData = {'));
console.log('plantData line:', plantDataLine + 1);

// Check renderPlantCard
const renderCardLine = lines.findIndex((l, i) => l.includes('function renderPlantCard'));
console.log('renderPlantCard line:', renderCardLine + 1);

// Check renderPlants
const renderPlantsLine = lines.findIndex((l, i) => l.includes('function renderPlants()'));
console.log('renderPlants line:', renderPlantsLine + 1);

// Check if there are syntax issues - look for function definitions
const funcMatches = c.match(/function \w+\(/g);
console.log('\nFunction count:', funcMatches ? funcMatches.length : 0);
console.log('Functions:', funcMatches ? funcMatches.join(', ') : 'none');