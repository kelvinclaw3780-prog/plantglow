const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix the escaped quotes in renderPlantCard
// Current (broken): handlePlantClick('' + id + '')
// Fix: handlePlantClick(\'' + id + '\')
c = c.replace(
  "handlePlantClick('' + id + '')",
  "handlePlantClick(\\'' + id + '\\')"
);
console.log('Fixed handlePlantClick');

c = c.replace(
  "handleToggleSave('' + id + '')",
  "handleToggleSave(\\'' + id + '\\')"
);
console.log('Fixed handleToggleSave');

// DO NOT fix onerror - it's already correctly escaped with \'

// Check syntax
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);
try {
  new Function(js);
  console.log('Syntax OK!');
} catch(e) {
  console.log('Error:', e.message);
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');