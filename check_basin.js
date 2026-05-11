const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const main = c.substring(50337, 71265);

// Check the last plant (basil) area
const basilIdx = main.indexOf('basil: {');
if (basilIdx !== -1) {
  // Show the basil section from name to closing brace
  const basilSection = main.substring(basilIdx, basilIdx + 800);
  console.log('Basil section:');
  console.log(basilSection.substring(0, 500));
  console.log('...');
  console.log(basilSection.substring(basilSection.length - 200));
}

// Also check the line BEFORE basil to make sure there's no trailing comma issue
const beforeBasil = main.substring(basilIdx - 150, basilIdx);
console.log('\nBefore basil:');
console.log(JSON.stringify(beforeBasil));