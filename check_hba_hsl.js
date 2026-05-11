const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('=== handleBrowseAll ===');
const hbaIdx = c.indexOf('function handleBrowseAll()');
console.log(JSON.stringify(c.substring(hbaIdx, hbaIdx + 400)));

console.log('\n=== handleShowLess ===');
const hslIdx = c.indexOf('function handleShowLess()');
console.log(JSON.stringify(c.substring(hslIdx, hslIdx + 400)));