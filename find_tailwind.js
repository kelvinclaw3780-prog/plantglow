const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');
const idx = c.indexOf('cdn.tailwindcss.com');
console.log('Tailwind at:', idx);
console.log(JSON.stringify(c.substring(idx - 20, idx + 100)));