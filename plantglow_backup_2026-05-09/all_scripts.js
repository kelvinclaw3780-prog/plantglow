const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Show ALL script tags precisely
let idx = 0;
while (true) {
  const open = html.indexOf('<script', idx);
  if (open === -1) break;
  const close = html.indexOf('</script>', open);
  const srcOpen = html.indexOf('src="', open);
  const srcClose = srcOpen !== -1 && srcOpen < close ? html.indexOf('"', srcOpen + 5) : -1;
  const src = srcOpen !== -1 && srcOpen < close ? html.substring(srcOpen + 5, srcClose) : null;
  const content = src === null ? html.substring(open, close + 9) : null;
  console.log('--- Script at', open, '---');
  console.log('  src:', src || '(inline)');
  console.log('  closes at:', close);
  if (content) {
    console.log('  content (first 100):', JSON.stringify(content.substring(0, 100)));
  }
  idx = close + 9;
}
