const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09/index.html', 'utf8');

// Find the first premium occurrence
const idx = c.indexOf('premium:');
console.log('First premium at:', idx);
console.log(JSON.stringify(c.substring(idx - 30, idx + 100)));

// Check how many chars from premium: to the comma after the string
const stringStart = idx + 'premium: "'.length;
const stringEnd = c.indexOf('"', stringStart);
console.log('\nString starts at:', stringStart);
console.log('String ends at:', stringEnd);
console.log('String:', c.substring(stringStart, stringEnd).substring(0, 50));

// Check what comes after the closing quote
console.log('\nAfter string:', JSON.stringify(c.substring(stringEnd, stringEnd + 20)));

// Look at the actual bytes around premium
const before = c.substring(idx - 50, idx);
const after = c.substring(stringEnd + 1, stringEnd + 20);
console.log('\nBefore premium:', JSON.stringify(before));
console.log('After quote:', JSON.stringify(after));