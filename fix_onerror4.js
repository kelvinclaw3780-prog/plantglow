const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The onerror URL pattern in the JS string has unescaped single quotes
// Current broken: ...onerror="this.src='https://...
// Fix: escape the quotes around the URL: ...onerror="this.src=\'https://...\'"

// But we also have the issue of \' in JS string = ' which still breaks
// What we actually need: onclick value contains src='https://...'
// In single-quoted JS string, to get \' we need \\\'

// But let me try the simpler approach: just escape ALL single quotes in renderPlantCard
// Find renderPlantCard function and fix its return statement

const rpcStart = c.indexOf("function renderPlantCard(id, plant)");
const rpcEnd = c.indexOf("function renderPlants");
const rpcContent = c.substring(rpcStart, rpcEnd);

console.log('renderPlantCard function length:', rpcContent.length);

// Find the onerror in the return statement
const onerrorStart = rpcContent.indexOf('onerror="this.src=');
console.log('\nFirst onerror in renderPlantCard:');
console.log(rpcContent.substring(onerrorStart, onerrorStart + 100));

// Fix: in the JS string, we need to escape all single quotes with \'
// The pattern: onerror="this.src='https://..."
// Should become: onerror="this.src=\'https://...\'"

// But we also need to escape the closing quote after .com'
// Pattern after .com: ...crop\'">' should be ...crop\'\''>
// Actually let's just do a simple replacement for all onerror src patterns

// In the return statement, the onerror URL is: 'https://images.unsplash.com/...'
// Each ' needs to be escaped as \'
// So: 'https:// becomes \='https:// and .com\' becomes .com\'

// Let's replace all onerror patterns in the JS
// Find: onerror="this.src=\'https://
let count = 0;
let pos = 0;
while ((pos = c.indexOf("onerror=\"this.src=\'", pos)) !== -1) {
  console.log('Found at:', pos);
  c = c.replace("onerror=\"this.src=\'", "onerror=\"this.src=\\\\'");
  count++;
  pos += 20;
}
console.log('Fixed start quotes:', count);

// Now fix the ending quotes - pattern: .com\'">' should be .com\\\'\'">'
count = 0;
pos = 0;
while ((pos = c.indexOf("com\\'\\'>", pos)) !== -1) {
  console.log('Found ending at:', pos);
  c = c.replace("com\\'\\'>", "com\\\\'\\'>");
  count++;
  pos += 10;
}
console.log('Fixed end quotes:', count);

// Actually let me just check what's in the file now
const idx = c.indexOf('onerror');
console.log('\nCurrent onerror:', JSON.stringify(c.substring(idx, idx + 60)));

// Verify syntax
try {
  const idx1 = c.indexOf('<script>');
  const afterFirst = c.indexOf('</script>', idx1 + 8);
  const idx2 = c.indexOf('<script>', afterFirst);
  const idx2end = c.indexOf('</script>', idx2 + 8);
  const jsCode = c.substring(idx2 + 8, idx2end);
  new Function(jsCode);
  console.log('\nSyntax OK!');
} catch(e) {
  console.log('\nSyntax error:', e.message);
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');