const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
let idx = c.indexOf('>Ok<');
while (idx !== -1) {
  console.log('Found at', idx, JSON.stringify(c.substring(idx - 30, idx + 30)));
  idx = c.indexOf('>Ok<', idx + 1);
}