const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check DOMContentLoaded handler
const idx = c.indexOf('document.addEventListener');
console.log('DOMContentLoaded handler:');
console.log(JSON.stringify(c.substring(idx, idx + 300)));

// Check VISIBLE_COUNT
const vcIdx = c.indexOf('VISIBLE_COUNT');
console.log('\nVISIBLE_COUNT declaration:');
console.log(JSON.stringify(c.substring(vcIdx, vcIdx + 50)));

// Check renderPlants - does it render ALL plants or only some?
const rpIdx = c.indexOf('function renderPlants()');
console.log('\nrenderPlants start:');
console.log(JSON.stringify(c.substring(rpIdx, rpIdx + 600)));

// Check if there's something clearing plant-grid
console.log('\nplant-grid innerHTML assignments:');
let pos = 0;
let count = 0;
while ((pos = c.indexOf('plant-grid', pos)) !== -1) {
  const context = c.substring(pos - 20, pos + 80);
  if (context.includes('innerHTML')) {
    console.log('At", pos, ":', JSON.stringify(context));
  }
  pos++;
  count++;
  if (count > 20) break;
}

// Check if renderPlants is called in INIT
console.log('\nAll places renderPlants is called:');
let pos2 = 0;
let count2 = 0;
while ((pos2 = c.indexOf('renderPlants()', pos2)) !== -1) {
  console.log('At', pos2, ':', JSON.stringify(c.substring(pos2 - 50, pos2 + 60)));
  pos2++;
  count2++;
  if (count2 > 10) break;
}