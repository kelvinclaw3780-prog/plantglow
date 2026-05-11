const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// In renderPlants, always show browse section and buttons when not showingAll
const oldRenderLogic = `if (loggedIn && showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }
      // Also update button visibility based on showingAll state
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (showingAll) {
        if (browseBtn) { browseBtn.classList.add('hidden'); browseBtn.classList.remove('inline-flex'); }
        if (showLessBtn) { showLessBtn.classList.remove('hidden'); showLessBtn.classList.add('flex'); }
      } else {
        if (browseBtn) { browseBtn.classList.remove('hidden'); browseBtn.classList.add('inline-flex'); }
        if (showLessBtn) { showLessBtn.classList.add('hidden'); showLessBtn.classList.remove('flex'); }
      }`;

const newRenderLogic = `// Only hide entire section when logged in AND showing all
      if (loggedIn && showingAll) {
        browseSection.style.display = 'none';
      } else {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }
      // Button visibility
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (showingAll) {
        if (browseBtn) { browseBtn.style.display = 'none'; }
        if (showLessBtn) { showLessBtn.style.display = 'flex'; }
      } else {
        if (browseBtn) { browseBtn.style.display = ''; }
        if (showLessBtn) { showLessBtn.style.display = 'none'; }
      }`;

c = c.replace(oldRenderLogic, newRenderLogic);
console.log('Fixed button visibility in renderPlants');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');