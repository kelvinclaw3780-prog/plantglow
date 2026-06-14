const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');
h = h.replace(/<html lang="en">/, '<html lang="zh-Hant">');
fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('lang fixed to zh-Hant');

// Check a few key strings
const checks = ['園藝變得更簡單', '熱門植物', '部落格', '如何運作', '瀏覽全部', '我的最愛'];
for (const s of checks) {
  console.log(h.includes(s) ? 'OK: ' + s : 'MISSING: ' + s);
}