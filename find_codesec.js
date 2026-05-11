const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find code-section and phone-section
console.log('phone-section:', c.indexOf('phone-section'));
console.log('code-section:', c.indexOf('code-section'));
console.log('code-section hidden:', c.includes('id="code-section" class="hidden"'));

// Find where the show/hide happens
const showCodeIdx = c.indexOf('code-section');
if (showCodeIdx !== -1) {
  console.log('\nAround code-section (200 chars after):');
  console.log(JSON.stringify(c.substring(showCodeIdx, showCodeIdx + 200)));
}

// Find all JS references to code-section
let pos = 0;
console.log('\nAll code-section JS references:');
while ((pos = c.indexOf('code-section', pos)) !== -1) {
  console.log('At', pos, ':', JSON.stringify(c.substring(pos - 30, pos + 60)));
  pos++;
}