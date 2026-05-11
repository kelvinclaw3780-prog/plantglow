const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the full return statement of renderPlantCard
const idx = c.indexOf("return '<div class=\"plant-card");
console.log('Card return:');
console.log(JSON.stringify(c.substring(idx, idx + 1000)));

// Check if there are any script errors or issues
// Look for the script tag boundaries
const scriptStart = c.indexOf('<script>', c.indexOf('tailwind.config'));
const scriptEnd = c.indexOf('</script>', scriptStart);
console.log('\n\nScript section from tailwind to first script end:');
console.log(JSON.stringify(c.substring(scriptStart, scriptEnd + 20)));