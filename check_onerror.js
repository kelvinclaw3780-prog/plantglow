const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the img src with onerror
const imgIdx = c.indexOf("onerror=\"this.src='");
console.log('img onerror at:', imgIdx);
const imgSnippet = c.substring(imgIdx, imgIdx + 120);
console.log('Snippet:', JSON.stringify(imgSnippet));

// The issue: in the JS string, we have onerror="this.src='https://...'"
// This means the JS string contains: onerror="this.src='
// The ' before https needs to be escaped in the JS string

// What the file should have: onerror="this.src=\'https://...\'"
// So that when evaluated, the onclick attribute is: onerror="this.src='https://...'"

console.log('\n--- Checking if onerror is properly escaped ---');
const goodOnerror = "onerror=\"this.src=\\'https://";
const badOnerror = "onerror=\"this.src='https://";
console.log('Has good onerror:', c.includes(goodOnerror));
console.log('Has bad onerror:', c.includes(badOnerror));

// Show all onerror occurrences
let pos = 0;
let count = 0;
while ((pos = c.indexOf('onerror=', pos)) !== -1 && count < 5) {
  console.log('\nonerror at:', pos);
  console.log('Context:', JSON.stringify(c.substring(pos, pos + 80)));
  pos++;
  count++;
}