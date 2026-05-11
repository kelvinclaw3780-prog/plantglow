const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="mobile-menu"');
console.log('mobile-menu at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 100, idx + 500)));
}

// Also check the toggleMenu function
const tIdx = c.indexOf('function toggleMenu()');
console.log('\ntoggleMenu at:', tIdx);
if (tIdx !== -1) {
  console.log(JSON.stringify(c.substring(tIdx, tIdx + 300)));
}