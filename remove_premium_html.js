const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find and remove premium HTML section from plant modal
const marker = 'id="plant-modal-premium"';
const idx = c.indexOf(marker);
console.log('Premium HTML at:', idx);
if (idx !== -1) {
  // Find the surrounding div - look for the section before it
  const start = c.lastIndexOf('<div', idx);
  const end = c.indexOf('</div>', idx) + 6;
  const premiumSection = c.substring(start, end);
  console.log('Premium section:', JSON.stringify(premiumSection.substring(0, 100)));
  c = c.replace(premiumSection, '');
  console.log('Removed!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');