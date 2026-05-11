const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

const lines = jsCode.split('\n');
// Show lines 155-185
console.log('JS lines 155-185:');
for (let i = 154; i <= 184; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}