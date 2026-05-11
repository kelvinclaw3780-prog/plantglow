const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the onclick variable in renderPlantCard
const idx = c.indexOf("var onclick = isLoggedIn");
console.log('onclick variable:');
console.log(JSON.stringify(c.substring(idx - 50, idx + 400)));