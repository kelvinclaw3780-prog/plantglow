const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update handlePlantClick - allow anyone to view plant details without login
const old = `function handlePlantClick(plantId) {
      if (!isLoggedIn()) {
        openLoginRequiredModal();
        return;
      }
      openPlantModal(plantId);
    }`;
const newFn = `function handlePlantClick(plantId) {
      openPlantModal(plantId);
    }`;
const idx = c.indexOf(old);
if (idx !== -1) { c = c.replace(old, newFn); console.log('handlePlantClick updated!'); }

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');