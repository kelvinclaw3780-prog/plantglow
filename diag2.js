const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('File length:', h.length);

// Check for any non-ASCII in the script portion (from 17503 to 53029)
let bad = [];
for (let i = 17503; i < 53029; i++) {
  const c = h.charCodeAt(i);
  if (c > 127) {
    bad.push({pos: i, char: h[i], code: c.toString(16)});
  }
}
console.log('Non-ASCII in script:', bad.length, 'first 5:', bad.slice(0, 5));

// Check what's at the very start of the script
console.log('\nStart of script (17503-17553):');
console.log(JSON.stringify(h.substring(17503, 17553)));

// Check init call
const initIdx = h.indexOf('lucide.createIcons()');
console.log('\nInit call context (', initIdx, '):');
console.log(JSON.stringify(h.substring(initIdx - 100, initIdx + 150)));

// Check VISIBLE_COUNT definition
const visIdx = h.indexOf('VISIBLE_COUNT');
console.log('\nVISIBLE_COUNT def context:');
console.log(JSON.stringify(h.substring(visIdx - 50, visIdx + 80)));

// Check plantData definition
const pdIdx = h.indexOf('var plantData');
console.log('\nplantData def context:');
console.log(JSON.stringify(h.substring(pdIdx - 30, pdIdx + 100)));

// Try compiling just the portion up to renderPlants
const scriptEnd = h.indexOf('</script>', h.lastIndexOf('<script>') + 9);
const scriptContent = h.substring(h.lastIndexOf('<script>') + 9, scriptEnd);
const vm = require('vm');
try {
  new vm.Script(scriptContent, {filename: 'main.js'});
  console.log('\nJS COMPILE: OK');
} catch(e) {
  console.log('\nJS COMPILE ERROR:', e.message);
}
