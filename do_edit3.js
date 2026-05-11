const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length);

// Browse section - add search bar and fix browse toggle
const oldBrowse = `      <!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>

      <!-- Browse All Button (hidden when logged in and all plants shown) -->
      <div id="browse-all-section" class="text-center mt-10">
        <button onclick="handleBrowseAll()" class="inline-flex items-center gap-2 bg-white border-2 border-forest-600 text-forest-600 font-semibold px-6 py-3 rounded-xl hover:bg-forest-50 transition shadow-sm">
          <span id="browse-all-text">Browse all 20 plants</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>`;

const newBrowse = `      <!-- Search bar -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
          <input type="text" id="plant-search" placeholder="Search plants..." oninput="handlePlantSearch(this.value)"
            class="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 text-gray-900 shadow-sm">
          <span id="search-result-count" class="hidden absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400"></span>
        </div>
      </div>

      <!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>

      <!-- Browse All Button -->
      <div id="browse-all-section" class="text-center mt-10">
        <button onclick="handleBrowseAll()" class="inline-flex items-center gap-2 bg-white border-2 border-forest-600 text-forest-600 font-semibold px-6 py-3 rounded-xl hover:bg-forest-50 transition shadow-sm">
          <span id="browse-all-text">Browse all 19 plants</span>
          <i data-lucide="arrow-down" id="browse-icon" class="w-4 h-4"></i>
        </button>
      </div>`;

const idx = c.indexOf(oldBrowse);
if (idx !== -1) {
  c = c.substring(0, idx) + newBrowse + c.substring(idx + oldBrowse.length);
  console.log('Browse section replaced!');
} else {
  console.log('Browse section pattern NOT found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');