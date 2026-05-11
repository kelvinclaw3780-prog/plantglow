const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check what onerror pattern we actually have
const onerrorIdx = c.indexOf('onerror="this.src');
const section = c.substring(onerrorIdx, onerrorIdx + 40);
console.log('Section:', JSON.stringify(section));
console.log('Hex:', Buffer.from(section).toString('hex'));

// Show each character
console.log('\nChars:');
for (let i = 0; i < section.length; i++) {
  console.log(i, ':', JSON.stringify(section[i]), '=', section.charCodeAt(i));
}

// Now figure out what to replace
// We want: onerror="this.src='  (with src=' being a proper HTML attribute value containing a quoted URL)
// In the JS string, the ' in src=' needs to be escaped as \'
// So the JS string should contain: onerror="this.src=\'  (backslashed quote)
// We currently have: onerror="this.src=\'  (backslashed quote) but maybe with wrong number of backslashes

// Check: in the file, what's the sequence before src=' ?
const srcEquals = c.indexOf('src=', onerrorIdx);
const before = c.substring(srcEquals - 10, srcEquals + 20);
console.log('\nBefore src=:', JSON.stringify(before));

// Find the actual escaping needed
// Pattern we want to end up with in the JS string: onerror="this.src=\'https://
// Which means in the file we need: onerror="this.src=\'https:// (2 chars: \ and ')

console.log('\nCurrent file bytes before src=:', JSON.stringify(c.substring(srcEquals - 8, srcEquals + 8)));