const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

const idx = h.indexOf('id="privacy-popup"');
console.log('Privacy popup at:', idx);
if (idx >= 0) {
  console.log('\nPrivacy popup content (first 800 chars):');
  console.log(h.substring(idx, idx + 800));
}