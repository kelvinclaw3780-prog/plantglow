const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Fix the nav - find and replace the broken nav-logged-in section
const oldNav = `<div id="nav-logged-in" class="hidden items-center gap-3">
          <div id="nav-user-badge"
          <button onclick="showFavorites()" class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-lg transition" title="My Favorites">
            <i data-lucide="heart" class="w-4 h-4"></i>
            <span class="hidden sm:inline">Favorites</span>
          </button> class="flex items-center gap-2 px-3 py-1.5 bg-forest-50 rounded-full text-sm">
            <span class="text-forest-600">🌿</span>
            <span id="nav-user-status" class="tex`;

const newNav = `<div id="nav-logged-in" class="hidden items-center gap-3">
          <button onclick="showFavorites()" class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-lg transition" title="My Favorites">
            <i data-lucide="heart" class="w-4 h-4"></i>
            <span class="hidden sm:inline">Favorites</span>
          </button>
          <div id="nav-user-badge" class="flex items-center gap-2 px-3 py-1.5 bg-forest-50 rounded-full text-sm">
            <span class="text-forest-600">🌿</span>
            <span id="nav-user-status" class="text-forest-700 font-medium">Logged in</span>
          </div>`;

if (c.indexOf(oldNav) !== -1) {
  c = c.replace(oldNav, newNav);
  console.log('1. Fixed nav-logged-in HTML');
} else {
  console.log('1. Pattern not found, trying simpler fix...');
  // Just replace the broken section
  const broken = `class="hidden items-center gap-3">
          <div id="nav-user-badge"
          <button onclick="showFavorites()"`;
  const fixed = `class="hidden items-center gap-3">
          <button onclick="showFavorites()"`;
  if (c.indexOf(broken) !== -1) {
    c = c.replace(broken, fixed);
    console.log('1. Applied simple fix');
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');