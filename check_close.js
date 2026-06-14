const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the Close button
const idx = h.indexOf('font-weight:500;">Close</button>');
console.log('Close button at:', idx);
if (idx >= 0) {
  console.log(h.substring(idx - 200, idx + 100));
}

// Find all Close buttons
let closeIdx = h.indexOf('>Close</button>');
while (closeIdx >= 0) {
  console.log('\nClose at:', closeIdx, JSON.stringify(h.substring(closeIdx - 30, closeIdx + 40)));
  closeIdx = h.indexOf('>Close</button>', closeIdx + 1);
}