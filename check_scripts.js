const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find all script tags
let pos = 0;
let scriptNum = 0;
while ((pos = c.indexOf('<script>', pos)) !== -1) {
  const end = c.indexOf('</script>', pos);
  const start = pos + 8;
  const content = c.substring(start, end);
  console.log(`Script ${scriptNum + 1}: ${content.length} chars`);
  try {
    new Function(content);
    console.log(`  Syntax: OK`);
  } catch(e) {
    console.log(`  Syntax: ERROR - ${e.message}`);
    // Find the script content around error
    console.log(`  Around error:`, JSON.stringify(content.substring(Math.max(0, e.position - 50), e.position + 50)));
  }
  pos = end + 9;
  scriptNum++;
}

// Check for any unclosed script tags
const scriptOpenCount = (c.match(/<script>/g) || []).length;
const scriptCloseCount = (c.match(/<\/script>/g) || []).length;
console.log('\nOpen script tags:', scriptOpenCount);
console.log('Close script tags:', scriptCloseCount);