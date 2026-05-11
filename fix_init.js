const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Wrap renderPlants to ensure it only runs after page is ready
const oldInit = `document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
      updateNav();
      showLoginToast();
      setTimeout(function() {
        console.log('[INIT] plantData keys:', Object.keys(plantData).length);
        console.log('[INIT] showingAll:', showingAll);
        renderPlants();
        console.log('[INIT] After render - plant-grid innerHTML length:', document.getElementById('plant-grid').innerHTML.length);
      }, 300);
    });`;

const newInit = `document.addEventListener('DOMContentLoaded', function() {
      lucide.createIcons();
      updateNav();
      showLoginToast();
      showingAll = false; // Force reset before render
      setTimeout(function() {
        console.log('[INIT] plantData keys:', Object.keys(plantData).length);
        console.log('[INIT] showingAll:', showingAll);
        console.log('[INIT] plant-grid children BEFORE:', document.getElementById('plant-grid').children.length);
        renderPlants();
        console.log('[INIT] plant-grid children AFTER:', document.getElementById('plant-grid').children.length);
      }, 500);
    });`;

if (c.includes(oldInit)) {
  c = c.replace(oldInit, newInit);
  console.log('Updated INIT handler');
} else {
  console.log('Could not find old INIT handler');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');