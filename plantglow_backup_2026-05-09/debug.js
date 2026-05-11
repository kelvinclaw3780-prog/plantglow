const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check what lucide.createIcons() would find
// If the HTML has emoji-like Unicode chars in IDs, lucide won't find them
const scriptStart = html.lastIndexOf('<script>');
const scriptEnd = html.indexOf('</script>', scriptStart + 9);
const script = html.substring(scriptStart, scriptEnd);

// Check for Unicode chars inside the JS code
let found = [];
for (let i = 0; i < script.length; i++) {
  const c = script.charCodeAt(i);
  if (c > 127) {
    found.push({pos: i, char: script[i], code: c.toString(16)});
    if (found.length >= 5) break;
  }
}
console.log('Non-ASCII in script (first 5):', found);

console.log('---');

// Check if init calls would work
const initIdx = script.indexOf('lucide.createIcons()');
const initCode = script.substring(initIdx, initIdx + 50);
console.log('Init call:', JSON.stringify(initCode));

// Check if VISIBLE_COUNT is defined before its use
const visibleIdx = script.indexOf('VISIBLE_COUNT');
const visibleDefIdx = script.indexOf('const VISIBLE_COUNT');
console.log('VISIBLE_COUNT use at:', visibleIdx, 'definition at:', visibleDefIdx);

// Check plantData keys
const plantIdx = script.indexOf('const plantData');
const plantDefEnd = script.indexOf('};', plantIdx) + 2;
const plantDef = script.substring(plantIdx, plantDefEnd);
const keyMatch = plantDef.match(/^\s{6}(\w+):/m);
if (keyMatch) {
  console.log('First plantData key:', keyMatch[1]);
}

// Check if renderPlants is defined before init call
const renderPlantsDef = script.indexOf('function renderPlants()');
const initCallIdx = script.indexOf('updateNav();\n    showLoginToast();\n    renderPlants();');
console.log('renderPlants defined at:', renderPlantsDef, 'init calls at:', initCallIdx);
