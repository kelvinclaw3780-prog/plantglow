const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all lucide.createIcons calls
let pos = 0;
while (true) {
  const idx = c.indexOf('lucide.createIcons', pos);
  if (idx === -1) break;
  console.log('lucide at', idx, ':', JSON.stringify(c.substring(idx - 50, idx + 100)));
  pos = idx + 1;
}

// Check if updateNav calls lucide
const updateNavIdx = c.indexOf('function updateNav()');
console.log('\nupdateNav function:');
console.log(JSON.stringify(c.substring(updateNavIdx, updateNavIdx + 400)));