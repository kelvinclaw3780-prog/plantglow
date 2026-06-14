const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== COMPREHENSIVE ENGLISH TEXT SCAN ===\n');

// Scan for any text between > and < that contains English letters
let pos = 0;
const results = [];
while (pos < h.length - 10) {
  const tagOpen = h.indexOf('>', pos);
  if (tagOpen < 0 || tagOpen > h.length - 10) break;
  const tagClose = h.indexOf('<', tagOpen + 1);
  if (tagClose < 0) break;
  
  const content = h.substring(tagOpen + 1, tagClose).trim();
  
  // Check if it's visible English text (not code, not attributes)
  const hasEnglish = /[A-Za-z]{3,}/.test(content);
  const hasChinese = /[\u4e00-\u9fff]/.test(content);
  const isCode = /^(id|class|style|onclick|href|src|data|type|placeholder)=/i.test(content);
  const isTag = /^[a-zA-Z]+/.test(content) && content.includes('=');
  const isScript = content.startsWith('//') || content.startsWith('*') || content.startsWith('/*');
  
  if (hasEnglish && !hasChinese && !isCode && !isTag && !isScript && content.length < 150 && content.length > 2) {
    results.push({ pos: tagOpen, content: content.substring(0, 80) });
  }
  
  pos = tagClose + 1;
  if (results.length > 100) break;
}

// Filter out false positives
const filtered = results.filter(r => {
  const c = r.content;
  // Skip common false positives
  if (c.includes('dataLayer') || c.includes('gtag') || c.includes('http') || 
      c.includes('tailwind') || c.includes('localStorage') || c.includes('console') ||
      c.includes('firebase') || c.includes('analytics') || c.includes('google') ||
      c.includes('2026') || c.includes('May') || c.includes('plantglow') ||
      c.includes('Cookie') || c.includes('cookie')) return false;
  // Skip technical terms
  if (c.includes('href=') || c.includes('src=') || c.includes('onclick=')) return false;
  return true;
});

console.log('Found', filtered.length, 'visible English text areas:');
filtered.forEach((r, i) => {
  console.log((i + 1) + '.', JSON.stringify(r.content), 'at pos', r.pos);
});

// Also scan for specific known English buttons/text
console.log('\n=== SPECIFIC BUTTON CHECKS ===');
const checks = [
  ['>Show Less<', 'Show Less'],
  ['>Show More<', 'Show More'],
  ['>Load More<', 'Load More'],
  ['>Browse All<', 'Browse All'],
  ['>My Favorites<', 'My Favorites'],
  ['>All Plants<', 'All Plants'],
  ['>Login<', 'Login'],
  ['>Logout<', 'Logout'],
  ['>Register<', 'Register'],
  ['>Sign Up<', 'Sign Up'],
  ['>Sign In<', 'Sign In'],
  ['>Submit<', 'Submit'],
  ['>Send<', 'Send'],
  ['>Close<', 'Close'],
  ['>Accept<', 'Accept'],
  ['>Decline<', 'Decline'],
  ['>Maybe later<', 'Maybe later'],
  ['>Terms<', 'Terms'],
  ['>Privacy<', 'Privacy'],
];

for (const [str, name] of checks) {
  const found = h.includes(str);
  if (found) console.log('[EN]', name, 'found at', h.indexOf(str));
}

// Check plant data area for English plant names
console.log('\n=== PLANT DATA CHECK ===');
const plantDataIdx = h.indexOf('var plantData');
if (plantDataIdx >= 0) {
  // Show first few plant names
  const area = h.substring(plantDataIdx, plantDataIdx + 2000);
  const nameMatches = area.match(/name: '([^']+)'/g) || [];
  console.log('First 5 plant names in data:');
  nameMatches.slice(0, 5).forEach((m, i) => console.log('  ' + (i+1) + '.', m));
}