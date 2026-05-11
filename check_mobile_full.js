const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="mobile-menu"');
console.log(JSON.stringify(c.substring(idx, idx + 1200)));