const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find browse plants section
const idx = c.indexOf('id="plants"');
console.log('Plants at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx, idx + 800)));
} else {
  // Try finding Browse section
  const idx2 = c.indexOf('Browse Plants');
  console.log('Browse Plants at:', idx2);
  if (idx2 !== -1) {
    console.log(JSON.stringify(c.substring(idx2 - 200, idx2 + 600)));
  }
}