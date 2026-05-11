const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Add a floating "Show All Plants" button that appears when viewing favorites
// Find the plant-grid section and add a floating button after it

const oldPlantGrid = `<!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>`;

const newPlantGrid = `<!-- Dynamic plant grid -->
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Plants rendered by JS -->
      </div>
      <!-- Floating Show All button (appears when viewing favorites) -->
      <div id="show-all-floating" class="hidden justify-center mt-6">
        <button onclick="showAllPlants()" class="inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-forest-700 transition shadow-lg">
          <i data-lucide="grid-3x3" class="w-4 h-4"></i>
          Show All Plants
        </button>
      </div>`;

c = c.replace(oldPlantGrid, newPlantGrid);
console.log('1. Added floating Show All button');

// Update showFavorites to show the floating button
const oldShowFav = `var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.remove('hidden');
        showAllBtn.classList.add('flex');
      }`;

const newShowFav = `var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.remove('hidden');
        showAllBtn.classList.add('flex');
      }
      var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.remove('hidden');
        floatingBtn.classList.add('flex');
      }`;

c = c.replace(oldShowFav, newShowFav);
console.log('2. Updated showFavorites to show floating button');

// Update showAllPlants to hide the floating button
const oldShowAll = `var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.add('hidden');
        showAllBtn.classList.remove('flex');
      }`;

const newShowAll = `var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.add('hidden');
        showAllBtn.classList.remove('flex');
      }
      var floatingBtn = document.getElementById('show-all-floating');
      if (floatingBtn) {
        floatingBtn.classList.add('hidden');
        floatingBtn.classList.remove('flex');
      }`;

c = c.replace(oldShowAll, newShowAll);
console.log('3. Updated showAllPlants to hide floating button');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');