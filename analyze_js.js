const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Extract main JS
const idx1 = c.indexOf('<script>');
const afterFirst = c.indexOf('</script>', idx1 + 8);
const idx2 = c.indexOf('<script>', afterFirst);
const idx2end = c.indexOf('</script>', idx2 + 8);
const jsCode = c.substring(idx2 + 8, idx2end);

// Count brackets
const openBraces = (jsCode.match(/\{/g) || []).length;
const closeBraces = (jsCode.match(/\}/g) || []).length;
const openParens = (jsCode.match(/\(/g) || []).length;
const closeParens = (jsCode.match(/\)/g) || []).length;
console.log('Braces: { =', openBraces, '} =', closeBraces, '| diff:', openBraces - closeBraces);
console.log('Parens: ( =', openParens, ') =', closeParens, '| diff:', openParens - closeParens);

// Check for function duplicates
const funcMatches = jsCode.match(/function (\w+)\(/g) || [];
const funcCounts = {};
funcMatches.forEach(m => { funcCounts[m] = (funcCounts[m] || 0) + 1; });
Object.entries(funcCounts).forEach(([k, v]) => {
  if (v > 1) console.log('DUPLICATE function:', k, 'count:', v);
});
if (Object.values(funcCounts).every(v => v === 1)) console.log('No duplicate functions');

// Check for VISIBLE_COUNT occurrences
const visMatches = jsCode.match(/VISIBLE_COUNT/g) || [];
console.log('\nVISIBLE_COUNT occurrences:', visMatches.length);

// Check for renderPlants occurrences
const rpMatches = jsCode.match(/function renderPlants/g) || [];
console.log('renderPlants occurrences:', rpMatches.length);

// Check for handleBrowseAll occurrences
const baMatches = jsCode.match(/function handleBrowseAll/g) || [];
console.log('handleBrowseAll occurrences:', baMatches.length);