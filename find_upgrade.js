const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('id="upgrade-cta"');
console.log('Upgrade CTA:');
console.log(JSON.stringify(c.substring(idx - 20, idx + 500)));