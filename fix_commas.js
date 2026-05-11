const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix trailing commas in plantData - the pattern ],\n        , should be ],\n      
// Find and fix all ],\n        , patterns (trailing commas before next plant entry)
const badPattern = /\],\n        ,\n      /g;
const matches = c.match(badPattern);
console.log('Bad patterns found:', matches ? matches.length : 0);

if (matches) {
  c = c.replace(badPattern, '],\n      ');
  console.log('Fixed!');
}

// Also fix any remaining double commas
const dc = c.match(/,,/g);
console.log('Double commas:', dc ? dc.length : 0);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');