const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('=== openPlantModal ===');
const idx = c.indexOf('function openPlantModal');
console.log(JSON.stringify(c.substring(idx, idx + 300)));

console.log('\n=== handlePlantClick ===');
const hpcIdx = c.indexOf('function handlePlantClick');
console.log(JSON.stringify(c.substring(hpcIdx, hpcIdx + 150)));

console.log('\n=== renderPlants calls ===');
let pos = 0;
while (true) {
  const idx2 = c.indexOf('renderPlants()', pos);
  if (idx2 === -1 || idx2 > 50000) break;
  console.log('renderPlants() at:', idx2, '-', JSON.stringify(c.substring(idx2 - 30, idx2 + 30)));
  pos = idx2 + 1;
}