const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Find the https error
const httpsIdx = jsCode.indexOf("'https");
console.log("First single-quoted 'https at:", httpsIdx);
if (httpsIdx !== -1) {
  console.log('Context:', JSON.stringify(jsCode.substring(Math.max(0, httpsIdx - 50), httpsIdx + 100)));
}

// Also check for unclosed strings - find lines that end with content but don't have proper closing
const lines = jsCode.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Check if line has a string that looks unclosed
  const singleQuotes = (line.match(/'/g) || []).length;
  const doubleQuotes = (line.match(/"/g) || []).length;
  // If odd number of unescaped single quotes, might be an issue
  if (line.includes("'https") || line.includes("http://")) {
    console.log('\nLine', i + 1, ':', JSON.stringify(line.substring(0, 80)));
  }
}

// Find the actual error location
const errIdx = jsCode.indexOf("'https");
if (errIdx !== -1) {
  // Count braces up to this point
  let braces = 0;
  let inStr = false;
  let strChar = '';
  for (let i = 0; i < errIdx; i++) {
    const ch = jsCode[i];
    if (ch === '\\') { i++; continue; }
    if (!inStr && (ch === '"' || ch === "'" || ch === '`')) {
      inStr = true; strChar = ch;
    } else if (inStr && ch === strChar) {
      inStr = false;
    } else if (!inStr) {
      if (ch === '{') braces++;
      if (ch === '}') braces--;
    }
  }
  console.log('\nBrace balance at error:', braces);
}