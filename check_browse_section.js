const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find browse-all-section and the section AFTER plant-grid
const gridEnd = c.indexOf('id="plant-grid"');
console.log('Plant grid at:', gridEnd);
console.log('After grid (400 chars):');
console.log(JSON.stringify(c.substring(gridEnd + 100, gridEnd + 600)));

// Find the full browse section HTML
const browseIdx = c.indexOf('id="browse-all-section"');
console.log('\n\nFull browse section:');
console.log(JSON.stringify(c.substring(browseIdx - 50, browseIdx + 500)));