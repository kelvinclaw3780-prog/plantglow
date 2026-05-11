const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Show current onerror section
const onerrorIdx = c.indexOf('onerror');
const section = c.substring(onerrorIdx, onerrorIdx + 80);
console.log('Current section:', JSON.stringify(section));

// The issue: the URL has unescaped single quotes breaking the JS string
// Pattern in file: onerror="this.src=\\\\'https://...
// After all my fixes, it should be: onerror="this.src=\'https://...

// But clearly the escaping isn't right. Let me just find what we actually have
// and manually fix it.
const lineStart = c.lastIndexOf("return '", onerrorIdx);
const lineEnd = c.indexOf("';", onerrorIdx);
const returnStmt = c.substring(lineStart, lineEnd + 2);
console.log('\nReturn statement snippet:');
console.log(returnStmt.substring(0, 400));

// Find the onerror part
const onerrInReturn = returnStmt.indexOf('onerror');
console.log('\nonerror in return at offset:', onerrInReturn);
console.log('Content:', JSON.stringify(returnStmt.substring(onerrInReturn, onerrInReturn + 100)));