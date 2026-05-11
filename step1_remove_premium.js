const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];

let removed = 0;
plants.forEach(p => {
  const plantRe = new RegExp(p + ':\\s*\\{');
  const plantIdx = c.search(plantRe);
  if (plantIdx === -1) { console.log(p + ': not found'); return; }
  
  const searchArea = c.substring(plantIdx, plantIdx + 2500);
  const premiumIdxInSearch = searchArea.indexOf('premium: "');
  if (premiumIdxInSearch === -1) { console.log(p + ': no premium'); return; }
  
  const premiumAbsoluteIdx = plantIdx + premiumIdxInSearch;
  
  let lineStart = premiumAbsoluteIdx;
  while (lineStart > 0 && c.charAt(lineStart - 1) !== '\n') lineStart--;
  
  const stringContentStart = premiumAbsoluteIdx + 'premium: "'.length;
  const closingQuoteIdx = c.indexOf('"', stringContentStart);
  let lineEnd = closingQuoteIdx + 1;
  while (lineEnd < c.length && c.charAt(lineEnd) !== '\n') lineEnd++;
  lineEnd++;
  
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  removed++;
  console.log(p + ': removed');
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nRemoved ' + removed + ' premium fields');