const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix: replace the bad onerror patterns
// Current: onerror="this.src=\'  (broken)
// We need: onerror="this.src=\\\\'  (to produce src=\\' in the onclick)

// Count current occurrences of the problematic pattern
let count = 0;
let pos = c.indexOf("onerror=\"this.src=\\'");
while (pos !== -1) {
  console.log('Found at:', pos, JSON.stringify(c.substring(pos, pos + 25)));
  c = c.replace("onerror=\"this.src=\\'", "onerror=\"this.src=\\\\\\'");
  count++;
  pos = c.indexOf("onerror=\"this.src=\\'");
}
console.log('Fixed', count, 'occurrences');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');