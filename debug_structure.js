const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check what's at 35577 - 2nd closing script tag
console.log('Around 35577 (2nd close):');
console.log(JSON.stringify(c.substring(35560, 35610)));

// At 35577 it says </script> then immediately at 35658 another </script>
// But at 35658 it shows lucide CDN close, then immediately at 35933 there's an OPEN script
// That means between 35658 and 35933 there must be content starting with <script>
// Let's check if there's a <script> tag in that range
const between = c.substring(35658, 35933);
console.log('\nBetween 35658 and 35933 (' + between.length + ' chars):');
console.log(between.substring(0, 100));
console.log('...');
console.log(between.substring(between.length - 50));

// Count total script tags
let pos = 0;
let idx = 0;
while (pos < c.length) {
  const open = c.indexOf('<script>', pos);
  const close = c.indexOf('</script>', pos);
  if (open === -1 && close === -1) break;
  
  if (open !== -1 && (close === -1 || open < close)) {
    console.log('\n' + idx + ': OPEN at', open);
    pos = open + 8;
  } else {
    console.log(idx + ': CLOSE at', close);
    pos = close + 9;
  }
  idx++;
}