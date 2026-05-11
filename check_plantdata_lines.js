const fs = require('fs');
const plantData = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/plantdata_check.js', 'utf8');
const lines = plantData.split('\n');

console.log('Last 10 lines:');
for (let i = lines.length - 10; i < lines.length; i++) {
  console.log(`Line ${i+1}: ${JSON.stringify(lines[i])}`);
}

// Try to find the issue - check for unusual characters
console.log('\nSearching for issues...');

// Check for the problem - look at the raw bytes around the end
const last200 = plantData.substring(plantData.length - 200);
console.log('\nLast 200 chars:');
console.log(JSON.stringify(last200));