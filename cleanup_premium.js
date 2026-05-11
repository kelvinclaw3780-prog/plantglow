const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Remove isSubscribed function
const old1 = `function isSubscribed() {
      return localStorage.getItem('plantglow_subscribed') === 'true';
    }

    `;
const idx1 = c.indexOf(old1);
console.log('isSubscribed at:', idx1);
if (idx1 !== -1) c = c.replace(old1, '');

// Remove showLoginToast premium messaging
const old2 = `function showLoginToast() {
      if (!isLoggedIn()) return;
      var subscribed = isSubscribed();
      var msg = subscribed
        ? 'Welcome back! You have Premium access *'
        : 'Welcome back! Upgrade to Premium for 500-char guides';
      showToast(msg, 'success');
    }`;
const idx2 = c.indexOf(old2);
console.log('showLoginToast at:', idx2);
if (idx2 !== -1) {
  const newToast = `function showLoginToast() {
      if (!isLoggedIn()) return;
      showToast('Welcome back!', 'success');
    }`;
  c = c.replace(old2, newToast);
  console.log('Updated showLoginToast!');
}

// Remove subscribed check from openPlantModal
const old3 = `      var subscribed = isSubscribed();
      `;
const idx3 = c.indexOf(old3);
console.log('subscribed var at:', idx3);
if (idx3 !== -1) c = c.replace(old3, '');

// Remove nav user status premium indicator
const old4 = `document.getElementById('nav-user-status').textContent = subscribed ? 'Premium *' : 'Free Plan';`;
const idx4 = c.indexOf(old4);
console.log('nav status at:', idx4);
if (idx4 !== -1) {
  c = c.replace(old4, `document.getElementById('nav-user-status').textContent = 'Logged in';`);
  console.log('Updated nav status!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');