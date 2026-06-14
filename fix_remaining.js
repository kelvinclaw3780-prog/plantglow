const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// 1. Fix nav login link: "Login" → "登入"
h = h.replace(
  /<a href="login\.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">Login<\/a>/,
  '<a href="login.html" class="text-sm font-medium text-forest-600 hover:text-forest-700 transition">登入</a>'
);

// 2. Fix login modal title: "登入以儲存 Favorites" → "登入以儲存最愛"
h = h.split('登入以儲存 Favorites').join('登入以儲存最愛');

// 3. Fix Instagram text: "Follow <strong>@plantglow</strong> for daily plant tips, care hacks, and greenery inspiration."
h = h.split('Follow <strong>@plantglow</strong> for daily plant tips, care hacks, and greenery inspiration.').join('追蹤 <strong>@plantglow</strong> 獲取每日植物技巧、護理妙招和綠色靈感。');

// 4. Fix the Instagram button text (inside the SVG anchor text)
h = h.split('在 Instagram 上追蹤我們').join('在 Instagram 上追蹤我們');

// 5. Fix "Favorites" in the modal text "Create a free account or login to save your favorite plants."
// This was already translated in the main modal but check
const idxFav = h.indexOf('favorite plants');
if (idxFav >= 0) {
  console.log('Found favorite plants at:', idxFav, JSON.stringify(h.substring(idxFav - 30, idxFav + 40)));
}

// 6. Fix the Orchid description bug: "澆水 with ice cubes" should be "Water with ice cubes"
// This is in the plant data JSON-LD
h = h.split('澆水 with ice cubes').join('Water with ice cubes');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixes applied');

// Verify
console.log('Has 登入 nav?', h.includes('>登入</a>'));
console.log('Has 登入以儲存最愛?', h.includes('登入以儲存最愛'));
console.log('Has 追蹤 @plantglow?', h.includes('追蹤 <strong>@plantglow</strong>'));
console.log('Has 澆水 with ice cubes?', h.includes('澆水 with ice cubes'));
console.log('Has Water with ice cubes?', h.includes('Water with ice cubes'));
console.log('Has Login in nav?', h.includes('>Login</a>'));
console.log('Has Follow @plantglow?', h.includes('Follow <strong>@plantglow</strong>'));