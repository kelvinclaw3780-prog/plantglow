const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== CHECKING CURRENT STATE ===\n');

// Check plant data for nameZh
let count = 0;
let idx = 0;
while ((idx = h.indexOf('nameZh:', idx + 1)) >= 0) count++;
console.log('Plants with nameZh:', count);

// Check rendering uses nameZh
console.log('Rendering uses nameZh:', h.includes('(plant.nameZh || plant.name)'));

// Check if plant name in modal is using nameZh
console.log('Modal uses nameZh:', h.includes('plant.nameZh || plant.name'));

// Check login modal content
console.log('\n=== LOGIN MODAL ===');
const loginModalIdx = h.indexOf('id="login-required-modal"');
if (loginModalIdx >= 0) {
  console.log(h.substring(loginModalIdx, loginModalIdx + 600));
}

// Check the plant modal tips section
console.log('\n=== PLANT MODAL TIPS SECTION ===');
const tipsIdx = h.indexOf('plant-modal-tips');
if (tipsIdx >= 0) {
  console.log(h.substring(tipsIdx - 100, tipsIdx + 200));
}

// Check the renderPlantCard function to see what it outputs
const cardIdx = h.indexOf("'<div class=\"relative\">'");
if (cardIdx >= 0) {
  console.log('\n=== PLANT CARD TEMPLATE ===');
  console.log(h.substring(cardIdx, cardIdx + 400));
}