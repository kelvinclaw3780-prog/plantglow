const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('Original length:', h.length);

// The problem: script tag at 17504 has a src="'+plant.img+'" attribute embedded in it
// This causes the browser to ignore the inline script content entirely

// Find the problematic src attribute inside script 3
const scriptStart = 17504;
const srcAttrIdx = h.indexOf('src="', scriptStart);
const srcAttrEnd = h.indexOf('"', srcAttrIdx + 5);
const srcAttrEnd2 = h.indexOf('">', srcAttrIdx);

console.log('Problematic src at:', srcAttrIdx, '-', srcAttrEnd2);
console.log('src value:', h.substring(srcAttrIdx, srcAttrEnd2 + 2));

// Remove the src attribute from the script tag
// The script tag starts at 17504 and is: <script> with no src
// But somewhere in the script content (NOT as an HTML attribute) there's a src attribute

// Let me find where this src= appears - is it inside the script content or as an HTML attribute?
// If it's inside the script content as part of a string like img src="..." then it's fine
// But if it's part of <script src="..."> then it breaks things

// Check what's RIGHT before the src="
console.log('\nBefore src=:', JSON.stringify(h.substring(srcAttrIdx - 30, srcAttrIdx)));

// Check if this src= is inside the HTML tag attributes or inside JS code
// The script tag at 17504 should be: <script>
// Let's find the > that closes this opening tag
const afterScriptOpen = h.indexOf('>', scriptStart);
console.log('Script opens at:', scriptStart, 'closes at:', afterScriptOpen);
console.log('Between <script and >:', JSON.stringify(h.substring(scriptStart, afterScriptOpen + 1)));

if (srcAttrIdx > afterScriptOpen) {
  console.log('src is INSIDE the script content (not an attribute) - might be OK');
} else {
  console.log('src is in the opening tag attributes - THIS IS THE BUG');
  console.log('It makes the browser load an external file and ignore inline content');
  
  // Remove this src attribute from the opening tag
  const srcAttrFull = h.substring(srcAttrIdx, srcAttrEnd2 + 2);
  console.log('Removing:', JSON.stringify(srcAttrFull));
  
  const fixed = h.substring(0, srcAttrIdx) + h.substring(srcAttrEnd2 + 2);
  fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', fixed, 'utf8');
  console.log('Fixed length:', fixed.length);
  console.log('Saved!');
}