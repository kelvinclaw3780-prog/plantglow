const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// The pattern handlePlantClick('' + id + '') is at position
// We need to replace the '' with \' in both places

// Find the exact position
const hpc = "handlePlantClick('' + id + '')";
const hts = "handleToggleSave('' + id + '')";

const hpcIdx = c.indexOf(hpc);
const htsIdx = c.indexOf(hts);

console.log('handlePlantClick at:', hpcIdx);
console.log('handleToggleSave at:', htsIdx);

if (hpcIdx !== -1) {
  const before = c.substring(0, hpcIdx);
  const after = c.substring(hpcIdx + hpc.length);
  c = before + "handlePlantClick(\\'\\' + id + \\'\\')" + after;
  console.log('Fixed handlePlantClick!');
}

if (htsIdx !== -1) {
  // Need to re-find since c changed
  const newHtsIdx = c.indexOf(hts);
  if (newHtsIdx !== -1) {
    const before = c.substring(0, newHtsIdx);
    const after = c.substring(newHtsIdx + hts.length);
    c = before + "handleToggleSave(\\'\\' + id + \\'\\')" + after;
    console.log('Fixed handleToggleSave!');
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');

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
  console.log('Error:', e.message);
}