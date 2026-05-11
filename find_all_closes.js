const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all </script> occurrences
let pos = 0;
let count = 0;
while ((pos = c.indexOf('</script>', pos)) !== -1) {
  console.log(`</script> at ${pos}:`, JSON.stringify(c.substring(pos - 20, pos + 30)));
  pos += 9;
  count++;
}
console.log('\nTotal:', count);