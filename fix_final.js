const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix all corrupted function names
h = h.replace(/showAll植物View/g, 'showAllPlantsView');
h = h.replace(/showAll植物\b/g, 'showAllPlants');
h = h.replace(/show登入Toast/g, 'showLoginToast');
h = h.replace(/render種植物/g, 'renderPlants');
h = h.replace(/handle接受/g, 'handleAccept');
h = h.replace(/handle拒絕/g, 'handleDecline');
h = h.replace(/open登入RequiredModal/g, 'openLoginRequiredModal');
h = h.replace(/close登入RequiredModal/g, 'closeLoginRequiredModal');

// Fix the nav link: on Chinese page it should say "EN" and go to index.html
// Currently it might still say "中文" or "EN" and link to wrong page
h = h.replace(
  /<a href="index-zh\.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">[\u4e00-\u9fff\uac00-\ud7af]+<\/a>/,
  '<a href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>'
);
// Also fix case where it already says EN but links to zh
h = h.replace(
  /<a href="index-zh\.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN<\/a>/,
  '<a href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>'
);

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixes applied');

// Verify
const orig = fs.readFileSync('plantglow/index.html', 'utf8');
const origFns = orig.match(/function \w+/g) || [];
const zhFns = h.match(/function \w+/g) || [];
const missing = origFns.filter(f => !zhFns.includes(f));
console.log('JS functions - ORIG:', origFns.length, 'ZH:', zhFns.length);
console.log('Missing:', missing.length === 0 ? 'None!' : missing);

// Check calls (not just definitions)
const calls = ['showAllPlantsView()', 'renderPlants()', 'showLoginToast()', 'openLoginRequiredModal()', 'closeLoginRequiredModal()'];
for (const c of calls) {
  console.log(h.includes(c) ? 'OK: ' + c : 'MISSING: ' + c);
}

// Check nav link
console.log(h.includes('href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>') ? 'OK: EN nav link' : 'MISSING: EN nav link');