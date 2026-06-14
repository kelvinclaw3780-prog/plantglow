const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the actual privacy content
const privacyStart = h.indexOf('id="privacy-popup"');
const privacyArea = h.substring(privacyStart, privacyStart + 2500);
console.log('=== PRIVACY CONTENT ===');
console.log(privacyArea);

console.log('\n=== TERMS CONTENT ===');
const termsStart = h.indexOf('id="terms-popup"');
const termsArea = h.substring(termsStart, termsStart + 3500);
console.log(termsArea);