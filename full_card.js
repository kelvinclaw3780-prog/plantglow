const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the full renderPlantCard function
const idx = c.indexOf("return '<div class=\"plant-card");
console.log('renderPlantCard return:');
console.log(JSON.stringify(c.substring(idx, idx + 1500)));