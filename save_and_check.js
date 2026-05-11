const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);

// Save to temp file
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/temp_check.js', js);
console.log('Saved to temp_check.js');

// Try running node --check on it
const { execSync } = require('child_process');
try {
  execSync('node --check "C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/temp_check.js"', { encoding: 'utf8' });
  console.log('Syntax OK');
} catch(e) {
  console.log('Error:', e.stdout || e.message);
}