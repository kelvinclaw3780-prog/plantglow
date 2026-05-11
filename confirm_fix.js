const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('id="mobile-menu"');
console.log('mobile-menu at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 50, idx + 400)));
}

const overlayIdx = c.indexOf('id="mobile-overlay"');
console.log('\nmobile-overlay at:', overlayIdx);
if (overlayIdx !== -1) {
  console.log(JSON.stringify(c.substring(overlayIdx - 30, overlayIdx + 150)));
}

const closeIdx = c.indexOf('function closeMobileMenu');
console.log('\ncloseMobileMenu at:', closeIdx);
if (closeIdx !== -1) {
  console.log(JSON.stringify(c.substring(closeIdx, closeIdx + 200)));
}