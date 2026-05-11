const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);

// Save main JS to file for inspection
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/main_js_check.js', main);
console.log('Main JS saved, length:', main.length);

// Check around line 304 (error position)
const lines = main.split('\n');
console.log('\nLine 304:');
console.log(lines[303]);

// Find plantData
const pdStart = main.indexOf('var plantData');
const pdEnd = main.indexOf('};', pdStart);
console.log('\nplantData starts at line:', main.substring(0, pdStart).split('\n').length);
console.log('plantData ends at line:', main.substring(0, pdEnd).split('\n').length);

// Check last plant (basil)
const basilIdx = main.indexOf('basil: {');
if (basilIdx !== -1) {
  const afterBasil = main.substring(basilIdx, basilIdx + 500);
  console.log('\nBasil section (first 500 chars):');
  console.log(afterBasil.substring(0, 300));
}

// Check the very end of the JS
console.log('\nLast 100 chars of main JS:');
console.log(JSON.stringify(main.substring(main.length - 100)));