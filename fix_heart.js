const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Replace the heart icon button with SVG version
const oldButton = `'<i data-lucide="' + heartIcon + '" class="w-5 h-5 ' + heartClass + '"></i>' +`;
c = c.replace(oldButton, "'" + heartSvg + "' +");
console.log('Replaced heart icon with SVG');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');