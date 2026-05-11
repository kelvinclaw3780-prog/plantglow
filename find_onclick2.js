const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find where onclick is defined in renderPlantCard
let pos = 0;
while (true) {
  const idx = c.indexOf('onclick', pos);
  if (idx === -1 || idx > 25000) break;
  const context = c.substring(idx - 50, idx + 150);
  if (context.includes('toggleFavorite') || context.includes('handlePlantClick')) {
    console.log('Found at', idx, ':');
    console.log(JSON.stringify(context));
    console.log('---');
  }
  pos = idx + 1;
}