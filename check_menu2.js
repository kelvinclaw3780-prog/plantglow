const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the menu structure
const menuIdx = c.indexOf('id="mobile-menu"');
console.log('Menu HTML from position:');
console.log(JSON.stringify(c.substring(menuIdx - 100, menuIdx + 800)));