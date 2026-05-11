const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find renderPlantCard and replace it entirely
const rpcStart = c.indexOf('function renderPlantCard(id, plant)');
const rpcEnd = c.indexOf('function getSavedPlants');
console.log('renderPlantCard from', rpcStart, 'to', rpcEnd);

// The correct renderPlantCard function - written cleanly with proper escaping
const newRPC = `function renderPlantCard(id, plant) {
      var saved = getSavedPlants();
      var isSaved = saved.includes(id);
      var heartClass = isSaved ? 'text-red-500' : 'text-gray-400';
      return '<div class="plant-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">' +
        '<div onclick="handlePlantClick(\\'' + id + '\\')">' +
        '<img src="' + plant.img + '" alt="' + plant.name + '" class="w-full aspect-square object-cover" onerror="this.src=\\'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop\\'">' +
        '<div class="p-3">' +
        '<h3 class="font-semibold text-gray-900 text-sm">' + plant.name + '</h3>' +
        '<p class="text-xs text-gray-500">' + plant.scientific + '</p>' +
        '<div class="mt-2 flex items-center gap-1">' +
        '<span class="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">* ' + plant.light.split(' ')[0] + '</span>' +
        '<span class="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">* ' + plant.water + '</span>' +
        '</div></div></div>' +
        '<button onclick="handleToggleSave(\\'' + id + '\\')" class="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-white transition">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="' + (isSaved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 ' + heartClass + '"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button></div>';
    }`;

console.log('New RPC length:', newRPC.length);

// Replace
c = c.substring(0, rpcStart) + newRPC + c.substring(rpcEnd);
console.log('Replaced! New length:', c.length);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Written!');