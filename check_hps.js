const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('function handlePlantSearch');
console.log('handlePlantSearch at:', idx);
console.log('Content around it:');
console.log(c.substring(idx - 50, idx + 600));