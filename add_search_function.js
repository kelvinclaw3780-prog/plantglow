const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Add handlePlantSearch after renderPlants function
const oldRenderPlantsEnd = `lucide.createIcons();
    }

    function handleBrowseAll()`;

const newRenderPlantsEnd = `lucide.createIcons();
    }

    function handlePlantSearch() {
      var query = document.getElementById('plant-search').value.toLowerCase().trim();
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        var name = card.getAttribute('data-name') || '';
        var scientific = card.getAttribute('data-scientific') || '';
        var matches = query === '' || name.includes(query) || scientific.includes(query);
        card.style.display = matches ? '' : 'none';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) {
        browseSection.style.display = query === '' ? '' : 'none';
      }
    }

    function handleBrowseAll()`;

if (c.indexOf(oldRenderPlantsEnd) !== -1) {
  c = c.replace(oldRenderPlantsEnd, newRenderPlantsEnd);
  console.log('Added handlePlantSearch function');
} else {
  console.log('Pattern not found, trying alternative...');
  // Try finding just before handleBrowseAll
  const hba = c.indexOf('function handleBrowseAll()');
  if (hba !== -1) {
    const insertBefore = c.substring(0, hba);
    const insertAfter = c.substring(hba);
    const func = `
    function handlePlantSearch() {
      var query = document.getElementById('plant-search').value.toLowerCase().trim();
      var grid = document.getElementById('plant-grid');
      var cards = grid.getElementsByClassName('plant-card');
      Array.from(cards).forEach(function(card) {
        var name = card.getAttribute('data-name') || '';
        var scientific = card.getAttribute('data-scientific') || '';
        var matches = query === '' || name.includes(query) || scientific.includes(query);
        card.style.display = matches ? '' : 'none';
      });
      var browseSection = document.getElementById('browse-all-section');
      if (browseSection) {
        browseSection.style.display = query === '' ? '' : 'none';
      }
    }

    `;
    c = insertBefore + func + insertAfter;
    console.log('Added handlePlantSearch before handleBrowseAll');
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');