const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the showLoginToast function
const toastFnIdx = h.indexOf('function showLoginToast');
console.log('showLoginToast function at:', toastFnIdx);
if (toastFnIdx !== -1) {
  console.log('\n=== showLoginToast function (200 chars) ===');
  console.log(h.substring(toastFnIdx, toastFnIdx + 300));
}

// Search for login modal/toast HTML elements
const modalIdx = h.indexOf('login-modal');
const loginIdx = h.indexOf('id="login');
console.log('\nlogin-modal at:', modalIdx);
console.log('id="login at:', loginIdx);

if (loginIdx !== -1) {
  console.log('\n=== Login element at', loginIdx, '===');
  console.log(h.substring(loginIdx - 30, loginIdx + 200));
}

// Find any element with id containing "login"
let pos = 0;
let loginElements = [];
while ((pos = h.indexOf('id="login', pos)) !== -1) {
  const endQuote = h.indexOf('"', pos + 5);
  const id = h.substring(pos + 4, endQuote);
  loginElements.push(id + ' at ' + pos);
  pos += 5;
}
console.log('\nElements with id starting with "login":');
loginElements.forEach(e => console.log(' ', e));

// Search for "modal" or "toast" in the HTML
console.log('\n=== All modal/toast HTML elements ===');
const modalMatches = h.match(/<(?:div|span|button)[^>]*(?:modal|toast)[^>]*>/gi);
if (modalMatches) {
  console.log(modalMatches.slice(0, 5));
} else {
  console.log('No modal/toast elements found');
}

// Also find where the login form elements are
const formIdx = h.indexOf('id="email"');
console.log('\nid="email" at:', formIdx);
const phoneIdx = h.indexOf('id="phone"');
console.log('id="phone" at:', phoneIdx);
const otpIdx = h.indexOf('id="otp"');
console.log('id="otp" at:', otpIdx);