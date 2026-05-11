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
  console.log(`Script ${scriptNum + 1}: ${content.length} chars, starts: ${content.substring(0, 50).replace(/\n/g, ' ')}`);
  try {
    new Function(content);
    console.log(`  Syntax: OK`);
  } catch(e) {
    console.log(`  Syntax: ERROR - ${e.message}`);
    console.log(`  Error at: ${JSON.stringify(content.substring(e.position - 30, e.position + 30))}`);
  }
  pos = end + 9;
  scriptNum++;
}