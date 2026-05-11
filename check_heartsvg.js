const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the current renderPlantCard and replace the heart icon section
// First let's see what we have now
const idx = c.indexOf('heartSvg');
console.log('heartSvg found at:', idx);
if (idx !== -1) {
  console.log(JSON.stringify(c.substring(idx - 100, idx + 400)));
}

// Find the button that uses heartSvg
const btnIdx = c.indexOf("'" + heartSvg + "'");
console.log('\nheartSvg usage at:', btnIdx);

// Let's find the renderPlantCard function and see the full structure
const rpIdx = c.indexOf("function renderPlantCard");
console.log('\nrenderPlantCard at:', rpIdx);
if (rpIdx !== -1) {
  console.log(JSON.stringify(c.substring(rpIdx, rpIdx + 800)));
}