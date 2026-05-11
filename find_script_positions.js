const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all <script and </script> precisely
let pos = 0;
let scriptNum = 0;
while (pos < c.length) {
  const openIdx = c.indexOf('<script>', pos);
  const closeIdx = c.indexOf('</script>', pos);
  
  if (openIdx === -1 && closeIdx === -1) break;
  
  if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
    console.log(`Open <script> at ${openIdx}`);
    pos = openIdx + 8;
    scriptNum++;
  } else {
    console.log(`Close </script> at ${closeIdx}`);
    pos = closeIdx + 9;
  }
}

console.log('\nTotal script open tags:', (c.match(/<script>/g) || []).length);
console.log('Total script close tags:', (c.match(/<\/script>/g) || []).length);