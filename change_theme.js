const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Change title
c = c.replace('<title>PlantGlow — Indoor Growing Made Simple</title>', '<title>PlantGlow — Gardening Made Simple</title>');

// Change hero tagline
c = c.replace('>Indoor Growing Made Simple</h1>', '>Gardening Made Simple</h1>');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');