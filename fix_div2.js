const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current: handlePlantClick(\'\\' + id + \'\\')  (bytes: 92,39,92,39)
// We need: handlePlantClick('' + id + '')  (to produce onclick="handlePlantClick('' + id + '')")
// This evaluates to: onclick="handlePlantClick(monstera)" which is what we want

// In the JS string '...', to get '' we need to write the actual two single quotes
// So in the onclick value we want: handlePlantClick('' + id + '')
// In our JS string in the file, the pattern is \'\\' which evaluates to \' not ''

// Fix: replace the broken \'\\' with ''
const bad = String.fromCharCode(92,39,92,39); // \'\\'
const good = String.fromCharCode(39,39); // ''

const pos = c.indexOf(bad);
console.log('Bad pattern at:', pos);
if (pos !== -1) {
  c = c.replace(bad, good);
  console.log('Replaced!');
}

// Also fix the SVG fill - red when saved, white when not
const oldFill = 'fill="' + "(isSaved ? '#ef4444' : '#ffffff')" + '"';
const newFill = 'fill="' + "(isSaved ? '#ef4444' : '#ffffff')" + '"';
console.log('Fill pattern exists:', c.includes(newFill));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);
try {
  new Function(js);
  console.log('Syntax OK!');
} catch(e) {
  console.log('Syntax error:', e.message);
}

// Check the actual onclick now
const hpcIdx = c.indexOf('handlePlantClick');
console.log('\nhandlePlantClick context:');
console.log(JSON.stringify(c.substring(hpcIdx, hpcIdx + 50)));