const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';

// Read the file and check encoding integrity
const buf = fs.readFileSync(path);
const html = buf.toString('utf8');

console.log('File size:', buf.length);
console.log('UTF-8 decoded length:', html.length);

// Find script boundaries
const tailwindEnd = html.indexOf('</script>', html.indexOf('tailwind.config'));
const lucideEnd = html.indexOf('</script>', tailwindEnd + 1);
const mainScriptStart = lucideEnd + '</script>'.length;
const mainScriptEnd = html.lastIndexOf('</script>');

console.log('Script start:', mainScriptStart, 'Script end:', mainScriptEnd);
console.log('Script length:', mainScriptEnd - mainScriptStart);

// Check for non-ASCII in the script
let badChars = [];
for (let i = 0; i < html.length; i++) {
  const c = html.charCodeAt(i);
  if (c > 127 && i >= mainScriptStart && i < mainScriptEnd) {
    const ctx = html.substring(Math.max(0, i-20), i+20);
    badChars.push({pos: i, char: html[i], code: c.toString(16), context: ctx.replace(/\n/g,'\\n')});
    if (badChars.length >= 10) break;
  }
}

console.log('First 10 non-ASCII chars in script:', JSON.stringify(badChars, null, 2));
