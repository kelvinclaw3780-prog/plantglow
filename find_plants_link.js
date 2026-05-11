const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const idx = c.indexOf('<a href="#plants"');
console.log('First #plants link at:', idx);
console.log(JSON.stringify(c.substring(idx - 50, idx + 300)));

// Also look for the section after this button
const afterBtn = c.indexOf('</a>', idx);
console.log('\nAfter button:');
console.log(JSON.stringify(c.substring(afterBtn, afterBtn + 200)));