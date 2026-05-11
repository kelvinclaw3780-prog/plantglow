const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// For each plant, find the premium line and remove it
const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];

plants.forEach(p => {
  // Find plant position
  const plantRe = new RegExp(p + ':\\s*\\{');
  const plantIdx = c.search(plantRe);
  if (plantIdx === -1) { console.log(p + ': not found'); return; }
  
  // Find the premium line within this plant's block (next 2500 chars)
  const searchArea = c.substring(plantIdx, plantIdx + 2500);
  const premiumIdxInSearch = searchArea.indexOf('premium: "');
  
  if (premiumIdxInSearch === -1) { 
    console.log(p + ': no premium field found');
    return;
  }
  
  const premiumAbsoluteIdx = plantIdx + premiumIdxInSearch;
  
  // Find the START of this line (go back to find newline)
  let lineStart = premiumAbsoluteIdx;
  while (lineStart > 0 && c.charAt(lineStart - 1) !== '\n') lineStart--;
  
  // Find the END of this line (find the newline after the premium string's closing quote)
  // First, find where the premium string content starts
  const stringContentStart = premiumAbsoluteIdx + 'premium: "'.length;
  // Find the closing quote
  const closingQuoteIdx = c.indexOf('"', stringContentStart);
  // Find the newline after the line (which is after the comma if present)
  let lineEnd = closingQuoteIdx + 1;
  while (lineEnd < c.length && c.charAt(lineEnd) !== '\n') lineEnd++;
  lineEnd++; // include the newline
  
  const removedText = c.substring(lineStart, lineEnd);
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  console.log(p + ': removed line: ' + JSON.stringify(removedText.substring(0, 60)));
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');