const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// 1. Make the mobile menu brighter - white background with better styling
const oldMenuClass = `<div id="mobile-menu" class="hidden border-t border-gray-100 px-4 py-4 pb-6 bg-white relative">`;

const newMenuClass = `<div id="mobile-menu" class="hidden absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg px-4 py-5">`;

c = c.replace(oldMenuClass, newMenuClass);
console.log('1. Made menu brighter - white with shadow, absolute positioned');

// 2. Fix the backdrop - make sure overlay click works
const oldOverlay = `<div id="mobile-menu-overlay" class="hidden fixed inset-0 bg-black/20 z-40" onclick="closeMobileMenu()"></div>`;

const newOverlay = `<div id="mobile-menu-overlay" onclick="closeMobileMenu()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:40;"></div>`;

c = c.replace(oldOverlay, newOverlay);
console.log('2. Fixed overlay with inline style (more reliable)');

// 3. Make sure toggleMenu uses display instead of hidden class
const oldToggle = `function toggleMenu() {
      document.getElementById('mobile-menu').classList.toggle('hidden');
      document.getElementById('mobile-menu-overlay').classList.toggle('hidden');
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
    }

    function closeMobileMenu() {
      document.getElementById('mobile-menu').style.display = 'none';
      document.getElementById('mobile-menu-overlay').style.display = 'none';
    }`;

c = c.replace(oldToggle, newToggle);
console.log('3. Fixed toggle and close to use display style');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');