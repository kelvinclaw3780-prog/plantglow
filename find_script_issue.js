const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all <script> and </script> positions
const scripts = [];
let pos = 0;
while (pos < c.length) {
  const openPos = c.indexOf('<script>', pos);
  if (openPos === -1) break;
  const closePos = c.indexOf('</script>', openPos);
  if (closePos === -1) break;
  scripts.push({ start: openPos, end: closePos, content: c.substring(openPos + 8, closePos) });
  pos = closePos + 9;
}

console.log('Found', scripts.length, 'script blocks');
scripts.forEach((s, i) => {
  console.log(`Script ${i+1}: ${s.content.length} chars`);
  console.log(`  Starts: ${s.content.substring(0, 80).replace(/\n/g, ' ')}`);
  console.log(`  Ends: ...${s.content.substring(s.content.length - 80).replace(/\n/g, ' ')}`);
});

// Check if there's HTML in script 2
if (scripts.length >= 2) {
  const s2 = scripts[1];
  const htmlIndex = s2.content.indexOf('<');
  if (htmlIndex !== -1) {
    console.log('\nHTML found in script 2 at position:', htmlIndex);
    console.log('Context:', JSON.stringify(s2.content.substring(htmlIndex - 20, htmlIndex + 50)));
  }
}