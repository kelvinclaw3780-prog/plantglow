const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Replace the old heart icon reference with heartSvg
const oldIconRef = `'<i data-lucide="' + heartIcon + '" class="w-5 h-5 ' + heartClass + '"></i>' +`;

const newIconRef = `heartSvg +`;

c = c.replace(oldIconRef, newIconRef);
console.log('Replaced heart icon reference');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');