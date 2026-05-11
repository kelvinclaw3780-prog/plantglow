const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find ALL occurrences of "Explore Plants" and "href="#plants""
let pos = 0;
let count = 0;
while ((pos = c.indexOf('Explore Plants', pos)) !== -1) {
  count++;
  console.log('Explore Plants #' + count + ' at:', pos);
  console.log(JSON.stringify(c.substring(pos - 100, pos + 100)));
  console.log('---');
  pos++;
}

console.log('\nTotal Explore Plants:', count);

// Also check for href="#plants"
let pos2 = 0;
let count2 = 0;
while ((pos2 = c.indexOf('href="#plants"', pos2)) !== -1) {
  count2++;
  console.log('href="#plants" at:', pos2);
  pos2++;
}
console.log('\nhref="#plants" count:', count2);