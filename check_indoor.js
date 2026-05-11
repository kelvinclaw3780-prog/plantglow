const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Count Indoor Growing occurrences
let count = 0;
let pos = 0;
while ((pos = c.indexOf('Indoor Growing', pos)) !== -1) {
  count++;
  console.log('At', pos, ':', JSON.stringify(c.substring(pos - 20, pos + 60)));
  pos++;
}
console.log('\nTotal Indoor Growing:', count);

// Replace all remaining
c = c.split('Indoor Growing').join('Gardening');
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nAll Indoor Growing replaced with Gardening');

// Also handle space matching in description
c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('\nMeta description:');
const descIdx = c.indexOf('name="description"');
console.log(JSON.stringify(c.substring(descIdx, descIdx + 200)));