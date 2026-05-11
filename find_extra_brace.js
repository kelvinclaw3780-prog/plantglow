const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Find the extra closing brace by tracing brace balance
let balance = 0;
let inString = false;
let stringChar = '';
let escape = false;

for (let i = 0; i < jsCode.length; i++) {
  const ch = jsCode[i];
  
  if (escape) {
    escape = false;
    continue;
  }
  
  if (ch === '\\' && inString) {
    escape = true;
    continue;
  }
  
  if (!inString && (ch === '"' || ch === "'" || ch === '`')) {
    inString = true;
    stringChar = ch;
    continue;
  }
  
  if (inString && ch === stringChar) {
    inString = false;
    continue;
  }
  
  if (!inString) {
    if (ch === '{') balance++;
    if (ch === '}') balance--;
    if (balance < 0) {
      // Found the extra }
      console.log('Extra } found at position:', i);
      const before = jsCode.substring(Math.max(0, i - 100), i);
      const after = jsCode.substring(i + 1, i + 100);
      console.log('Before:', JSON.stringify(before));
      console.log('After:', JSON.stringify(after));
      console.log('Line number:', jsCode.substring(0, i).split('\n').length);
      break;
    }
  }
}

if (balance >= 0) {
  console.log('No extra } found, balance ended at:', balance);
}