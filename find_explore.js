const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.toLowerCase().indexOf('explore plants');
console.log('explore plants at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 100, idx + 200)));
}