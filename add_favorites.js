const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// 1. Update renderPlantCard to add heart button
const oldCard = `function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')" data-name="' + plant.name.toLowerCase() + '" data-scientific="' + plant.scientific.toLowerCase() + '">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }`;

const newCard = `function renderPlantCard(id, plant) {
      var isLoggedIn = !!localStorage.getItem('plantglow_token');
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      var isFavorite = favorites.includes(id);
      var heartClass = isFavorite ? 'text-red-500' : 'text-gray-300';
      var heartIcon = isFavorite ? 'heart' : 'heart';
      var onclick = isLoggedIn ? 'toggleFavorite(\\'' + id + '\\', event)' : 'showToast(\\'Please login to save favorites\\', \\'info\\')';
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')" data-name="' + plant.name.toLowerCase() + '" data-scientific="' + plant.scientific.toLowerCase() + '">' +
        '<div class="relative">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<button onclick="' + onclick + '" class="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition shadow-sm" title="' + (isLoggedIn ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to save') + '">' +
        '<i data-lucide="' + heartIcon + '" class="w-5 h-5 ' + heartClass + '"></i>' +
        '</button>' +
        '</div>' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }`;

c = c.replace(oldCard, newCard);
console.log('1. Updated renderPlantCard with heart button');

// 2. Add toggleFavorite and showFavorites functions after handlePlantSearch
const handlePlantSearchEnd = c.indexOf('browseSection.style.display = query === \'\' ? \'\' : \'none\';', c.indexOf('function handlePlantSearch')) + 'browseSection.style.display = query === \'\' ? \'\' : \'none\';'.length;

const searchFuncEnd = c.indexOf('function handleBrowseAll');
const favFunctions = `

    function toggleFavorite(plantId, event) {
      event.stopPropagation();
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      var idx = favorites.indexOf(plantId);
      if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('Removed from favorites', 'info');
      } else {
        favorites.push(plantId);
        showToast('Added to favorites!', 'success');
      }
      localStorage.setItem('plantglow_favorites', JSON.stringify(favorites));
      renderPlants();
    }

    function showFavorites() {
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
    }

    function showAllPlants() {
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        card.style.display = '';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) browseSection.style.display = '';
      var searchSection = document.getElementById('plant-search').parentElement.parentElement;
      if (searchSection) searchSection.style.display = '';
    }

`;

c = c.substring(0, searchFuncEnd) + favFunctions + c.substring(searchFuncEnd);
console.log('2. Added toggleFavorite and showFavorites functions');

// 3. Add "My Favorites" button in nav for logged-in users
const navLoggedIn = `id="nav-user-badge"`;
const navFavBtn = `id="nav-user-badge"
          <button onclick="showFavorites()" class="flex items-center gap-1.5 px-3 py-1.5 text-sm text-forest-600 hover:text-forest-700 hover:bg-forest-50 rounded-lg transition" title="My Favorites">
            <i data-lucide="heart" class="w-4 h-4"></i>
            <span class="hidden sm:inline">Favorites</span>
          </button>`;
c = c.replace(navLoggedIn, navFavBtn);
console.log('3. Added Favorites button to nav');

// 4. Add data-plant-id to cards
const cardWithDataId = `onclick="handlePlantClick(\\'' + id + '\\')" data-name="`;
const cardWithDataPlantId = `onclick="handlePlantClick(\\'' + id + '\\')" data-plant-id="' + id + '" data-name="`;
c = c.replace(cardWithDataId, cardWithDataPlantId);
console.log('4. Added data-plant-id to cards');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');