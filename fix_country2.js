const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find the country-code input and remove everything until the phone-input
const countryInputIdx = c.indexOf('<input type="tel" id="country-code"');
const phoneInputIdx = c.indexOf('<input type="tel" id="phone-input"');

console.log('country-input at:', countryInputIdx);
console.log('phone-input at:', phoneInputIdx);

if (countryInputIdx !== -1 && phoneInputIdx !== -1) {
  const before = c.substring(0, countryInputIdx);
  const after = c.substring(phoneInputIdx);
  c = before + '\n        ' + after;
  console.log('Fixed. New length:', c.length);
} else {
  console.log('Could not find the elements');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');