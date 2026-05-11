const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
console.log('File length:', html.length);

// Check script tags
let idx = 0, count = 0;
while ((idx = html.indexOf('<script', idx)) !== -1 && count < 10) {
  const close = html.indexOf('</script>', idx);
  const srcO = html.indexOf('src=', idx);
  const srcE = srcO !== -1 && srcO < close ? html.indexOf('"', srcO + 5) : -1;
  const src = srcO !== -1 && srcO < close ? html.substring(srcO + 5, srcE) : '(inline)';
  console.log('Script', count, 'open@', idx, 'close@', close, 'src:', src.substring(0, 60));
  idx = close + 9;
  count++;
}

// Check plant grid
const gridIdx = html.indexOf('id="plant-grid"');
console.log('plant-grid at:', gridIdx, JSON.stringify(html.substring(gridIdx, gridIdx + 200)));

// Check init calls
const initIdx = html.indexOf('lucide.createIcons()');
console.log('lucide.createIcons at:', initIdx, JSON.stringify(html.substring(initIdx - 30, initIdx + 100)));

// Check VISIBLE_COUNT
const visIdx = html.indexOf('VISIBLE_COUNT');
console.log('VISIBLE_COUNT at:', visIdx);

// Check plantData
const pdIdx = html.indexOf('var plantData');
console.log('plantData at:', pdIdx);

// Check nav logo
const logoIdx = html.indexOf('kelvin_logo');
console.log('kelvin_logo at:', logoIdx);
