const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the toast/login modal 
const toastIdx = h.indexOf('showLoginToast');
console.log('showLoginToast mentioned at:', toastIdx);

// Find where the toast modal or login modal HTML is
const loginToastIdx = h.indexOf('login-toast');
console.log('login-toast element at:', loginToastIdx);

if (loginToastIdx !== -1) {
  console.log('\n=== login-toast HTML ===');
  console.log(h.substring(loginToastIdx - 50, loginToastIdx + 500));
}

// Also check for the plant modal which was the main issue
const plantModalIdx = h.indexOf('plant-modal');
console.log('\nplant-modal at:', plantModalIdx);

if (plantModalIdx !== -1) {
  console.log('\n=== plant-modal HTML (first 600 chars) ===');
  console.log(h.substring(plantModalIdx, plantModalIdx + 600));
}

// Check the browse-all-section
const browseIdx = h.indexOf('browse-all-section');
console.log('\nbrowse-all-section at:', browseIdx);

// Check the img tag that was at position 16589 - what is it inside?
console.log('\n=== What is at position ~16589 (checking context) ===');
const context = h.substring(16500, 16700);
console.log(context);