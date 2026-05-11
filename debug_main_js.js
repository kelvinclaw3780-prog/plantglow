const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check script at 50337 - this should be the main JS based on file length
const mainStart = 50337;
const mainEnd = 71265;
console.log('Main script block: ' + mainStart + ' to ' + mainEnd);
console.log('Length:', mainEnd - mainStart);

// Check for </script> inside the main JS
const mainJS = c.substring(mainStart, mainEnd);
const scriptInJS = mainJS.indexOf('</script>');
console.log('\n</script> inside main JS:', scriptInJS);

if (scriptInJS !== -1) {
  console.log('Context:', JSON.stringify(mainJS.substring(scriptInJS - 50, scriptInJS + 50)));
}

// Extract just the JS part between the first <script> and its closing </script>
const firstScriptStart = c.indexOf('<script>', 0) + 8;
const firstScriptClose = c.indexOf('</script>', firstScriptStart);
console.log('\nFirst script tag block: ' + firstScriptStart + ' to ' + firstScriptClose);
const firstJS = c.substring(firstScriptStart, firstScriptClose);
console.log('First JS length:', firstJS.length);
console.log('First 80 chars:', firstJS.substring(0, 80).replace(/\n/g, ' '));

// Check second script tag
const secondScriptStart = c.indexOf('<script>', firstScriptClose) + 8;
const secondScriptClose = c.indexOf('</script>', secondScriptStart);
console.log('\nSecond script tag block: ' + secondScriptStart + ' to ' + secondScriptClose);
const secondJS = c.substring(secondScriptStart, secondScriptClose);
console.log('Second JS length:', secondJS.length);

// Count how many <script> tags total
const splitResult = c.split('<script>');
console.log('\nTotal <script> split count:', splitResult.length - 1);