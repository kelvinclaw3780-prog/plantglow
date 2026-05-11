const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find and fix renderPlants - add fallback for empty plantsToShow
const oldCode = `var showCount = showingAll ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');`;

const newCode = `var showCount = showingAll ? plantIds.length : VISIBLE_COUNT;
      var plantsToShow = plantIds.slice(0, showCount);
      if (plantsToShow.length === 0) { plantsToShow = plantIds; showCount = plantIds.length; }
      grid.innerHTML = plantsToShow.map(function(id) { return renderPlantCard(id, plantData[id]); }).join('');`;

if (c.includes(oldCode)) {
  c = c.replace(oldCode, newCode);
  console.log('Fixed renderPlants empty fallback');
} else {
  console.log('Could not find exact pattern');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');