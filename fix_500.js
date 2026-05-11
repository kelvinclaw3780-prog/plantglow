const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix the remaining 500-char reference in login required modal
const old = 'Unlock 500-char premium care guides';
const newText = 'Login to see full plant details and save favorites';
const idx = c.indexOf(old);
console.log('500-char at:', idx);
if (idx !== -1) c = c.replace(old, newText);

// Check for remaining references
let pos = 0;
let count = 0;
while ((pos = c.indexOf('500-char', pos)) !== -1) {
  console.log('500-char at:', pos);
  pos += 10;
  count++;
}
console.log('Remaining 500-char:', count);

// Also check for premium references in plant modal area
// Find plant-modal section
const pmIdx = c.indexOf('id="login-required-modal"');
console.log('\nLogin required modal at:', pmIdx);
if (pmIdx !== -1) {
  console.log(JSON.stringify(c.substring(pmIdx, pmIdx + 500)));
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');