const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const fixed = html
  .replace(/\u2014/g, "'")
  .replace(/\u2013/g, "'")
  .replace(/\u201C/g, '"')
  .replace(/\u201D/g, '"')
  .replace(/\u2018/g, "'")
  .replace(/\u2019/g, "'")
  .replace(/\u2026/g, '...')
  .replace(/\u00A0/g, ' ');
fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', fixed, 'utf8');
console.log('Done');