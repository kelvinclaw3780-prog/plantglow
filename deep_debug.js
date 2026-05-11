const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Count all script tags
let pos = 0;
let scriptCount = 0;
while (true) {
  const idx = c.indexOf('<script>', pos);
  if (idx === -1) break;
  scriptCount++;
  pos = idx + 1;
}
console.log('Number of <script> tags:', scriptCount);

// Check if there are duplicate function definitions
const funcs = ['handlePlantClick', 'openPlantModal', 'closePlantModal', 'renderPlantCard', 'renderPlants', 'updateModalFavoriteBtn', 'toggleModalFavorite'];
funcs.forEach(function(name) {
  const matches = (c.match(new RegExp('function ' + name, 'g')) || []).length;
  console.log(name + ':', matches, 'definition(s)');
});

// Check the plant-modal HTML
const modalIdx = c.indexOf('id="plant-modal"');
console.log('\nPlant modal HTML:');
console.log(JSON.stringify(c.substring(modalIdx, modalIdx + 500)));

// Check if modal favorite button exists in HTML
const favBtnIdx = c.indexOf('id="modal-favorite-btn"');
console.log('\nmodal-favorite-btn at:', favBtnIdx);
if (favBtnIdx === -1) console.log('WARNING: modal-favorite-btn does NOT exist in HTML');

// Check if currentModalPlantId is declared
const curModalIdx = c.indexOf('currentModalPlantId');
console.log('\ncurrentModalPlantId references:', (c.match(/currentModalPlantId/g) || []).length);