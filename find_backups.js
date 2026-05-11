const fs = require('fs');

// Try different backup folders
const paths = [
  'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09/index.html',
  'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09_final/index.html',
  'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup/index.html'
];

paths.forEach(p => {
  try {
    const c = fs.readFileSync(p, 'utf8');
    const heroIdx = c.indexOf('class="float mt-8');
    const navLogoIdx = c.indexOf('h-24 w-24');
    const glowIdx = c.indexOf('.glow-leaf {');
    console.log(p.split('/').pop() + ':');
    console.log('  float mt-8:', heroIdx, '  h-24 w-24:', navLogoIdx, '  .glow-leaf:', glowIdx);
    if (heroIdx !== -1) {
      console.log('  Hero logo:', JSON.stringify(c.substring(heroIdx, heroIdx + 200)));
    }
  } catch(e) {
    console.log(p.split('/').pop() + ': NOT FOUND');
  }
});