const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update handlePlantClick to allow anyone to view plant details (basic info only)
// Currently requires login to see plant modal
// We want: anyone can see basic info, login needed only for favorites
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
console.log('handlePlantClick at:', idx);
if (idx !== -1) c = c.replace(old, newFn);

// Update login required modal text
const oldModal = 'Create a free account to save favorites and unlock 500-char premium care guides';
const newModal = 'Create a free account to save favorites and access all plant details';
const idx2 = c.indexOf(oldModal);
console.log('Modal text at:', idx2);
if (idx2 !== -1) c = c.replace(oldModal, newModal);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');