const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current onerror pattern from fix_onerror6 output: "this.src=\\\\'https"
// That's: this.src=\\\\'  where \\\\ = \\ (one backslash) and \\' = \' 
// So we have: this.src=\\'  (this.src=\ followed by ')

// Wait, the output shows: "onerror=\"this.src=\\\\'https"
// After my fix it became: "onerror=\"this.src=\\\\'  (still 4 backslashes!)
// My replacement didn't work correctly!

// Let me find and fix more carefully
const onerrorIdx = c.indexOf('onerror');
const section = c.substring(onerrorIdx, onerrorIdx + 60);
console.log('Current section:', JSON.stringify(section));
console.log('Hex:', Buffer.from(section).toString('hex'));

// The problem: I replaced \\\\  with \\\ but the pattern wasn't found correctly
// Let me just do a simple text replacement
// Current: \\\\\\' (4 backslashes, 1 quote)
// Target: \\\' (3 backslashes, 1 quote)

const old = 'this.src=\\\\\\'https';
const replacement = 'this.src=\\\'https';
const idx2 = c.indexOf(old);
console.log('\nLooking for:', JSON.stringify(old), 'at:', idx2);
console.log('Found:', idx2 !== -1 ? 'YES' : 'NO');

if (idx2 !== -1) {
  c = c.replace(old, replacement);
  console.log('Replaced!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify
const onerrorIdx2 = c.indexOf('onerror');
const section2 = c.substring(onerrorIdx2, onerrorIdx2 + 60);
console.log('\nNew section:', JSON.stringify(section2));

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