const http = require('http');
const fs = require('fs');
const url = require('url');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html');
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/check') {
    // Return info about the HTML structure
    const scriptStart = html.lastIndexOf('<script>');
    const scriptEnd = html.indexOf('</script>', scriptStart + 9);
    const lucideScriptStart = html.indexOf('src="https://unpkg.com/lucide');
    const lucideScriptEnd = html.indexOf('</script>', lucideScriptStart + 9);
    
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      fileSize: html.length,
      lucideScriptStart: lucideScriptStart,
      lucideScriptEnd: lucideScriptEnd,
      mainScriptStart: scriptStart,
      mainScriptEnd: scriptEnd,
      lucideSrc: html.substring(lucideScriptStart + 5, html.indexOf('">', lucideScriptStart)),
      hasLucideCall: html.includes('lucide.createIcons()'),
      lucideCallLine: html.indexOf('lucide.createIcons()'),
    }, null, 2));
    return;
  }
  
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3464, () => console.log('Check server on http://localhost:3464'));
