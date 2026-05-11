const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');
const idx = c.indexOf('button onclick="closePrivacyPopup()"');
console.log('X button at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx, idx + 200)));
}

// Check if the button has an icon inside
const btnArea = c.substring(idx, idx + 200);
console.log('Button content:', btnArea);

// Find the icon inside the button
const iconIdx = btnArea.indexOf('data-lucide');
console.log('Has lucide icon:', iconIdx !== -1, iconIdx);
if (iconIdx !== -1) {
  console.log('Icon:', JSON.stringify(btnArea.substring(iconIdx - 10, iconIdx + 50)));
}