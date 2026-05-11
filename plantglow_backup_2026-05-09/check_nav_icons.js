const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the nav section for data-lucide attributes
const navStart = h.indexOf('id="navbar"');
const navEnd = h.indexOf('</nav>');
const navContent = h.substring(navStart, navEnd + 6);

console.log('Nav section length:', navContent.length);
console.log('Nav content (first 1500 chars):\n', navContent.substring(0, 1500));

// Find all data-lucide in nav
const lucideMatches = navContent.match(/data-lucide="[^"]*"/g);
console.log('\n\nLucide icons in nav:', lucideMatches);

// Also check if there's a user menu with icons
const userMenuIdx = h.indexOf('nav-user-menu');
if (userMenuIdx !== -1) {
  const userMenuSection = h.substring(userMenuIdx - 100, userMenuIdx + 500);
  const userIcons = userMenuSection.match(/data-lucide="[^"]*"/g);
  console.log('\n\nUser menu icons:', userIcons);
  console.log('User menu section:\n', userMenuSection.substring(0, 500));
}