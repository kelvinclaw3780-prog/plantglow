const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== FINAL COMPREHENSIVE CHECK ===\n');

// Check all key areas
const checks = [
  // Nav
  ['>登入</a>', 'Nav Login'],
  ['>登入 / 註冊</a>', 'Nav Login/Register'],
  ['>部落格</a>', 'Nav Blog'],
  ['>如何運作</a>', 'Nav How It Works'],
  ['>登出</span>', 'Nav Logout'],
  ['>關閉</button>', 'Close button'],
  
  // Plant cards
  ['nameZh:', 'Plant nameZh field'],
  ['plant.nameZh', 'Plant nameZh in rendering'],
  
  // Modal
  ['登入以儲存最愛', 'Login modal title'],
  ['建立免費帳戶', 'Login modal text'],
  ['透過 WhatsApp 聊天', 'Chat with us'],
  
  // Popups
  ['隱私權政策', 'Privacy popup title'],
  ['條款與條件', 'Terms popup title'],
  ['我們收集的資訊', 'Privacy section 1'],
  ['我們如何使用您的資訊', 'Privacy section 2'],
  ['資料分享', 'Privacy section 3'],
  ['您的權利', 'Privacy section 4'],
  ['條款接受', 'Terms section 1'],
  ['服務描述', 'Terms section 2'],
  ['使用者帳戶', 'Terms section 3'],
  ['使用者回饋', 'Terms section 4'],
  
  // Cookie
  ['我們使用 cookies', 'Cookie banner'],
  ['>接受</button>', 'Accept button'],
  ['>拒絕</button>', 'Decline button'],
  
  // Instagram
  ['在 Instagram 上追蹤我們', 'Instagram button'],
  ['保持靈感', 'Instagram heading'],
  
  // Footer
  ['版權所有', 'Copyright'],
];

let passed = 0;
let failed = 0;
for (const [str, desc] of checks) {
  const ok = h.includes(str);
  console.log((ok ? '[OK]' : '[FAIL]') + ' ' + desc);
  if (ok) passed++; else failed++;
}

console.log('\nPassed:', passed, '/', checks.length);

// Check for any remaining English text in visible areas
console.log('\n=== SCANNING FOR REMAINING ENGLISH ===');
let pos = 0;
const englishAreas = [];
while (pos < h.length - 10) {
  const tagOpen = h.indexOf('>', pos);
  if (tagOpen < 0 || tagOpen > h.length - 10) break;
  const tagClose = h.indexOf('<', tagOpen + 1);
  if (tagClose < 0) break;
  
  const content = h.substring(tagOpen + 1, tagClose).trim();
  const hasEnglish = /[A-Za-z]{4,}/.test(content);
  const hasChinese = /[\u4e00-\u9fff]/.test(content);
  const isCode = /^(id|class|style|onclick|href|src|data|type)=/i.test(content);
  
  if (hasEnglish && !hasChinese && !isCode && content.length < 100 && content.length > 3) {
    if (!content.includes('dataLayer') && !content.includes('gtag') && !content.includes('firebase') &&
        !content.includes('localStorage') && !content.includes('PlantGlow') && !content.includes('Tradex')) {
      englishAreas.push(content);
    }
  }
  pos = tagClose + 1;
}

if (englishAreas.length > 0) {
  console.log('Found', englishAreas.length, 'potential English areas:');
  englishAreas.slice(0, 10).forEach((e, i) => console.log((i+1) + '.', JSON.stringify(e.substring(0, 60))));
} else {
  console.log('No remaining visible English text found!');
}