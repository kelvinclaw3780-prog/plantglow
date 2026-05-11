const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// In sendCode(), only check agreement when in register mode
const oldCheck = `if (!document.getElementById('agree-privacy').checked || !document.getElementById('agree-terms').checked) {
        showError('phone', 'Please agree to both Privacy Policy and Terms & Conditions');
        return;
      }`;

const newCheck = `if (mode === 'register' && (!document.getElementById('agree-privacy').checked || !document.getElementById('agree-terms').checked)) {
        showError('phone', 'Please agree to both Privacy Policy and Terms & Conditions');
        return;
      }`;

if (c.includes(oldCheck)) {
  c = c.replace(oldCheck, newCheck);
  console.log('Updated sendCode agreement check to only apply in register mode');
} else {
  console.log('Could not find the agreement check pattern');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');