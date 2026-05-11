const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Look at the entire nav structure
const navIdx = c.indexOf('<nav class');
console.log('=== FULL NAV ===');
console.log(JSON.stringify(c.substring(navIdx, navIdx + 2000)));