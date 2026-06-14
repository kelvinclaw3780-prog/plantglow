const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

const remaining = ['Show Less', 'Show More', 'Load More', 'View Less', 'View More', 'Browse All'];
for (const s of remaining) {
  const idx = h.indexOf('>' + s + '<');
  console.log(s + ':', idx >= 0 ? 'FOUND at ' + idx : 'not found');
  if (idx >= 0) {
    console.log('  Context:', JSON.stringify(h.substring(idx - 20, idx + s.length + 5)));
  }
}