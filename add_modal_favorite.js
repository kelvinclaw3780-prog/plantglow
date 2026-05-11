const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// 1. Update the openPlantModal function to fix the id bug and add updateModalFavoriteBtn call
const oldOpen = `function openPlantModal(plantId) {
      var plant = plantData[plantId];
      if (!plant) return;
      var subscribed = isSubscribed();
      currentModalPlantId = id;
      document.getElementById('plant-modal-img').src = plant.img;`;

const newOpen = `function openPlantModal(plantId) {
      var plant = plantData[plantId];
      if (!plant) return;
      currentModalPlantId = plantId;
      document.getElementById('plant-modal-img').src = plant.img;`;

c = c.replace(oldOpen, newOpen);
console.log('1. Fixed openPlantModal parameter bug');

// Find where the problems are populated and add updateModalFavoriteBtn after
const problemsEnd = `problemsEl.appendChild(li);
      });
      document.getElementById('plant-modal').classList.remove('hidden');`;

const newProblemsEnd = `problemsEl.appendChild(li);
      });
      // Update favorite button
      updateModalFavoriteBtn();
      document.getElementById('plant-modal').classList.remove('hidden');`;

c = c.replace(problemsEnd, newProblemsEnd);
console.log('2. Added updateModalFavoriteBtn call');

// 3. Add updateModalFavoriteBtn and toggleModalFavorite functions before closePlantModal
const closePlantModalStart = `function closePlantModal() {
      currentModalPlantId = null;`;

const newFunctions = `function updateModalFavoriteBtn() {
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

c = c.replace(closePlantModalStart, newFunctions + closePlantModalStart);
console.log('3. Added updateModalFavoriteBtn and toggleModalFavorite functions');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');