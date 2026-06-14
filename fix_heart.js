const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
c = c.replace(/onclick="openLoginRequiredModal\(\)" class="absolute top-2 right-2"/g, 'onclick="openLoginRequiredModal(); event.stopPropagation();" class="absolute top-2 right-2"');
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c);
console.log('Done');