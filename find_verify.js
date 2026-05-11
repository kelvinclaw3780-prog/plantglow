const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find verify code section
const idx = c.indexOf('verify-code-card');
console.log('verify-code-card at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 300, idx + 300)));
}

// Also look for the logo in verify section
const logoIdx = c.indexOf('Code sent to');
console.log('\nLogo area before verify section:');
if (logoIdx !== -1) {
  console.log(JSON.stringify(c.substring(logoIdx - 500, logoIdx + 100)));
}