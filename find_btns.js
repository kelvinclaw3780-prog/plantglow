const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all browseBtn and showLessBtn references in JS
let pos = 0;
while (true) {
  const idx = c.indexOf('browseBtn', pos);
  if (idx === -1 || idx > 30000) break;
  console.log('browseBtn at', idx, ':', JSON.stringify(c.substring(idx - 30, idx + 80)));
  pos = idx + 1;
}

console.log('\n--- showLessBtn ---');
pos = 0;
while (true) {
  const idx = c.indexOf('showLessBtn', pos);
  if (idx === -1 || idx > 30000) break;
  console.log('showLessBtn at', idx, ':', JSON.stringify(c.substring(idx - 30, idx + 80)));
  pos = idx + 1;
}