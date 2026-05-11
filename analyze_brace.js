const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the JS section
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

const lines = jsCode.split('\n');

// Show lines 145-175
console.log('JS lines 145-175:');
for (let i = 144; i <= 174; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}

// Find handlePlantSearch
const hpsIdx = jsCode.indexOf('function handlePlantSearch');
console.log('\nhandlePlantSearch starts at JS char:', hpsIdx, '= JS line:', jsCode.substring(0, hpsIdx).split('\n').length);

// Find the function before it
const before = jsCode.substring(0, hpsIdx);
const lastFuncStart = before.lastIndexOf('function ');
console.log('Previous function starts at JS char:', lastFuncStart);
const prevFuncLines = before.substring(lastFuncStart).split('\n');
console.log('Previous function (' + prevFuncLines[0].trim() + ') has', prevFuncLines.length, 'lines');
console.log('Ends with:', JSON.stringify(prevFuncLines.slice(-3)));