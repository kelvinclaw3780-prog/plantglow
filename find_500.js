const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find where 500-char appears
const idx = c.indexOf('500-char');
console.log('500-char at:', idx);
console.log(JSON.stringify(c.substring(idx - 50, idx + 100)));

// Find all premium references (non-case-sensitive positions)
let pos = 0;
let count = 0;
while ((pos = c.indexOf('500-char', pos)) !== -1) {
  console.log('500-char at:', pos, JSON.stringify(c.substring(pos - 20, pos + 30)));
  pos += 10;
  count++;
}
console.log('Total 500-char:', count);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');