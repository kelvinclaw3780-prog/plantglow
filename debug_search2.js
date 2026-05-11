const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const searchIdx = c.indexOf('function handlePlantSearch');
const rpIdx = c.indexOf('grid.innerHTML = plantsToShow');
const rp2Idx = c.indexOf('renderPlants();', rpIdx + 50);

console.log('handlePlantSearch at:', searchIdx);
console.log('renderPlants line at:', rpIdx);
console.log('renderPlants() call at:', rp2Idx);

console.log('\nBetween handlePlantSearch and renderPlants():');
console.log(JSON.stringify(c.substring(searchIdx, rp2Idx + 30)));

// Check if data-name is in the rendered HTML
const dnIdx = c.indexOf('data-name="');
console.log('\ndata-name in file:', dnIdx !== -1 ? 'YES at ' + dnIdx : 'NO');