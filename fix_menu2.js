const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Fix the mobile menu - remove class="hidden" since we're using inline style display
const oldMenu = `<div id="mobile-menu" class="hidden absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg px-4 py-5">`;
const newMenu = `<div id="mobile-menu" style="display:none;" class="absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg px-4 py-5">`;

c = c.replace(oldMenu, newMenu);
console.log('1. Removed class="hidden" from mobile-menu, using inline style instead');

// Fix toggleMenu to properly handle the display
const oldToggle = `function toggleMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = "block";
        overlay.style.display = "block";
      } else {
        menu.style.display = 'none';
        overlay.style.display = 'none';
      }
    }`;

const newToggle = `function toggleMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        overlay.style.display = 'block';
      } else {
        menu.style.display = 'none';
        overlay.style.display = 'none';
      }
    }`;

c = c.replace(oldToggle, newToggle);
console.log('2. Fixed toggleMenu function');

// Fix closeMobileMenu to properly hide
const oldClose = `function closeMobileMenu() {
      document.getElementById('mobile-menu').style.display = 'none';
      document.getElementById('mobile-menu-overlay').style.display = 'none';
    }`;

const newClose = `function closeMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      menu.style.display = 'none';
      overlay.style.display = 'none';
    }`;

c = c.replace(oldClose, newClose);
console.log('3. Fixed closeMobileMenu function');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');