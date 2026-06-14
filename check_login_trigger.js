const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check what happens when user clicks heart icon (favorite) when not logged in
console.log('=== FAVORITE BUTTON CLICK HANDLER ===');
const favBtnIdx = h.indexOf('modal-favorite-btn');
console.log('modal-favorite-btn at:', favBtnIdx);
if (favBtnIdx >= 0) {
  console.log(h.substring(favBtnIdx - 50, favBtnIdx + 300));
}

// Check renderPlantCard for favorite button
console.log('\n=== PLANT CARD FAVORITE HEART ===');
const heartIdx = h.indexOf('toggleFavorite');
console.log('toggleFavorite at:', heartIdx);
if (heartIdx >= 0) {
  console.log(h.substring(heartIdx - 100, heartIdx + 200));
}

// Check the "Login to save" tooltip in the heart button
console.log('\n=== HEART BUTTON TOOLTIP ===');
const heartTooltipIdx = h.indexOf("'Login to save'");
console.log("'Login to save' at:", heartTooltipIdx);
if (heartTooltipIdx >= 0) {
  console.log(h.substring(heartTooltipIdx - 30, heartTooltipIdx + 50));
}

// Check if there's any visible English in the cookie banner
console.log('\n=== COOKIE BANNER FULL TEXT ===');
const cookieIdx = h.indexOf('我們使用 cookies');
if (cookieIdx >= 0) {
  console.log(h.substring(cookieIdx, cookieIdx + 250));
}

// Check the Terms popup content - does it have Chinese headings?
console.log('\n=== TERMS POPUP HEADINGS ===');
const termsContentIdx = h.indexOf('Acceptance of Terms');
if (termsContentIdx >= 0) {
  // Check if there are Chinese numbers
  const beforeTerms = h.substring(termsContentIdx - 100, termsContentIdx);
  console.log('Before Acceptance of Terms:', JSON.stringify(beforeTerms));
}

// Check if there's a "Login" button text anywhere
console.log('\n=== CHECKING FOR LOGIN TEXT ===');
const loginTextIdx = h.indexOf('>Login<');
const loginSpaceIdx = h.indexOf('>Login </span>');
console.log('>Login< found:', loginTextIdx >= 0 ? 'YES at ' + loginTextIdx : 'NO');
console.log('>Login </span> found:', loginSpaceIdx >= 0 ? 'YES at ' + loginSpaceIdx : 'NO');

// Check the email form
console.log('\n=== EMAIL FORM ===');
const emailFormIdx = h.indexOf('type="email"');
if (emailFormIdx >= 0) {
  console.log(h.substring(emailFormIdx - 100, emailFormIdx + 200));
}