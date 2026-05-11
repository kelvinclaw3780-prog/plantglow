const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('class="float mt-8');
console.log('Hero section:', JSON.stringify(c.substring(idx, idx + 500)));