const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find navbar section
const navIdx = h.indexOf('id="navbar"');
const navEnd = h.indexOf('</nav>');
const navContent = h.substring(navIdx, navEnd + 6);

// Show the full nav HTML
console.log('=== FULL NAV HTML ===');
console.log(navContent);

// Also check whatkelvin_logo looks like (the login logo)
const logoIdx = h.indexOf('kelvin_logo');
console.log('\n\n=== kelvin_logo occurrences ===');
let pos = 0;
let count = 0;
while ((pos = h.indexOf('kelvin_logo', pos)) !== -1 && count++ < 10) {
  console.log('At', pos, ':', h.substring(pos - 30, pos + 80));
  pos += 12;
}

// Check what SVG or IMG tag is used for the login logo
const loginSectionIdx = h.indexOf('id="login-section"');
if (loginSectionIdx !== -1) {
  console.log('\n\n=== Login section ===');
  console.log(h.substring(loginSectionIdx, loginSectionIdx + 800));
}