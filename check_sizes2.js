const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find hero section and hero img
const heroStart = c.indexOf('float mt-2');
// Find the img tag in hero
const imgStart = c.indexOf('<img src="kelvin_logo_transparent.png"', heroStart);
const imgEnd = c.indexOf('>', imgStart);
const imgTag = c.substring(imgStart, imgEnd);
console.log('Hero img:', imgTag);

// Extract sizes
const sizes = imgTag.match(/\d+/g);
console.log('Values:', sizes);

// Nav logo
const navIdx = c.indexOf('alt="PlantGlow" class="h-[60px]');
const navTag = c.substring(navIdx + 18, navIdx + 50);
console.log('\nNav:', navTag);