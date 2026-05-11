const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);

// Find basil's problems line and premium line
const basilIdx = main.indexOf('basil: {');
const basilSection = main.substring(basilIdx, basilIdx + 600);

console.log('Basil section raw:');
console.log(basilSection);

// Check if there's a comma after the premium string
const premiumLineEnd = main.indexOf('basil: {') + basilSection.indexOf('basil rewards you all summer long.');
const afterPremium = main.charAt(premiumLineEnd + 1);
console.log('\nChar after premium string:', JSON.stringify(main.charAt(premiumLineEnd)), '(' + main.charCodeAt(premiumLineEnd + 1) + ')');
console.log('Next 10 chars:', JSON.stringify(main.substring(premiumLineEnd + 1, premiumLineEnd + 15)));