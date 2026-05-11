const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update renderPlants function
const oldRP = `function renderPlants() {
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
    }`;

const newRP = `function renderPlants() {
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
    }`;

const idx1 = c.indexOf(oldRP);
if (idx1 !== -1) {
  c = c.replace(oldRP, newRP);
  console.log('1. renderPlants updated!');
} else {
  console.log('1. renderPlants NOT found');
}

// Update handleBrowseAll function
const oldBA = `function handleBrowseAll() {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
      } else {
        showingAll = true;
        renderPlants();
      }
    }`;

const newBA = `function handleBrowseAll() {
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
    }`;

const idx2 = c.indexOf(oldBA);
if (idx2 !== -1) {
  c = c.replace(oldBA, newBA);
  console.log('2. handleBrowseAll updated!');
} else {
  console.log('2. handleBrowseAll NOT found');
}

// Add handlePlantSearch after handleBrowseAll
const hpsNew = `
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
    }
`;

const hpsIdx = c.indexOf('function handlePlantSearch');
if (hpsIdx === -1) {
  // Insert after handleBrowseAll
  const hbaEnd = c.indexOf('function showToast');
  if (hbaEnd !== -1) {
    c = c.substring(0, hbaEnd) + hpsNew + c.substring(hbaEnd);
    console.log('3. handlePlantSearch added!');
  } else {
    console.log('3. handlePlantSearch insertion point not found');
  }
} else {
  console.log('3. handlePlantSearch already exists');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');