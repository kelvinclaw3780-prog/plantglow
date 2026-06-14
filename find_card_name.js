const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Find the exact string in the card template
const searchStr = "<h3 class=\"font-semibold text-gray-900 text-sm\">";
const idx = h.indexOf(searchStr);
console.log('Found at:', idx);
if (idx >= 0) {
  console.log(JSON.stringify(h.substring(idx, idx + 120)));
}

// Also find plant.name usage
const plantNameIdx = h.indexOf("'>' + plant.name + '</h3>'");
console.log('\nplant.name in h3 at:', plantNameIdx);
if (plantNameIdx >= 0) {
  console.log(JSON.stringify(h.substring(plantNameIdx - 50, plantNameIdx + 50)));
}

// Check what the actual template looks like
const templateStart = h.indexOf("'<div class=\"relative\">'");
const templateEnd = h.indexOf("'; }", templateStart);
console.log('\nTemplate start:', templateStart, 'Template end:', templateEnd);
if (templateStart >= 0) {
  const template = h.substring(templateStart, templateEnd + 3);
  console.log('Template length:', template.length);
  // Find the h3 line
  const h3Idx = template.indexOf("<h3");
  if (h3Idx >= 0) {
    console.log('H3 line:', JSON.stringify(template.substring(h3Idx, h3Idx + 100)));
  }
}