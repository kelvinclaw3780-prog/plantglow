const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The premium field format is: premium: "...long text...",
// We need to find each plant's premium field and remove the entire line

const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];

plants.forEach(p => {
  // Find plant start
  const plantRe = new RegExp(p + ': {');
  const plantIdx = c.search(plantRe);
  if (plantIdx === -1) { console.log(p + ': not found'); return; }
  
  // Find premium field after plant start - search in a larger window (next 2000 chars)
  const searchWindow = c.substring(plantIdx, plantIdx + 2000);
  const premiumIdxInWindow = searchWindow.indexOf('premium: "');
  
  if (premiumIdxInWindow === -1) { console.log(p + ': premium not found'); return; }
  
  const premiumIdx = plantIdx + premiumIdxInWindow;
  const lineStart = c.lastIndexOf('\n', premiumIdx - 1) + 1;
  const stringStart = premiumIdx + 'premium: "'.length;
  const stringEnd = c.indexOf('"', stringStart);
  const commaIdx = c.indexOf(',', stringEnd);
  const lineEnd = c.indexOf('\n', commaIdx) + 1;
  
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  console.log('Removed premium from', p);
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');