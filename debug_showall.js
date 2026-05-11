const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="show-all-floating"');
console.log('found at', idx);
if (idx !== -1) console.log(JSON.stringify(c.substring(idx - 50, idx + 200)));

// Check the search section display logic
const searchIdx = c.indexOf('plant-search');
console.log('\nsearch input area:');
console.log(JSON.stringify(c.substring(searchIdx - 100, searchIdx + 300)));