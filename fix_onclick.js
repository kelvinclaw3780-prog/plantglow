const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix the broken onclick escape sequences
// The pattern: handlePlantClick('' + id + '') should be handlePlantClick(\'' + id + '\')
const badOnclick = "handlePlantClick('' + id + '')";
const goodOnclick = "handlePlantClick(\\'\\' + id + \\'\\')";
const idx = c.indexOf(badOnclick);
console.log('Bad onclick pattern at:', idx);
console.log('Found:', JSON.stringify(c.substring(idx - 30, idx + 60)));

if (idx !== -1) {
  c = c.replace(new RegExp(badOnclick.replace(/'/g, "\\'"), 'g'), goodOnclick.replace(/'/g, "\\'"));
  console.log('Replaced!');
}
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');