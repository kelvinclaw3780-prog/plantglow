const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('onclick="handlePlantClick');
console.log('Snippet:', JSON.stringify(c.substring(idx - 10, idx + 60)));