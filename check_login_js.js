const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check login popup JS
console.log('=== LOGIN REQUIRED MODAL JS ===');
const openLoginIdx = h.indexOf('function openLoginRequiredModal');
const closeLoginIdx = h.indexOf('function closeLoginRequiredModal');
console.log('openLoginRequiredModal at:', openLoginIdx);
console.log('closeLoginRequiredModal at:', closeLoginIdx);
if (openLoginIdx >= 0) {
  console.log(h.substring(openLoginIdx, openLoginIdx + 300));
}

// Check if there's any English toast messages for login
console.log('\n=== LOGIN TOAST MESSAGES ===');
const loginToastIdx = h.indexOf('showLoginToast');
if (loginToastIdx >= 0) {
  console.log(h.substring(loginToastIdx, loginToastIdx + 300));
}

// Check the plant modal content for English text
console.log('\n=== PLANT MODAL CONTENT ===');
const plantModalIdx = h.indexOf('id="plant-modal" class="fixed');
if (plantModalIdx >= 0) {
  console.log(h.substring(plantModalIdx, plantModalIdx + 800));
}

// Check the modal light/water/humidity/temp labels
console.log('\n=== MODAL CARE LABELS ===');
const modalLightIdx = h.indexOf('plant-modal-light');
if (modalLightIdx >= 0) {
  console.log(h.substring(modalLightIdx - 100, modalLightIdx + 400));
}

// Check what plant.name shows in the card
console.log('\n=== PLANT CARD HTML ===');
// Find the plant card HTML structure
const cardIdx = h.indexOf('card-img');
if (cardIdx >= 0) {
  console.log(h.substring(cardIdx - 100, cardIdx + 300));
}

// Check the plant name in card - look for plant.name usage
const plantNameIdx = h.indexOf('plant.name');
if (plantNameIdx >= 0) {
  console.log(h.substring(plantNameIdx - 50, plantNameIdx + 200));
}

// Check the href="#calathea" style anchors in the blog section
console.log('\n=== BLOG SECTION ===');
const blogSectionIdx = h.indexOf('plant-care-tips');
if (blogSectionIdx >= 0) {
  console.log(h.substring(blogSectionIdx - 50, blogSectionIdx + 300));
}

// Check for English in the "my favorites" or "all plants" view
console.log('\n=== SEARCH AND FILTER ===');
const searchIdx = h.indexOf('handleSearch');
if (searchIdx >= 0) {
  console.log(h.substring(searchIdx, searchIdx + 300));
}