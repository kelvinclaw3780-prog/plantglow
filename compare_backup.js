const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09_final/index.html', 'utf8');

// Check nav logo
const navLogoIdx = c.indexOf('h-24 w-24');
console.log('Backup Nav logo:', JSON.stringify(c.substring(navLogoIdx - 20, navLogoIdx + 60)));

// Check hero logo
const heroLogoIdx = c.indexOf('lg:w-[432px]');
console.log('Backup Hero logo:', JSON.stringify(c.substring(heroLogoIdx - 30, heroLogoIdx + 80)));

// Check glow-leaf CSS
const glowIdx = c.indexOf('.glow-leaf {');
console.log('Backup Glow-leaf:', JSON.stringify(c.substring(glowIdx, glowIdx + 150)));

// Check hero section padding
const heroIdx = c.indexOf('class="min-h-screen');
console.log('Backup Hero:', JSON.stringify(c.substring(heroIdx, heroIdx + 300)));