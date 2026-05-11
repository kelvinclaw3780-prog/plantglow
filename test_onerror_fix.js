const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix: change the onerror pattern to use double quotes for the onclick attribute
// Current: onclick="this.src=\'https://...'  (single-quoted JS string, \' just gives a quote char)
// Problem: after src=', the URL ' breaks out

// Solution: use double-quoted onclick attribute, so ' inside doesn't break JS string
// Change: onerror="this.src=\'https://...\' to onerror="this.src='https://...' (double quotes outside)

// But wait - we use single-quoted JS string for the whole return value
// In single-quoted JS string, double quotes don't need escaping
// So: 'onerror="this.src='https://...'" works because:
// - ' starts the JS string
// - onerror="this.src= is part of the string
// - ' starts a single-quoted substring
// - https://... is a bare word? NO - it's not!

// Actually 'https://...' is a string literal inside the JS string
// 'onerror="this.src=' is the start of the JS string
// https:// is a bare word/expression separator? No...

// Let me test the exact pattern
const test1 = "'onerror=\"this.src='https://example.com'\">'";
console.log('Test 1 (double quotes attr, single quote inside):');
console.log('Result:', test1);
console.log('Chars:', test1.length);

// Evaluate it
try {
  const result = eval(test1);
  console.log('Evaluated:', result);
} catch(e) {
  console.log('Error:', e.message);
}

// The issue might be the colon after the URL
const test2 = "'onerror=\"this.src='https://'\">'";
console.log('\nTest 2:');
try {
  const result = eval(test2);
  console.log('Evaluated:', result);
} catch(e) {
  console.log('Error:', e.message);
}

// What if we just don't use quotes in the onerror URL at all? Use double-quoted string inside?
// No wait - the URL needs quotes in the HTML attribute

// Let me think again - in a JS single-quoted string:
// 'onerror="this.src='https://...'"'
// The first ' starts the string
// The second ' after src= ends the string prematurely!

// So the correct way to have a single-quoted URL in the onerror attribute is:
// 'onerror="this.src=\'https://...\'"'  -- but \' is just ' in the final string!
// Which gives: onerror="this.src='https://...'" -- still breaks the JS string!

// Unless... we use double-quoted JS strings? But our whole function uses single quotes.

// OH WAIT. The solution is to use template literals or escape properly.
// Actually: 'onerror="this.src=\'https://...\'' -- the \' gives us ' in the result
// So: onerror="this.src='https://...'" -- the outer " for onclick attr, inner ' for the URL
// This should work! Because the ' in the URL is inside the " " of the onclick attribute

console.log('\n--- Test with proper escaping ---');
const test3 = '<div onerror="this.src=\'https://example.com\'">';
console.log('Test 3 string:', test3);
try {
  const r = eval("'" + test3 + "'");
  console.log('Result:', r);
} catch(e) {
  console.log('Error:', e.message);
}

// OR use double quotes for onclick attribute and put the URL with single quotes inside
const test4 = '<div onerror="this.src=\'https://example.com\'">';
console.log('\nTest 4:', test4);

// Actually let me just look at what we have in the file now
const idx = c.indexOf('onerror');
console.log('\nCurrent file onerror:', JSON.stringify(c.substring(idx, idx + 60)));