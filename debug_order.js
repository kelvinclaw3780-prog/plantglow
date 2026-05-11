const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

const gridIdx = c.indexOf('id="plant-grid"');
console.log('plant-grid div at:', gridIdx);
console.log('Content around plant-grid:', JSON.stringify(c.substring(gridIdx - 100, gridIdx + 200)));

// Check what comes after plant-grid
const afterGrid = c.indexOf('<!-- Plants rendered by JS -->', gridIdx);
console.log('Comment after grid at:', afterGrid);

// Check DOMContentLoaded
const domReady = c.indexOf("document.addEventListener('DOMContentLoaded'");
console.log('DOMContentLoaded at:', domReady);
console.log('Content:', JSON.stringify(c.substring(domReady, domReady + 300)));