const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Try to find where the invalid token is by progressively testing
// Binary search approach
let lo = 0;
let hi = jsCode.length;
let lastGood = -1;

while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  try {
    new Function(jsCode.substring(0, mid));
    lastGood = mid;
    lo = mid + 1;
  } catch(e) {
    hi = mid;
  }
}

// Now lastGood is the longest valid prefix
console.log('Valid prefix length:', lastGood);
console.log('Next 100 chars:', JSON.stringify(jsCode.substring(lastGood, lastGood + 100)));

// Find the line number
const lines = jsCode.substring(0, lastGood).split('\n');
console.log('Line number:', lines.length);
console.log('Error at line:', lines[lines.length - 1]);

// Show surrounding context
const allLines = jsCode.split('\n');
const errLine = lines.length;
console.log('\nContext around error:');
for (let i = Math.max(0, errLine - 2); i < Math.min(allLines.length, errLine + 3); i++) {
  console.log((i + 1) + ': ' + allLines[i]);
}