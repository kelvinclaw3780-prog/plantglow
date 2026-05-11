const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current pattern in file (bytes: 92,92,39 = \\'):
// onerror="this.src=\\\'https://
// We need to change the \\' (2 backslashes + quote) to \' (1 backslash + quote)

// Since we can't easily do indexOf with multiple chars, let's use replace with a string
// Find the exact substring and replace it
const bad = String.fromCharCode(92,92,39); // \\'
const good = String.fromCharCode(92,39); // \'

console.log('Bad pattern char codes:', bad.charCodeAt(0), bad.charCodeAt(1), bad.charCodeAt(2));
console.log('Good pattern char codes:', good.charCodeAt(0), good.charCodeAt(1));

const pos = c.indexOf(bad);
console.log('\nBad pattern found at:', pos);
if (pos !== -1) {
  console.log('Context:', JSON.stringify(c.substring(pos - 5, pos + 15)));
  c = c.replace(bad, good);
  console.log('Replaced!');
} else {
  console.log('Pattern not found - trying alternative');
  // Maybe it's already been partially fixed
  const altBad = String.fromCharCode(92,92,92,39); // \\\
  const altPos = c.indexOf(altBad);
  console.log('Alt pattern (\\\\\) at:', altPos);
}

// Verify
const onerrorIdx = c.indexOf('onerror="this.src');
const section = c.substring(onerrorIdx, onerrorIdx + 30);
console.log('\nNew onerror:', JSON.stringify(section));
console.log('Hex:', Buffer.from(section).toString('hex'));

// Check syntax
try {
  const idx1 = c.indexOf('<script>');
  const afterFirst = c.indexOf('</script>', idx1 + 8);
  const idx2 = c.indexOf('<script>', afterFirst);
  const idx2end = c.indexOf('</script>', idx2 + 8);
  const jsCode = c.substring(idx2 + 8, idx2end);
  new Function(jsCode);
  console.log('\nSyntax OK!');
} catch(e) {
  console.log('\nSyntax error:', e.message);
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');