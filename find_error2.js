const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS and check syntax error
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

try {
  new Function(jsCode);
  console.log('Syntax OK!');
} catch(e) {
  console.log('Error:', e.message);
  // Find the position
  const posMatch = e.message.match(/at position (\d+)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1]);
    const lineNum = jsCode.substring(0, pos).split('\n').length;
    console.log('Error at JS line:', lineNum);
    const lines = jsCode.split('\n');
    for (let i = Math.max(0, lineNum - 3); i < Math.min(lines.length, lineNum + 2); i++) {
      console.log((i + 1) + ': ' + lines[i]);
    }
  }
}