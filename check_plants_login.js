const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check login popup
console.log('=== LOGIN POPUP ===');
const modalIdx = h.indexOf('login-required-modal" class="fixed');
if (modalIdx >= 0) {
  console.log(h.substring(modalIdx, modalIdx + 600));
}

// Check plant names in renderPlantCard
console.log('\n=== PLANT CARD RENDERING ===');
const renderIdx = h.indexOf('function renderPlantCard');
if (renderIdx >= 0) {
  console.log(h.substring(renderIdx, renderIdx + 500));
}

// Check what plant names look like in the plant grid
console.log('\n=== PLANT NAME DISPLAY ===');
const plantGridIdx = h.indexOf('plant-grid');
if (plantGridIdx >= 0) {
  console.log('plant-grid found at:', plantGridIdx);
}

// Check plantData section for names
const plantDataIdx = h.indexOf('var plantData');
if (plantDataIdx >= 0) {
  console.log('plantData found at:', plantDataIdx);
  // Show first plant entry
  const monsteraIdx = h.indexOf('monstera:');
  if (monsteraIdx >= 0) {
    console.log(h.substring(monsteraIdx, monsteraIdx + 200));
  }
}

// Check if plant names appear in the UI
console.log('\n=== CHECKING ENGLISH PLANT NAMES IN UI ===');
const plantNames = ['Monstera', 'Snake Plant', 'Pothos', 'Peace Lily', 'Spider Plant'];
for (const name of plantNames) {
  const idx = h.indexOf(name);
  if (idx >= 0 && idx < 50000) { // Only check in first part (UI), not in plant data JSON
    console.log('Found in UI:', name, 'at', idx, JSON.stringify(h.substring(idx - 20, idx + 40)));
  }
}

// Check the modal plant name display
console.log('\n=== MODAL PLANT NAME ===');
const modalNameIdx = h.indexOf('plant-modal-name');
if (modalNameIdx >= 0) {
  console.log(h.substring(modalNameIdx - 50, modalNameIdx + 200));
}