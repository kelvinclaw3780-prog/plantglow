const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(c.indexOf('// INIT'));
const mainEnd = c.indexOf('</script>', c.indexOf('// INIT'));
const mainJS = main.substring(0, mainEnd - main.indexOf('// INIT'));

console.log('Main JS length:', mainJS.length);
console.log('First 500 chars:');
console.log(mainJS.substring(0, 500));

// Check for renderPlantGrid specifically
const rgIdx = mainJS.indexOf('renderPlantGrid');
console.log('\nrenderPlantGrid found at:', rgIdx);
if (rgIdx !== -1) {
  console.log('Context:', JSON.stringify(mainJS.substring(rgIdx - 30, rgIdx + 80)));
}

// Check what's calling renderPlantGrid
const callIdx = mainJS.indexOf('renderPlantGrid(');
console.log('\nrenderPlantGrid( call at:', callIdx);
if (callIdx !== -1) {
  console.log('Context:', JSON.stringify(mainJS.substring(callIdx - 50, callIdx + 50)));
}

// Check DOMContentLoaded
const dclIdx = mainJS.indexOf('DOMContentLoaded');
console.log('\nDOMContentLoaded found at:', dclIdx);
if (dclIdx !== -1) {
  console.log('Context:', JSON.stringify(mainJS.substring(dclIdx, dclIdx + 200)));
}