const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('class="fixed inset-0 z-50 bg-black/50');
console.log('Modal backdrop at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx, idx + 200)));
}