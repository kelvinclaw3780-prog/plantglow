const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Fix cookie banner English text
const oldCookie = '我們使用 cookies 來增強您的瀏覽體驗 and analyze our traffic. By clicking "Accept", you consent to our use of cookies.';
const newCookie = '我們使用 cookies 來增強您的瀏覽體驗並分析流量。點擊「接受」即表示您同意我們使用 cookies。';
console.log('Cookie text found?', h.includes(oldCookie));
h = h.split(oldCookie).join(newCookie);

// Fix the plant card heart icon text "Login to save" - this is in aria-label/tooltip
// This is in JS renderPlantCard function
const heartIdx = h.indexOf("'Login to save'");
if (heartIdx >= 0) {
  console.log('Heart Login to save found at:', heartIdx);
  console.log('Context:', JSON.stringify(h.substring(heartIdx - 50, heartIdx + 80)));
  h = h.split("'Login to save'").join("'登入以儲存'");
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed');

// Verify
console.log('Has new cookie text?', h.includes(newCookie));
console.log('Has Login to save?', h.includes("'Login to save'"));
console.log('Has 登入以儲存?', h.includes("'登入以儲存'"));
console.log('Has and analyze our traffic?', h.includes('and analyze our traffic'));