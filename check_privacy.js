const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('privacy-popup:', c.includes('id="privacy-popup"'));
console.log('openPrivacyPopup:', c.includes('function openPrivacyPopup'));
console.log('footer privacy link:', c.includes('openPrivacyPopup()'));
console.log('privacy-popup class:', c.match(/privacy-popup.*?class="[^"]*hidden/)?.[0] || 'not found');