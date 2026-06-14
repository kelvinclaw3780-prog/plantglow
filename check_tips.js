const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check first plant tips
const monsteraIdx = h.indexOf('monstera:');
if (monsteraIdx >= 0) {
  const endIdx = h.indexOf('}', monsteraIdx);
  const plantContent = h.substring(monsteraIdx, endIdx + 1);
  console.log('Monstera content:');
  console.log(plantContent.substring(0, 800));
}

// Check if tips are English
const tipsMatch = h.match(/tips:\s*\[([^\]]+)\]/g);
if (tipsMatch) {
  console.log('\nFirst 3 plant tips:');
  tipsMatch.slice(0, 3).forEach((t, i) => console.log((i+1) + '.', t.substring(0, 100)));
}

// Check if tips have Chinese
console.log('\n=== CHECKING TIPS LANGUAGE ===');
const chineseTips = h.match(/[\u4e00-\u9fff]/g);
console.log('Chinese characters in tips:', chineseTips ? chineseTips.length : 0);

// Check renderPlantCard output for plant name display
console.log('\n=== PLANT CARD NAME DISPLAY ===');
const nameDisplayIdx = h.indexOf("'>' + plant.name + '</span>");
console.log('Name display code:', nameDisplayIdx >= 0 ? 'FOUND at ' + nameDisplayIdx : 'NOT FOUND');

// Check if nameZh is being used in the card
const nameZhCardIdx = h.indexOf("(plant.nameZh || plant.name)");
console.log('NameZh in card:', nameZhCardIdx >= 0 ? 'YES' : 'NO');