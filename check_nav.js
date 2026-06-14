const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find nav section
const idx = h.indexOf('nav-blur');
console.log('nav-blur at:', idx);
if (idx >= 0) {
  console.log(h.substring(idx, idx + 800));
}

// Check for Blog and How It Works text
console.log('\n--- Blog in nav ---');
const blogIdx = h.indexOf('Blog');
console.log('Blog at:', blogIdx);
if (blogIdx >= 0) {
  console.log(JSON.stringify(h.substring(blogIdx - 30, blogIdx + 60)));
}

console.log('\n--- How It Works in nav ---');
const howIdx = h.indexOf('How It Works');
console.log('How It Works at:', howIdx);
if (howIdx >= 0) {
  console.log(JSON.stringify(h.substring(howIdx - 30, howIdx + 60)));
}

// Check for 部落格 and 如何運作
console.log('\n--- 部落格 ---');
const bIdx = h.indexOf('部落格');
console.log('部落格 at:', bIdx);
if (bIdx >= 0) {
  console.log(JSON.stringify(h.substring(bIdx - 30, bIdx + 60)));
}

console.log('\n--- 如何運作 ---');
const hIdx = h.indexOf('如何運作');
console.log('如何運作 at:', hIdx);
if (hIdx >= 0) {
  console.log(JSON.stringify(h.substring(hIdx - 30, hIdx + 60)));
}