const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// All plant IDs that should have nameZh
const allIds = [
  'monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz',
  'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid',
  'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil', 'lavender',
  'stringOfHearts', 'pilea', 'bostonFern', 'englishIvy', 'africanViolet',
  'majestyPalm', 'ponytailPalm', 'dieffenbachia', 'croton', 'prayerPlant',
  'snakeCactus', 'castIronPlant', 'peperomia', 'moneyTree', 'schefflera',
  'anthurium', 'christmasCactus', 'coffee', 'stringOfPearls', 'hoya',
  'hypestes', 'chamaedorea', 'tradescantia', 'fittonia', 'syngonium',
  'dizygotheca', 'cyclamen', 'monsteraAdansonii', 'cactus', 'aralia'
];

console.log('Total plants in list:', allIds.length);

// Check each one for nameZh
const missing = [];
for (const id of allIds) {
  // Find the plant entry
  const regex = new RegExp(id + ':\\s*\\{[\\s\\S]*?nameZh:');
  if (!regex.test(h)) {
    missing.push(id);
  }
}

console.log('Missing nameZh:', missing.length);
console.log('Missing IDs:', missing.join(', '));

// Check the ones that ARE present
const present = [];
for (const id of allIds) {
  const regex = new RegExp(id + ':\\s*\\{[\\s\\S]*?nameZh:');
  if (regex.test(h)) {
    present.push(id);
  }
}
console.log('\nHave nameZh:', present.length);
console.log('Present IDs:', present.join(', '));