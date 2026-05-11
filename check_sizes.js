const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const heroIdx = c.indexOf('float mt-2');
const imgTag = c.substring(heroIdx, c.indexOf('>', heroIdx));
console.log('Hero img tag:', imgTag);

// Extract all size classes
const sizes = imgTag.match(/w-\[\d+px\]|h-\[\d+px\]|sm:w-\[\d+px\]|sm:h-\[\d+px\]|lg:w-\[\d+px\]|lg:h-\[\d+px\]|w-\d+|h-\d+/g);
console.log('Sizes:', sizes);

// Nav logo
const navIdx = c.indexOf('h-[60px]');
const navTag = c.substring(navIdx - 30, navIdx + 20);
console.log('\nNav logo:', navTag.trim());