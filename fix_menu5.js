const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// 1. Replace mobile-menu-overlay with mobile-overlay
c = c.replace('id="mobile-menu-overlay"', 'id="mobile-overlay"');
console.log('1. Renamed overlay element');

// 2. Find and replace the menu HTML that's INSIDE the nav
// Find the pattern inside nav and remove/replace it
const oldInsideNav = `\n    <!-- Mobile menu overlay -->
    <div id="mobile-overlay" onclick="closeMobileMenu()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.3);z:40;"></div>
    <!-- Mobile menu -->
    <div id="mobile-menu" style="display:none;" class="absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg px-4 py-5">
        <button onclick="closeMobileMenu()" class="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <i data-lucide="x" class="w-5 h-5 text-gray-500"></i>
        </button>
        <div class="space-y-1 pt-2">
          <a href="#plants" onclick="closeMobileMenu()" class="block py-2 text-gray-600 hover:text-forest-700">Plants</a>
          <a href="#features" onclick="closeMobileMenu()" class="block py-2 text-gray-600 hover:text-forest-700">Features</a>
          <a href="#how-it-works" onclick="closeMobileMenu()" class="block py-2 text-gray-600 hover:text-forest-700">How It Works</a>
          <a href="#plants" onclick="closeMobileMenu()" class="block py-2 text-gray-600 hover:text-forest-700">Plants</a>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100">
          <a href="login.html" class="block py-2 text-forest-600 font-medium">Login / Register</a>
        </div>
      </div>
  </nav>`;

// Check what's actually in the file
const navEndIdx = c.indexOf('</nav>');
console.log('Nav ends at:', navEndIdx);
console.log('Last 600 chars of nav:');
console.log(JSON.stringify(c.substring(navEndIdx - 600, navEndIdx + 50)));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');