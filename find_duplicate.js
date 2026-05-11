const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all function definitions
let pos = 0;
let count = 0;
while (true) {
  const idx = c.indexOf('function closeMobileMenu', pos);
  if (idx === -1 || count > 10) break;
  console.log('Found at position', idx, ':');
  console.log(JSON.stringify(c.substring(idx, idx + 200)));
  console.log('---');
  pos = idx + 1;
  count++;
}