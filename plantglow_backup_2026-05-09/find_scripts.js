const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find ALL script tags
let idx = 0;
let count = 0;
while ((idx = html.indexOf('<script', idx)) !== -1) {
  const end = html.indexOf('>', idx);
  const srcMatch = html.indexOf('src="', idx);
  const srcEnd = srcMatch !== -1 && srcMatch < end ? html.indexOf('"', srcMatch + 5) : -1;
  const src = srcMatch !== -1 && srcMatch < end ? html.substring(srcMatch + 5, srcEnd) : '(inline)';
  const closeIdx = html.indexOf('</script>', idx);
  console.log('Script', count, 'at', idx, '- src:', src, '- closes at', closeIdx);
  idx = idx + 7;
  count++;
  if (count > 10) break;
}
