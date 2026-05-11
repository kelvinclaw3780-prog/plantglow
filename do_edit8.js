const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Add id="signup" to the email capture section
const oldEmail = '  <!-- EMAIL CAPTURE -->';
const newEmail = '  <!-- EMAIL CAPTURE -->\n  <section class="py-16 px-4" id="signup">';
const idx1 = c.indexOf(oldEmail);
if (idx1 !== -1) {
  c = c.replace(oldEmail, newEmail);
  console.log('1. Email section id added!');
} else {
  console.log('1. Email section not found');
}

// Check for the email section tag
const emailSection = c.indexOf('<section class="py-16 px-4" id="signup">');
console.log('Email section with signup id at:', emailSection);

// Also check for the class bg-forest-50 in email section - we need to remove it from the section opening
// Actually the email section already has class="py-16 px-4" so let's just check

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');