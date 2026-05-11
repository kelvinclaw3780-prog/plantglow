const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('File length:', html.length);

// Show all script tags
let idx = 0, count = 0;
while ((idx = html.indexOf('<script', idx)) !== -1 && count < 10) {
  const close = html.indexOf('</script>', idx);
  const srcS = html.indexOf('src="', idx);
  const srcE = srcS !== -1 && srcS < close ? html.indexOf('"', srcS + 5) : -1;
  const src = srcS !== -1 && srcS < close ? html.substring(srcS + 5, srcE) : '(inline)';
  console.log('Script', count, '| open at:', idx, '| close at:', close, '| src:', src.substring(0, 60));
  idx = close + 9;
  count++;
}

console.log('\n--- Checking char codes around 91660-91680 ---');
for (let i = 91660; i <= 91680; i++) {
  console.log('  pos', i, ':', html.charCodeAt(i), JSON.stringify(html[i]));
}

console.log('\n--- Char codes around 55448-55470 ---');
for (let i = 55448; i <= 55470; i++) {
  console.log('  pos', i, ':', html.charCodeAt(i), JSON.stringify(html[i]));
}

console.log('\n--- Last script open/close check ---');
const lastScript = html.lastIndexOf('<script>');
const close1 = html.indexOf('</script>', lastScript + 9);
console.log('Last <script> at:', lastScript, 'first </script> after at:', close1);
console.log('Content between:', JSON.stringify(html.substring(lastScript + 9, close1)).substring(0, 100));
console.log('After first close:', JSON.stringify(html.substring(close1 + 9, close1 + 50)));
