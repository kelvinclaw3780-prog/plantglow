const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09/index.html', 'utf8');
const idx = c.indexOf('class="float');
console.log('Backup hero section:', JSON.stringify(c.substring(idx, idx + 500)));