const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File size:', c.length);

// =====================================================
// STEP 1: Remove pricing section only
// =====================================================
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
if (pricingStart !== -1 && pricingEnd !== -1) {
  c = c.substring(0, pricingStart) + c.substring(pricingEnd);
  console.log('1. Pricing removed');
}

// =====================================================
// STEP 2: Update CTA href from #pricing to #plants
// =====================================================
let count = 0;
while (c.indexOf('href="#pricing"') !== -1) {
  c = c.replace('href="#pricing"', 'href="#plants"');
  count++;
}
console.log('2. Updated', count, 'href="#pricing" to href="#plants"');

// =====================================================
// STEP 3: Remove premium field from each plant in plantData
// =====================================================
const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];

plants.forEach(p => {
  // Use regex to find plant within first 3000 chars of its occurrence
  const plantRe = new RegExp(p + ':\\s*\\{');
  const plantIdx = c.search(plantRe);
  if (plantIdx === -1) { console.log('3. Plant not found:', p); return; }
  
  // Find premium field within next 2000 chars of plant start
  const searchArea = c.substring(plantIdx, plantIdx + 2000);
  const premiumMatch = searchArea.match(/premium:\s*".*?",/);
  
  if (!premiumMatch) {
    console.log('3. premium not found in', p);
    return;
  }
  
  const premiumFullMatch = premiumMatch[0];
  const premiumStartInSearch = searchArea.indexOf(premiumFullMatch);
  const premiumAbsoluteStart = plantIdx + premiumStartInSearch;
  
  // Find the line start (go back to previous newline)
  let lineStart = premiumAbsoluteStart;
  while (lineStart > 0 && c.charAt(lineStart - 1) !== '\n') lineStart--;
  
  // Find the line end (next newline)
  let lineEnd = premiumAbsoluteStart + premiumFullMatch.length;
  while (lineEnd < c.length && c.charAt(lineEnd) !== '\n') lineEnd++;
  if (c.charAt(lineEnd) === '\n') lineEnd++;
  
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  console.log('3. Removed premium from', p);
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');