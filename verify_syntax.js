const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

try {
  new Function(jsCode);
  console.log('SYNTAX OK - No errors!');
} catch (e) {
  console.log('SYNTAX ERROR:', e.message);
  // Show lines near the error
  const lines = jsCode.split('\n');
  const posMatch = e.message.match(/at position (\d+)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1]);
    const lineNum = jsCode.substring(0, pos).split('\n').length;
    console.log('Error near line', lineNum, 'of JS');
    console.log('Lines around error:');
    for (let i = Math.max(0, lineNum - 5); i < Math.min(lines.length, lineNum + 3); i++) {
      console.log((i + 1) + ': ' + lines[i]);
    }
  }
}