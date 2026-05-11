const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The correct pattern for onclick inside single-quoted JS string is:
// onclick="handlePlantClick(\'' + id + '\')"
// When JS parses this: \'' = ' (single quote)
// So the onclick attribute value becomes: handlePlantClick('' + id + '')

// Current file has: onclick="handlePlantClick('' + id + '')"
// The '' is not escaped so JS thinks the string ends

// Fix: replace '' with \''  (backslash-quote-quote)
const bad = String.fromCharCode(39,39); // ''
const good = String.fromCharCode(92,39,39); // \''

const pos = c.indexOf(bad);
console.log('Pattern at:', pos);
if (pos !== -1) {
  c = c.replace(bad, good);
  console.log('Fixed!');
}

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

// Check handlePlantClick
const hpcIdx = c.indexOf('handlePlantClick');
console.log('\nhandlePlantClick:', JSON.stringify(c.substring(hpcIdx - 5, hpcIdx + 60)));