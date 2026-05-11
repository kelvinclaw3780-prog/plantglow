const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const url = require('url');
const vm = require('vm');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/api/test') {
    const html = fs.readFileSync(path, 'utf8');
    
    // Find the main script - start AFTER the lucide CDN script ends
    const tailwindScriptEnd = html.indexOf('</script>', html.indexOf('tailwind.config'));
    const lucideScriptEnd = html.indexOf('</script>', tailwindScriptEnd + 1);
    const mainScriptStart = lucideScriptEnd + '</script>'.length;
    const mainScriptEnd = html.lastIndexOf('</script>');
    const script = html.substring(mainScriptStart, mainScriptEnd);
    
    // Debug: show what's at the start and end
    const debug = {
      tailwindEnd: tailwindScriptEnd,
      lucideEnd: lucideScriptEnd,
      mainScriptStart: mainScriptStart,
      mainScriptEnd: mainScriptEnd,
      scriptLength: script.length,
      first50: JSON.stringify(script.substring(0, 50)),
      last50: JSON.stringify(script.substring(script.length - 50)),
      hasScriptTag: script.includes('<script>'),
      hasClosingTag: script.includes('</script>'),
    };
    
    try {
      new vm.Script(script, { filename: 'main.js' });
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ok: true, ...debug}));
    } catch(e) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ok: false, error: e.message, line: e.stack.split('\n')[1], ...debug}));
    }
    return;
  }
  
  fs.readFile(path, (err, data) => {
    if (err) { res.writeHead(500); res.end('Error'); return; }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

server.listen(3457, () => console.log('Test server on http://localhost:3457'));
