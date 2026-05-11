const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all relevant code
console.log('=== MOBILE MENU HTML ===');
const menuIdx = c.indexOf('id="mobile-menu"');
console.log(JSON.stringify(c.substring(menuIdx, menuIdx + 400)));

console.log('\n=== OVERLAY HTML ===');
const overlayIdx = c.indexOf('id="mobile-menu-overlay"');
console.log(JSON.stringify(c.substring(overlayIdx - 50, overlayIdx + 200)));

console.log('\n=== TOGGLE MENU BUTTON ===');
const btnIdx = c.indexOf('onclick="toggleMenu()"');
console.log(JSON.stringify(c.substring(btnIdx - 100, btnIdx + 100)));

console.log('\n=== TOGGLEMENU FUNCTION ===');
const toggleIdx = c.indexOf('function toggleMenu()');
console.log(JSON.stringify(c.substring(toggleIdx, toggleIdx + 300)));

console.log('\n=== CLOSEMOBILEMENU FUNCTION ===');
const closeIdx = c.indexOf('function closeMobileMenu()');
console.log(JSON.stringify(c.substring(closeIdx, closeIdx + 250)));