const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find pendingPhone assignment - look for the pattern where it's built from country code
const pendingIdx = c.indexOf("pendingPhone = '+852'");
console.log('pendingPhone with +852:', pendingIdx !== -1);

// Find where pendingPhone is set
let pos = 0;
let count = 0;
while ((pos = c.indexOf('pendingPhone', pos)) !== -1) {
  console.log('pendingPhone at', pos, ':', JSON.stringify(c.substring(pos, pos + 80)));
  pos++;
  count++;
}

// Now find sendCode and fix the phone concatenation
const sendCodeIdx = c.indexOf('function sendCode()');
console.log('\nsendCode at:', sendCodeIdx);
console.log(JSON.stringify(c.substring(sendCodeIdx, sendCodeIdx + 500)));