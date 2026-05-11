const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator\plantglow\index.html', 'utf8');

// Look for any code that might clear or modify plant-grid after initial render
const lines = c.split('\n');
let inScript = false;
let scriptNum = 0;
lines.forEach((line, i) => {
  if (line.includes('<script>')) inScript = true;
  if (line.includes('</script>')) inScript = false;
  if (inScript && line.includes('plant-grid')) {
    console.log('Line', i + 1, ':', line.trim().substring(0, 120));
  }
});