const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('id="upgrade-cta"');
console.log('Full upgrade-cta section:');
console.log(JSON.stringify(c.substring(idx - 30, idx + 700)));