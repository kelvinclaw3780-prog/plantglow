const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// 1. Check openPlantModal - remove subscribed variable if still there
const old1 = '      var subscribed = isSubscribed();\n      ';
const idx1 = c.indexOf(old1);
console.log('subscribed var at:', idx1);
if (idx1 !== -1) c = c.replace(old1, '');

// 2. Remove all premium fields from plantData
// Replace premium: "..." with just removing the field
const premiumPattern = /,\n        premium: "[^"]+"/g;
const premiumMatches = c.match(premiumPattern);
console.log('Premium fields found:', premiumMatches ? premiumMatches.length : 0);
if (premiumMatches) {
  premiumMatches.forEach(m => console.log(' -', m.substring(0, 50)));
}

// Actually let's just remove them more carefully
let count = 0;
let pos = 0;
while ((pos = c.indexOf('premium: "', pos)) !== -1) {
  // Find the end of this line (comma or closing brace after the string)
  const start = pos;
  const afterString = c.indexOf('"', pos + 11); // after "premium: ""
  // Find the next comma or closing brace
  let end = c.indexOf(',', afterString);
  let end2 = c.indexOf('}', afterString);
  if (end === -1) end = end2;
  if (end === -1) end = afterString + 200;
  
  // Check if there's a comma after
  const afterComma = c.indexOf(',', afterString);
  const afterBrace = c.indexOf('}', afterString);
  
  // Determine proper end
  let lineEnd = end;
  if (afterComma !== -1 && afterComma < lineEnd) lineEnd = afterComma;
  if (afterBrace !== -1 && afterBrace < lineEnd) lineEnd = afterBrace;
  
  const toRemove = c.substring(start, lineEnd + 1);
  c = c.substring(0, start) + c.substring(lineEnd + 1);
  count++;
  pos = start;
  console.log('Removed premium at:', start);
}

console.log('Total premium fields removed:', count);

// Also remove the comma before premium if present (after problems field)
c = c.replace(/,\n        premium: "[^"]+"/g, '');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');