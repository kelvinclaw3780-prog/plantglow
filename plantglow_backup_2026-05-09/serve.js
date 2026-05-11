const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';

const html = fs.readFileSync(path);
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3462, () => {
  console.log('Serving on http://localhost:3462');
  setTimeout(() => server.close(), 30000);
});
