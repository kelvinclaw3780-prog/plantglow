const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('handlePlantClick');
console.log('Bytes around handlePlantClick:');
const slice = c.substring(idx - 20, idx + 80);
console.log([...slice].map(x => x.charCodeAt(0)));
console.log('\nString:', JSON.stringify(slice));