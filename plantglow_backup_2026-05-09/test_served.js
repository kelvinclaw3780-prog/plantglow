const http = require('http');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3463, () => {
  http.get('http://localhost:3463', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Response length:', data.length);
      
      // The actual last <script> in the served HTML
      const lastScriptIdx = data.lastIndexOf('<script>');
      const firstCloseIdx = data.indexOf('</script>', lastScriptIdx + 9);
      
      console.log('Last script at:', lastScriptIdx);
      console.log('First close after it:', firstCloseIdx);
      console.log('Gap between them:', firstCloseIdx - lastScriptIdx - 9);
      
      // The script content
      const script = data.substring(lastScriptIdx, firstCloseIdx + 9);
      console.log('Script tag + content length:', script.length);
      console.log('Script starts:', JSON.stringify(script.substring(0, 50)));
      console.log('Script ends:', JSON.stringify(script.substring(script.length - 50)));
      
      // Try to compile the actual served script
      const scriptContent = data.substring(lastScriptIdx + 9, firstCloseIdx);
      try {
        new vm.Script(scriptContent, {filename: 'served.js'});
        console.log('SERVED SCRIPT COMPILE: OK');
      } catch(e) {
        console.log('SERVED SCRIPT COMPILE ERROR:', e.message);
      }
      
      // Also check the response body contains what we expect
      const gridIdx = data.indexOf('id="plant-grid"');
      console.log('plant-grid found at:', gridIdx);
      
      const browseIdx = data.indexOf('browse-all-section');
      console.log('browse-all-section found at:', browseIdx);
      
      const logoutIdx = data.indexOf('onclick="logout()"');
      console.log('logout found at:', logoutIdx);
      
      server.close();
    });
  });
});
