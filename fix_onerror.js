const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix all onerror="this.src=' to be onerror="this.src=\'
// This prevents the JS string from being broken by the unescaped single quote before https://
let count = 0;
let pos = 0;
while ((pos = c.indexOf("onerror=\"this.src='", pos)) !== -1) {
  console.log('Found onerror at:', pos);
  c = c.replace("onerror=\"this.src='", "onerror=\"this.src=\\'");
  count++;
  pos += 20;
}
console.log('Fixed', count, 'occurrences');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');