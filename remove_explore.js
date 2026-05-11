const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find and remove the Explore Plants button
const exploreBtn = `<a href="#plants" class="fade-up delay-200 inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-forest-700 transition shadow-lg shadow-forest-200/60">
      <i data-lucide="leaf" class="w-5 h-5"></i>
      Explore Plants
    </a>`;

if (c.indexOf(exploreBtn) !== -1) {
  c = c.replace(exploreBtn, '');
  console.log('Removed Explore Plants button');
} else {
  console.log('Explore Plants button pattern not found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');