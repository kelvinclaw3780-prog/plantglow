const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the premium section in plant modal
const idx = c.indexOf('id="plant-modal-premium"');
console.log('Premium section:');
console.log(JSON.stringify(c.substring(idx - 100, idx + 600)));