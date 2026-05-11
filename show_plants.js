const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

const pdStart = c.indexOf('var plantData = {');
const pdEnd = c.indexOf('};', pdStart);
const pdContent = c.substring(pdStart, pdEnd + 2);

// Show content around monstera
const monsteraIdx = pdContent.indexOf('monstera:');
console.log('Around monstera:');
console.log(JSON.stringify(pdContent.substring(monsteraIdx, monsteraIdx + 500)));

// Show content around snake
const snakeIdx = pdContent.indexOf('snake:');
console.log('\nAround snake:');
console.log(JSON.stringify(pdContent.substring(snakeIdx, snakeIdx + 200)));