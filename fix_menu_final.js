const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the mobile menu HTML inside the nav and remove it
const menuStart = c.indexOf('<!-- Mobile menu overlay -->');
const menuEnd = c.indexOf('</nav>');
console.log('Menu section starts at:', menuStart, 'Nav ends at:', menuEnd);

if (menuStart !== -1 && menuStart < menuEnd) {
  // Remove the old menu HTML that's inside the nav
  const beforeMenu = c.substring(0, menuStart);
  const afterNav = c.substring(menuEnd);
  c = beforeMenu + '\n  </nav>' + afterNav;
  console.log('Removed old menu from inside nav');
}

// Now add the menu HTML after the nav
const newMenuHTML = `

  <!-- Mobile Overlay -->
  <div id="mobile-overlay" onclick="closeMobileMenu()" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.3);z-index:9998;"></div>

  <!-- Mobile Menu -->
  <div id="mobile-menu" style="display:none;position:fixed;top:56px;left:0;right:0;background:white;z-index:9999;padding:20px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="display:flex;justify-content:flex-end;margin-bottom:10px;">
      <button onclick="closeMobileMenu()" style="padding:8px 12px;border-radius:6px;background:#f3f4f6;font-weight:500;">Close</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:4px;">
      <a href="#plants" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;font-size:16px;">Plants</a>
      <a href="#features" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;font-size:16px;">Features</a>
      <a href="#how-it-works" onclick="closeMobileMenu()" style="padding:12px 0;color:#374151;text-decoration:none;font-size:16px;">How It Works</a>
    </div>
    <div style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
      <a href="login.html" style="display:block;padding:12px 0;color:#16a34a;font-weight:500;font-size:16px;">Login / Register</a>
    </div>
  </div>`;

// Insert the new menu right after </nav>
c = c.replace('</nav>', '</nav>' + newMenuHTML);
console.log('Added new menu after nav');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');