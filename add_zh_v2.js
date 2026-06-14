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

// Find plantData section start
const plantDataIdx = h.indexOf('var plantData = {');
if (plantDataIdx < 0) {
  console.log('plantData not found');
  process.exit(1);
}

// Find the end of plantData (the closing }); around the plant data)
const plantDataArea = h.substring(plantDataIdx, plantDataIdx + 25000);
console.log('Plant data area length:', plantDataArea.length);

// For each plant, add nameZh after name field
let count = 0;
for (const [id, zhName] of Object.entries(plantNameZh)) {
  // Pattern: id: { name: 'Original Name', scientific: '...'
  // We need to insert , nameZh: 'Chinese Name' after the name, before scientific
  const regex = new RegExp("(" + id + ":\\s*\\{[\\s\\S]*?name:\\s*'[^']+'),(\\s*scientific:)", 'g');
  const match = regex.exec(plantDataArea);
  if (match) {
    const replacement = match[1] + ", nameZh: '" + zhName + "'," + match[2];
    h = h.replace(match[0], replacement);
    count++;
  }
}

console.log('Added nameZh to', count, 'plants');
fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');

// Now update the rendering code to use nameZh
console.log('\nUpdating rendering code...');

h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Update plant card template - img alt
h = h.split("alt=\"' + plant.name + '\"")
     .join("alt=\"' + (plant.nameZh || plant.name) + '\"");

// Update plant card template - plant name display in card
// '<span class="font-semibold text-forest-800">' + plant.name + '</span>'
h = h.split("'>' + plant.name + '</span>")
     .join("'>' + (plant.nameZh || plant.name) + '</span>");

// Update modal - plant name display
h = h.split("document.getElementById('plant-modal-name').textContent = plant.name;")
     .join("document.getElementById('plant-modal-name').textContent = plant.nameZh || plant.name;");

// Update scientific name display
h = h.split("document.getElementById('plant-modal-scientific').textContent = plant.scientific;")
     .join("// Scientific name stays in English (botanical name)");

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Done!');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
console.log('\nVerification:');
console.log('Has nameZh?', h2.includes('nameZh:'));
console.log('Has plant.nameZh?', h2.includes('plant.nameZh'));
console.log('First nameZh entry:', h2.match(/nameZh:\s*'[^']+'/g) && h2.match(/nameZh:\s*'[^']+'/g)[0]);