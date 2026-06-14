const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check plant data structure
const plantDataStart = h.indexOf('var plantData = [');
console.log('plantData found at:', plantDataStart);

if (plantDataStart >= 0) {
  // Show first plant entry
  const firstPlantEnd = h.indexOf(']', plantDataStart);
  const firstPlant = h.substring(plantDataStart, plantDataStart + 500);
  console.log('\nFirst plant entry:');
  console.log(firstPlant.substring(0, 400));
  
  // Count plants
  const plantCount = (h.match(/id: '/g) || []).length;
  console.log('\nTotal plants:', plantCount);
  
  // Check if plant names have Chinese
  const nameMatches = h.match(/name: '[^']+'/g) || [];
  console.log('\nFirst 10 plant names:');
  nameMatches.slice(0, 10).forEach((m, i) => console.log((i+1) + '.', m));
  
  // Check scientific names
  const sciMatches = h.match(/scientific: '[^']+'/g) || [];
  console.log('\nFirst 5 scientific names:');
  sciMatches.slice(0, 5).forEach((m, i) => console.log((i+1) + '.', m));
}

// Check what plant.card renders
console.log('\n=== PLANT CARD TEMPLATE ===');
const cardTemplateIdx = h.indexOf("'<div class=\"relative\">'");
if (cardTemplateIdx >= 0) {
  console.log(h.substring(cardTemplateIdx, cardTemplateIdx + 300));
}

// Check renderPlants function
const renderPlantsIdx = h.indexOf('function renderPlants');
if (renderPlantsIdx >= 0) {
  console.log('\n=== RENDER PLANTS FUNCTION ===');
  console.log(h.substring(renderPlantsIdx, renderPlantsIdx + 300));
}