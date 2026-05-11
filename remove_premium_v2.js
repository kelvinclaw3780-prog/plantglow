const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Remove all premium fields from plantData carefully
// Pattern: premium: "...",\n        \n      PLANTNAME:
// We want to remove: premium: "...",\n        \n

const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];

plants.forEach(p => {
  // Find the plant
  const plantIdx = c.indexOf(p + ': {');
  if (plantIdx === -1) {
    console.log(p + ': not found');
    return;
  }
  
  // Find premium field within this plant's block
  const premiumStart = c.indexOf('premium: "', plantIdx);
  if (premiumStart === -1) {
    console.log(p + ': premium not found');
    return;
  }
  
  // Find the end of premium string - find the closing quote then the comma/newline
  const stringStart = premiumStart + 'premium: "'.length;
  const stringEnd = c.indexOf('"', stringStart);
  
  // Find the comma after the premium string
  const commaIdx = c.indexOf(',', stringEnd);
  
  // Find what comes after - should be newline + spaces + next field or closing brace
  const afterComma = commaIdx + 1; // after the comma
  const nextFew = c.substring(commaIdx + 1, commaIdx + 20);
  
  // The pattern after premium is: ",\n        \n      }
  // So we want to remove premium line and the blank line after
  // Remove from premium start to after the comma and the blank line
  
  // Find start of line containing premium
  const lineStart = c.lastIndexOf('\n', premiumStart - 1) + 1;
  
  // Find end - after comma, find the newline and spaces
  const afterCommaNewline = c.indexOf('\n', commaIdx);
  const afterNewlineContent = c.substring(afterCommaNewline + 1, afterCommaNewline + 10);
  
  // Remove the premium field
  const toRemove = c.substring(lineStart, afterCommaNewline + 1);
  c = c.substring(0, lineStart) + c.substring(afterCommaNewline + 1);
  
  console.log(p + ': premium removed');
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');