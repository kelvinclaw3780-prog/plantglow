const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check if updateModalFavoriteBtn function exists
const umfbIdx = c.indexOf('function updateModalFavoriteBtn');
console.log('updateModalFavoriteBtn at:', umfbIdx);

const tmfbIdx = c.indexOf('function toggleModalFavorite');
console.log('toggleModalFavorite at:', tmfbIdx);

// Find closePlantModal and add the new functions before it
const closeIdx = c.indexOf('function closePlantModal()');
console.log('\nclosePlantModal at:', closeIdx);

if (closeIdx !== -1 && umfbIdx === -1) {
  // Add the functions before closePlantModal
  const newFunctions = `
    function updateModalFavoriteBtn() {
      var btn = document.getElementById('modal-favorite-btn');
      var icon = document.getElementById('modal-favorite-icon');
      var text = document.getElementById('modal-favorite-text');
      if (!currentModalPlantId) return;
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      var isFavorite = favorites.includes(currentModalPlantId);
      var isLoggedIn = !!localStorage.getItem('plantglow_token');
      if (!isLoggedIn) {
        btn.className = 'mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-forest-400 hover:bg-forest-50 transition text-sm font-medium text-gray-600';
        icon.textContent = '♡';
        text.textContent = 'Login to Save';
        btn.onclick = function() { showToast('Please login to save favorites', 'info'); };
      } else if (isFavorite) {
        btn.className = 'mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-red-400 bg-red-50 transition text-sm font-medium text-red-500';
        icon.textContent = '♥';
        text.textContent = 'Saved';
        btn.onclick = function() { toggleModalFavorite(); };
      } else {
        btn.className = 'mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 transition text-sm font-medium text-gray-600';
        icon.textContent = '♡';
        text.textContent = 'Save to Favorites';
        btn.onclick = function() { toggleModalFavorite(); };
      }
    }

    function toggleModalFavorite() {
      if (!currentModalPlantId) return;
      var isLoggedIn = !!localStorage.getItem('plantglow_token');
      if (!isLoggedIn) {
        showToast('Please login to save favorites', 'info');
        return;
      }
      var favorites = JSON.parse(localStorage.getItem('plantglow_favorites') || '[]');
      var idx = favorites.indexOf(currentModalPlantId);
      if (idx > -1) {
        favorites.splice(idx, 1);
        showToast('Removed from favorites', 'info');
      } else {
        favorites.push(currentModalPlantId);
        showToast('Added to favorites!', 'success');
      }
      localStorage.setItem('plantglow_favorites', JSON.stringify(favorites));
      updateModalFavoriteBtn();
      renderPlants();
    }

    `;

  const insertBefore = 'function closePlantModal()';
  c = c.replace(insertBefore, newFunctions + insertBefore);
  console.log('Added updateModalFavoriteBtn and toggleModalFavorite functions');
} else {
  console.log('Functions already exist or closePlantModal not found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');