const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find ALL occurrences of closeMobileMenu function definition
let pos = 0;
let defs = [];
while (true) {
  const idx = c.indexOf('function closeMobileMenu()', pos);
  if (idx === -1) break;
  defs.push(idx);
  pos = idx + 1;
}
console.log('Found', defs.length, 'definitions at positions:', defs);

// Find the second definition and remove it
if (defs.length > 1) {
  const firstEnd = c.indexOf('\n    }', defs[0]) + 5;
  const secondStart = c.indexOf('function closeMobileMenu()', firstEnd);
  if (secondStart !== -1) {
    const secondEnd = c.indexOf('\n    }', secondStart + 50) + 5;
    const toRemove = c.substring(secondStart, secondEnd);
    if (toRemove.includes('classList')) {
      c = c.replace(toRemove, '');
      console.log('Removed second closeMobileMenu that used classList');
    } else {
      console.log('Second definition does not use classList');
      console.log(JSON.stringify(toRemove.substring(0, 300)));
    }
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');