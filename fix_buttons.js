const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find and replace the "All Plants" button text specifically
const allPlantsIdx = h.indexOf('All Plants');
console.log('All Plants found at:', allPlantsIdx);
if (allPlantsIdx >= 0) {
  console.log('Context:', JSON.stringify(h.substring(allPlantsIdx - 50, allPlantsIdx + 60)));
}

// Replace "All Plants" button label (NOT the JS function name)
// The button is: <i data-lucide="layout-grid" class="w-4 h-4"></i>\n              All Plants\n
// We want: <i data-lucide="layout-grid" class="w-4 h-4"></i>\n              全部植物\n
const btn1 = '<i data-lucide="layout-grid" class="w-4 h-4"></i>\n              All Plants\n';
const btn1zh = '<i data-lucide="layout-grid" class="w-4 h-4"></i>\n              全部植物\n';
if (h.includes(btn1)) {
  h = h.split(btn1).join(btn1zh);
  console.log('Replaced All Plants button');
} else {
  console.log('btn1 pattern not found, checking raw...');
  // Try with \r\n
  const btn1crlf = btn1.replace(/\n/g, '\r\n');
  console.log('btn1crlf found?', h.includes(btn1crlf));
}

const favIdx = h.indexOf('My Favorites');
console.log('My Favorites found at:', favIdx);
if (favIdx >= 0) {
  console.log('Context:', JSON.stringify(h.substring(favIdx - 50, favIdx + 60)));
}

// Replace "My Favorites" button label
const btn2 = '<i data-lucide="heart" class="w-4 h-4"></i>\n              My Favorites\n';
const btn2zh = '<i data-lucide="heart" class="w-4 h-4"></i>\n              我的最愛\n';
if (h.includes(btn2)) {
  h = h.split(btn2).join(btn2zh);
  console.log('Replaced My Favorites button');
} else {
  console.log('btn2 pattern not found');
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Done');

// Verify
console.log('Has全部植物?', h.includes('全部植物'));
console.log('Has 我的最愛?', h.includes('我的最愛'));
console.log('Has showAllPlantsView?', h.includes('showAllPlantsView'));
console.log('Has renderPlants?', h.includes('renderPlants'));