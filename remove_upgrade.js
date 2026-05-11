const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find and remove upgrade-cta section
const upgradeStart = c.indexOf('<!-- Upgrade CTA (for logged in but unpaid users) -->');
const upgradeEnd = c.indexOf('<!-- Already subscribed CTA -->');

if (upgradeStart !== -1 && upgradeEnd !== -1) {
  const before = c.substring(0, upgradeStart);
  const after = c.substring(upgradeEnd);
  c = before + after;
  console.log('Removed upgrade-cta section');
} else {
  console.log('Could not find upgrade-cta section');
}

// Also remove the premium section in plant modal
const premiumStart = c.indexOf('<!-- Premium Section (only for paid users) -->');
const premiumEnd = c.indexOf('<!-- Comments/Summary Section -->');

if (premiumStart !== -1 && premiumEnd !== -1) {
  const before = c.substring(0, premiumStart);
  const after = c.substring(premiumEnd);
  c = before + after;
  console.log('Removed plant-modal-premium section');
} else {
  console.log('Could not find premium section');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');