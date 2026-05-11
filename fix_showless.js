const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Fix: in handleShowLess, reset the browse section visibility properly
// and in renderPlants, ensure button visibility is correctly synced

const oldShowLess = `function handleShowLess() {
      showingAll = false;
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (browseBtn) {
        browseBtn.classList.remove('hidden');
        browseBtn.classList.add('inline-flex');
      }
      if (showLessBtn) {
        showLessBtn.classList.add('hidden');
        showLessBtn.classList.remove('flex');
      }
      renderPlants();
    }`;

const newShowLess = `function handleShowLess() {
      showingAll = false;
      var browseSection = document.getElementById('browse-all-section');
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      var browseText = document.getElementById('browse-all-text');
      // Show browse section and buttons
      if (browseSection) browseSection.style.display = '';
      if (browseBtn) {
        browseBtn.classList.remove('hidden');
        browseBtn.classList.add('inline-flex');
        browseBtn.style.display = '';
      }
      if (showLessBtn) {
        showLessBtn.classList.add('hidden');
        showLessBtn.classList.remove('flex');
        showLessBtn.style.display = 'none';
      }
      if (browseText) browseText.textContent = 'Browse all ' + Object.keys(plantData).length + ' plants';
      renderPlants();
    }`;

c = c.replace(oldShowLess, newShowLess);
console.log('Fixed handleShowLess');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');