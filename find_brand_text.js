const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the PlantGlow brand text in the nav
const idx = h.indexOf('>PlantGlow</span>');
console.log('Brand text at:', idx);
if (idx >= 0) {
  console.log(JSON.stringify(h.substring(idx - 100, idx + 100)));
}

// Find the parent container
const navIdx = h.indexOf('nav-logo-text');
console.log('nav-logo-text at:', navIdx);
if (navIdx >= 0) {
  console.log(JSON.stringify(h.substring(navIdx, navIdx + 300)));
}