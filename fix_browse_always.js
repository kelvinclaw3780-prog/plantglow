const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Always show browse section (with Browse All button) regardless of login status
// The handleBrowseAll will check login and either show modal or expand
const oldLogic = `// Hide browse section if logged in (they see all by default), unless browsing
      if (loggedIn && !showingAll) {
        browseSection.style.display = 'none';
      } else if (!loggedIn || showingAll) {
        browseSection.style.display = '';
        if (!showingAll) browseText.textContent = 'Browse all ' + plantIds.length + ' plants';
      }`;

const newLogic = `// Always show browse section with Browse All button
      browseSection.style.display = '';
      browseText.textContent = 'Browse all ' + plantIds.length + ' plants';`;

c = c.replace(oldLogic, newLogic);
console.log('1. Always show browse section');

// Also update the button visibility in renderPlants to always show Browse All and hide Show Less by default
const oldBtnLogic = `// Button visibility
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (showingAll) {
        if (browseBtn) { browseBtn.style.display = 'none'; }
        if (showLessBtn) { showLessBtn.style.display = 'flex'; }
      } else {
        if (browseBtn) { browseBtn.style.display = ''; }
        if (showLessBtn) { showLessBtn.style.display = 'none'; }
      }`;

const newBtnLogic = `// Button visibility - always show Browse All, only show Show Less when showingAll
      var browseBtn = document.getElementById('browse-btn');
      var showLessBtn = document.getElementById('show-less-btn');
      if (browseBtn) { browseBtn.style.display = ''; }
      if (showLessBtn) { showLessBtn.style.display = showingAll ? 'flex' : 'none'; }`;

c = c.replace(oldBtnLogic, newBtnLogic);
console.log('2. Fixed button visibility to always show Browse All');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');