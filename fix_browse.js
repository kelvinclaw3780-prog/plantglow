const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

const testStr = 'Browse all ';
console.log('Contains "Browse all "?', h.includes(testStr));
console.log('Index:', h.indexOf(testStr));
console.log('Context:', JSON.stringify(h.substring(h.indexOf(testStr) - 5, h.indexOf(testStr) + 30)));

// Replace
h = h.split('Browse all ').join('瀏覽全部 ');
h = h.split(' plants</span>').join(' 種植物</span>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Done');
console.log('Has 瀏覽全部?',h.includes('瀏覽全部'));
const idx = h.indexOf('browse-all-text');
console.log('Button text:', JSON.stringify(h.substring(idx, idx + 60)));