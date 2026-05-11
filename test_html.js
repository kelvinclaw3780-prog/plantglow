const http = require('http');
const fs = require('fs');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

server.listen(3461, () => {
  http.get('http://localhost:3461', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      // Check init calls
      const initIdx = data.indexOf('lucide.createIcons()');
      console.log('Init section:', JSON.stringify(data.substring(initIdx - 50, initIdx + 300)));
      console.log('---');
      
      // Check browse all section
      const browseIdx = data.indexOf('browse-all-section');
      console.log('Browse section:', JSON.stringify(data.substring(browseIdx, browseIdx + 200)));
      console.log('---');
      
      // Check nav logout button
      const logoutIdx = data.indexOf('onclick="logout()"');
      console.log('Logout button:', JSON.stringify(data.substring(logoutIdx - 30, logoutIdx + 150)));
      
      // Check what plant-grid contains
      const gridIdx = data.indexOf('id="plant-grid"');
      console.log('Plant grid HTML:', JSON.stringify(data.substring(gridIdx, gridIdx + 200)));
      
      server.close();
    });
  });
});
