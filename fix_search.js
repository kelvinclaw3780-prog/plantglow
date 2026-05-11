const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find the first renderPlantCard (the one at line 16270 without data-name, in PLANT GRID section)
// and add data-name and data-scientific to it

const oldCard = `function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }`;

const newCard = `function renderPlantCard(id, plant) {
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer" onclick="handlePlantClick(\\'' + id + '\\')" data-name="' + plant.name.toLowerCase() + '" data-scientific="' + plant.scientific.toLowerCase() + '">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>';
    }`;

if (c.indexOf(oldCard) !== -1) {
  c = c.replace(oldCard, newCard);
  console.log('1. Fixed renderPlantCard in PLANT GRID');
} else {
  console.log('1. Old renderPlantCard pattern not found');
}

// Now remove the FIRST duplicate renderPlantCard (the one in INIT section with data-name already)
// Find it and remove it
const firstCardStart = c.indexOf('function renderPlantCard(id, plant) {');
const firstCardEnd = c.indexOf('// LOGIN STATE', firstCardStart);
if (firstCardStart !== -1 && firstCardEnd !== -1) {
  // Check if this version has data-name
  const betweenFirst = c.substring(firstCardStart, firstCardEnd);
  if (betweenFirst.includes('data-name')) {
    const toRemove = c.substring(firstCardStart, firstCardEnd);
    c = c.substring(0, firstCardStart) + c.substring(firstCardEnd);
    console.log('2. Removed first duplicate renderPlantCard with data-name');
  } else {
    console.log('2. First renderPlantCard does NOT have data-name, keeping it');
  }
}

// Also remove the standalone handlePlantSearch from INIT section
const hpsIdx = c.indexOf('function handlePlantSearch() {');
const hpsEnd = c.indexOf('// LOGIN STATE', hpsIdx);
if (hpsIdx !== -1 && hpsEnd !== -1) {
  const hpsBlock = c.substring(hpsIdx, hpsEnd);
  if (hpsBlock.includes('plant-search')) {
    c = c.substring(0, hpsIdx) + c.substring(hpsEnd);
    console.log('3. Removed handlePlantSearch from INIT section');
  }
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');