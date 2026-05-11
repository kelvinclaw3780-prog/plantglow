const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');
const idx = c.indexOf('id="country-code"');
console.log('country-code at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 50, idx + 300)));
}