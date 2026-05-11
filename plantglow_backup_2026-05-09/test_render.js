const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const vm = require('vm');

const html = fs.readFileSync(path);
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3465, () => {
  http.get('http://localhost:3465', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('Response length:', data.length);
      
      // Find and compile the main script
      const tailEnd = data.indexOf('</script>', data.indexOf('tailwind.config'));
      const lucideEnd = data.indexOf('</script>', tailEnd + 1);
      const lastScript = data.lastIndexOf('<script>');
      const scriptClose = data.indexOf('</script>', lastScript + 9);
      const scriptContent = data.substring(lastScript + 9, scriptClose);
      
      console.log('Main script at:', lastScript, 'to', scriptClose, 'len:', scriptContent.length);
      console.log('Script starts:', JSON.stringify(scriptContent.substring(0, 100)));
      
      try {
        new vm.Script(scriptContent, {filename: 'main.js'});
        console.log('COMPILE: OK');
      } catch(e) {
        console.log('COMPILE ERROR:', e.message);
      }
      
      // Check if init runs
      // Simulate the DOM environment
      const mockDoc = {
        getElementById: function(id) {
          return {
            innerHTML: '', classList: { toggle: function(){}, add: function(){}, remove: function(){} },
            style: {}, textContent: '', value: '', 
            appendChild: function(){}, remove: function(){}
          };
        },
        querySelectorAll: function() { return []; },
        createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
        body: { style: {}, appendChild: function(){} }
      };
      const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };
      
      const mockWindow = { setTimeout: function(fn, ms){ setTimeout(fn, ms); } };
      
      try {
        const sandbox = { document: mockDoc, localStorage: mockLS, lucide: { createIcons: function(){} }, setTimeout: mockWindow.setTimeout, console: console };
        vm.createContext(sandbox);
        vm.runInContext(scriptContent, sandbox, {filename: 'main.js'});
        console.log('EXEC: OK');
        console.log('plantData keys:', Object.keys(sandbox.plantData || {}).length);
        console.log('plantData first key:', Object.keys(sandbox.plantData || {})[0]);
      } catch(e) {
        console.log('EXEC ERROR:', e.message);
      }
      
      // Check plant-grid content
      const gridIdx = data.indexOf('id="plant-grid"');
      console.log('plant-grid at:', gridIdx);
      console.log('plant-grid HTML:', JSON.stringify(data.substring(gridIdx, gridIdx + 200)));
      
      // Check nav user-status
      const statusIdx = data.indexOf('nav-user-status');
      console.log('nav-user-status at:', statusIdx);
      console.log('Around nav-user-status:', JSON.stringify(data.substring(statusIdx - 50, statusIdx + 100)));
      
      // Check browse-all
      const browseIdx = data.indexOf('browse-all-section');
      console.log('browse-all at:', browseIdx);
      console.log('browse-all HTML:', JSON.stringify(data.substring(browseIdx, browseIdx + 200)));
      
      server.close();
    });
  });
});
