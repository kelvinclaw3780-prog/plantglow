const http = require('http');
const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3469, () => {
  console.log('Server on 3469');
  
  http.get('http://localhost:3469', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Served length:', data.length);
      
      // Find ALL script tags in the served HTML
      let idx = 0, count = 0;
      while ((idx = data.indexOf('<script', idx)) !== -1 && count < 20) {
        const close = data.indexOf('</script>', idx);
        const srcS = data.indexOf('src="', idx);
        const srcE = srcS !== -1 && srcS < close ? data.indexOf('"', srcS + 5) : -1;
        const src = srcS !== -1 && srcS < close ? data.substring(srcS + 5, srcE) : '(inline)';
        console.log('Script', count, '| open:', idx, '| close:', close, '| len:', close - idx, '| src:', src.substring(0, 60));
        idx = close + 9;
        count++;
      }
      
      // Find the main script and check its content
      const lastScript = data.lastIndexOf('<script>');
      const close = data.indexOf('</script>', lastScript + 9);
      console.log('\nLast script at:', lastScript, 'closes at:', close);
      console.log('Content len:', close - lastScript - 9);
      
      // Check what's actually in the served HTML at those positions
      console.log('\nChars at lastScript:', JSON.stringify(data.substring(lastScript, lastScript + 20)));
      console.log('Chars before lastScript:', JSON.stringify(data.substring(lastScript - 20, lastScript)));
      
      // Now try to execute the served script content
      const scriptContent = data.substring(lastScript + 9, close);
      
      const elements = {};
      const mockDoc = {
        getElementById: function(id) {
          if (!elements[id]) elements[id] = { innerHTML: '', className: '', style: {display:''}, textContent: '', value: '', classList: { toggle:function(){}, add:function(){}, remove:function(){}, contains:function(){return false;} }, appendChild:function(){}, remove:function(){} };
          return elements[id];
        },
        querySelectorAll: function() { return []; },
        createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
        body: { style: {}, appendChild: function(){}, removeChild: function(){} }
      };
      const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };
      const sandbox = { document: mockDoc, localStorage: mockLS, console: console, lucide: { createIcons: function(){} }, setTimeout: function(fn,ms){setTimeout(fn,ms);} };
      
      try {
        vm.createContext(sandbox);
        vm.runInContext(scriptContent, sandbox, {filename: 'served.js'});
        console.log('\nEXEC OK');
        console.log('plantData keys:', Object.keys(sandbox.plantData || {}).length);
        console.log('renderPlants type:', typeof sandbox.renderPlants);
      } catch(e) {
        console.log('\nEXEC ERROR:', e.message);
      }
      
      server.close();
    });
  });
});
