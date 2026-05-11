const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find all script tags
let pos = 0;
let scriptNum = 0;
while ((pos = c.indexOf('<script', pos)) !== -1) {
  const endScript = c.indexOf('</script>', pos);
  const content = c.substring(pos, endScript + 9);
  const firstLine = content.split('\n')[0];
  const hasPlantData = content.includes('var plantData = {') || content.includes('plantData = {');
  const hasRenderPlants = content.includes('function renderPlants');
  const hasDOMContentLoaded = content.includes('DOMContentLoaded');
  console.log('Script', scriptNum + 1, '-', firstLine, '- plantData:', hasPlantData, '- renderPlants:', hasRenderPlants, '- DOMContentLoaded:', hasDOMContentLoaded);
  console.log('  Starts at:', pos, 'Length:', content.length);
  pos++;
  scriptNum++;
}