const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Chinese translations for tips - organized by original English
const tipTranslations = {
  // Monstera tips
  'Prefers bright, indirect light - direct sun burns leaves': '喜歡明亮的散射光 — 直射陽光會燒傷葉子',
  '澆水 when top 2-3cm of soil is dry': '土壤表面乾燥時澆水',
  'Loves humidity - mist leaves or use a pebble tray': '喜歡濕度 — 可以在葉子上噴霧或使用鵝卵石托盤',
  'Feed monthly during spring and summer': '春夏季每月施肥一次',
  'Aerial roots are normal, not a problem': '氣生根是正常的，不是問題',
  
  // Snake plant tips
  'Virtually indestructible - perfect for beginners': '幾乎不死 — 非常適合新手',
  'Let soil dry completely between waterings': '澆水之間讓土壤完全乾燥',
  'Tolerates low light but grows faster in bright indirect light': '耐低光但在明亮散射光下生長更快',
  'Wipe leaves monthly to remove dust': '每月擦拭葉子去除灰塵',
  'Can go weeks without water': '可以數週不澆水',
  
  // Pothos tips
  'Heart-shaped leaves on trailing vines': '心形葉片，生長在蔓藤上',
  'Easy to propagate from stem cuttings': '容易透過莖插繁殖',
  'Tolerates low light better than most plants': '比其他大多數植物更耐低光',
  'Trim to encourage fuller, bushier growth': '修剪以促進更豐滿、更茂盛的生長',
  'Great for hanging baskets or climbing supports': '非常適合吊籃或攀爬支架',
  
  // Fiddle Leaf Fig tips
  'One of the most popular statement plants': '最受歡迎的展示植物之一',
  'Large violin-shaped leaves up to 12 inches wide': '大提琴形葉片，寬達 30 公分',
  'Hates being moved - pick the right spot and leave it': '討厭被移動 — 選擇正確的位置並保持不動',
  'Dropping leaves usually means overwatering or cold stress': '落葉通常表示澆水過多或冷風',
  
  // Peace Lily tips
  'Will dramatically droop when thirsty': '缺水時會明顯下垂',
  'Keep soil consistently moist but not soggy': '保持土壤持續濕潤但不積水',
  'Thrives in low light': '在低光環境中生長良好',
  'Flowers turn green as they age - normal': '花朵老化時變綠色 — 這是正常的',
  
  // Spider Plant tips
  'Produces baby plants on long stalks': '在長莖上產生小植株',
  'Easy to propagate - just cut and plant babies': '容易繁殖 — 只需剪下小植株並種植',
  'Tolerates a wide range of light conditions': '耐受各種光照條件',
  'Brown tips can indicate fluoride in water': '褐色尖端可能表示水中有氟化物',
  'Great for hanging baskets': '非常適合吊籃',
  
  // ZZ Plant tips
  'Extremely drought tolerant': '非常耐旱',
  'Stores water in its thick rhizomes': '在厚根莖中儲存水分',
  'Tolerates very low light': '耐受極低光',
  'Growth is slow but steady': '生長緩慢但穩定',
  'Toxic if ingested - keep away from pets': '攝入有毒 — 遠離寵物',
  
  // Aloe Vera tips
  'Loves bright indirect light': '喜歡明亮的散射光',
  'Let soil dry completely between waterings': '澆水之間讓土壤完全乾燥',
  'Gel inside leaves soothes burns': '葉子內的凝膠可以舒緩燒傷',
  'Produces pups around the base': '在根部周圍產生新芽',
  'Needs excellent drainage': '需要良好的排水',
  
  // Jade Plant tips
  'Symbol of good luck and prosperity': '好運和繁榮的象徵',
  'Loves bright light - direct sun is fine': '喜歡強光 — 直射陽光沒問題',
  'Let soil dry between waterings': '澆水之間讓土壤乾燥',
  'Can live for decades with proper care': '適當護理可以活數十年',
  'Prune to maintain shape': '修剪以保持形狀',
  
  // General tips that appear across plants
  'Feed monthly during growing season': '生長季節每月施肥',
  'Keep in a warm spot away from drafts': '放在溫暖處，遠離冷風',
  'Yellow leaves usually mean overwatering': '黃葉通常表示澆水過多',
  'Brown edges indicate low humidity': '褐色邊緣表示濕度低',
  'Mist regularly for best results': '定期噴霧以獲得最佳效果',
  'Rotate plant for even growth': '旋轉植物以均勻生長',
  'Clean leaves to remove dust and pests': '清潔葉子以去除灰塵和害蟲',
  'Use well-draining soil mix': '使用排水良好的土壤混合',
};

// Apply translations
let translated = 0;
for (const [eng, zh] of Object.entries(tipTranslations)) {
  if (h.includes(eng)) {
    h = h.split(eng).join(zh);
    translated++;
  }
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Translated', translated, 'tips');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
console.log('Still has English tips:', h2.includes('Prefers bright, indirect light'));
console.log('Has Chinese tips:', h2.includes('喜歡明亮的散射光'));