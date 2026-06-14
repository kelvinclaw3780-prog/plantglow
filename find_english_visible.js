const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Scan for all text between > and < that contains English letters
console.log('=== FINDING VISIBLE ENGLISH TEXT ===\n');

const results = [];
let searchStart = 0;

// Only scan HTML content areas (not JS)
const htmlEnd = h.indexOf('<script>', 10000);
const scanArea = h.substring(0, htmlEnd > 0 ? htmlEnd : 20000);

let idx = scanArea.indexOf('>', 0);
while (idx >= 0 && idx < scanArea.length - 2) {
  const endTag = scanArea.indexOf('<', idx + 1);
  if (endTag < 0) break;
  const content = scanArea.substring(idx + 1, endTag).trim();
  
  // Check if content has English letters but no Chinese
  if (/[A-Za-z]{4,}/.test(content) && !/[\u4e00-\u9fff]/.test(content)) {
    // Skip common code patterns
    if (!content.includes('data-lucide') && !content.includes('http') && !content.includes('class="') &&
        !content.includes('id="') && !content.includes('onclick=') && !content.includes('href=') &&
        !content.includes('style=') && !content.includes('src=')) {
      results.push({ pos: idx, content: content.substring(0, 80) });
    }
  }
  idx = scanArea.indexOf('>', idx + 1);
  if (results.length > 30) break; // Stop after 30 results
}

console.log('Found', results.length, 'potential English text areas:');
results.forEach((r, i) => {
  console.log((i + 1) + '.', JSON.stringify(r.content));
});

// Also check the plant modal HTML area specifically
console.log('\n=== PLANT MODAL SPECIFIC SCAN ===');
const plantModalIdx = h.indexOf('id="plant-modal"');
if (plantModalIdx >= 0) {
  const modalArea = h.substring(plantModalIdx, plantModalIdx + 1500);
  // Find text between > and <
  let mIdx = modalArea.indexOf('>');
  while (mIdx >= 0 && mIdx < modalArea.length - 2) {
    const mEnd = modalArea.indexOf('<', mIdx + 1);
    if (mEnd < 0) break;
    const mContent = modalArea.substring(mIdx + 1, mEnd).trim();
    if (mContent.length > 0 && /[A-Za-z]/.test(mContent)) {
      console.log('  Modal text:', JSON.stringify(mContent.substring(0, 60)));
    }
    mIdx = modalArea.indexOf('>', mIdx + 1);
  }
}

// Check login required modal area
console.log('\n=== LOGIN MODAL SPECIFIC SCAN ===');
const loginModalIdx = h.indexOf('id="login-required-modal"');
if (loginModalIdx >= 0) {
  const loginArea = h.substring(loginModalIdx, loginModalIdx + 700);
  let lIdx = loginArea.indexOf('>');
  let count = 0;
  while (lIdx >= 0 && lIdx < loginArea.length - 2 && count < 20) {
    const lEnd = loginArea.indexOf('<', lIdx + 1);
    if (lEnd < 0) break;
    const lContent = loginArea.substring(lIdx + 1, lEnd).trim();
    if (lContent.length > 0 && /[A-Za-z]/.test(lContent)) {
      console.log('  Login modal text:', JSON.stringify(lContent.substring(0, 60)));
    }
    lIdx = loginArea.indexOf('>', lIdx + 1);
    count++;
  }
}