const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check glow-leaf CSS
const glowIdx = c.indexOf('.glow-leaf');
console.log('Glow-leaf CSS:', JSON.stringify(c.substring(glowIdx, glowIdx + 200)));

// Check nav logo size
const navLogoIdx = c.indexOf('h-24 w-24');
console.log('\nNav logo:', JSON.stringify(c.substring(navLogoIdx - 30, navLogoIdx + 60)));

// Check hero logo
const heroLogoIdx = c.indexOf('lg:w-[432px]');
console.log('\nHero logo:', JSON.stringify(c.substring(heroLogoIdx - 30, heroLogoIdx + 80)));

// Check section spacing by finding the sections
const sections = ['min-h-screen', 'id="features"', 'id="plants"', 'id="how-it-works"'];
sections.forEach(s => {
  const idx = c.indexOf(s);
  console.log('\n' + s + ' at:', idx);
});