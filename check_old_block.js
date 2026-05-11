const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find VISIBLE_COUNT
const visIdx = c.indexOf('    var VISIBLE_COUNT = 10;');
console.log('VISIBLE_COUNT old block starts at:', visIdx);

// Find end of handleBrowseAll
const browseAllEndIdx = c.indexOf('function handleBrowseAll() {');
const afterBrowseAll = c.indexOf('    }', browseAllEndIdx + 30);
console.log('handleBrowseAll end } at:', afterBrowseAll);

// Show the old block
const oldBlock = c.substring(visIdx, afterBrowseAll + 4);
console.log('\nOld block to be replaced:');
console.log('Length:', oldBlock.length);
console.log('Ends with:', JSON.stringify(oldBlock.substring(oldBlock.length - 50)));