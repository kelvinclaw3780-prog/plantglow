const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Check if there's any extra ]}; somewhere
const doubleEnd = c.match(/\]\};/g);
console.log('Double ]}; occurrences:', doubleEnd ? doubleEnd.length : 0);

// Check plantData specifically
const pdStart = c.indexOf('var plantData = {');
const pdEnd = c.indexOf('};', pdStart);
const pdContent = c.substring(pdStart, pdEnd + 2);

// Check the structure of each plant
const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];
plants.forEach(p => {
  const pIdx = pdContent.indexOf(p + ':');
  if (pIdx !== -1) {
    const after = pdContent.substring(pIdx, pIdx + 200);
    const hasName = after.includes("name: '");
    const hasImg = after.includes("img: '");
    const hasTips = after.includes("tips: [");
    const hasProblems = after.includes("problems: [");
    console.log(p + ': name=' + hasName + ' img=' + hasImg + ' tips=' + hasTips + ' problems=' + hasProblems);
  } else {
    console.log(p + ': NOT FOUND');
  }
});