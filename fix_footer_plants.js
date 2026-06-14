const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix Plants in footer
h = h.split('>Plants</a>').join('>植物</a>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed Plants in footer');
console.log('Has >Plants</a>?', h.includes('>Plants</a>'));
console.log('Has >植物</a>?', h.includes('>植物</a>'));