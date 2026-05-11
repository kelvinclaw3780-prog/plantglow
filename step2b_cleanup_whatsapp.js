const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

const remaining = [
  // Footer WhatsApp link
  ['Chat with us on WhatsApp', 'Chat with us'],
  // Subscribe button alert
  ['Coming soon! Sign up via WhatsApp to subscribe.', 'Coming soon!'],
];

remaining.forEach(([old, val]) => {
  if (c.indexOf(old) !== -1) { c = c.replace(old, val); console.log('Replaced:', old); }
  else console.log('Not found:', old);
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');