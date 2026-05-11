const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Replace the footer copyright line
c = c.replace('© 2026 PlantGlow. All rights reserved.', 'PlantGlow by Tradex Dev. Co. 2026');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');

// Verify
const idx = c.indexOf('Tradex Dev');
console.log('New footer text at:', idx);
console.log(JSON.stringify(c.substring(idx - 50, idx + 100)));