const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check current state of onerror
const idx = c.indexOf('onerror');
const snippet = c.substring(idx - 10, idx + 80);
console.log('onerror snippet:', JSON.stringify(snippet));
console.log('Has \\\\\\\\', snippet.includes('\\\\'));

// The onerror currently has: onerror="this.src=\\\\'https://
// The \\\\' in the file evaluates to \\' in the JS string value
// But we need \\' in the JS string value to get \' in the onclick attribute value
// Wait, we need to understand what we want:

// GOAL: onclick attribute should be: onerror="this.src='https://...'"
final onclick: onerror="this.src='https://...'"
// The URL has single quotes around it (for the HTML attribute value)

// IN THE JS STRING:
// We have a single-quoted JS string: '...'
// Inside it, we want: onerror="this.src='https://...'"
// So: onerror="this.src=' is outside the URL quotes
// 'https://...' is the URL
// '..."> ends the URL and closes

// In a single-quoted JS string:
// - \' is just ' (escaped single quote)
// - ' by itself ends the string

// So to get onclick value of: onerror="this.src='https://...'"
We need the JS string to contain: onerror="this.src=\'https://...\'"
// \' inside the JS string becomes ' in the final onclick value

// So the JS string should have: onerror="this.src=\'https://...\'"
// In our file, we currently have: onerror="this.src=\\\\'https://
// \\\\' = \\ (from \\\\) then \\' (from \\'\\') = \\' 
// So the JS string value is: onerror="this.src=\\'https://
// But that gives onclick: onerror="this.src=\'https://" <-- broken!

// What we need is: onerror="this.src=\'https://..." with a properly closed URL
// The pattern in the JS string should be: onerror="this.src=\\'https://...\\'"
// When JS parses: \\' = ' and \' = '
// So: onerror="this.src=\' becomes onerror="this.src='
// And: ...\\'"> becomes ...'>  (the HTML attr closes)

// Current file has: onerror="this.src=\\\\'https://  (wrong!)
// This evaluates to: onerror="this.src=\\'https:// (wrong!)

// FIX: Change \\\\' to \\\' (remove one backslash)
// In the file: onerror="this.src=\\\\\\'  -> onerror="this.src=\\'
// \\\\\\' (4 chars) = \\ (from \\\\) then \\' = \\' (but we want \' actually...)

// Actually: in the file, \\\\\' = \\\\ (2 backslashes) then \' = \' 
// So \\\\' in file = \\' in JS string value

// What we need: onerror="this.src=\'  (2 chars: \ and ')
// In the file we need: \\\'  (3 chars: \\\' in source)
// In the file we currently have: \\\\\' (4 chars: \\\\\' in source)


// So the fix is: remove one backslash before each quote
// Current: \\\\\\' -> Should be: \\\'

let pos = c.indexOf("onerror=\"this.src=\\\\\\'");
console.log('Found bad pattern at:', pos);
if (pos !== -1) {
  c = c.replace(/\x5C{3}'/g, "\\'"); // Replace \\\' with \'
  console.log('Fixed!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify
const idx2 = c.indexOf('onerror');
const snippet2 = c.substring(idx2 - 10, idx2 + 80);
console.log('\nNew onerror snippet:', JSON.stringify(snippet2));