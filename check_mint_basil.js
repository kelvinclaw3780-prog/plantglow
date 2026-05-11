const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);

// Find and show the mint section (before basil) completely
const mintIdx = main.indexOf('mint: {');
const basilIdx = main.indexOf('basil: {');

console.log('MINT section:');
console.log(main.substring(mintIdx, basilIdx - 1));

console.log('\n\nBASIL section:');
const basilEnd = main.indexOf('};', basilIdx);
console.log(main.substring(basilIdx, basilEnd + 2));