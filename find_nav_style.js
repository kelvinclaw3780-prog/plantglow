const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the nav section with logo
const idx = h.indexOf('font-bold text-base text-forest-800">PlantGlow');
console.log('Brand text context:');
console.log(h.substring(idx - 200, idx + 100));

// Find style tag to add responsive CSS
const styleIdx = h.indexOf('<style>');
console.log('\nStyle tag at:', styleIdx);

// Find any existing responsive nav CSS
const responsiveIdx = h.indexOf('@media');
console.log('First @media at:', responsiveIdx);
if (responsiveIdx >= 0) {
  console.log('Context:', h.substring(responsiveIdx, responsiveIdx + 200));
}