const fs = require('fs');
let html = fs.readFileSync('plantglow/index.html', 'utf8');

// TRANSLATIONS: Only user-facing visible text strings
// Do NOT translate JavaScript function names, variable names, IDs, class names, etc.
const translations = [
  // Nav
  ['Search plants...', '搜尋植物...'],
  ['<span id="browse-all-text">Browse all ', '<span id="browse-all-text">瀏覽全部 '],
  [' plants</span>', ' 種植物</span>'],
  ['All Plants', '全部植物'],
  ['My Favorites', '我的最愛'],
  ['Show Less', '顯示較少'],

  // Hero
  ['Gardening Made Simple', '園藝變得更簡單'],
  ['All-in-one plant database with care guides and growing tips \u2014 so you spend less time researching and more time enjoying your plants.', '一站式植物資料庫，收錄詳細護理指南和種植技巧，讓您減少研究時間，多點時間享受植物。'],

  // Popular Plants section
  ['Tap any plant below to discover care tips, growing guides & more \u2728', '點擊任何植物，了解護理技巧、種植指南等 ✨'],
  ['Tap picture for care tips', '點擊圖片查看護理技巧'],

  // Blog
  ['Plant Care Tips & Guides', '植物護理技巧與指南'],
  ['Practical advice to keep your plants thriving', '實用建議助您的植物茁壯成長'],
  ['View All Blog Posts \u2192', '查看所有文章 \u2192'],

  // Blog post titles & excerpts
  ['How to Repot Your Monstera', '如何為龜背芋換盆'],
  ['Repot Your Monstera', '為龜背芋換盆'],
  ['Your Monstera outgrowing its pot? Learn how to repot it correctly with this simple step-by-step guide.', '龜背芋長太大需要換盆？透過簡單的步驟指南了解如何正確換盆。'],

  ['How to Propagate Pothos from Cuttings', '如何用扦插法繁殖黃金葛'],
  ['Propagate Pothos from Cuttings', '用扦插法繁殖黃金葛'],
  ['Pothos is one of the easiest plants to propagate. Learn how to grow new plants from cuttings for free.', '黃金葛是最容易繁殖的植物之一。了解如何免費用扦插種植新植株。'],

  ['Common Plant Problems & How to Fix Them', '常見植物問題及解決方法'],
  ['Common Plant Problems & Fixes', '常見植物問題及修復方法'],
  ["Yellow leaves, brown tips, pests \u2014 every plant parent faces these issues. Learn what's causing them and how to fix each one.", '黃葉、焦尖、病蟲害——每位植物愛好者都會遇到這些問題。了解原因及修復方法。'],

  ['Best Air-Purifying Plants', '最佳空氣淨化植物'],
  ['NASA studies show certain plants remove toxins from indoor air. These are the best air-purifying houseplants.', 'NASA 研究顯示某些植物能去除室內空氣中的毒素。這些是最佳的空氣淨化室內植物。'],

  ['Why Are My Plant Leaves Turning Yellow?', '為什麼我的植物葉子變黃？'],
  ['Why Plant Leaves Turn Yellow', '植物葉子變黃的原因'],
  ['Yellow leaves are the most common plant problem. Learn 8 causes and exactly how to fix each one.', '黃葉是最常見的植物問題。了解 8 個原因及具體修復方法。'],

  ['5 Signs Your Plant Needs Water', '植物需要澆水的 5 個徵兆'],
  ['Wilting leaves? Dry soil? Drooping stems? Learn the 5 clear signs that your houseplant is thirsty.', '葉子枯萎？土壤乾燥？莖下垂？了解室內植物需要澆水的 5 個明顯徵兆。'],

  // How It Works
  ['How PlantGlow Works', 'PlantGlow 如何運作'],
  ['Browse plants', '瀏覽植物'],
  ['Explore 50 plants with detailed care guides. Search by name or filter to find what you need.', '探索 50 種植物的詳細護理指南。以名稱搜尋或篩選所需植物。'],
  ['Save favourites', '儲存最愛'],
  ['Heart any plant to save it to your favourites. Build your personal plant collection.', '為任何植物按下愛心以儲存至最愛。建立您的個人植物收藏。'],
  ['Follow care guides', '遵循護理指南'],
  ['Get clear tips on watering, light, humidity, and more \u2014 all in one place.', '在一處獲得關於澆水、光線、濕度等的清晰提示。'],
  ['Watch them thrive', '看它們茁壯成長'],
  ['Less time researching, more time enjoying. Your plants will thank you.', '減少研究時間，多點時間享受。你的植物會感謝你。'],

  // Email capture
  ['Be the first to know', '搶先知道'],
  ['Register for new features and get tips to help your plants thrive.', '註冊新功能並獲得護理技巧，助您的植物茁壯成長。'],
  ['Register Now', '立即註冊'],
  ["Thanks! You're on the list", '謝謝！您已加入名單'],
  ['No spam. Unsubscribe anytime.', '無垃圾郵件，可隨時取消訂閱。'],

  // Instagram
  ['Follow Us on Instagram', '在 Instagram 上追蹤我們'],
  ['Stay Inspired', '保持靈感'],

  // Footer
  ['Plants', '植物'],
  ['Features', '功能'],
  ['Contact', '聯絡我們'],
  ['Privacy Policy', '隱私權政策'],
  ['Terms & Conditions', '條款與條件'],
  ['PlantGlow by Tradex Dev. Co. 2026. All rights reserved.', 'PlantGlow by Tradex Dev. Co. 2026. 版權所有。'],

  // Plant Modal
  ['\u2600  Light', '\u2600  光線'],
  ['\u{1F4A7} Water', '\u{1F4A7} 澆水'],
  ['\u{1F4A8} Humidity', '\u{1F4A8} 濕度'],
  ['\u{1F321} Temp', '\u{1F321} 溫度'],
  ['\u2728 Care Tips', '\u2728 護理技巧'],
  ['\u26A0\uFE0F Watch Out', '\u26A0\uFE0F 注意事項'],
  ['Save to Favorites', '儲存至最愛'],
  ['Saved', '已儲存'],
  ['Login to Save', '登入以儲存'],

  // Login Required Modal
  ['Login to Save Favorites', '登入以儲存最愛'],
  ['Create a free account or login to save your favorite plants.', '建立免費帳戶或登入以儲存您喜愛的植物。'],
  ['Maybe later', '稍後再說'],

  // Privacy Policy
  ['We value your privacy', '我們重視您的隱私'],
  ['Decline', '拒絕'],
  ['Accept', '接受'],

  // Terms
  ['Terms and Conditions', '條款與條件'],

  // Toast messages
  ['Logged out successfully', '已成功登出'],
  ['Welcome back!', '歡迎回來！'],
  ['Removed from favorites', '已從最愛移除'],
  ['Added to favorites!', '已加入最愛！'],
  ['Please login to save favorites', '請登入以儲存最愛'],

  // Meta/OG tags (user-facing)
  ['PlantGlow \u2014 Your Personal Plant Advisor', 'PlantGlow \u2014 您的個人植物顧問'],
  ['Browse 30+ house plants, get care guides, and get personalized plant care reminders. Your all-in-one plant care companion.', '瀏覽超過 30 種室內植物，取得護理指南，獲得個人化的植物護理提醒。您的一站式植物護理助手。'],

  // Nav labels
  ['Login', '登入'],
  ['Logout', '登出'],
  ['Close', '關閉'],
  ['Popular Plants', '熱門植物'],
  ['Blog', '部落格'],
  ['How It Works', '如何運作'],
  ['Login / Register', '登入 / 註冊'],

  // Cookie banner
  ['We use cookies to enhance your browsing experience', '我們使用 cookies 來增強您的瀏覽體驗'],

  // Plant card tooltips
  ['Light level needed', '所需光線等級'],
  ['How often to water','澆水頻率'],
  ['Login to save', '登入以儲存'],
  ['Remove from favorites', '從最愛移除'],
  ['Add to favorites', '加入最愛'],
];

for (const [eng, zh] of translations) {
  html = html.split(eng).join(zh);
}

// Fix lang attribute
html = html.replace(/<html lang="en">/, '<html lang="zh-Hant">');

// Fix nav link: on Chinese page, show "EN" linking to index.html
// The English nav has: <a href="index-zh.html" class="...">中文</a>
// On the Chinese page, it should show: <a href="index.html" class="...">EN</a>
html = html.replace(
  /<a href="index-zh\.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">[\u4e00-\u9fff]+<\/a>/,
  '<a href="index.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">EN</a>'
);

fs.writeFileSync('plantglow/index-zh.html', html, 'utf8');
console.log('Done!');

// Verify function names are preserved
const origFns = fs.readFileSync('plantglow/index.html', 'utf8').match(/function \w+/g);
const zhFns = html.match(/function \w+/g);
const missing = origFns.filter(f => !zhFns.includes(f));
console.log('Missing functions:', missing.length === 0 ? 'None' : missing);

// Check key strings
const checks = ['園藝變得更簡單', '熱門植物', '全部植物', '我的最愛', 'showAllPlantsView', 'renderPlants', 'openLoginRequiredModal', 'closeLoginRequiredModal'];
for (const s of checks) {
  console.log(html.includes(s) ? 'OK: ' + s : 'MISSING: ' + s);
}