const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current onerror has too many backslashes
// The file has: onerror="this.src=\\\\'https:// (4 backslashes + quote)
// We need: onerror="this.src=\\'https:// (2 backslashes + quote)

// Replace \\\\' (4 chars) with \\\' (3 chars)
const bad = String.fromCharCode(92,92,92,39); // \\\\
const good = String.fromCharCode(92,92,39); // \\\
console.log('Looking for:', JSON.stringify(bad));

let count = 0;
let pos = 0;
while ((pos = c.indexOf(bad, pos)) !== -1) {
  console.log('Found bad at:', pos);
  c = c.replace(bad, good);
  count++;
  pos += 10;
}
console.log('Replaced', count, 'occurrences');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');

// Verify
const idx = c.indexOf('onerror');
const snippet = c.substring(idx - 10, idx + 80);
console.log('New onerror:', JSON.stringify(snippet));

// Check syntax
try {
  const idx1 = c.indexOf('<script>');
  const afterFirst = c.indexOf('</script>', idx1 + 8);
  const idx2 = c.indexOf('<script>', afterFirst);
  const idx2end = c.indexOf('</script>', idx2 + 8);
  const jsCode = c.substring(idx2 + 8, idx2end);
  new Function(jsCode);
  console.log('Syntax OK!');
} catch(e) {
  console.log('Syntax error:', e.message);
}