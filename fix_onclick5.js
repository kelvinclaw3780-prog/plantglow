const fs = require('fs');
let c = fs.readFileSync('C:/Users\kelvi\.openclaw\workspace-appcreator\plantglow\index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// What the file currently has for the onclick button:
const currentBtnOnclick = 'onclick="handleToggleSave(\'\\\' + id + \\\')"'; 
// Wait, let me find the actual bytes
const btnIdx = c.indexOf('handleToggleSave('' + id');
console.log('Found at:', btnIdx);
console.log('Current:', JSON.stringify(c.substring(btnIdx - 10, btnIdx + 60)));

// What we need:
// In the file's JS string (which is single-quoted), we need to escape the '' inside onclick
// '' in the file means: '' (empty string concat) - WRONG
// We need: \' in the file, which JS interprets as: ' (single quote char)
// So the fix is to replace '' with \' in the file's JS string

// But here's the tricky part: the file contains \' (4 chars: \ ' \ ') from my previous fix
// We need to change \'\' to \'

// Actually, let me just find and replace the exact broken pattern
// Pattern in file: \'\\' (4 chars: \ ' \ ') followed later by \'\\' (4 chars)
// This came from my bad replacement

// Let me just look at the raw bytes
const section = c.substring(btnIdx - 5, btnIdx + 60);
console.log('\nSection chars:');
for (let i = 0; i < section.length; i++) {
  process.stdout.write(section[i] === '\' ? "'" : section[i] === '\\' ? '\\' : section[i]);
}
console.log('\nSection JSON:', JSON.stringify(section));

// The fix: in the JS string, we need \' (backslash-single-quote) for each literal quote
// Current: \'\\' + id + \'\\'  (these came from my \\'\\' replacement - wrong)
// Should be: \\\'\\\' + id + \\\'\\\'
// When JS evaluates: \\\'\\\' becomes: \' (backslash + quote)

console.log('\n--- What we need ---');
console.log('In JS string: \\\'\\\' should become \' (backslash + quote in final onclick)');
console.log('But actually we want onclick to have: func(\'\' + id + \'\')');
console.log('So in the file JS string: func(\\\'\\\' + id + \\\'\\\')');

// Let me try a different approach: use hex replace
const hexBad = Buffer.from("handleToggleSave('' + id + '')").toString('hex');
const hexContext = Buffer.from(c.substring(btnIdx, btnIdx + 50)).toString('hex');
console.log('\nhandleToggleSave hex:', hexBad);
console.log('Context hex:', hexContext.substring(0, 80));