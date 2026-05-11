const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const opens = (c.match(/<script>/g) || []).length;
const closes = (c.match(/<\/script>/g) || []).length;
console.log('Opens:', opens, 'Closes:', closes);

// Check each script block
let pos = 0;
let scriptIdx = 0;
while (pos < c.length) {
  const openIdx = c.indexOf('<script>', pos);
  const closeIdx = c.indexOf('</script>', pos);
  
  if (openIdx === -1 && closeIdx === -1) break;
  
  if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
    console.log(`Script ${scriptIdx}: OPEN at ${openIdx}`);
    pos = openIdx + 8;
  } else {
    console.log(`Script ${scriptIdx}: CLOSE at ${closeIdx}, next content: ${JSON.stringify(c.substring(closeIdx + 9, closeIdx + 50)).replace(/\\n/g, ' ')}`);
    pos = closeIdx + 9;
  }
  scriptIdx++;
}