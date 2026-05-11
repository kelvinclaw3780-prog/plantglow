const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the JS section
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Find the premium strings - check for issues
// Look for the mint/basil area around JS line 420
const lines = jsCode.split('\n');
console.log('Lines 415-425:');
for (let i = 414; i <= 424; i++) {
  console.log((i + 1) + ': ' + lines[i]);
}

// Try parsing progressively - find exact error location
let errorPos = -1;
try {
  new Function(jsCode);
  console.log('\nNo syntax errors!');
} catch (e) {
  console.log('\nError:', e.message);
  // Find where the error might be by testing line by line
  // Actually let's try binary search approach
  let start = 0;
  let end = jsCode.length;
  let lastGood = -1;
  
  for (let i = 0; i < jsCode.length; i++) {
    try {
      new Function(jsCode.substring(0, i));
      lastGood = i;
    } catch(e2) {
      if (e2.message !== e.message) continue;
      if (i - lastGood > 100) {
        console.log('\nError likely between chars', lastGood, 'and', i);
        console.log('Around:', JSON.stringify(jsCode.substring(lastGood, i)));
        break;
      }
    }
  }
}