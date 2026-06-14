const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find login required modal HTML
const idx = h.indexOf('id="login-required-modal" class="fixed');
console.log('Login modal HTML at:', idx);
if (idx >= 0) console.log(h.substring(idx, idx + 700));

// Find any remaining English in content areas
console.log('\n=== CHECKING REMAINING ENGLISH ===');

// Check cookie text
const cookieIdx = h.indexOf('and analyze our traffic');
console.log('Cookie English:', cookieIdx >= 0 ? 'YES - at ' + cookieIdx : 'OK');

// Find all English text in visible content (not in JS or JSON)
const visibleEnglish = [
  'Login to view',
  'Login to save',
  'Create a free account',
  'Already have an account',
  'Email',
  'Password',
  'Subscribe',
  'Subscribe Now',
  'Get WhatsApp',
];

for (const s of visibleEnglish) {
  const i = h.indexOf(s);
  if (i >= 0 && i < 60000) { // In first part (content), not in plant data
    console.log('Found in content:', s, 'at', i, JSON.stringify(h.substring(i - 20, i + 40)));
  }
}

// Check the cookie text fully
console.log('\n=== COOKIE TEXT ===');
const cookieStart = h.indexOf('我們使用 cookies');
if (cookieStart >= 0) {
  console.log(h.substring(cookieStart, cookieStart + 200));
}