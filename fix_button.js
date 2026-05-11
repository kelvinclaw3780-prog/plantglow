const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current button onclick has handleToggleSave('' + id + '')
// We need to add event.stopPropagation()
const old = "onclick=\"handleToggleSave(\\'' + id + '\\')\"";
const newOnclick = "onclick=\"event.stopPropagation(); handleToggleSave(\\'' + id + '\\')\"";

const idx = c.indexOf(old);
console.log('Pattern found at:', idx);
if (idx !== -1) {
  c = c.replace(old, newOnclick);
  console.log('Fixed!');
} else {
  console.log('Pattern not found - checking raw bytes');
  // Check the actual bytes in the file
  const searchStr = 'handleToggleSave';
  let pos = 0;
  while ((pos = c.indexOf(searchStr, pos)) !== -1) {
    console.log('Found at', pos, ':', JSON.stringify(c.substring(pos - 20, pos + 60)));
    pos += 10;
  }
}

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