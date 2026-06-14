const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find plantData section
const plantDataStart = h.indexOf('var plantData = {');
const plantDataEnd = h.indexOf(';', plantDataStart + 100);
const plantDataArea = h.substring(plantDataStart, plantDataEnd);

// Find first few tips
let pos = 0;
let count = 0;
while (count < 5) {
  const tipsIdx = plantDataArea.indexOf('tips: [', pos);
  if (tipsIdx < 0) break;
  const arrayEnd = plantDataArea.indexOf(']', tipsIdx);
  const tips = plantDataArea.substring(tipsIdx + 7, arrayEnd + 1);
  console.log('\n--- Tips ' + (count + 1) + ' ---');
  console.log(tips.substring(0, 200));
  pos = arrayEnd + 1;
  count++;
}

// Count total tips
let totalTips = 0;
pos = 0;
while ((pos = plantDataArea.indexOf('tips: [', pos + 1)) >= 0) {
  totalTips++;
}
console.log('\nTotal plants with tips:', totalTips);