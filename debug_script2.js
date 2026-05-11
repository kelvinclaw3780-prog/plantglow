const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const vm = require('vm');

const html = fs.readFileSync(path);
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3468, () => {
  http.get('http://localhost:3468', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const lastScript = data.lastIndexOf('<script>');
      const scriptClose = data.indexOf('</script>', lastScript + 9);
      const scriptContent = data.substring(lastScript + 9, scriptClose);
      const lines = scriptContent.split('\n');
      
      // Try to find syntax errors by compiling line by line
      let accumulated = '';
      for (let i = 0; i < lines.length; i++) {
        accumulated += lines[i] + '\n';
        try {
          new vm.Script(accumulated, {filename: 'test.js'});
        } catch(e) {
          console.log('First error at line', i + 1, ':', e.message);
          console.log('Line content:', lines[i].substring(0, 100));
          console.log('Previous 3 lines:');
          for (let j = Math.max(0, i - 3); j < i; j++) console.log(j + ':', lines[j].substring(0, 100));
          break;
        }
      }
      
      server.close();
    });
  });
});
