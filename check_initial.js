const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check initial state and show count logic
console.log('=== showCount logic ===');
const scIdx = c.indexOf('var showCount');
console.log(JSON.stringify(c.substring(scIdx - 50, scIdx + 150)));

console.log('\n=== VISIBLE_COUNT and showingAll initial ===');
const vcIdx = c.indexOf('var VISIBLE_COUNT = 10');
console.log(JSON.stringify(c.substring(vcIdx - 20, vcIdx + 100)));

// Check if there's a function that runs on page load
const domReady = c.indexOf('DOMContentLoaded');
console.log('\n=== DOMContentLoaded ===');
console.log(JSON.stringify(c.substring(domReady - 20, domReady + 200)));