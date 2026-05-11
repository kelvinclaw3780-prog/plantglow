const http = require('http');
http.get('http://localhost:3000/index.html', (res) => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // Check plant-grid content
    const pgIdx = d.indexOf('id="plant-grid"');
    console.log('plant-grid at:', pgIdx);
    const afterGrid = d.substring(pgIdx, pgIdx + 300);
    console.log('plant-grid snippet:', afterGrid);

    // Check if plant-grid is empty in the served HTML
    const gridStart = d.indexOf('<div id="plant-grid"');
    const gridEnd = d.indexOf('</div>', gridStart);
    const gridContent = d.substring(gridStart, gridEnd);
    console.log('\nGrid content length:', gridContent.length);
    console.log('Grid empty?', gridContent.trim() === gridContent.substring(0, gridContent.indexOf('>') + 1).trim());
  });
});