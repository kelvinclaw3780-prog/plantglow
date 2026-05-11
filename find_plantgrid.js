const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="plant-grid"');
console.log(JSON.stringify(c.substring(idx - 300, idx + 100)));