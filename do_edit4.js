const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File length:', c.length);

// 1. Change VISIBLE_COUNT from 10 to 6
const oldVis = 'var VISIBLE_COUNT = 10;';
const newVis = 'var VISIBLE_COUNT = 6;';
const idx1 = c.indexOf(oldVis);
if (idx1 !== -1) {
  c = c.replace(oldVis, newVis);
  console.log('1. VISIBLE_COUNT changed!');
} else {
  console.log('1. VISIBLE_COUNT not found');
}

// 2. Find showLoginToast and add new functions before it
// New functions to add:
const newFunctions = `
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

`;

// Insert before showLoginToast function
const loginToastIdx = c.indexOf('function showLoginToast()');
if (loginToastIdx !== -1) {
  c = c.substring(0, loginToastIdx) + newFunctions + c.substring(loginToastIdx);
  console.log('2. New functions added!');
} else {
  console.log('2. showLoginToast not found');
}

// 3. Update renderPlantCard to include heart button
// Find the current renderPlantCard function and replace it
const oldRPC = `    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\'' + id + '\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }`;

const newRPC = `    function renderPlantCard(id, plant) {
      var saved = getSavedPlants();
      var isSaved = saved.includes(id);
      var heartClass = isSaved ? 'text-red-500' : 'text-gray-400';
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">' +
        '<div onclick="handlePlantClick(\'' + id + '\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>' +
        '<button onclick="handleToggleSave(\'' + id + '\')" class="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + (isSaved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ' + heartClass + '"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button></div>';
    }`;

const rpcIdx = c.indexOf(oldRPC);
if (rpcIdx !== -1) {
  c = c.replace(oldRPC, newRPC);
  console.log('3. renderPlantCard updated!');
} else {
  console.log('3. renderPlantCard pattern not found - trying alternative');
  // Try without the onerror src check
  const altOldRPC = `    function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\'' + id + '\')>'`;
  const altRpcIdx = c.indexOf(altOldRPC);
  if (altRpcIdx !== -1) {
    console.log('Found alt pattern at:', altRpcIdx);
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone part 1!');