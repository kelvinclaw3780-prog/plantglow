const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the JS section
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);

// Try to find the error by parsing line by line
const lines = js.split('\n');
console.log('Total lines:', lines.length);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes(';')) {
    // Check if it's a weird semicolon placement
    const trimmed = line.trim();
    if (trimmed === ';' || trimmed.startsWith(';')) {
      console.log('Suspicious line', i+1, ':', JSON.stringify(line));
    }
  }
}

// Find the end of plantData section
const pdEnd = c.indexOf('};', c.indexOf('var plantData'));
const afterPd = c.substring(pdEnd, pdEnd + 200);
console.log('\nAfter plantData };', JSON.stringify(afterPd));