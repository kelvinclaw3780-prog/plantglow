const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Remove "500-char guides" from plant modal login required modal text
const old = 'Unlock 500-char plant guides and premium features';
const newText = 'Login to see full plant details and save favorites';
const idx = c.indexOf(old);
console.log('Modal text at:', idx);
if (idx !== -1) c = c.replace(old, newText);

// Also check for any remaining premium/500 references
const premiumRefs = ['500-char', '500 char', 'premium', 'Premium'];
premiumRefs.forEach(term => {
  const count = (c.match(new RegExp(term, 'gi')) || []).length;
  if (count > 0) console.log(term + ':', count, 'occurrences');
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');