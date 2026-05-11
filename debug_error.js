const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Extract main JS
const s1End = c.indexOf('</script>');
const s2Start = c.indexOf('<script>', s1End) + 8;
const s2End = c.indexOf('</script>', s2Start);
const mainJS = c.substring(s2Start, s2End);

console.log('Main JS length:', mainJS.length);
console.log('Has plantData:', mainJS.includes('var plantData'));
console.log('Has premium:', mainJS.includes('premium'));

// Try to find where the syntax error might be - look for common issues
// Check last 500 chars of plantData
const pdStart = mainJS.indexOf('var plantData');
const pdEnd = mainJS.indexOf('};', pdStart);
console.log('\nplantData ends at offset:', pdEnd);
const last200 = mainJS.substring(pdEnd - 200, pdEnd + 10);
console.log('Around plantData end:', JSON.stringify(last200));

// Try to find the issue using a simple parse approach
try {
  new Function(mainJS);
  console.log('\nSyntax: OK');
} catch(e) {
  console.log('\nSyntax ERROR:', e.message);
  console.log('Error position:', e.position);
  
  // Try to find the line number
  const lines = mainJS.substring(0, e.position).split('\n');
  console.log('Error on line approximately:', lines.length);
  
  // Show context around error
  const ctxStart = Math.max(0, e.position - 100);
  const ctxEnd = Math.min(mainJS.length, e.position + 100);
  console.log('Context:', JSON.stringify(mainJS.substring(ctxStart, ctxEnd)));
}