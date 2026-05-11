const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('mobile-menu-overlay');
console.log('overlay at:', idx);
if (idx !== -1) console.log(JSON.stringify(c.substring(idx - 100, idx + 300)));

// Check mobile menu structure
const menuIdx = c.indexOf('id="mobile-menu"');
console.log('\nmobile-menu at:', menuIdx);
if (menuIdx !== -1) console.log(JSON.stringify(c.substring(menuIdx, menuIdx + 500)));

// Check closeMobileMenu
const closeIdx = c.indexOf('function closeMobileMenu');
console.log('\ncloseMobileMenu at:', closeIdx);
if (closeIdx !== -1) console.log(JSON.stringify(c.substring(closeIdx, closeIdx + 200)));