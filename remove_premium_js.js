const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Remove isSubscribed function
const old1 = `function isSubscribed() {
      return localStorage.getItem('plantglow_subscribed') === 'true';
    }

    `;
const idx1 = c.indexOf(old1);
if (idx1 !== -1) { c = c.replace(old1, ''); console.log('isSubscribed removed!'); }

// Remove showLoginToast premium content
const old2 = `function showLoginToast() {
      if (!isLoggedIn()) return;
      var subscribed = isSubscribed();
      var msg = subscribed
        ? 'Welcome back! You have Premium access *'
        : 'Welcome back! Upgrade to Premium for 500-char guides';
      showToast(msg, 'success');
    }`;
const idx2 = c.indexOf(old2);
if (idx2 !== -1) {
  const newToast = `function showLoginToast() {
      if (!isLoggedIn()) return;
      showToast('Welcome back!', 'success');
    }`;
  c = c.replace(old2, newToast);
  console.log('showLoginToast updated!');
}

// Remove subscribed variable from openPlantModal
const old3 = `      var subscribed = isSubscribed();
      `;
const idx3 = c.indexOf(old3);
if (idx3 !== -1) { c = c.replace(old3, ''); console.log('subscribed var removed!'); }

// Update nav user status - remove premium indicator
const old4 = `document.getElementById('nav-user-status').textContent = subscribed ? 'Premium *' : 'Free Plan';`;
const idx4 = c.indexOf(old4);
if (idx4 !== -1) {
  c = c.replace(old4, `document.getElementById('nav-user-status').textContent = 'Logged in';`);
  console.log('nav status updated!');
}

// Remove premium HTML from plant modal
const pmStart = c.indexOf('id="plant-modal-premium"');
if (pmStart !== -1) {
  const divStart = c.lastIndexOf('<div', pmStart);
  const divEnd = c.indexOf('</div>', pmStart) + 6;
  c = c.substring(0, divStart) + c.substring(divEnd);
  console.log('Premium HTML removed!');
}

// Remove any remaining premium references in plant modal
const modalText = c.indexOf('Unlock 500-char premium care guides');
if (modalText !== -1) {
  c = c.replace('Unlock 500-char premium care guides', 'Login to see full plant details and save favorites');
  console.log('Modal text updated!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');