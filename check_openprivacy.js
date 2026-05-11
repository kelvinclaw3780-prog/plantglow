const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');
const idx = c.indexOf('function openPrivacyPopup');
console.log('openPrivacyPopup at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx, idx + 300)));
}

// Check if lucide.createIcons() is called
const privacyFunc = c.substring(idx, idx + 500);
console.log('\nCalls lucide.createIcons():', privacyFunc.includes('lucide.createIcons()'));