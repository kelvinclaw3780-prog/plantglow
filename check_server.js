const http = require('http');
http.get('http://localhost:3000/index.html', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const lines = d.split('\n');
    // Show lines 7-12 (script tags area)
    console.log('Lines 7-12:');
    for (let i = 6; i <= 11; i++) console.log((i + 1) + ': ' + lines[i]);
    // Show lines 339-350 (init area)
    console.log('\nLines 339-350:');
    for (let i = 338; i <= 349; i++) console.log((i + 1) + ': ' + lines[i]);
    // Show lines 770-780 (end of script)
    console.log('\nLines 770-780:');
    for (let i = 769; i <= 779; i++) console.log((i + 1) + ': ' + lines[i]);
  });
});