const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the img tag around 16589
console.log('=== Around position 16589 ===');
console.log(JSON.stringify(h.substring(16580, 16650)));

// Check the login section
const loginIdx = h.indexOf('id="login-section"');
console.log('\n=== Login section (first 1000 chars) ===');
console.log(h.substring(loginIdx, loginIdx + 1000));

// Check if the login modal has a broken img tag
const loginModalIdx = h.indexOf('id="login-modal"');
console.log('\n=== Login modal ===');
if (loginModalIdx !== -1) {
  console.log(h.substring(loginModalIdx, loginModalIdx + 1500));
} else {
  console.log('Login modal not found');
}

// Check for any broken HTML tags (unclosed quotes, missing >)
console.log('\n=== Checking for unclosed tags ===');
// Find all img tags and check their syntax
const imgPattern = /<img[^>]*>/g;
const imgs = h.match(imgPattern);
console.log('Total img tags:', imgs ? imgs.length : 0);
if (imgs) {
  imgs.forEach((img, i) => {
    if (!img.endsWith('>')) {
      console.log('BROKEN img tag:', i, ':', img);
    }
  });
}