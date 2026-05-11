const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all h1 tags
let pos = 0;
while ((pos = c.indexOf('<h1', pos)) !== -1) {
  const end = c.indexOf('</h1>', pos);
  if (end !== -1) {
    console.log('h1 at', pos, ':', JSON.stringify(c.substring(pos, end + 5)));
    console.log('---');
  }
  pos += 3;
}

// Also find "Gardening" in body (not head)
const bodyStart = c.indexOf('<body');
const afterBody = c.substring(bodyStart);
let pos2 = 0;
while ((pos2 = afterBody.indexOf('Gardening', pos2)) !== -1) {
  console.log('Gardening in body at offset', pos2, ':', JSON.stringify(afterBody.substring(pos2 - 50, pos2 + 100)));
  pos2++;
}