const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find login-modal logo
const idx = c.indexOf('login-modal-logo');
if (idx !== -1) {
  console.log('login-modal-logo at:', idx);
  console.log(JSON.stringify(c.substring(idx - 100, idx + 400)));
} else {
  console.log('login-modal-logo not found');
  
  // Try finding by class
  const logoIdx = c.indexOf('login-logo');
  console.log('login-logo at:', logoIdx);
  if (logoIdx !== -1) {
    console.log(JSON.stringify(c.substring(logoIdx - 100, logoIdx + 300)));
  }
}