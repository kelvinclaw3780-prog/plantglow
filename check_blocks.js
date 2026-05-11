const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

const lines = scriptContent.split('\n');
console.log('Total lines:', lines.length);

// Try to pinpoint the exact problem - maybe it's the \r\n line endings
// Count non-empty lines and check for unclosed blocks

let inBlock = false;
let blockType = '';
let bracketCount = 0;
let curlyCount = 0;
let parenCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].replace(/\r$/, ''); // remove trailing \r
  if (!line.trim()) continue;
  
  for (let j = 0; j < line.length; j++) {
    const c = line[j];
    if (c === '{') { bracketCount++; inBlock = true; }
    else if (c === '}') { bracketCount--; if (bracketCount < 0) { console.log('Unmatched } at line', i+1, ':', line.substring(0,50)); bracketCount = 0; } }
    else if (c === '(') parenCount++;
    else if (c === ')') parenCount--;
  }
  
  // Check for lines that look like they start a new top-level statement after an unclosed block
  if (i < 5 || i > 195) {
    const startsWithFunction = /^\s*function\s+\w+/.test(line);
    const startsWithVar = /^\s*var\s+\w+/.test(line);
    const startsWithConst = /^\s*const\s+\w+/.test(line);
    const isComment = /^\s*\/\//.test(line);
    
    if ((startsWithFunction || startsWithVar || startsWithConst) && bracketCount > 0 && !isComment) {
      console.log('WARNING: Statement starts at line', i+1, 'but block not closed. Block depth:', bracketCount);
      console.log('  Line:', line.substring(0, 60));
    }
  }
}

console.log('Final bracket depth:', bracketCount);
console.log('Final paren depth:', parenCount);

// Also check if plantData object is properly closed
const plantDataStart = lines.findIndex(l => l.includes('var plantData'));
const plantDataEnd = lines.findLastIndex(l => l.trim() === '};');
console.log('plantData starts at line:', plantDataStart + 1, 'ends at line:', plantDataEnd + 1);
console.log('Lines between:', plantDataEnd - plantDataStart);

// Try to see if there's an issue with the premium string content
// Check if any premium string contains a premature ;
for (let i = plantDataStart; i <= plantDataEnd; i++) {
  const line = lines[i].replace(/\r$/, '');
  // Look for premium strings that might have issues
  if (line.includes('premium:')) {
    // Find the premium value
    const match = line.match(/premium:\s*["'](.*)/);
    if (match) {
      console.log('Premium line', i+1, ':', match[1].substring(0, 80));
    }
  }
}
