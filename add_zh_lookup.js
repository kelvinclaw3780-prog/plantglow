const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Chinese translations for plant names
const plantNameZh = {
  'monstera': '龜背竹',
  'snake': '虎皮蘭',
  'pothos': '黃金葛',
  'fiddle': '琴葉榕',
  'peace': '白掌',
  'spider': '吊蘭',
  'zz': '綠蘿',
  'aloe': '蘆薈',
  'jade': '玉樹',
  'calathea': '彩虹竹芋',
  'birdOfParadise': '鶴望蘭',
  'rubberPlant': '橡皮樹',
  'orchid': '蘭花',
  'philodendron': '蔓綠絨',
  'chineseEvergreen': '龍血樹',
  'dracaena': '巴西木',
  'mint': '薄荷',
  'basil': '羅勒',
  'lavender': '薰衣草',
  'stringOfHearts': '愛之蔓',
  'pilea': '銅錢草',
  'bostonFern': '波士頓蕨',
  'englishIvy': '常春藤',
  'africanViolet': '非洲紫羅蘭',
  'majestyPalm': '發財樹',
  'ponytailPalm': '馬尾蘭',
  'dieffenbachia': '黛粉葉',
  'croton': '變葉木',
  'prayerPlant': '祈禱草',
  'snakeCactus': '蛇鞭球',
  'castIronPlant': '一葉蘭',
  'peperomia': '西瓜皮椒草',
  'moneyTree': '金錢樹',
  'schefflera': '鵝掌柴',
  'anthurium': '火鶴花',
  'christmasCactus': '聖誕仙人掌',
  'coffee': '咖啡樹',
  'stringOfPearls': '珍珠串',
  'hoya': '毬蘭',
  'hypestes': '斑葉槓竹',
  'chamaedorea': '袖珍椰子',
  'tradescantia': '紫露草',
  'fittonia': '網紋草',
  'syngonium': '箭葉藤',
  'dizygotheca': '孔雀木',
  'cyclamen': '仙客來',
  'monsteraAdansonii': '小龜背竹',
  'cactus': '金琥',
  'aralia': '八角金盤'
};

// Find the plantData section and add nameZh to each plant
// Strategy: for each plant entry like:
//   name: 'Monstera Deliciosa', scientific: 'Monstera Deliciosa',
// Add after it: nameZh: '龜背竹',

let count = 0;
for (const [id, zhName] of Object.entries(plantNameZh)) {
  // Find the pattern: name: 'XXX', scientific:
// and replace with: name: 'XXX', nameZh: 'Chinese Name', scientific:
  const regex = new RegExp `(${id}:\\s*\\{[\\s\\S]*?name:\\s*'[^']+'),(\\s*scientific:)`;
  const match = h.match(regex);
  if (match) {
    const replacement = match[1] + ', nameZh: \'' + zhName + '\',' + match[2];
    h = h.replace(match[0], replacement);
    count++;
  }
}

console.log('Added nameZh to', count, 'plants');
fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');

// Now update the rendering code to use nameZh in the Chinese version
// Find: plant.name and replace with plant.nameZh || plant.name in the Chinese version
console.log('\nUpdating rendering code...');

// The plant card rendering uses plant.name - update to use nameZh || name
// Find: '<img ... alt="' + plant.name + '" ...'
// Replace with: '<img ... alt="' + (plant.nameZh || plant.name) + '" ...'

// Similarly for plant modal
h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Update plant card template - img alt
h = h.split("alt=\"' + plant.name + '\"")
     .join("alt=\"' + (plant.nameZh || plant.name) + '\"");
     
// Update plant card template - plant.name in the return statement
// The template has: '<span class="font-semibold text-forest-800">' + plant.name + '</span>'
h = h.split("'>' + plant.name + '</span>")
     .join("'>' + (plant.nameZh || plant.name) + '</span>");

// Update modal - plant name display
// document.getElementById('plant-modal-name').textContent = plant.name;
h = h.split("document.getElementById('plant-modal-name').textContent = plant.name;")
     .join("document.getElementById('plant-modal-name').textContent = plant.nameZh || plant.name;");

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Rendering code updated');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
console.log('\nVerification:');
console.log('Has nameZh?', h2.includes('nameZh:'));
console.log('Has plant.nameZh?', h2.includes('plant.nameZh'));