const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find renderPlantCard and check if onclick is defined
const idx = c.indexOf('function renderPlantCard');
// Look for onclick definition within this function
const funcEnd = c.indexOf('function renderPlants', idx);
const funcContent = c.substring(idx, funcEnd);
console.log('renderPlantCard content (900 chars):');
console.log(JSON.stringify(funcContent.substring(0, 900)));

// Check for onclick variable
if (funcContent.includes('var onclick')) {
  console.log('\n\nonclick IS defined in renderPlantCard');
} else {
  console.log('\n\nonclick is NOT defined in renderPlantCard - THIS IS THE BUG');
}