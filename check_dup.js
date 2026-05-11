const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('function closeMobileMenu()');
console.log('First closeMobileMenu at:', idx);
console.log(JSON.stringify(c.substring(idx, idx + 400)));

// Check what comes after
const next = c.indexOf('function closeMobileMenu()', idx + 1);
console.log('\nSecond closeMobileMenu at:', next);
if (next !== -1) {
  console.log(JSON.stringify(c.substring(next, next + 300)));
}

// Count
console.log('\nTotal closeMobileMenu defs:', (c.match(/function closeMobileMenu\(\)/g) || []).length);