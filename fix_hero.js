const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Replace hero logo with 350px for mobile, keeping tablet/desktop larger
const old = 'w-[72px] h-[72px] sm:w-[108px] sm:h-[108px] lg:w-[648px] lg:h-[648px]';
const replacement = 'w-[350px] h-[350px] sm:w-[350px] sm:h-[350px] lg:w-[350px] lg:h-[350px]';

const idx = c.indexOf(old);
console.log('Found at:', idx);
if (idx !== -1) {
  c = c.replace(old, replacement);
  console.log('Replaced!');
} else {
  // Try to find just the hero img tag
  const heroImgIdx = c.indexOf('<img src="kelvin_logo_transparent.png"', c.indexOf('float mt-2'));
  console.log('Hero img at:', heroImgIdx);
  if (heroImgIdx !== -1) {
    const tagEnd = c.indexOf('>', heroImgIdx);
    const oldTag = c.substring(heroImgIdx, tagEnd);
    console.log('Tag:', oldTag);
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');