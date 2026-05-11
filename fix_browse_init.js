const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// When logged in, 20 plants show by default - hide browse section
// Only show browse button when NOT logged in (guests see 10 and need to browse)
const oldLogic = `// Only hide entire section when logged in AND showing all
      if (loggedIn && showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }`;

const newLogic = `// Hide browse section if logged in (they see all by default), unless browsing
      if (loggedIn && !showingAll) {
        browseSection.style.display = 'none';
      } else if (!loggedIn || showingAll) {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }`;

c = c.replace(oldLogic, newLogic);
console.log('Fixed initial browse section visibility');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');