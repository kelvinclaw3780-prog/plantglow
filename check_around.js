const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('function closePlantModal');
console.log(JSON.stringify(c.substring(idx - 200, idx + 200)));