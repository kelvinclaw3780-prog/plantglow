const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('handlePlantClick fix:', c.includes("onclick=\"handlePlantClick('')") ? 'FIXED' : 'BROKEN');
console.log('event.stopPropagation:', c.includes('event.stopPropagation') ? 'YES' : 'NO');
console.log('heartFill:', c.includes('heartFill') ? 'YES' : 'NO');
console.log('fill heartFill:', c.includes("fill=\"' + heartFill + '\"") ? 'YES' : 'NO');

const idx = c.indexOf('handlePlantClick');
console.log('\nhandlePlantClick context:', JSON.stringify(c.substring(idx - 5, idx + 60)));

const idx2 = c.indexOf("fill=\"' + heartFill");
console.log('\nheartFill context:', JSON.stringify(c.substring(idx2 - 5, idx2 + 60)));