const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find login modal by looking for "login" in id or class
const idx = c.indexOf('id="login-');
console.log('id="login- at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 50, idx + 600)));
}

// Also look for "login-modal" text
const idx2 = c.indexOf('login-modal');
console.log('\nlogin-modal text at:', idx2);
if (idx2 !== -1) {
  console.log(JSON.stringify(c.substring(idx2 - 50, idx2 + 600)));
}

// Look for the login section more broadly
const loginSection = c.indexOf('"Login Required"');
console.log('\n"Login Required" at:', loginSection);
if (loginSection !== -1) {
  console.log(JSON.stringify(c.substring(loginSection, loginSection + 800)));
}