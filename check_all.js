const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Check for common English words in visible content areas
// Look for patterns like English text in <p>, <h2>, <h3>, <span>, etc.

// Areas to check:
// 1. Hero section
// 2. Plant cards (show less, browse all)
// 3. How it works
// 4. Blog section
// 5. Email capture
// 6. Instagram
// 7. Footer
// 8. Modals

const checks = [
  // Nav
  ['Login</a>', '>登入</a>'],
  ['Login / Register', '登入 / 註冊'],
  
  // Blog
  ['View All Blog Posts', '查看所有文章'],
  ['Practical advice', '實用建議'],
  
  // How it works
  ['Explore 50 plants', '探索 50 種植物'],
  
  // Instagram
  ['Stay Inspired', '保持靈感'],
  
  // Email capture
  ['Register Now', '立即註冊'],
  ['Thanks! You\'re on the list', '謝謝！您已加入名單'],
  
  // Footer
  ['All rights reserved', '版權所有'],
  
  // Modal
  ['Login to Save', '登入以儲存'],
  ['Maybe later', '稍後再說'],
  ['We value your privacy', '我們重視您的隱私'],
  ['Decline', '拒絕'],
  ['Accept', '接受'],
  
  // Cookie banner
  ['We use cookies', '我們使用 cookies'],
  
  // Toast
  ['Logged out successfully', '已成功登出'],
  ['Welcome back', '歡迎回來'],
  ['Added to favorites', '已加入最愛'],
  ['Removed from favorites', '已從最愛移除'],
];

console.log('=== CHECKING REMAINING ENGLISH ===\n');
for (const [eng, expected] of checks) {
  const has = h.includes(eng);
  const translated = h.includes(expected);
  console.log(has ? 'STILL EN: ' + eng : translated ? 'OK: ' + expected : 'MISSING: ' + expected + ' (original: ' + eng + ')');
}

// Check for any untranslated text that might be visible
// Look for English words in content sections
console.log('\n=== SPOT CHECK CONTENT AREAS ===\n');

// Hero section
const heroIdx = h.indexOf('一站式植物資料庫');
console.log('Hero:', heroIdx >= 0 ? 'Chinese OK' : 'English?');

// Popular plants section  
const popularIdx = h.indexOf('熱門植物');
console.log('Popular Plants section:', popularIdx >= 0 ? 'Chinese OK' : 'English?');

// How it works
const howIdx = h.indexOf('如何運作');
console.log('How It Works:', howIdx >= 0 ? 'Chinese OK' : 'English?');

// Blog
const blogIdx = h.indexOf('植物護理技巧與指南');
console.log('Blog:', blogIdx >= 0 ? 'Chinese OK' : 'English?');

// Instagram
const igIdx = h.indexOf('在 Instagram 上追蹤我們');
console.log('Instagram:', igIdx >= 0 ? 'Chinese OK' : 'English?');

// Footer
const footerIdx = h.indexOf('隱私權政策');
console.log('Footer:', footerIdx >= 0 ? 'Chinese OK' : 'English?');

// Check for English in plant data JSON
const plantDataIdx = h.indexOf('plantData');
console.log('Plant data section:', plantDataIdx >= 0 ? 'Found' : 'Not found');

// Check for "Water" in plant descriptions (should not be "澆水")
const waterBug = h.indexOf('澆水 with');
console.log('Water bug (澆水 with):', waterBug >= 0 ? 'STILL HAS BUG' : 'Clean');

// Check for mojibake
const hasMojibake = h.includes('â') || h.includes('Ã') || h.includes('Â');
console.log('Mojibake check:', hasMojibake ? 'HAS MOJIBAKE!' : 'Clean UTF-8');