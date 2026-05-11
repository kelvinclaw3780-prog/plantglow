const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const idx = c.indexOf('Explore Plants');
console.log('Explore Plants at:', idx);
console.log(JSON.stringify(c.substring(idx - 50, idx + 150)));

// The button is an anchor tag with href="#pricing" and class "fade-up delay-200 btn-primary"
const start = c.lastIndexOf('<a ', idx);
const end = c.indexOf('</a>', idx) + 4;
console.log('\nButton tag from', start, 'to', end);
console.log('Content:', JSON.stringify(c.substring(start, end)));

if (start !== -1 && end !== -1) {
  const before = c.substring(0, start);
  const after = c.substring(end);
  c = before + after;
  console.log('\nRemoved the Explore Plants button');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');