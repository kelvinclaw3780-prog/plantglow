const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the second script content and check for unusual ; patterns
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);

// Check for any lines that are just a single semicolon
const lines = js.split('\n');
lines.forEach((l, i) => {
  const t = l.trim();
  if (t === ';') {
    console.log(`Line ${i+1}: single semicolon`);
    console.log('Context:', JSON.stringify(lines.slice(Math.max(0,i-2), Math.min(lines.length, i+3))));
  }
});

// Check for lines ending with ; that shouldn't (like closing function blocks)
lines.forEach((l, i) => {
  const t = l.trim();
  if (t === '};' || t === '});' || t === '});') {
    console.log(`Line ${i+1}: suspicious ending`, JSON.stringify(l));
  }
});

console.log('Total lines:', lines.length);