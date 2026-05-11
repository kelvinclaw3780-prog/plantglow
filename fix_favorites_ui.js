const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Add "Show All" button in browse-all-section
const oldBrowseSection = `<div id="browse-all-section" class="text-center mt-10">
        <button onclick="handleBrowseAll()" class="inline-flex items-center gap-2 bg-white border-2 border-forest-600 text-forest-600 font-semibold px-6 py-3 rounded-xl hover:bg-forest-50 transition shadow-sm">
          <span id="browse-all-text">Browse all 20 plants</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>`;

const newBrowseSection = `<div id="browse-all-section" class="text-center mt-10 flex justify-center gap-3 flex-wrap">
        <button onclick="handleBrowseAll()" id="browse-btn" class="inline-flex items-center gap-2 bg-white border-2 border-forest-600 text-forest-600 font-semibold px-6 py-3 rounded-xl hover:bg-forest-50 transition shadow-sm">
          <span id="browse-all-text">Browse all 20 plants</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
        <button onclick="showAllPlants()" id="show-all-btn" class="hidden items-center gap-2 bg-white border-2 border-gray-300 text-gray-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm">
          <i data-lucide="grid-3x3" class="w-4 h-4"></i>
          <span>Show All Plants</span>
        </button>
      </div>`;

c = c.replace(oldBrowseSection, newBrowseSection);
console.log('1. Updated browse-all-section with Show All button');

// Update showFavorites to also show the Show All button
const oldShowFav = `function showFavorites() {
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      if (favorites.length === 0) {
        showToast('No favorites yet!', 'info');
        return;
      }
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        var cardId = card.getAttribute('data-plant-id');
        card.style.display = favorites.includes(cardId) ? '' : 'none';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) browseSection.style.display = 'none';
      var searchSection = document.getElementById('plant-search').parentElement.parentElement;
      if (searchSection) searchSection.style.display = 'none';
    }`;

const newShowFav = `function showFavorites() {
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      if (favorites.length === 0) {
        showToast('No favorites yet!', 'info');
        return;
      }
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        var cardId = card.getAttribute('data-plant-id');
        card.style.display = favorites.includes(cardId) ? '' : 'none';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) browseSection.style.display = 'none';
      var searchSection = document.getElementById('plant-search').parentElement.parentElement;
      if (searchSection) searchSection.style.display = 'none';
      var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.remove('hidden');
        showAllBtn.classList.add('flex');
      }
    }`;

c = c.replace(oldShowFav, newShowFav);
console.log('2. Updated showFavorites to show the Show All button');

// Update showAllPlants to hide the Show All button
const oldShowAll = `function showAllPlants() {
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        card.style.display = '';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) browseSection.style.display = '';
      var searchSection = document.getElementById('plant-search').parentElement.parentElement;
      if (searchSection) searchSection.style.display = '';
    }`;

const newShowAll = `function showAllPlants() {
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        card.style.display = '';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) browseSection.style.display = '';
      var searchSection = document.getElementById('plant-search').parentElement.parentElement;
      if (searchSection) searchSection.style.display = '';
      var showAllBtn = document.getElementById('show-all-btn');
      if (showAllBtn) {
        showAllBtn.classList.add('hidden');
        showAllBtn.classList.remove('flex');
      }
    }`;

c = c.replace(oldShowAll, newShowAll);
console.log('3. Updated showAllPlants to hide the Show All button');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');