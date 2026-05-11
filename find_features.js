const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the features section
const idx = c.indexOf('id="features"');
console.log('Features at:', idx);
console.log(JSON.stringify(c.substring(idx, idx + 800)));