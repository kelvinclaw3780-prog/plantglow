const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);
try {
  new Function(main);
  console.log('SYNTAX OK');
} catch(e) {
  console.log('ERROR:', e.message);
  console.log('Pos:', e.position);
  const lines = main.substring(0, e.position).split('\n');
  console.log('Line:', lines.length);
  
  // Show context
  const ctxStart = Math.max(0, e.position - 50);
  const ctxEnd = Math.min(main.length, e.position + 100);
  console.log('Context:', JSON.stringify(main.substring(ctxStart, ctxEnd)));
}