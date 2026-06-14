const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

const oldStr = 'Login / Register';
const newStr = '登入 / 註冊';
const idx = h.indexOf(oldStr);
console.log('Found at:', idx);
if (idx >= 0) {
  console.log('Context:', JSON.stringify(h.substring(idx - 20, idx + 50)));
}

// Replace
h = h.split(oldStr).join(newStr);
console.log('Replaced');

fs.writeFileSync('plantglow/index-zh.html', h);
console.log('Has Login / Register?', h.includes(oldStr));
console.log('Has 登入 / 註冊?', h.includes(newStr));