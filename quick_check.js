const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Quick check for any remaining English in visible HTML content
console.log('=== QUICK VISIBLE ENGLISH CHECK ===\n');

// Scan nav area (0-30000)
const navArea = h.substring(0, 30000);
const navEnglish = navArea.match(/>[A-Za-z][a-zA-Z ]+</g) || [];
console.log('Nav area English text:', navEnglish.filter(t => t.length > 5 && t.length < 40).slice(0, 10));

// Scan plant modal area (95000-100000)
const modalArea = h.substring(95000, 100000);
const modalEnglish = modalArea.match(/>[A-Za-z][a-zA-Z ]+</g) || [];
console.log('Modal area English text:', modalEnglish.filter(t => t.length > 3 && t.length < 60).slice(0, 10));

// Check for any remaining problematic English in the plant modal
console.log('\n=== PLANT MODAL CARE LABELS ===');
// Light, Water, Humidity, Temp labels
const lightLbl = h.indexOf('光線</p>');
const waterLbl = h.indexOf('澆水</p>');
const humidityLbl = h.indexOf('濕度</p>');
const tempLbl = h.indexOf('溫度</p>');
console.log('Light label:', lightLbl >= 0 ? '光線 OK' : 'MISSING');
console.log('Water label:', waterLbl >= 0 ? '澆水 OK' : 'MISSING');
console.log('Humidity label:', humidityLbl >= 0 ? '濕度 OK' : 'MISSING');
console.log('Temp label:', tempLbl >= 0 ? '溫度 OK' : 'MISSING');

// Check plant modal tips section
console.log('\n=== PLANT MODAL TIPS SECTION ===');
const tipsIdx = h.indexOf('✨ 護理技巧');
const watchIdx = h.indexOf('⚠️ 注意事項');
console.log('Care tips label:', tipsIdx >= 0 ? 'OK' : 'MISSING');
console.log('Watch out label:', watchIdx >= 0 ? 'OK' : 'MISSING');

// Check the tips list items - are they in English?
// Find first tip item
const firstTipIdx = h.indexOf('plant-modal-tips');
if (firstTipIdx >= 0) {
  console.log('Tips content:', JSON.stringify(h.substring(firstTipIdx, firstTipIdx + 300)));
}

// Check login modal button text
console.log('\n=== LOGIN MODAL BUTTONS ===');
const loginBtnIdx = h.indexOf('登入 / 註冊', 99000);
console.log('Login/Register button:', loginBtnIdx >= 0 ? 'Chinese OK' : 'MISSING');
const laterBtnIdx = h.indexOf('稍後再說', 99000);
console.log('Maybe later button:', laterBtnIdx >= 0 ? 'OK' : 'MISSING');

// Check for any English text in the terms popup
console.log('\n=== TERMS POPUP HEADINGS ===');
const termsHeadings = ['Acceptance of Terms', 'Description of Service', 'User Accounts', 'Privacy', 'Contact'];
for (const h2 of termsHeadings) {
  const idx2 = h.indexOf(h2);
  if (idx2 >= 0) {
    console.log('  Found English:', h2, 'at', idx2);
  }
}

// Check footer links
console.log('\n=== FOOTER LINKS ===');
const footerItems = ['植物', '功能', '聯絡我們', '隱私權政策', '條款與條件'];
for (const f of footerItems) {
  console.log(f + ':', h.includes(f) ? 'OK' : 'MISSING');
}

// Final check - any "Login" text in visible areas
console.log('\n=== LOGIN TEXT CHECK ===');
const loginVisIdx = h.indexOf('>Login<');
const loginSpanIdx = h.indexOf('>Login </span>');
console.log('>Login< found:', loginVisIdx >= 0 ? 'YES at ' + loginVisIdx : 'No');
console.log('>Login </span> found:', loginSpanIdx >= 0 ? 'YES at ' + loginSpanIdx : 'No');

// Check PlantGlow brand name in nav
console.log('\n=== BRAND NAME ===');
const brandIdx = h.indexOf('>PlantGlow</span>');
console.log('PlantGlow brand:', brandIdx >= 0 ? 'Found at ' + brandIdx + ' (OK - brand name)' : 'Not found');