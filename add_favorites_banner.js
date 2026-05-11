const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Add floating Show All button after plant-grid div
const oldGridEnd = `<!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>
      <!-- Floating Show All button (appears when viewing favorites) -->`;

const newGridEnd = `<!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>`;

c = c.replace(oldGridEnd, newGridEnd);
console.log('Removed old floating button section');

// Find the browse-all-section and add our button inside/below it properly
const browseSection = `<div id="browse-all-section" class="text-center mt-10 flex justify-center gap-3 flex-wrap">`;

if (c.indexOf(browseSection) !== -1) {
  console.log('Found browse-all-section');
} else {
  console.log('browse section pattern not found');
}

// Let's find where browse-all-section ends and add our floating button there
const browseEnd = c.indexOf('browse-all-section');
console.log('browse-all-section at:', browseEnd);

// Actually, the best approach: add a "Show All" button at the top of the plant section
// that only shows when in favorites view

const searchSection = c.indexOf('id="plant-search"');
console.log('search input at:', searchSection);

// Let's add a banner above the plant grid that shows "Showing X favorites - [Show All]"
const oldSearchParent = `<div class="mb-8">
        <!-- Search input -->
        <div class="relative">`;

const newSearchParent = `<div id="favorites-banner" class="hidden mb-6 p-4 bg-forest-50 border border-forest-200 rounded-xl">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div class="flex items-center gap-2">
              <i data-lucide="heart" class="w-5 h-5 text-red-500"></i>
              <span id="favorites-count" class="font-medium text-forest-700">Showing your favorites</span>
            </div>
            <button onclick="showAllPlants()" class="inline-flex items-center gap-2 bg-forest-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-forest-700 transition text-sm">
              <i data-lucide="grid-3x3" class="w-4 h-4"></i>
              Show All Plants
            </button>
          </div>
        </div>
        <!-- Search input -->
        <div class="relative">`;

c = c.replace(oldSearchParent, newSearchParent);
console.log('Added favorites banner');

// Update showFavorites to show the banner
const oldShowFavBanner = `var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.remove('hidden');
        floatingBtn.classList.add('flex');
      }`;

const newShowFavBanner = `var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.remove('hidden');
        floatingBtn.classList.add('flex');
      }
      var banner = document.getElementById('favorites-banner');
      if (banner) {
        banner.classList.remove('hidden');
        // Update count
        var countSpan = document.getElementById('favorites-count');
        if (countSpan) countSpan.textContent = 'Showing ' + favorites.length + ' favorite' + (favorites.length !== 1 ? 's' : '');
      }`;

c = c.replace(oldShowFavBanner, newShowFavBanner);
console.log('Updated showFavorites to show banner');

// Update showAllPlants to hide the banner
const oldShowAllHide = `var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.add('hidden');
        floatingBtn.classList.remove('flex');
      }`;

const newShowAllHide = `var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.add('hidden');
        floatingBtn.classList.remove('flex');
      }
      var banner = document.getElementById('favorites-banner');
      if (banner) banner.classList.add('hidden');`;

c = c.replace(oldShowAllHide, newShowAllHide);
console.log('Updated showAllPlants to hide banner');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');