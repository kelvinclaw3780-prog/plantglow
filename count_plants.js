const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('var plantData');
const end = c.indexOf('};', idx);
const pd = c.substring(idx, end);

// Count plant entries
const plants = pd.match(/^\s{2}\w+:\s*\{/gm);
console.log('Current plant count:', plants ? plants.length : 0);
console.log(plants ? plants.map(p => p.trim().replace(':', '').replace('{', '')).join(', ') : 'none');