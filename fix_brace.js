const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The extra closing brace at end of handlePlantSearch
const badStr = '      lucide.createIcons();\n    }   }\n\n    // ============================================================\n    // TOAST';
const goodStr = '      lucide.createIcons();\n    }\n\n    // ============================================================\n    // TOAST';
const idx = c.indexOf(badStr);
console.log('Bad pattern found at:', idx);
if (idx !== -1) {
  c = c.replace(badStr, goodStr);
  console.log('Fixed!');
} else {
  console.log('Pattern not found - trying alternative');
  // Try alternative
  const altBad = '    }   }';
  const altGood = '    }  ';
  const altIdx = c.indexOf(altBad);
  console.log('Alt pattern at:', altIdx);
  if (altIdx !== -1) {
    c = c.replace(altBad, altGood);
    console.log('Alt fixed!');
  }
}
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');