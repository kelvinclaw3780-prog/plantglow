const fs = require('fs');
let h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('File length:', h.length);

// The file has mojibake characters that we need to fix manually
// Let's find and replace them by looking at what byte sequences they represent

// Check: the title says "PlantGlow â€" Your Personal Plant Advisor"
// In correct UTF-8, the em dash — is encoded as: E2 80 94
// If it was written as Windows-1252, â€ would be: E2 80 9C (left double quote in UTF-8)
// Let me look at the actual bytes in the file

// First, let's see what characters are actually in the file near 'title'
const titleIdx = h.indexOf('<title>');
const titleContent = h.substring(titleIdx, titleIdx + 100);
console.log('Title area:', JSON.stringify(titleContent));

// Find the em dash problem - search for â€"
const emDashIdx = h.indexOf('â€"');
console.log('\nâ€" found at:', emDashIdx);
if (emDashIdx !== -1) {
  console.log('Context:', JSON.stringify(h.substring(emDashIdx - 30, emDashIdx + 30)));
}

// Find the emoji problem - search for ðŸŒ¿
const emojiIdx = h.indexOf('ðŸŒ¿');
console.log('\nðŸŒ¿ found at:', emojiIdx);
if (emojiIdx !== -1) {
  console.log('Context:', JSON.stringify(h.substring(emojiIdx - 30, emojiIdx + 30)));
}

// Now let's replace them directly
let count = 0;
let result = '';

// Do manual replacements
const fixes = [
  ['â€"', '—'],
  ['ðŸŒ¿', '🌿'],
];

for (const [wrong, right] of fixes) {
  let pos = 0;
  let c = 0;
  while ((pos = h.indexOf(wrong, pos)) !== -1) {
    c++;
    pos += wrong.length;
  }
  console.log('\n' + JSON.stringify(wrong) + ' found', c, 'times');
  h = h.split(wrong).join(right);
}

// Verify the fixes
console.log('\nAfter fix:');
console.log('Title:', h.substring(titleIdx, titleIdx + 100));
const emojiCheck = h.indexOf('🌿');
console.log('🌿 at:', emojiCheck, '| ðŸŒ¿ at:', h.indexOf('ðŸŒ¿'));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', h, 'utf8');
console.log('\nSaved!');