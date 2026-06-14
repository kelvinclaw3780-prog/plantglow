const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Get all tips from plantData
const plantDataStart = h.indexOf('var plantData = {');
const plantDataEnd = h.indexOf(';', plantDataStart + 100);
const plantDataArea = h.substring(plantDataStart, plantDataEnd);

// Find all tips
let pos = 0;
const allTips = [];
while (true) {
  const tipsIdx = plantDataArea.indexOf('tips: [', pos);
  if (tipsIdx < 0) break;
  const arrayEnd = plantDataArea.indexOf(']', tipsIdx);
  const tips = plantDataArea.substring(tipsIdx + 7, arrayEnd + 1);
  // Extract individual tips
  const tipMatches = tips.match(/'([^']+)'/g) || [];
  tipMatches.forEach(t => {
    const tip = t.replace(/'/g, '');
    if (!/[\u4e00-\u9fff]/.test(tip)) {  // If no Chinese characters
      allTips.push(tip);
    }
  });
  pos = arrayEnd + 1;
}

// Show unique English tips
const uniqueTips = [...new Set(allTips)];
console.log('Total unique English tips:', uniqueTips.length);
uniqueTips.forEach((t, i) => console.log((i+1) + '.', t));