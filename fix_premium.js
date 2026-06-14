const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix Premium Care Guide in plant modal
h = h.split('🌟 Premium Care Guide').join('🌟 高級護理指南');

// Also fix any other remaining English in the modal
// Check for other English text in the modal area
const modalPremiumIdx = h.indexOf('Premium Care Guide');
if (modalPremiumIdx >= 0) {
  console.log('Still has Premium Care Guide at:', modalPremiumIdx);
  console.log(JSON.stringify(h.substring(modalPremiumIdx - 50, modalPremiumIdx + 100)));
}

// Check for "Subscribe Now" or similar in modal
const subscribeIdx = h.indexOf('Subscribe Now');
if (subscribeIdx >= 0) {
  console.log('Subscribe Now found at:', subscribeIdx);
  console.log(JSON.stringify(h.substring(subscribeIdx - 50, subscribeIdx + 50)));
}

// Check the "subscribed-cta" section
const subscribedIdx = h.indexOf('subscribed-cta');
if (subscribedIdx >= 0) {
  console.log('\nSubscribed CTA:');
  console.log(h.substring(subscribedIdx, subscribedIdx + 300));
}

// Check plant modal care tips labels
const lightLabel = h.indexOf('☀️  Light');
const waterLabel = h.indexOf('💧 Water');
console.log('\nCare labels:');
console.log('☀️ Light at:', lightLabel);
console.log('💧 Water at:', waterLabel);

// Check for any remaining English in plant modal
const modalIdx = h.indexOf('id="plant-modal"');
if (modalIdx >= 0) {
  const modalEnd = modalIdx + 2000;
  const modalText = h.substring(modalIdx, modalEnd);
  // Find any English words that look like UI text (not JS)
  const englishPatterns = ['Login', 'Subscribe', 'Premium', 'Get started', 'Learn more'];
  for (const p of englishPatterns) {
    if (modalText.includes(p)) {
      const i = modalText.indexOf(p);
      console.log('\nFound in modal:', p, '→', JSON.stringify(modalText.substring(i - 20, i + 40)));
    }
  }
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('\nDone');