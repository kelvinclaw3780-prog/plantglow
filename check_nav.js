const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="nav-logged-in"');
console.log(JSON.stringify(c.substring(idx - 20, idx + 300)));