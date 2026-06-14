const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check the plant modal care tips section
const idx = h.indexOf('plant-modal-tips');
console.log('plant-modal-tips at:', idx);
if (idx >= 0) {
  console.log(h.substring(idx - 200, idx + 400));
}

// Also check the Care Tips heading specifically
const careTipsIdx = h.indexOf('Care Tips');
console.log('\nCare Tips (English) at:', careTipsIdx);
const zhCareTips = h.indexOf('護理技巧');
console.log('護理技巧 (Chinese) at:', zhCareTips);

// Check what the actual label is in the modal
const modalStart = h.indexOf('id="plant-modal"');
if (modalStart >= 0) {
  const modalSection = h.substring(modalStart, modalStart + 2000);
  // Find the care tips heading
  const tipsHeadingIdx = modalSection.indexOf('Care Tips');
  const zhTipsHeadingIdx = modalSection.indexOf('護理技巧');
  console.log('\nIn modal - Care Tips:', tipsHeadingIdx >= 0 ? 'FOUND at offset ' + tipsHeadingIdx : 'Not found');
  console.log('In modal - 護理技巧:', zhTipsHeadingIdx >= 0 ? 'FOUND at offset ' + zhTipsHeadingIdx : 'Not found');
  if (tipsHeadingIdx >= 0) {
    console.log('Context:', JSON.stringify(modalSection.substring(tipsHeadingIdx - 30, tipsHeadingIdx + 40)));
  }
  if (zhTipsHeadingIdx >= 0) {
    console.log('Chinese context:', JSON.stringify(modalSection.substring(zhTipsHeadingIdx - 30, zhTipsHeadingIdx + 40)));
  }
}