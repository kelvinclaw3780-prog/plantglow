const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Update updateNav to also handle mobile menu nav items
const oldUpdateNav = `document.getElementById('mobile-nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('mobile-nav-logged-in').style.display = loggedIn ? '' : 'none';`;

const newUpdateNav = `document.getElementById('mobile-nav-logged-out').style.display = loggedIn ? 'none' : '';
      document.getElementById('mobile-nav-logged-in').style.display = loggedIn ? '' : 'none';
      // Also update mobile menu nav items
      var mobileLoggedOut = document.getElementById('mobile-nav-logged-out');
      var mobileLoggedIn = document.getElementById('mobile-nav-logged-in');
      if (mobileLoggedOut) mobileLoggedOut.style.display = loggedIn ? 'none' : '';
      if (mobileLoggedIn) mobileLoggedIn.style.display = loggedIn ? '' : 'none';`;

c = c.replace(oldUpdateNav, newUpdateNav);
console.log('Updated updateNav function');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');