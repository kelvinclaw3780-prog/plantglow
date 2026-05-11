const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Remove "space matching" from description
c = c.replace('All-in-one plant database with care guides, space matching, and growing tips', 'All-in-one plant database with care guides and growing tips');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done - removed space matching from description');

// Verify
console.log('\nNew meta description:');
const descIdx = c.indexOf('name="description"');
console.log(JSON.stringify(c.substring(descIdx, descIdx + 200)));