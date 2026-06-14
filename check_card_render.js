const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the renderPlantCard function
const renderIdx = h.indexOf('function renderPlantCard');
if (renderIdx >= 0) {
  console.log('renderPlantCard function:');
  console.log(h.substring(renderIdx, renderIdx + 800));
}

// Check where plant name appears in the template
const templateStart = h.indexOf("'<div class=\"relative\">'");
if (templateStart >= 0) {
  const templateEnd = h.indexOf("'; }", templateStart);
  const template = h.substring(templateStart, templateEnd + 3);
  console.log('\n=== FULL CARD TEMPLATE ===');
  console.log(template);
}