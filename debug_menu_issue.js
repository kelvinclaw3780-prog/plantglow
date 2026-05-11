const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check all relevant IDs and functions
console.log('=== MOBILE OVERLAY ===');
const overlayIdx = c.indexOf('id="mobile-overlay"');
console.log('Position:', overlayIdx);
console.log(JSON.stringify(c.substring(overlayIdx - 5, overlayIdx + 250)));

console.log('\n=== MOBILE MENU ===');
const menuIdx = c.indexOf('id="mobile-menu"');
console.log('Position:', menuIdx);
console.log(JSON.stringify(c.substring(menuIdx - 5, menuIdx + 400)));

console.log('\n=== HAMBURGER BUTTON ===');
const hamIdx = c.indexOf('onclick="toggleMenu()"');
console.log('Position:', hamIdx);
console.log(JSON.stringify(c.substring(hamIdx - 80, hamIdx + 100)));

console.log('\n=== TOGGLE MENU FUNCTION ===');
const toggleIdx = c.indexOf('function toggleMenu()');
console.log('Position:', toggleIdx);
console.log(JSON.stringify(c.substring(toggleIdx, toggleIdx + 350)));

console.log('\n=== CLOSE MOBILE MENU FUNCTION ===');
const closeIdx = c.indexOf('function closeMobileMenu()');
console.log('Position:', closeIdx);
console.log(JSON.stringify(c.substring(closeIdx, closeIdx + 250)));

// Count how many times each function appears
console.log('\n=== FUNCTION COUNTS ===');
console.log('toggleMenu occurrences:', (c.match(/function toggleMenu/g) || []).length);
console.log('closeMobileMenu occurrences:', (c.match(/function closeMobileMenu/g) || []).length);
console.log('toggleMenu call occurrences:', (c.match(/toggleMenu\(\)/g) || []).length);
console.log('closeMobileMenu call occurrences:', (c.match(/closeMobileMenu\(\)/g) || []).length);