const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find renderPlants function and add debugging
const renderPlantsFunc = `function renderPlants() {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var browseText = document.getElementById('browse-all-text');
      var loggedIn = isLoggedIn();
      var plantIds = Object.keys(plantData);
      var showCount = showingAll ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      console.log('[renderPlants] plantData keys:', Object.keys(plantData).length, 'showCount:', showCount, 'showingAll:', showingAll);
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');`;

const newRenderPlants = `function renderPlants() {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var browseText = document.getElementById('browse-all-text');
      var loggedIn = isLoggedIn();
      var plantIds = Object.keys(plantData);
      var showCount = showingAll ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      console.log('[renderPlants] plantData keys:', Object.keys(plantData).length, 'showCount:', showCount, 'showingAll:', showingAll);
      if (plantsToShow.length === 0) { console.warn('[renderPlants] WARNING: plantsToShow is empty! plantData might not be loaded yet'); }
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');`;

if (c.includes(renderPlantsFunc)) {
  c = c.replace(renderPlantsFunc, newRenderPlants);
  console.log('Added debug logging to renderPlants');
} else {
  console.log('Could not find exact renderPlants function');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');