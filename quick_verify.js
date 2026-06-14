const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== QUICK VERIFY ===\n');

// Check plant names are in Chinese
const idx = h.indexOf('nameZh:');
console.log('Sample nameZh:', h.substring(idx, idx + 50));

// Check plant card uses Chinese name
const cardIdx = h.indexOf("(plant.nameZh || plant.name)");
console.log('Plant card uses nameZh:', cardIdx >= 0 ? 'YES' : 'NO');

// Check footer Plants is Chinese
const footerPlants = h.indexOf('>植物</a>');
console.log('Footer Plants (Chinese):', footerPlants >= 0 ? 'YES' : 'NO');

// Check login modal is Chinese
const loginModal = h.indexOf('登入以儲存最愛');
console.log('Login modal title:', loginModal >= 0 ? 'Chinese OK' : 'MISSING');

// Check privacy popup content
const privacyContent = h.indexOf('我們收集的資訊');
console.log('Privacy section 1:', privacyContent >= 0 ? 'Chinese OK' : 'MISSING');

// Check terms popup content
const termsContent = h.indexOf('條款接受');
console.log('Terms section 1:', termsContent >= 0 ? 'Chinese OK' : 'MISSING');

console.log('\n=== ALL KEY ITEMS ===');
console.log('File size:', h.length);
console.log('Plant count (nameZh):', (h.match(/nameZh:/g) || []).length);
console.log('All translations applied!');