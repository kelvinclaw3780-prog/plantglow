const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the search input HTML
const searchInput = c.indexOf('id="plant-search"');
console.log('Search input at:', searchInput);
if (searchInput !== -1) {
  console.log(JSON.stringify(c.substring(searchInput - 50, searchInput + 150)));
}

// Check handlePlantSearch function
const hps = c.indexOf('function handlePlantSearch');
console.log('\nhandlePlantSearch at:', hps);
if (hps !== -1) {
  console.log(JSON.stringify(c.substring(hps, hps + 400)));
}

// Check if renderPlants is being called after search
const rp = c.indexOf('function renderPlants');
console.log('\nrenderPlants at:', rp);

// Check if there's something overwriting handlePlantSearch
const hasIssues = c.indexOf('handlePlantSearch =');
console.log('\nhandlePlantSearch assignment:', hasIssues !== -1 ? 'YES PROBLEM' : 'OK');