const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check login modal
const idx = h.indexOf('id="login-required-modal"');
console.log('login modal HTML at:', idx);
if (idx >= 0) console.log(h.substring(idx, idx + 500));

// Check nav login text
const navLoginIdx = h.indexOf('nav-logged-out');
console.log('\n--- Nav logged out ---');
console.log(h.substring(navLoginIdx, navLoginIdx + 400));

// Check Instagram section
const igIdx = h.indexOf('在 Instagram 上追蹤我們');
console.log('\n--- Instagram section ---');
console.log(h.substring(igIdx - 50, igIdx + 400));

// Find all English-only text in content areas
// Check for things like "Follow" "Instagram" "Stay" "Inspired" etc
const englishPhrases = ['Follow Us on Instagram', 'Follow <strong>@plantglow', 'Stay Inspired', 'Login', 'Create a free account', 'login.html'];
for (const phrase of englishPhrases) {
  const idx2 = h.indexOf(phrase);
  if (idx2 >= 0) {
    console.log('\nFound:', phrase);
    console.log('Context:', JSON.stringify(h.substring(idx2 - 30, idx2 + 60)));
  }
}