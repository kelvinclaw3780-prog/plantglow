const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="browse-btn"');
console.log('browse-btn at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 20, idx + 200)));
}

const idx2 = c.indexOf('id="show-less-btn"');
console.log('\nshow-less-btn at:', idx2);
if (idx2 !== -1) {
  console.log(JSON.stringify(c.substring(idx2 - 20, idx2 + 200)));
}