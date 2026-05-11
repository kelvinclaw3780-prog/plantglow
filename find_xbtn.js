const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');
const idx = c.indexOf('button onclick="closePrivacyPopup()"');
console.log('X button at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx, idx + 150)));
}