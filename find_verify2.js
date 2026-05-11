const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find the code-section div and look at its context
const codeSecIdx = c.indexOf('id="code-section"');
console.log('code-section at:', codeSecIdx);
if (codeSecIdx !== -1) {
  // Look at 500 chars before it
  console.log('Context before code-section:');
  console.log(JSON.stringify(c.substring(codeSecIdx - 500, codeSecIdx + 100)));
}

// Find the login-card section
const loginCardIdx = c.indexOf('id="login-card"');
console.log('\nlogin-card at:', loginCardIdx);
if (loginCardIdx !== -1) {
  console.log(JSON.stringify(c.substring(loginCardIdx - 100, loginCardIdx + 400)));
}

// Check if there's a separate logo for code section
const codeLogoIdx = c.indexOf('code-logo');
console.log('\ncode-logo at:', codeLogoIdx);