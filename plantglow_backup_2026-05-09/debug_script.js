const http = require('http');
const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const vm = require('vm');

const html = fs.readFileSync(path);
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(3467, () => {
  http.get('http://localhost:3467', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const lastScript = data.lastIndexOf('<script>');
      const scriptClose = data.indexOf('</script>', lastScript + 9);
      const scriptContent = data.substring(lastScript + 9, scriptClose);
      const lines = scriptContent.split('\n');
      
      console.log('Total lines in script:', lines.length);
      
      // Find where plantData is defined and where it's first used
      let plantDataDefLine = -1;
      let objectKeysLine = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('var plantData') || lines[i].includes('const plantData')) plantDataDefLine = i;
        if (lines[i].includes('Object.keys(plantData)')) objectKeysLine = i;
      }
      console.log('plantData defined at line:', plantDataDefLine);
      console.log('Object.keys(plantData) at line:', objectKeysLine);
      
      // Check lines around Object.keys
      console.log('\nLines 70-80:');
      for (let i = 70; i <= 80; i++) {
        if (lines[i]) console.log(i + ':', lines[i].substring(0, 100));
      }
      
      // Check if plantData definition is complete
      console.log('\nLines around plantData def:');
      for (let i = plantDataDefLine - 1; i <= plantDataDefLine + 3; i++) {
        if (lines[i]) console.log(i + ':', lines[i].substring(0, 120));
      }
      
      // Check end of plantData
      for (let i = lines.length - 10; i < lines.length; i++) {
        if (lines[i]) console.log(i + ':', lines[i].substring(0, 100));
      }
      
      server.close();
    });
  });
});
