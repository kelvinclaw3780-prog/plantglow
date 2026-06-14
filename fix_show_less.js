const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix Show Less button
h = h.split('>Show Less<').join('>顯示更少<');

// Fix any other remaining English in visible content
// Check for "Show More" variations
const showMoreIdx = h.indexOf('>Show More<');
console.log('Show More:', showMoreIdx >= 0 ? 'FOUND' : 'not found');

// Check for Browse All variations
const browseAllIdx = h.indexOf('>Browse All<');
console.log('Browse All:', browseAllIdx >= 0 ? 'FOUND' : 'not found');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('\nFixed. Has Show Less?', h.includes('>Show Less<'));
console.log('Has 顯示更少?', h.includes('>顯示更少<'));