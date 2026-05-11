const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all onerror occurrences and check their exact bytes
let pos = 0;
let count = 0;
while ((pos = c.indexOf('onerror', pos)) !== -1 && count < 5) {
  const section = c.substring(pos, pos + 40);
  console.log('\nOnerror at', pos, ':', JSON.stringify(section));
  console.log('Hex:', Buffer.from(section.substring(0, 25)).toString('hex'));
  pos++;
  count++;
}

// Now let's just check what the exact string is
const onerrorSection = c.substring(c.indexOf('onerror="this.src'), c.indexOf('onerror="this.src') + 30);
console.log('\n\nOnerror section:', JSON.stringify(onerrorSection));
console.log('Length:', onerrorSection.length);
console.log('Chars:');
for (let i = 0; i < onerrorSection.length; i++) {
  console.log(i, ':', JSON.stringify(onerrorSection[i]), '=', onerrorSection.charCodeAt(i));
}