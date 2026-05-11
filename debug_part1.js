const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const parts = c.split('<script>');

// Check part 1 (tailwind config) - has </script> at 682
console.log('Part 1 content (first 200):');
console.log(parts[1].substring(0, 200).replace(/\n/g, ' '));

// Check what's between position 1437 and 15151
console.log('\nBetween close of script 1 (1437) and open of script 2 (15151):');
console.log(JSON.stringify(c.substring(1437, 1450)));

// Check around 15151
console.log('\nAround 15151:');
console.log(JSON.stringify(c.substring(15140, 15180)));

// Check around 35577 (end of script 2)
console.log('\nAround 35577:');
console.log(JSON.stringify(c.substring(35560, 35610)));

// Check around 35658 - 2nd close tag
console.log('\nAround 35658:');
console.log(JSON.stringify(c.substring(35648, 35690)));