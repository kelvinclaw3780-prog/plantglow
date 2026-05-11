const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Find the syntax error
try {
  new Function(jsCode);
  console.log('No syntax errors!');
} catch (e) {
  console.log('Error:', e.message);
  // Try to find the issue by splitting into lines and trying progressively
  const lines = jsCode.split('\n');
  // Find lines near the end that might have issues
  for (let i = lines.length - 20; i < lines.length; i++) {
    console.log((i + 1) + ': ' + JSON.stringify(lines[i]));
  }
}