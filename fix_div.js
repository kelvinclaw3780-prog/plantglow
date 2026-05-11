const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator\plantglow\index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current broken handlePlantClick: \'\\' (backslash-backslash-quote in file)
// This evaluates to: \' in the onclick value
// We need: \' in file which evaluates to ' in onclick value

// Pattern in file: handlePlantClick(\'\\' + id + \'\\')
// Bytes: 92, 39, 92, 39
// We want: handlePlantClick(\' + id + \')
// Bytes: 92, 39, 32, 43, ...

// Fix: replace \'\\' (4 chars) with \'\' (2 chars?)
// No wait - we need to think about what we want:
// In the JS string: onclick="handlePlantClick('' + id + '')"
// When JS parses this string: onclick="handlePlantClick('' + id + '')"
// The expression '' + id + '' = id (empty string concat)
// So onclick = "handlePlantClick(monstera)" -- CORRECT!

// But in our JS string in the HTML file, to represent \'
// we need to write \\' (backslash backslash quote) to get \' in the result
// Wait no - in single-quoted JS string:
// \\\' = \\ (from \\\\) then \' (from \\') = \'  -- NO!

// In single-quoted JS string '...':
// \n = newline, \t = tab, \' = ', \\\\ = \\
// So to get \' in the final string value, write: \\\'  (3 chars: backslash, backslash, quote)
// Because: \\\ = \ (one backslash from \\\\) and \' = ' (from \'\'\\')

// Currently we have: \'\\' = \\\' in the file (4 chars: \ ' \ ')
// This evaluates to: \' (backslash + quote in the result)

// What we want: in the onclick attribute value we get: handlePlantClick(\'' + id + '\')
// Which means the JS string should be: handlePlantClick('' + id + '')
// But '' in JS string would end the string! So we need to escape.

// Correct JS string in file: handlePlantClick(\'' + id + '\')
// In the file: \'\'' (backslash-quote-quote-quote) -- wait that ends the string

// Let me just try replacing the broken pattern
const bad = String.fromCharCode(92,39,92,39); // \'\\' = \'
const good = String.fromCharCode(39,39); // '' = empty string

const pos = c.indexOf(bad);
console.log('Bad pattern at:', pos);
console.log('Bad pattern bytes:', [...bad].map(x => x));
console.log('Good pattern bytes:', [...good].map(x => x));

if (pos !== -1) {
  c = c.replace(bad, good);
  console.log('Replaced!');
}

// BUT WAIT - '' in JS string also means empty string, not two quotes
// We need: \' in the JS string to give us ' in the onclick value
// So: \\' in the file (2 chars: backslash + quote)

// Let me use bytes
const correct = String.fromCharCode(92,39); // \'
const idxCorrect = c.indexOf(correct);
console.log('\nCorrect pattern (\' ) at:', idxCorrect);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify
const idx1 = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2 + 8);
const js = c.substring(idx2 + 8, idx2e);
try {
  new Function(js);
  console.log('Syntax OK!');
} catch(e) {
  console.log('Syntax error:', e.message);
}