const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix mobile nav Blog link
// Find the pattern: <a href="#blog" ...>Blog</a> in mobile nav
const blogIdx = h.indexOf('>Blog</a>');
console.log('Blog in mobile nav at:', blogIdx);
if (blogIdx >= 0) {
  console.log('Context:', JSON.stringify(h.substring(blogIdx - 80, blogIdx + 30)));
}

// The mobile nav has "Blog" as a link text
// Replace in context of mobile nav
h = h.split('>Blog</a>').join('>部落格</a>');

// Fix mobile nav "How It Works"
h = h.split('>How It Works</a>').join('>如何運作</a>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('\nFixes applied');

// Verify
console.log('Has 部落格?', h.includes('部落格'));
console.log('Has 如何運作 in nav?', h.includes('>如何運作</a>'));
console.log('Has Blog in nav?', h.includes('>Blog</a>'));
console.log('Has How It Works in nav?', h.includes('>How It Works</a>'));