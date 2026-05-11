const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Replace the entire nav menu system with a clean, simple version

// 1. Replace the nav ending and overlay placement
const oldNavEnd = `</div>
    </div>
    <!-- Mobile menu overlay -->
    <div id="mobile-menu-overlay" onclick="closeMobileMenu()" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.3);z-index:40;"></div>
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

const newNavEnd = `</div>
    </div>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div id="mobile-overlay" onclick="closeMobileMenu()" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.3);z-index:9998;"></div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" style="display:none;position:fixed;top:56px;left:0;right:0;background:white;z-index:9999;padding:20px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button onclick="closeMobileMenu()" style="padding:8px;border-radius:8px;background:#f3f4f6;">✕</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:5px;">
      <a href="#plants" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;">Plants</a>
      <a href="#features" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;">Features</a>
      <a href="#how-it-works" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;">How It Works</a>
    </div>
    <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e7eb;">
      <a href="login.html" style="display:block;padding:12px 0;color:#16a34a;font-weight:500;">Login / Register</a>
    </div>
  </div>`;

if (c.indexOf(oldNavEnd) !== -1) {
  c = c.replace(oldNavEnd, newNavEnd);
  console.log('1. Replaced nav menu HTML');
} else {
  console.log('1. Old nav end pattern not found');
}

// 2. Replace the JavaScript functions
const oldJS = `function toggleMenu() {
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
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-menu-overlay');
      menu.style.display = 'none';
      overlay.style.display = 'none';
    }`;

const newJS = `function toggleMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-overlay');
      if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        overlay.style.display = 'block';
      } else {
        menu.style.display = 'none';
        overlay.style.display = 'none';
      }
    }

    function closeMobileMenu() {
      var menu = document.getElementById('mobile-menu');
      var overlay = document.getElementById('mobile-overlay');
      menu.style.display = 'none';
      overlay.style.display = 'none';
    }`;

if (c.indexOf(oldJS) !== -1) {
  c = c.replace(oldJS, newJS);
  console.log('2. Replaced JS functions');
} else {
  console.log('2. Old JS pattern not found - checking current...');
  const toggleIdx = c.indexOf('function toggleMenu()');
  console.log('toggleMenu at:', toggleIdx);
  if (toggleIdx !== -1) {
    console.log(JSON.stringify(c.substring(toggleIdx, toggleIdx + 300)));
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');