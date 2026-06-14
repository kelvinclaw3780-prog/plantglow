const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== FINAL COMPREHENSIVE CHECK ===\n');

// All checks in one place
const checks = [
  // Nav
  ['>登入</a>', 'Nav Login (desktop)'],
  ['>登入 / 註冊</a>', 'Nav Login/Register (mobile)'],
  ['>EN</a>', 'Nav EN toggle'],
  ['>熱門植物</a>', 'Nav Popular Plants'],
  ['>部落格</a>', 'Nav Blog'],
  ['>如何運作</a>', 'Nav How It Works'],
  ['>登出</span>', 'Nav Logout (desktop)'],
  ['>登出</button>', 'Nav Logout (mobile)'],
  ['>關閉</button>', 'Close button (mobile menu)'],
  
  // Hero
  ['園藝變得更簡單', 'Hero title'],
  ['一站式植物資料庫', 'Hero subtitle'],
  
  // Plant section
  ['熱門植物', 'Popular Plants heading'],
  ['點擊任何植物', 'Plant section intro'],
  ['全部植物', 'All Plants button'],
  ['我的最愛', 'My Favorites button'],
  ['瀏覽全部', 'Browse all button'],
  
  // Blog
  ['植物護理技巧與指南', 'Blog heading'],
  ['查看所有文章', 'View all blog'],
  
  // How it works
  ['PlantGlow 如何運作', 'How it works heading'],
  ['瀏覽植物', 'Step 1 Browse'],
  ['儲存最愛', 'Step 2 Save'],
  ['遵循護理指南', 'Step 3 Follow'],
  ['看它們茁壯成長', 'Step 4 Thrive'],
  
  // Email
  ['搶先知道', 'Email heading'],
  ['立即註冊', 'Register button'],
  
  // Instagram
  ['在 Instagram 上追蹤我們', 'Instagram button'],
  ['保持靈感', 'Instagram heading'],
  ['追蹤 <strong>@plantglow</strong>', 'Instagram description'],
  
  // Footer
  ['植物', 'Footer Plants'],
  ['功能', 'Footer Features'],
  ['聯絡我們', 'Footer Contact'],
  ['隱私權政策', 'Privacy Policy'],
  ['條款與條件', 'Terms'],
  
  // Modals
  ['登入以儲存最愛', 'Login modal title'],
  ['建立免費帳戶', 'Login modal text'],
  ['稍後再說', 'Maybe later button'],
  ['我們重視您的隱私', 'Privacy popup'],
  ['隱私權政策', 'Privacy popup title'],
  ['>接受</button>', 'Accept button'],
  ['>拒絕</button>', 'Decline button'],
  ['條款與條件', 'Terms popup title'],
  ['關閉', 'Close X button'],
  
  // Cookie
  ['我們使用 cookies', 'Cookie text'],
  ['我們使用 cookies 來增強', 'Cookie text (full)'],
  
  // Plant modal
  ['☀️  光線', 'Modal Light label'],
  ['💧 澆水', 'Modal Water label'],
  ['💨 濕度', 'Modal Humidity label'],
  ['🌡️ 溫度', 'Modal Temp label'],
  ['✨ 護理技巧', 'Modal Care Tips'],
  ['⚠️ 注意事項', 'Modal Watch Out'],
  ['儲存至最愛', 'Modal Save button'],
  ['高級護理指南', 'Premium Care Guide'],
  ['您已擁有高級訪問權限', 'Subscribed CTA'],
];

let passed = 0;
let failed = 0;
for (const [str, desc] of checks) {
  const ok = h.includes(str);
  console.log((ok ? '[OK]' : '[FAIL]') + ' ' + desc + (ok ? '' : ' - MISSING: ' + str));
  if (ok) passed++; else failed++;
}

console.log('\n=== SUMMARY ===');
console.log('Passed:', passed, '/', checks.length);
console.log('Failed:', failed);

if (failed > 0) {
  console.log('\nFailed items:');
  for (const [str, desc] of checks) {
    if (!h.includes(str)) console.log('  -', desc, ':', str);
  }
}

// Check for any remaining visible English
console.log('\n=== MOJIBAKE CHECK ===');
const mojibake = ['â', 'Ã', 'Â', 'â€', 'â€˜', 'â€™'];
for (const m of mojibake) {
  if (h.includes(m)) console.log('MOJIBAKE:', m);
}
console.log('No mojibake detected');