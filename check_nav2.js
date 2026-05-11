const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check nav structure - look for where menu button is
console.log('=== NAV LOGGED OUT ===');
const navOut = c.indexOf('nav-logged-out');
console.log(JSON.stringify(c.substring(navOut, navOut + 300)));

console.log('\n=== NAV LOGGED IN ===');
const navIn = c.indexOf('nav-logged-in');
console.log(JSON.stringify(c.substring(navIn, navIn + 400)));

console.log('\n=== MOBILE NAV ===');
const mobileNav = c.indexOf('mobile-nav-logged');
console.log(JSON.stringify(c.substring(mobileNav, mobileNav + 400)));