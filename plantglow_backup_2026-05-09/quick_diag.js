const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('File length:', h.length);

// Find all script tags
let idx = 0, s = 0;
while ((idx = h.indexOf('<script', idx)) !== -1 && s < 20) {
  const close = h.indexOf('</script>', idx);
  const srcM = h.indexOf('src="', idx);
  const srcAttr = srcM !== -1 && srcM < close ? h.substring(srcM + 5, h.indexOf('"', srcM + 5)) : null;
  const src = srcAttr || '(inline)';
  console.log('Script', s, '| pos:', idx, '| close:', close, '| src:', src.substring(0, 80));
  idx = close + 9;
  s++;
}

// Check lucide CDN link
const lucideIdx = h.indexOf('unpkg.com/lucide');
console.log('\nLucide CDN at:', lucideIdx);
if (lucideIdx !== -1) {
  console.log('Context:', h.substring(lucideIdx - 30, lucideIdx + 80));
}

// Check what's before the last script (the script that has the plantData)
const lastScript = h.lastIndexOf('<script>');
console.log('\nLast script tag at:', lastScript);
console.log('Chars before it:', JSON.stringify(h.substring(lastScript - 40, lastScript)));
console.log('Chars at it:', JSON.stringify(h.substring(lastScript, lastScript + 30)));

// Check if the last script tag has a src attribute
const nextSpace = h.indexOf(' ', lastScript + 8);
const nextGT = h.indexOf('>', lastScript);
console.log('After <script>:', JSON.stringify(h.substring(lastScript + 8, nextGT)));
if (h.substring(nextSpace, nextGT).includes('src=')) {
  console.log('WARNING: Last script tag has a src attribute!');
} else {
  console.log('Last script tag is inline - OK');
}

// Check the plant-grid element
const gridIdx = h.indexOf('id="plant-grid"');
console.log('\nplant-grid element at:', gridIdx);
console.log('Content:', JSON.stringify(h.substring(gridIdx - 50, gridIdx + 150)));