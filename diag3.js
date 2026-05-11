const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

const lines = scriptContent.split('\n');
console.log('Total lines:', lines.length);

// Show lines 1-15 (INIT calls are at the start)
console.log('\n--- First 15 lines ---');
for (let i = 0; i < 15; i++) {
  console.log(i + ':', lines[i]);
}

// Show lines around plantData def
console.log('\n--- Lines 195-205 ---');
for (let i = 195; i <= 205; i++) {
  if (lines[i]) console.log(i + ':', lines[i]);
}

// Now try to run just the INIT section first
const initSection = lines.slice(0, 12).join('\n');
console.log('\n--- INIT section (first 12 lines) ---');
console.log(initSection);
console.log('--- End INIT ---');

// Check if there's something BEFORE the script that's setting a variable name
// What if the PREVIOUS script tag (script 3) is outputting the literal text ' + plant.img + '?
// That would make the browser think that's part of the HTML and might not be the issue.

console.log('\n--- Checking HTML right before last <script> ---');
const beforeScript = html.substring(Math.max(0, lastScript - 100), lastScript);
console.log(JSON.stringify(beforeScript));

console.log('\n--- Checking what script 3 contains (17503 to 53029) ---');
const s3content = html.substring(17503, 53029 + 9);
console.log('Script 3 starts with:', JSON.stringify(s3content.substring(0, 100)));
console.log('Script 3 ends with:', JSON.stringify(s3content.substring(s3content.length - 100)));
console.log('Script 3 length:', s3content.length);
