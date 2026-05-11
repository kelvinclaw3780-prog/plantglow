const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const html = fs.readFileSync(path);

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3471, () => {
  console.log('Server ready on http://localhost:3471');
  // Make a test request to confirm
  http.get('http://localhost:3471', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Test request - status:', res.statusCode, '| length:', data.length);
      server.close();
    });
  });
});