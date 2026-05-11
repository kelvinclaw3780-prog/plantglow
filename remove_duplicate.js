const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find and remove the OLD duplicate closeMobileMenu that uses classList
// The old one is at position 27780 and uses classList.add('hidden')
const oldDuplicate = `function closeMobileMenu() {
      document.getElementById('mobile-menu').classList.add('hidden');
      var overlay = document.getElementById('mobile-menu-overlay');
      if (overlay) overlay.classList.add('hidden');
    }

    function closePlantModal`;

const newDuplicate = `function closePlantModal`;

if (c.indexOf(oldDuplicate) !== -1) {
  c = c.replace(oldDuplicate, newDuplicate);
  console.log('Removed duplicate closeMobileMenu function');
} else {
  console.log('Pattern not found, trying alternative...');
  // Find the second closeMobileMenu definition and remove it
  const idx1 = c.indexOf('function closeMobileMenu()');
  const after1 = c.indexOf('\n    }', c.indexOf('function closeMobileMenu()', idx1 + 50)) + 5;
  const remaining = c.substring(after1);
  const idx2 = remaining.indexOf('function closeMobileMenu()');
  if (idx2 !== -1) {
    const endOfSecond = remaining.indexOf('\n    }', idx2 + 50) + 5;
    const secondDef = remaining.substring(idx2, idx2 + endOfSecond);
    if (secondDef.includes('classList')) {
      c = c.replace(secondDef, '');
      console.log('Removed second closeMobileMenu that used classList');
    }
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');