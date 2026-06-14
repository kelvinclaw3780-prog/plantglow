const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Missing nameZh plants
const missing = {
  'syngonium': '箭葉藤',
  'dizygotheca': '孔雀木',
  'cyclamen': '仙客來',
  'monsteraAdansonii': '小龜背竹',
  'cactus': '金琥',
  'aralia': '八角金盤'
};

for (const [id, zhName] of Object.entries(missing)) {
  // Find the plant entry and add nameZh
  const idx = h.indexOf(id + ': {');
  if (idx >= 0) {
    // Find where name: '...' ends
    const nameStart = h.indexOf("name: '", idx);
    if (nameStart >= 0 && nameStart < idx + 200) {
      const nameEnd = h.indexOf("'", nameStart + 7);
      if (nameEnd >= 0) {
        const afterName = h.indexOf("'", nameEnd + 1);
        // Insert nameZh after the name field
        const insertPoint = h.indexOf(",", nameEnd + 1);
        if (insertPoint >= 0 && insertPoint < idx + 300) {
          const before = h.substring(0, insertPoint);
          const after = h.substring(insertPoint);
          h = before + ", nameZh: '" + zhName + "'" + after;
          console.log('Added nameZh for', id);
        }
      }
    }
  } else {
    console.log('Could not find', id);
  }
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');

// Verify
let count = 0;
let idx = 0;
while ((idx = h.indexOf('nameZh:', idx + 1)) >= 0) count++;
console.log('\nTotal nameZh count:', count);