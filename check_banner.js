const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="favorites-banner"');
console.log('HTML banner at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 100, idx + 400)));
}

// Also check if showFavorites is actually being called
const showFavIdx = c.indexOf('function showFavorites()');
console.log('\nshowFavorites at:', showFavIdx);
console.log(JSON.stringify(c.substring(showFavIdx, showFavIdx + 300)));