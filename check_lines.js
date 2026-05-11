const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);
const lines = main.split('\n');

// Show lines around 298-310
console.log('Lines 298-310:');
for (let i = 297; i <= 309; i++) {
  console.log(`Line ${i+1}: ${JSON.stringify(lines[i])}`);
}

// Check what's AFTER the main JS block
console.log('\nAfter main JS (at 71265-71300):');
console.log(JSON.stringify(c.substring(71265, 71300)));

// Check if there's an extra </script> inside the JS
const extraScriptStart = main.indexOf('<script');
if (extraScriptStart !== -1) {
  console.log('\n<script found inside main JS at:', extraScriptStart);
  console.log(JSON.stringify(main.substring(extraScriptStart, extraScriptStart + 100)));
}