const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// 1. Add search input HTML above plant-grid
const oldGrid = `<div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">`;
const newGrid = `<div class="mb-6">
        <div class="relative max-w-md mx-auto">
          <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
          <input type="text" id="plant-search" placeholder="Search plants..." oninput="handlePlantSearch()"
            class="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-400 text-gray-900">
        </div>
      </div>
      <div id="plant-grid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">`;
c = c.replace(oldGrid, newGrid);
console.log('1. Search input added');

// 2. Add search handler function in JS
const initEnd = c.indexOf('// LOGIN STATE');
const searchHandler = `
    function handlePlantSearch() {
      var query = document.getElementById('plant-search').value.toLowerCase().trim();
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      var visibleCount = 0;
      Array.from(cards).forEach(function(card) {
        var name = card.getAttribute('data-name') || '';
        var scientific = card.getAttribute('data-scientific') || '';
        var matches = query === '' || name.includes(query) || scientific.includes(query);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });
      // Hide browse section if searching
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) {
        browseSection.style.display = query === '' ? '' : 'none';
      }
    }

    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')" data-name="' + plant.name.toLowerCase() + '" data-scientific="' + plant.scientific.toLowerCase() + '">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }
`;
c = c.substring(0, initEnd) + searchHandler + c.substring(initEnd);
console.log('2. Search handler and updated renderPlantCard added');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');