const fs = require('fs');
let buf = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html');
const replacements = {
  0xE280A0: 0x27, // ' (U+2018 LEFT SINGLE QUOTATION MARK)
  0xE280A6: 0x27, // ' (U+2019 RIGHT SINGLE QUOTATION MARK)
  0xE2809C: 0x22, // " (U+201C LEFT DOUBLE QUOTATION MARK)
  0xE2809D: 0x22, // " (U+201D RIGHT DOUBLE QUOTATION MARK)
  0xE28094: 0x2D, // - (U+2014 EM DASH)
  0xE28093: 0x2D, // - (U+2013 EN DASH)
  0xE282AC: 0xC2, // Fix € that was incorrectly converted
};
let changed = 0;
for (let i = 0; i < buf.length - 2; i++) {
  const key = (buf[i] << 16) | (buf[i+1] << 8) | buf[i+2];
  if (replacements[key]) {
    buf[i] = replacements[key];
    buf[i+1] = 0;
    buf[i+2] = 0;
    changed++;
  }
}
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', buf);
console.log('Fixed', changed, 'bytes');