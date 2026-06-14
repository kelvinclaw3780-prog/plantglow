const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix corrupted function names
h = h.replace(/showAll植物View/g, 'showAllPlantsView');
h = h.replace(/showAll植物/g, 'showAllPlants');
h = h.replace(/show登入Toast/g, 'showLoginToast');

// Fix the nav link - on Chinese page, link to EN version
// The link currently says "中文" and links to "index-zh.html" - should say "EN" and link to "index.html"
h = h.replace(
  /<a href="index-zh\.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">中文<\/a>/,
  '<a href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>'
);

// Also check for hreflang links
h = h.replace(
  /<link rel="alternate" hreflang="zh-Hant" href="https:\/\/plantglow\.net\/index-zh\.html">/g,
  '<link rel="alternate" hreflang="zh-Hant" href="https://plantglow.net/index-zh.html">'
);

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed corrupted function names and nav link');

// Verify
const checks = ['showAllPlantsView', 'showAllPlants', 'showLoginToast'];
for (const s of checks) {
  console.log(h.includes(s) ? 'OK: ' + s : 'MISSING: ' + s);
}

// Check nav EN link
console.log(h.includes('href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>') ? 'OK: EN nav link' : 'MISSING: EN nav link');