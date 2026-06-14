const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check privacy popup content length
const privacyStart = h.indexOf('id="privacy-popup"');
const privacyEnd = h.indexOf('</div>', privacyStart + 500);
console.log('Privacy popup section:', privacyStart, 'to', privacyEnd);
console.log('Privacy content length:', privacyEnd - privacyStart);

// Check terms popup content length
const termsStart = h.indexOf('id="terms-popup"');
const termsEnd = h.indexOf('</div>', termsStart + 500);
console.log('\nTerms popup section:', termsStart, 'to', termsEnd);
console.log('Terms content length:', termsEnd - termsStart);

// Check if there's content we need to translate
const privacyContent = h.substring(privacyStart, privacyStart + 3000);
console.log('\nPrivacy content preview:');
console.log(privacyContent.substring(0, 1000));

// Find all the section headings in privacy
const privacySections = privacyContent.match(/<h3[^>]*>[^<]+<\/h3>/g) || [];
console.log('\nPrivacy section headings:', privacySections.slice(0, 10));

// Find all the section headings in terms
const termsContent = h.substring(termsStart, termsStart + 4000);
const termsSections = termsContent.match(/<h3[^>]*>[^<]+<\/h3>/g) || [];
console.log('\nTerms section headings:', termsSections.slice(0, 10));