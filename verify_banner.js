const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('favorites-banner');
console.log('favorites-banner at:', idx);

// Check if it's hidden by default
const bannerIdx = c.indexOf('id="favorites-banner"');
if (bannerIdx !== -1) {
  console.log(JSON.stringify(c.substring(bannerIdx, bannerIdx + 300)));
}