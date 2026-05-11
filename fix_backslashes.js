const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current file has \\\\' (3 backslashes + quote) but we need \\' (1 backslash + quote)
// Replace \\\\' with \\'  (remove 2 backslashes)

const badPattern = String.fromCharCode(92,92,92,39); // \\\\'
const goodPattern = String.fromCharCode(92,39); // \'

console.log('Looking for:', JSON.stringify(badPattern), '=', badPattern.charCodeAt(0), badPattern.charCodeAt(1), badPattern.charCodeAt(2), badPattern.charCodeAt(3));
console.log('Replace with:', JSON.stringify(goodPattern), '=', goodPattern.charCodeAt(0), goodPattern.charCodeAt(1));

let count = 0;
let pos = 0;
while ((pos = c.indexOf(badPattern, pos)) !== -1) {
  console.log('Found at:', pos);
  c = c.substring(0, pos) + goodPattern + c.substring(pos + badPattern.length);
  count++;
  pos += 4;
}
console.log('Replaced', count, 'occurrences');

// Now verify syntax
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

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');