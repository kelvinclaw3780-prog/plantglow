// Test different escaping patterns for onerror with URL
const tests = [
  // Current file pattern (broken)
  { name: "current broken", code: "'onerror=\"this.src=\\\\\\'https://x.com\\\\\\'\">'"}, 
  // Proper escape - using \' for the URL quotes  
  { name: "proper escape", code: "'onerror=\"this.src=\\'https://x.com\\'\">'"},
  // Using double quotes inside single-quoted string (no escaping needed for ")
  { name: "double quotes attr", code: "'onerror=\"this.src=\\'https://x.com\\'\">'"},
];

tests.forEach(t => {
  console.log('\n=== Test:', t.name, '===');
  console.log('Code:', JSON.stringify(t.code));
  try {
    const result = eval(t.code);
    console.log('Result:', result);
  } catch(e) {
    console.log('Error:', e.message);
  }
});

// Let's also check what the original working code used
const fs = require('fs');
const orig = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow_backup_2026-05-09/index.html', 'utf8');
const origIdx = orig.indexOf('onerror');
if (origIdx !== -1) {
  const origSection = orig.substring(origIdx, origIdx + 100);
  console.log('\n\nOriginal file onerror:', JSON.stringify(origSection));
}