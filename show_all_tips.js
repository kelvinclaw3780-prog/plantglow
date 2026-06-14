const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Get all unique tips
const tipsArea = h.substring(h.indexOf('var plantData = {'), h.indexOf('var VISIBLE_COUNT', h.indexOf('var plantData = {')));

// Find all tips arrays
const tipsMatches = tipsArea.match(/tips:\s*\[([^\]]+)\]/g) || [];
console.log('Total tips arrays:', tipsMatches.length);

// Show first 5 plants' tips
console.log('\n=== FIRST 5 PLANTS TIPS ===');
let count = 0;
let pos = 0;
while (count < 5) {
  const tipsIdx = tipsArea.indexOf('tips:', pos);
  if (tipsIdx < 0) break;
  const arrayStart = tipsArea.indexOf('[', tipsIdx);
  const arrayEnd = tipsArea.indexOf(']', arrayStart);
  const tips = tipsArea.substring(arrayStart, arrayEnd + 1);
  console.log('\n--- Plant ' + (count + 1) + ' ---');
  console.log(tips.substring(0, 300));
  pos = arrayEnd;
  count++;
}