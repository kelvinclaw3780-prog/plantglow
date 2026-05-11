const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Script 3: 17503 to 55448
// Script 4: 55462 to 91666
// What exactly is the content?

const s3 = html.substring(17503, 55448);
const s4 = html.substring(55462, 91666);

console.log('Script 3 (17503-55448) length:', s3.length);
console.log('Script 3 first 200 chars:', JSON.stringify(s3.substring(0, 200)));
console.log('Script 3 last 200 chars:', JSON.stringify(s3.substring(s3.length - 200)));

console.log('\nScript 4 (55462-91666) length:', s4.length);
console.log('Script 4 first 200 chars:', JSON.stringify(s4.substring(0, 200)));
console.log('Script 4 last 200 chars:', JSON.stringify(s4.substring(s4.length - 200)));
