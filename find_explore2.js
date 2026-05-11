const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the Explore Plants button more loosely
const idx = c.indexOf('Explore Plants');
console.log('Explore Plants at:', idx);
if (idx !== -1) {
  console.log('Context:');
  console.log(JSON.stringify(c.substring(idx - 200, idx + 200)));
}