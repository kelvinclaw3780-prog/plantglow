const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check plant modal HTML
const idx = h.indexOf('id="plant-modal" class="fixed');
console.log('Plant modal at:', idx);
if (idx >= 0) {
  console.log(h.substring(idx, idx + 1000));
}

// Check the care labels
const lightP = h.indexOf('plant-modal-light');
console.log('\nplant-modal-light context:');
console.log(h.substring(lightP - 50, lightP + 200));

// Check if the labels say Light, Water, etc.
const lightLabelIdx = h.indexOf('>Light</p>');
const waterLabelIdx = h.indexOf('>Water</p>');
const humidityLabelIdx = h.indexOf('>Humidity</p>');
const tempLabelIdx = h.indexOf('>Temp</p>');
console.log('\nLabels:');
console.log('Light label at:', lightLabelIdx);
console.log('Water label at:', waterLabelIdx);
console.log('Humidity label at:', humidityLabelIdx);
console.log('Temp label at:', tempLabelIdx);

if (lightLabelIdx >= 0) {
  console.log('Light label context:', JSON.stringify(h.substring(lightLabelIdx - 30, lightLabelIdx + 30)));
}
if (waterLabelIdx >= 0) {
  console.log('Water label context:', JSON.stringify(h.substring(waterLabelIdx - 30, waterLabelIdx + 30)));
}