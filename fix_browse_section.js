const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// The issue: browseSection is hidden when showingAll=true, but both buttons are INSIDE browseSection
// Fix: don't hide browseSection when showingAll, let the button visibility logic handle it

const oldHide = `if (loggedIn || showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }`;

const newHide = `if (loggedIn && !showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }`;

c = c.replace(oldHide, newHide);
console.log('Fixed browse section visibility logic');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');