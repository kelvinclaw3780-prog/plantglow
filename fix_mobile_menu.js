const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// 1. Add close button at top of mobile menu
const oldMobileMenu = `<div id="mobile-menu" class="hidden border-t border-gray-100 px-4 py-4 space-y-3 bg-white">`;

const newMobileMenu = `<div id="mobile-menu" class="hidden border-t border-gray-100 px-4 py-4 pb-6 bg-white relative">
        <button onclick="closeMobileMenu()" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <i data-lucide="x" class="w-5 h-5 text-gray-500"></i>
        </button>
        <div class="space-y-1 pt-2">`;

c = c.replace(oldMobileMenu, newMobileMenu);
console.log('1. Added close button to mobile menu');

// 2. Update closeMobileMenu to also close on backdrop click - need to update onclick on the hamburger
// Find the hamburger button onclick
const oldHamburger = `onclick="toggleMobileMenu()"`;

// New: add backdrop click handler
const newHamburger = `onclick="toggleMobileMenu()"`; // keep existing

// Find the nav div that contains mobile-menu and add onclick to close when clicking outside
// Actually, we need to modify toggleMobileMenu to add a backdrop overlay
const oldToggleBody = `function toggleMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var isOpen = !menu.classList.contains('hidden');
      if (isOpen) {`;

const newToggleBody = `function toggleMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      var isOpen = !menu.classList.contains('hidden');
      if (isOpen) {
        menu.classList.add('hidden');
        if (overlay) overlay.classList.add('hidden');
      } else {
        menu.classList.remove('hidden');
        if (overlay) overlay.classList.remove('hidden');
      }
    }

    function closeMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      menu.classList.add('hidden');
      if (overlay) overlay.classList.add('hidden');
    }`;

// We need to find and expand toggleMobileMenu function
const toggleIdx = c.indexOf('function toggleMobileMenu()');
console.log('toggleMobileMenu at:', toggleIdx);

// Find where the original closeMobileMenu is defined and update it
const oldCloseMobileMenu = `function closeMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      menu.classList.add('hidden');
    }`;

c = c.replace(oldCloseMobileMenu, newToggleBody.replace('function toggleMobileMenu() {', '// toggleMobileMenu replaced'));
console.log('2. Updated toggle and close functions');

// 3. Add backdrop overlay div before mobile menu
const overlayDiv = `<!-- Mobile menu overlay -->
    <div id="mobile-menu-overlay" class="hidden fixed inset-0 bg-black/20 z-40" onclick="closeMobileMenu()"></div>
    <!-- Mobile menu -->`;

c = c.replace('<!-- Mobile menu -->', overlayDiv);
console.log('3. Added backdrop overlay');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');