const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find and remove the Explore Plants button with exact pattern
const exploreBtn = `<a href="#plants" class="fade-up delay-200 inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-forest-200/60 hover:bg-forest-700">
      <i data-lucide="leaf" class="w-5 h-5"></i>
      Explore Plants
    </a>`;

if (c.indexOf(exploreBtn) !== -1) {
  c = c.replace(exploreBtn, '');
  console.log('Removed Explore Plants button');
} else {
  // Try finding and removing just the anchor tag
  const start = c.indexOf('<a href="#plants"');
  const end = c.indexOf('</a>', start) + 4;
  if (start !== -1 && end !== -1) {
    c = c.substring(0, start) + c.substring(end);
    console.log('Removed Explore Plants button (by tag)');
  } else {
    console.log('Could not find button');
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');