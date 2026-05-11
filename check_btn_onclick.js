const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the card button onclick
const idx = c.indexOf("button onclick=\"' + onclick + '\"");
console.log('Button onclick:');
console.log(JSON.stringify(c.substring(idx - 200, idx + 200)));

// Find the onclick variable declaration
const onclickIdx = c.indexOf("onclick = isLoggedIn");
console.log('\nonclick variable declaration:');
console.log(JSON.stringify(c.substring(onclickIdx, onclickIdx + 300)));