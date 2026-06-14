const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check Terms popup
console.log('=== TERMS POPUP ===');
const termsIdx = h.indexOf('id="terms-popup"');
if (termsIdx >= 0) {
  console.log(h.substring(termsIdx, termsIdx + 1000));
}

// Check Privacy popup
console.log('\n=== PRIVACY POPUP ===');
const privacyIdx = h.indexOf('id="privacy-popup"');
if (privacyIdx >= 0) {
  console.log(h.substring(privacyIdx, privacyIdx + 800));
}

// Check for any remaining English in login area
console.log('\n=== LOGIN MODAL FULL ===');
const loginIdx = h.indexOf('id="login-required-modal"');
if (loginIdx >= 0) {
  console.log(h.substring(loginIdx, loginIdx + 700));
}

// Check plant card for any visible English
console.log('\n=== PLANT CARD AREA ===');
const cardArea = h.substring(31000, 33000);
console.log('First 500 chars of plant card area:');
console.log(cardArea.substring(0, 500));

// Check the renderPlantCard function output - what HTML does it generate?
console.log('\n=== PLANT CARD RENDER OUTPUT ===');
const renderIdx = h.indexOf('function renderPlantCard');
if (renderIdx >= 0) {
  // Find the HTML template it returns
  const templateStart = h.indexOf("'<div class=\"relative\">'", renderIdx);
  const templateEnd = h.indexOf("'; }", templateStart);
  if (templateStart >= 0 && templateEnd >= 0) {
    const template = h.substring(templateStart, templateEnd + 3);
    console.log('Template (first 500 chars):');
    console.log(template.substring(0, 500));
  }
}

// Check what text the favorite button shows
const favBtnIdx = h.indexOf('modal-favorite-btn');
if (favBtnIdx >= 0) {
  console.log('\n=== FAVORITE BUTTON ===');
  console.log(h.substring(favBtnIdx - 30, favBtnIdx + 200));
}