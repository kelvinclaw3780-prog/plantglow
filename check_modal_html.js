const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find plant modal light element HTML
const searchStr = 'plant-modal-light" class="text-sm font-medium';
const idx = h.indexOf(searchStr);
console.log('plant-modal-light HTML at:', idx);
if (idx >= 0) {
  console.log(h.substring(idx - 300, idx + 100));
}

// Find the care tips section heading
const careHeadingSearch = 'text-forest-800 mb-3 flex items-center gap-2';
const careIdx = h.indexOf(careHeadingSearch);
console.log('\nCare heading at:', careIdx);
if (careIdx >= 0) {
  console.log(h.substring(careIdx - 50, careIdx + 200));
}

// Also check if there's a "✨" in the modal area
const sparkleIdx = h.indexOf('✨');
console.log('\nSparkle emoji at:', sparkleIdx, '(should be around modal area if translated)');
if (sparkleIdx >= 0) {
  console.log('Context:', JSON.stringify(h.substring(sparkleIdx - 30, sparkleIdx + 50)));
}

// Check the actual modal HTML from earlier output - we saw it was at ~95536
console.log('\n=== FULL PLANT MODAL HTML (95536-97000) ===');
const modalHTML = h.substring(95536, 97000);
console.log(modalHTML.substring(0, 500));