const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Remove BOM if present
if (c.charCodeAt(0) === 0xFEFF) {
  c = c.slice(1);
  console.log('Removed BOM');
}

// Replace the PLANT GRID section
const oldBlock = `    var VISIBLE_COUNT = 10;
    var showingAll = false;

    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\'' + id + '\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }

    function renderPlants() {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var browseText = document.getElementById('browse-all-text');
      var loggedIn = isLoggedIn();
      var plantIds = Object.keys(plantData);
      var showCount = (loggedIn || showingAll) ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');
      if (loggedIn || showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }
      lucide.createIcons();
    }

    function handleBrowseAll() {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
      } else {
        showingAll = true;
        renderPlants();
      }
    }`;

const idx = c.indexOf('    var VISIBLE_COUNT = 10;');
console.log('Found VISIBLE_COUNT block at:', idx);
console.log('Old block length:', oldBlock.length);

if (idx !== -1) {
  const newBlock = `    var VISIBLE_COUNT = 6;
    var showingAll = false;

    function getSavedPlants() {
      try {
        return JSON.parse(localStorage.getItem('plantglow_saved') || '[]');
      } catch(e) { return []; }
    }

    function savePlant(id) {
      var saved = getSavedPlants();
      if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem('plantglow_saved', JSON.stringify(saved));
      }
    }

    function unsavePlant(id) {
      var saved = getSavedPlants();
      saved = saved.filter(function(pid) { return pid !== id; });
      localStorage.setItem('plantglow_saved', JSON.stringify(saved));
    }

    function handleToggleSave(plantId) {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
        return;
      }
      var saved = getSavedPlants();
      if (saved.includes(plantId)) {
        unsavePlant(plantId);
        showToast('Removed from favorites', 'info');
      } else {
        savePlant(plantId);
        showToast('Saved to favorites!', 'success');
      }
      renderPlants();
    }

    function renderPlantCard(id, plant) {
      var saved = getSavedPlants();
      var isSaved = saved.includes(id);
      var heartClass = isSaved ? 'text-red-500' : 'text-gray-400';
      var fillClass = isSaved ? 'fill-current' : '';
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">' +
        '<div onclick="handlePlantClick(\'' + id + '\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>' +
        '<button onclick="handleToggleSave(\'' + id + '\')" class="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + (isSaved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ' + heartClass + '"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></button></div>';
    }

    function renderPlants() {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var browseText = document.getElementById('browse-all-text');
      var browseIcon = document.getElementById('browse-icon');
      var plantIds = Object.keys(plantData);
      var showCount = showingAll ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');
      if (showingAll) {
        browseSection.style.display = '';
        browseText.textContent = 'Show less';
        browseIcon.setAttribute('data-lucide', 'arrow-up');
      } else {
        browseSection.style.display = '';
        browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
        browseIcon.setAttribute('data-lucide', 'arrow-down');
      }
      lucide.createIcons();
    }

    function handleBrowseAll() {
      showingAll = !showingAll;
      var text = document.getElementById('browse-all-text');
      var icon = document.getElementById('browse-icon');
      if (showingAll) {
        text.textContent = 'Show less';
        icon.setAttribute('data-lucide', 'arrow-up');
      } else {
        text.textContent = 'Browse all 19 plants';
        icon.setAttribute('data-lucide', 'arrow-down');
      }
      document.getElementById('plant-search').value = '';
      renderPlants();
    }

    function handlePlantSearch(query) {
      var grid = document.getElementById('plant-grid');
      var browseSection = document.getElementById('browse-all-section');
      var resultCount = document.getElementById('search-result-count');
      var plantIds = Object.keys(plantData);
      var filtered = plantIds.filter(function(id) {
        var plant = plantData[id];
        return plant.name.toLowerCase().includes(query.toLowerCase()) || plant.scientific.toLowerCase().includes(query.toLowerCase());
      });
      grid.innerHTML = filtered.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');
      if (filtered.length > 0) {
        resultCount.textContent = filtered.length + ' found';
        resultCount.classList.remove('hidden');
      } else {
        resultCount.textContent = 'No results';
        resultCount.classList.remove('hidden');
      }
      browseSection.style.display = 'none';
      lucide.createIcons();
    }`;

  c = c.slice(0, idx) + newBlock + c.slice(idx + oldBlock.length);
  console.log('Replacement done. New length:', c.length);
  fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
  console.log('Written!');
} else {
  console.log('Could not find old block');
}