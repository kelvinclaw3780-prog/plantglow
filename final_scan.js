const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Final comprehensive check - look for any visible English text
console.log('=== SCANNING ALL VISIBLE ENGLISH TEXT ===\n');

// Scan the entire file for visible English text in HTML (not JS/CSS)
// Pattern: >English text< where English text has 3+ consecutive letters

let pos = 0;
const results = [];
while (pos < h.length) {
  const tagOpen = h.indexOf('>', pos);
  if (tagOpen < 0 || tagOpen > h.length - 10) break;
  const tagClose = h.indexOf('<', tagOpen + 1);
  if (tagClose < 0) break;
  
  const content = h.substring(tagOpen + 1, tagClose).trim();
  
  // Check if it's visible English text (not code, not attributes)
  const isEnglish = /[A-Za-z]{4,}/.test(content);
  const isChinese = /[\u4e00-\u9fff]/.test(content);
  const isCodeAttr = /^(id|class|style|onclick|href|src|data|type)=/i.test(content);
  const isTag = /^[a-zA-Z]+/.test(content) && content.includes('=');
  const isEmoji = /^[\u{1F300}-\u{1F9FF}]/.test(content);
  
  if (isEnglish && !isChinese && !isCodeAttr && !isTag && !isEmoji && content.length < 200) {
    results.push({ pos: tagOpen, content: content.substring(0, 100) });
  }
  
  pos = tagClose + 1;
  if (results.length > 50) break;
}

// Filter out false positives (GA code, etc.)
const visibleResults = results.filter(r => {
  const c = r.content;
  // Filter out common false positives
  if (c.includes('dataLayer') || c.includes('gtag') || c.includes('http') || 
      c.includes('tailwind') || c.includes('localStorage') || c.includes('console')) return false;
  // Filter out single words that might be OK (brand names, etc)
  if (c.length < 10 && !c.includes(' ')) return false;
  return true;
});

console.log('Found', visibleResults.length, 'visible English text areas:');
visibleResults.forEach((r, i) => {
  console.log((i + 1) + '.', JSON.stringify(r.content), 'at', r.pos);
});

// Specifically check plant name in modal
console.log('\n=== PLANT NAME DISPLAY ===');
const plantModalNameIdx = h.indexOf('plant-modal-name');
if (plantModalNameIdx >= 0) {
  console.log('plant-modal-name at:', plantModalNameIdx);
  console.log('Content:', JSON.stringify(h.substring(plantModalNameIdx - 30, plantModalNameIdx + 100)));
}

// Check what happens when plant card is clicked
console.log('\n=== PLANT CARD CLICK ===');
const handlePlantClickIdx = h.indexOf('function handlePlantClick');
if (handlePlantClickIdx >= 0) {
  console.log(h.substring(handlePlantClickIdx, handlePlantClickIdx + 150));
}

// Check if there's a "Login" text in the plant card context
console.log('\n=== SEARCHING FOR LOGIN IN CONTENT ===');
const loginIdx = h.indexOf('>Login<');
console.log('>Login< found:', loginIdx >= 0 ? 'YES at ' + loginIdx : 'NO');
const loginUpperIdx = h.indexOf('>LOGIN<');
console.log('>LOGIN< found:', loginUpperIdx >= 0 ? 'YES at ' + loginUpperIdx : 'NO');