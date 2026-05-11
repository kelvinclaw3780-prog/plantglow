const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('mobile-menu');
console.log('mobile-menu area:');
console.log(JSON.stringify(c.substring(idx - 200, idx + 500)));

console.log('\n\ntoggleMenu function:');
const tIdx = c.indexOf('function toggleMenu()');
console.log(JSON.stringify(c.substring(tIdx, tIdx + 250)));

console.log('\n\ncloseMobileMenu function:');
const clIdx = c.indexOf('function closeMobileMenu');
console.log(JSON.stringify(c.substring(clIdx, clIdx + 200)));