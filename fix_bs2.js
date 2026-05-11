const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current onerror has \'  (1 backslash + quote) in the file
// We need \\\' (3 backslashes + quote) in the file to produce \' in the final onclick

// Fix: replace \' with \\\'  (add 2 backslashes)
const bad = String.fromCharCode(92,39); // \'
const good = String.fromCharCode(92,92,92,39); // \\\'

console.log('Bad:', JSON.stringify(bad), 'char codes:', [...bad].map(x => x));
console.log('Good:', JSON.stringify(good), 'char codes:', [...good].map(x => x));

let pos = c.indexOf(bad);
console.log('\nBad pattern at:', pos);
if (pos !== -1) {
  c = c.replace(bad, good);
  console.log('Replaced!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify
const idx = c.indexOf('onerror="this.src');
const section = c.substring(idx, idx + 30);
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