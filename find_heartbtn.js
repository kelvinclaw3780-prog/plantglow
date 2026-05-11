const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the heart button onclick in renderPlantCard
const idx = c.indexOf("'<button onclick='\" + onclick");
console.log('Heart button area:');
console.log(JSON.stringify(c.substring(idx - 300, idx + 300)));