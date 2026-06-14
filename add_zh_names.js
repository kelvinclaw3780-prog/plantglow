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

// For each plant, add nameZh field
for (const [id, zhName] of Object.entries(plantNameZh)) {
  // Find the plant entry and add nameZh after name
  const pattern = new RegExp(`(${id}:\\s*\\{[\\s\\S]*?name:\\s*'[^']+')`, 'g');
  // This is complex, let me do it differently
}

// Actually, let's do a simple replacement for each plant's name line
// For each plant, find "name: 'Original Name'" and add ", nameZh: 'Chinese Name'" after it

let modified = 0;
for (const [id, zhName] of Object.entries(plantNameZh)) {
  // Find the pattern: name: 'Original Name',
  // and replace with: name: 'Original Name', nameZh: 'Chinese Name',
  const regex = new RegExp `(name:\\s*'[^']+'),(\\s*scientific:)`;
  const match = h.match(regex);
  if (match) {
    console.log('Found pattern for', id);
  }
}

console.log('Script needs revision - trying different approach');