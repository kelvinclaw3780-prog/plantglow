const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// ===== JS CHANGES =====

// 1. Remove isSubscribed function
const isSubIdx = c.indexOf("function isSubscribed()");
if (isSubIdx !== -1) {
  const start = c.lastIndexOf('\n    ', isSubIdx);
  const end = c.indexOf('\n    function', isSubIdx);
  c = c.substring(0, start) + c.substring(end);
  console.log('1. isSubscribed removed');
}

// 2. Update showLoginToast
const toastIdx = c.indexOf("function showLoginToast()");
if (toastIdx !== -1) {
  const oldToast = `if (!isLoggedIn()) return;
      var subscribed = isSubscribed();
      var msg = subscribed
        ? 'Welcome back! You have Premium access *'
        : 'Welcome back! Upgrade to Premium for 500-char guides';
      showToast(msg, 'success');`;
  const newToast = `if (!isLoggedIn()) return;
      showToast('Welcome back!', 'success');`;
  c = c.replace(oldToast, newToast);
  console.log('2. showLoginToast updated');
}

// 3. Update nav user status (remove subscribed check)
const navIdx = c.indexOf("document.getElementById('nav-user-status').textContent = subscribed");
if (navIdx !== -1) {
  c = c.replace("document.getElementById('nav-user-status').textContent = subscribed ? 'Premium *' : 'Free Plan'", "document.getElementById('nav-user-status').textContent = 'Logged in'");
  console.log('3. nav status updated');
}

// 4. Update handlePlantClick - no login required for viewing
const hpcIdx = c.indexOf("if (!isLoggedIn()) {\n        openLoginRequiredModal();\n        return;\n      }");
if (hpcIdx !== -1) {
  c = c.replace("if (!isLoggedIn()) {\n        openLoginRequiredModal();\n        return;\n      }\n      openPlantModal(plantId);", "openPlantModal(plantId);");
  console.log('4. handlePlantClick updated');
}

// 5. Remove premium section from plant modal HTML
const pmHtmlIdx = c.indexOf('id="plant-modal-premium"');
if (pmHtmlIdx !== -1) {
  const divStart = c.lastIndexOf('<div', pmHtmlIdx);
  const divEnd = c.indexOf('</div>', pmHtmlIdx) + 6;
  c = c.substring(0, divStart) + c.substring(divEnd);
  console.log('5. Premium HTML removed');
}

// 6. Remove premium JS from openPlantModal
const openModalPremium = `var premiumEl = document.getElementById('plant-modal-premium');
      var premiumTextEl = document.getElementById('plant-modal-premium-text');
      if (subscribed) {
        premiumTextEl.textContent = plant.premium;
        premiumEl.classList.remove('hidden');
      } else {
        premiumEl.classList.add('hidden');
      }`;
const ompIdx = c.indexOf(openModalPremium);
if (ompIdx !== -1) {
  c = c.replace(openModalPremium, '');
  console.log('6. Premium JS removed from openPlantModal');
}

// 7. Remove premium field from plantData objects
// For each plant, find premium: "..." and remove it
const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];
plants.forEach(p => {
  const pIdx = c.indexOf(p + ': {');
  if (pIdx === -1) return;
  const premiumIdx = c.indexOf('premium: "', pIdx);
  if (premiumIdx === -1) return;
  // Find start of line
  const lineStart = c.lastIndexOf('\n', premiumIdx - 1) + 1;
  // Find end - after the string and comma
  const stringStart = premiumIdx + 'premium: "'.length;
  const stringEnd = c.indexOf('"', stringStart);
  const commaIdx = c.indexOf(',', stringEnd);
  const lineEnd = c.indexOf('\n', commaIdx) + 1;
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  console.log('7. premium removed from', p);
});

// 8. Update login required modal text
if (c.indexOf('Unlock 500-char premium care guides') !== -1) {
  c = c.replace('Unlock 500-char premium care guides', 'Login to see full plant details and save favorites');
  console.log('8. Modal text updated');
}

// 9. Update login required modal subtitle
const oldSub = "Create a free account to save favorites and unlock 500-char premium care guides";
const newSub = "Create a free account to save favorites and access all plant details";
if (c.indexOf(oldSub) !== -1) {
  c = c.replace(oldSub, newSub);
  console.log('9. Modal subtitle updated');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nAll done!');