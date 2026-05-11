const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="plant-modal"');
console.log('Plant modal HTML:');
console.log(JSON.stringify(c.substring(idx, idx + 2000)));