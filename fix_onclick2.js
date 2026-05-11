const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The bad pattern - double single quotes instead of escaped single quote
// In JS string: '<div onclick="handlePlantClick('' + id + '')">'
// Should be: '<div onclick="handlePlantClick(\'' + id + '\')">'
const bad = "<div onclick=\"handlePlantClick('' + id + '')\">";
const good = "<div onclick=\"handlePlantClick(\\'\\' + id + \\'\\')\">";
const idx = c.indexOf(bad);
console.log('Bad pattern at:', idx);
if (idx !== -1) {
  c = c.replace(bad, good);
  console.log('Fixed!');
} else {
  console.log('Pattern not found');
}
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');