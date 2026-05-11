const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all <script and </script> positions
let pos = 0;
let idx = 0;
while (pos < c.length) {
  const openIdx = c.indexOf('<script>', pos);
  if (openIdx === -1) break;
  const closeIdx = c.indexOf('</script>', openIdx + 8);
  if (closeIdx === -1) break;
  console.log(`Script block ${idx + 1}: open at ${openIdx}, close at ${closeIdx}, length ${closeIdx - openIdx - 8}`);
  console.log(`  Content start: ${c.substring(openIdx + 8, openIdx + 60).replace(/\n/g, ' ')}`);
  console.log(`  Content end: ${c.substring(closeIdx - 60, closeIdx).replace(/\n/g, ' ')}`);
  pos = closeIdx + 9;
  idx++;
}

console.log('\nTotal open tags:', (c.match(/<script>/g) || []).length);
console.log('Total close tags:', (c.match(/<\/script>/g) || []).length);

// Check if there's a third script tag (malformed)
const thirdOpen = c.indexOf('<script>', c.indexOf('</script>') + 9);
if (thirdOpen !== -1) {
  console.log('\nThird script tag found at:', thirdOpen);
  console.log(JSON.stringify(c.substring(thirdOpen, thirdOpen + 100)));
}