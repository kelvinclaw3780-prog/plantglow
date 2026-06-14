const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix plant card name display - change plant.name to (plant.nameZh || plant.name)
h = h.split("'<h3 class=\"font-semibold text-gray-900 text-sm\">' + plant.name + '</h3>'")
     .join("'<h3 class=\"font-semibold text-gray-900 text-sm\">' + (plant.nameZh || plant.name) + '</h3>'");

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed plant card name display');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
const nameDisplay = h2.includes("'>' + (plant.nameZh || plant.name) + '</h3>'");
console.log('Card uses nameZh:', nameDisplay ? 'YES' : 'NO');