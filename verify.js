const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== VERIFICATION ===\n');

// Check plant name in card
const cardNameIdx = h.indexOf("'>' + (plant.nameZh || plant.name) + '</h3>'");
console.log('Card uses nameZh:', cardNameIdx >= 0 ? 'YES' : 'NO');

// Check tips are Chinese
console.log('Has Chinese tips:', h.includes('可以數月不澆水'));

// Check modal uses nameZh
console.log('Modal uses nameZh:', h.includes('plant.nameZh || plant.name'));

// Check login modal content
console.log('Login modal Chinese:', h.includes('登入以儲存最愛'));

// Check footer Plants
console.log('Footer Plants Chinese:', h.includes('>植物</a>'));

// Quick scan for remaining visible English
let pos = 0;
const englishAreas = [];
while (pos < h.length - 10) {
  const tagOpen = h.indexOf('>', pos);
  if (tagOpen < 0) break;
  const tagClose = h.indexOf('<', tagOpen + 1);
  if (tagClose < 0) break;
  const content = h.substring(tagOpen + 1, tagClose).trim();
  if (/[A-Za-z]{4,}/.test(content) && !/[\u4e00-\u9fff]/.test(content) && 
      !content.includes('localStorage') && !content.includes('dataLayer') &&
      !content.includes('PlantGlow') && !content.includes('Tradex') &&
      !content.includes('firebase') && content.length < 100 && content.length > 3) {
    englishAreas.push(content.substring(0, 50));
  }
  pos = tagClose + 1;
}
console.log('\nRemaining visible English areas:', englishAreas.length);
if (englishAreas.length > 0) {
  englishAreas.slice(0, 5).forEach((e, i) => console.log((i+1) + '.', e));
}