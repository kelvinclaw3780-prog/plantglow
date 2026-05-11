const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check syntax more carefully
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);

try {
  new Function(js);
  console.log('Syntax OK');
} catch(e) {
  console.log('Error:', e.message);
  console.log('Position:', e.position);
  console.log('Around error:', JSON.stringify(js.substring(e.position - 50, e.position + 50)));
}