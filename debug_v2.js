const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const parts = c.split('<script>');
console.log('Parts:', parts.length);
parts.forEach((p, i) => console.log(i + ': ' + p.substring(0, 70).replace(/\n/g, ' ') + '...'));

// Check the positions
console.log('\nScript positions in file:');
let pos = 0;
let scriptIdx = 0;
while (pos < c.length) {
  const openIdx = c.indexOf('<script>', pos);
  const closeIdx = c.indexOf('</script>', pos);
  
  if (openIdx === -1 && closeIdx === -1) break;
  
  if (openIdx !== -1 && (closeIdx === -1 || openIdx < closeIdx)) {
    console.log(`OPEN <script> at ${openIdx}`);
    pos = openIdx + 8;
  } else {
    console.log(`CLOSE </script> at ${closeIdx}`);
    pos = closeIdx + 9;
  }
}