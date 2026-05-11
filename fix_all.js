const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check current state of handlePlantClick
const hpcIdx = c.indexOf('handlePlantClick');
console.log('handlePlantClick at:', hpcIdx);
console.log('Context:', JSON.stringify(c.substring(hpcIdx - 10, hpcIdx + 80)));

// The problem: we have '' + id + \'\\' - the first '' is fixed but second part is wrong
// Pattern: handlePlantClick('' + id + \'\\')
// We need: handlePlantClick('' + id + '')

// Fix: replace \'\\' with ''
const bad1 = String.fromCharCode(92,39,92,39); // \'\\'
const good1 = String.fromCharCode(39,39); // ''

let count = 0;
let pos = 0;
while ((pos = c.indexOf(bad1, pos)) !== -1) {
  console.log('Found at:', pos);
  c = c.replace(bad1, good1);
  count++;
  pos += 4;
}
console.log('Replaced', count, 'occurrences of bad pattern');

// Check fill color
const fillIdx = c.indexOf("fill=\"' + (isSaved");
console.log('\nFill at:', fillIdx);
if (fillIdx !== -1) {
  console.log('Fill context:', JSON.stringify(c.substring(fillIdx, fillIdx + 50)));
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify syntax
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);
try {
  new Function(js);
  console.log('\nSyntax OK!');
} catch(e) {
  console.log('\nSyntax error:', e.message);
}

// Check handlePlantClick again
const hpcIdx2 = c.indexOf('handlePlantClick');
console.log('\nhandlePlantClick context after fix:');
console.log(JSON.stringify(c.substring(hpcIdx2 - 10, hpcIdx2 + 80)));