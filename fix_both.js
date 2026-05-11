const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Fix 1: The div onclick for handlePlantClick - fix escaped quotes
// Current (broken): handlePlantClick(\'\' + id + \'\')
// Should be: handlePlantClick(\'' + id + '\')
const old1 = "handlePlantClick('' + id + '')";
const new1 = "handlePlantClick(\\'\\' + id + \\'\\')";
const idx1 = c.indexOf(old1);
console.log('Fix 1 (handlePlantClick) at:', idx1);
if (idx1 !== -1) {
  c = c.replace(old1, new1);
  console.log('Fixed handlePlantClick!');
} else {
  console.log('handlePlantClick pattern not found');
}

// Fix 2: Make heart red when saved, white when not
// Current: fill="' + (isSaved ? 'currentColor' : 'none') + '"
// Should be: fill="' + (isSaved ? 'red' : 'white') + '"
const old2 = "fill=\"' + (isSaved ? 'currentColor' : 'none') + '\"";
const new2 = "fill=\"' + (isSaved ? '#ef4444' : '#ffffff') + '\"";
const idx2 = c.indexOf(old2);
console.log('\nFix 2 (heart color) at:', idx2);
if (idx2 !== -1) {
  c = c.replace(old2, new2);
  console.log('Fixed heart color!');
} else {
  console.log('Heart color pattern not found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');

// Verify syntax
const idx1s = c.indexOf('<script>');
const af = c.indexOf('</script>', idx1s + 8);
const idx2s = c.indexOf('<script>', af);
const idx2e = c.indexOf('</script>', idx2s + 8);
const js = c.substring(idx2s + 8, idx2e);
try {
  new Function(js);
  console.log('\nSyntax OK!');
} catch(e) {
  console.log('\nSyntax error:', e.message);
}