const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the plantData section and check for trailing commas
const pdStart = c.indexOf('var plantData = {');
const pdEnd = c.indexOf('};', pdStart);
const pd = c.substring(pdStart, pdEnd + 2);

// Find last few plants
const lastPlants = pd.slice(-2000);
console.log('Last part of plantData:', JSON.stringify(lastPlants.slice(0, 500)));

// Check for double commas or trailing commas
const doubleComma = pd.match(/,,/g);
console.log('Double commas:', doubleComma ? doubleComma.length : 0);

const trailingComma = pd.match(/,\s*}/g);
console.log('Trailing commas before }:', trailingComma ? trailingComma.length : 0);

// Check around the removed premium sections
const afterRemoval = pd.indexOf('problems:');
console.log('\nAround last plant problems:');
console.log(JSON.stringify(pd.slice(afterRemoval, afterRemoval + 300)));