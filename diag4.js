const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

console.log('Script length:', scriptContent.length);
console.log('Line count:', scriptContent.split('\n').length);

// Split by lines and check if line 74 in the served script corresponds to plantData lookup
const lines = scriptContent.split('\n');
console.log('\nLine 74:', lines[73]);
console.log('Line 200:', lines[199]);
console.log('Line 201:', lines[200]);

// Now check: the REAL problem might be that there's ANOTHER script before this one
// that's outputting content that interferes. Script 3 says src="' + plant.img + '"
// That means script 3 is the OLD broken script from the template literal issue!
// Let me check what script 3 is exactly

console.log('\n--- About script 3 ---');
const s3content = html.substring(17504, 53029 + 9);
console.log('Script 3 first 200 chars:', JSON.stringify(s3content.substring(0, 200)));
console.log('Script 3 src attribute:', JSON.stringify(html.substring(html.indexOf('src="', 17504), html.indexOf('"', html.indexOf('src="', 17504) + 5))));

// The problem: Script 3's src is literally ' + plant.img + '
// This means this script tag has src="' + plant.img + '"
// But a script tag with src doesn't execute its inline content!
// So script 3 with src="' + plant.img + '" would try to load a file called "' + plant.img + '"
// That would fail, and the inline content (which IS our code!) would be ignored!

console.log('\n--- HYPOTHESIS ---');
console.log('Script 3 has src="' + plant.img + '" which is NOT a valid URL');
console.log('The browser loads this external "file" (which fails)');
console.log('The inline content of script 3 (our code) is IGNORED');
console.log('Script 4 then runs normally');

console.log('\n--- Checking if inline scripts with src get executed ---');
// According to HTML spec: if a script tag has src, inline content is ignored
// So script 3 tries to load ' + plant.img + ' as a JS file, it fails, and our code never runs!

console.log('\nSolution: Remove the src attribute from script 3');
// Find where the src attribute is
const srcAttrIdx = html.indexOf('src="', html.indexOf('<script', 17504));
const srcAttrEnd = html.indexOf('">', srcAttrIdx);
console.log('src attr at:', srcAttrIdx, 'to', srcAttrEnd);
console.log('src attr:', JSON.stringify(html.substring(srcAttrIdx, srcAttrEnd + 2)));
