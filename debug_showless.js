const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('=== handleShowLess ===');
const hsIdx = c.indexOf('function handleShowLess()');
console.log(JSON.stringify(c.substring(hsIdx, hsIdx + 300)));

console.log('\n=== renderPlants button logic ===');
const rpIdx = c.indexOf('function renderPlants()');
console.log(JSON.stringify(c.substring(rpIdx + 800, rpIdx + 1200)));

console.log('\n=== VISIBLE_COUNT ===');
const vcIdx = c.indexOf('VISIBLE_COUNT');
console.log(JSON.stringify(c.substring(vcIdx - 10, vcIdx + 50)));

console.log('\n=== showingAll check ===');
const saIdx = c.indexOf('showingAll = false');
console.log('showingAll = false at:', saIdx);
if (saIdx !== -1) console.log(JSON.stringify(c.substring(saIdx - 50, saIdx + 150)));