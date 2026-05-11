// Test what actually works for the onclick encoding
const id = 'monstera';

// The original (broken) onclick in the file:
const broken = '<button onclick="handleToggleSave(\'\' + id + \'\')">';
console.log('Broken:', broken);
try { console.log('Broken result:', eval("'" + broken + "'")); } catch(e) { console.log('Broken error:', e.message); }

// What about using double quotes for the onclick attribute instead?
// Since JS string is single-quoted, double quotes inside don't need escaping
// But we still have '' which breaks things
const broken2 = '<button onclick="handleToggleSave(\'\' + id + \'\')">';
console.log('\nBroken2:', broken2);

// THE FIX: Use double quotes for onclick attribute AND single quotes inside
// But '' still terminates the string! We need to escape EACH single quote
// The fix: \' for each single quote we want as a literal character
// So onclick="func('' + x + '')" should become onclick="func(\'\' + x + \'\')"
// But when we write this in a single-quoted JS string, we need to escape the backslash too!
// So: \' becomes \\\' in the JS source string

// Correct JS string content for the onclick attribute containing '':
const correctFix = '<button onclick="handleToggleSave(\\\'\\\' + id + \\\'\\\')">';
console.log('\nCorrect fix:', correctFix);
try { console.log('Correct result:', eval("'" + correctFix + "'")); } catch(e) { console.log('Correct error:', e.message); }

// Let me just check the actual bytes in the file now
const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);
const btnIdx = c.indexOf("onclick=\"handleToggleSave");
const context = c.substring(btnIdx, btnIdx + 50);
console.log('\nActual file onclick:', JSON.stringify(context));
console.log('Char codes:', [...context].map(ch => ch.charCodeAt(0)));