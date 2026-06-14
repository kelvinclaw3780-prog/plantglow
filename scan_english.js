const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Scan for any remaining English text in visible content areas
// Split into HTML sections and check

// Find all text between > and </ (or > and \n) that are English
// Common patterns to check:

console.log('=== SCANNING FOR ENGLISH TEXT IN UI ===\n');

// Check nav area (first 10000 chars)
const navArea = h.substring(0, 12000);
console.log('Nav area text sample:');
// Find any English words that are likely visible text (not code)
const englishWords = ['Login', 'logout', 'Logout', 'Email', 'Password', 'Register', 'Home', 'About', 'Contact'];
for (const w of englishWords) {
  if (navArea.includes(w)) {
    const idx = navArea.indexOf(w);
    console.log('  Found:', w, 'at', idx, '→', JSON.stringify(navArea.substring(idx - 10, idx + 30)));
  }
}

// Check plant modal area
const modalArea = h.substring(99000, 105000);
console.log('\nPlant modal area:');
for (const w of englishWords) {
  if (modalArea.includes(w)) {
    const idx = modalArea.indexOf(w);
    console.log('  Found:', w, '→', JSON.stringify(modalArea.substring(idx - 10, idx + 30)));
  }
}

// Check blog section
const blogStart = h.indexOf('Plant Care Tips');
const blogArea = h.substring(blogStart >= 0 ? blogStart - 200 : 40000, blogStart >= 0 ? blogStart + 2000 : 45000);
console.log('\nBlog area (around Plant Care Tips):');
console.log('Has 植物護理技巧與指南?', h.includes('植物護理技巧與指南'));

// Check the login HTML button text
const loginBtnIdx = h.indexOf('登入 / 註冊', 99000);
console.log('\nLogin button in modal:', loginBtnIdx >= 0 ? 'Chinese OK' : 'NOT FOUND');

// Check plant card area (around 31000-35000)
const cardArea = h.substring(30000, 35000);
console.log('\nPlant card area (30000-35000):');
const cardWords = ['Login to save', 'Add to favorites', 'Remove from'];
for (const w of cardWords) {
  if (cardArea.includes(w)) {
    const idx = cardArea.indexOf(w);
    console.log('  Found:', w, '→', JSON.stringify(cardArea.substring(idx - 20, idx + 40)));
  }
}

// Check the "Login to view" text in plant modal
const loginToViewIdx = h.indexOf('Login to view');
console.log('\nLogin to view:', loginToViewIdx >= 0 ? 'FOUND at ' + loginToViewIdx : 'Not found');

// Check the plant modal premium section
const premiumIdx = h.indexOf('plant-modal-premium');
if (premiumIdx >= 0) {
  console.log('\nPremium modal section:');
  console.log(h.substring(premiumIdx, premiumIdx + 300));
}

// Check for any alert() or confirm() with English
const alertIdx = h.indexOf('alert(');
if (alertIdx >= 0) {
  console.log('\nAlert found:', JSON.stringify(h.substring(alertIdx, alertIdx + 100)));
}