const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find login required modal text
const idx = c.indexOf('login-required-modal');
const end = c.indexOf('</div>', idx + 200);
const modalText = c.substring(idx, end);
console.log('Modal:', JSON.stringify(modalText));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');