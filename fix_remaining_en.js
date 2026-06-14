const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Privacy remaining translations
h = h.split('<strong>WhatsApp Login:</strong> Your WhatsApp phone number is used solely for login authentication. We send a <strong>verification code</strong> via WhatsApp — no password required.</p>')
    .join('<strong>WhatsApp 登入：</strong>您的 WhatsApp 電話號碼僅用於登入驗證。我們透過 WhatsApp 發送<strong>驗證碼</strong>，無需密碼。</p>');

h = h.split('<strong>Email (Optional):</strong> If you register for our newsletter, we collect your email to send service updates and promotions.</p>')
    .join('<strong>電子郵件（選填）：</strong>如果您訂閱電子報，我們會收集您的電子郵件以發送服務更新和促銷資訊。</p>');

h = h.split('<li>Login authentication via email or Google</li>')
    .join('<li>透過電子郵件或 Google 登入驗證</li>');

h = h.split('<li>Service updates about PlantGlow</li>')
    .join('<li>有關 PlantGlow 的服務更新</li>');

h = h.split('<li>Promotions about Tradex Dev. Co.</li>')
    .join('<li>有關 Tradex Dev. Co. 的促銷資訊</li>');

h = h.split('<p class="mb-2">We <strong>DO NOT</strong>:</p>')
    .join('<p class="mb-2">我們<strong>不會</strong>：</p>');

// Fix the duplicate "與任何第三方分享您的電子郵件" - one should be different
// Find and fix the second occurrence of the duplicate
const dupIdx = h.indexOf('<li>與任何第三方分享您的電子郵件</li>', h.indexOf('<li>與任何第三方分享您的電子郵件</li>') + 1);
if (dupIdx >= 0) {
  h = h.substring(0, dupIdx) + '<li>分享您的電話號碼給第三方</li>' + h.substring(dupIdx + '<li>與任何第三方分享您的電子郵件</li>'.length);
}

h = h.split('<p class="mb-4">You can request access, correction, or deletion of your data at any time. To unsubscribe from emails, contact <strong>hello@plantglow.com</strong>.</p>')
    .join('<p class="mb-4">您可以隨時要求存取、更正或刪除您的資料。如要取消訂閱電子報，請聯絡 <strong>hello@plantglow.com</strong>。</p>');

h = h.split('<p>Questions? Email us at <strong>hello@plantglow.com</strong></p>')
    .join('<p>問題？請寄電子郵件至 <strong>hello@plantglow.com</strong></p>');

// Terms remaining translations
h = h.split('<p class="mb-4">PlantGlow provides an online plant database and care guides to help users grow plants successfully. The service is provided by <strong>Tradex Dev. Co.</strong></p>')
    .join('<p class="mb-4">PlantGlow 提供線上植物資料庫和護理指南，幫助使用者成功種植植物。此服務由 <strong>Tradex Dev. Co.</strong> 提供。</p>');

h = h.split('<p class="mb-2"><strong>WhatsApp Login:</strong> You may log in using your WhatsApp phone number. A verification code will be sent to your WhatsApp to verify your identity. You are responsible for keeping your account credentials secure.</p>')
    .join('<p class="mb-2"><strong>WhatsApp 登入：</strong>您可以使用 WhatsApp 電話號碼登入。驗證碼將發送到您的 WhatsApp 以驗證您的身份。您有責任確保帳戶憑證的安全。</p>');

h = h.split('<p class="mb-2">We value your feedback! Any information, suggestions, or data you provide through PlantGlow may be used by <strong>Tradex Dev. Co.</strong> to:</p>')
    .join('<p class="mb-2">我們重視您的回饋！您透過 PlantGlow 提供的任何資訊、建議或資料可能會被 <strong>Tradex Dev. Co.</strong> 用於：</p>');

h = h.split('<p class="mb-4">PlantGlow provides plant care information for reference purposes. While we strive for accuracy, we cannot guarantee that all information is completely error-free. Use your own judgment when caring for your plants.</p>')
    .join('<p class="mb-4">PlantGlow 提供植物護理資訊僅供參考。我們致力於保持準確性，但無法保證所有資訊完全無誤。護理植物時請自行判斷。</p>');

h = h.split('<p class="mb-4">Your use of PlantGlow is also governed by our 隱私權政策. Please review it to understand how we handle your data.</p>')
    .join('<p class="mb-4">您使用 PlantGlow 也受我們的隱私權政策約束。請查閱以了解我們如何處理您的資料。</p>');

h = h.split('<p class="mb-4">We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>')
    .join('<p class="mb-4">我們可能會不時更新這些條款。在更改後繼續使用服務即表示接受新條款。</p>');

h = h.split('<p>Questions about these terms? 聯絡我們 us at <strong>hello@plantglow.com</strong></p>')
    .join('<p>如對這些條款有疑問？請聯絡我們 <strong>hello@plantglow.com</strong></p>');

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('Fixed remaining English text');

// Verify
const h2 = fs.readFileSync('plantglow/index-zh.html', 'utf8');
console.log('\nVerification:');
console.log('Has WhatsApp Login (EN)?', h2.includes('Your WhatsApp phone number'));
console.log('Has Email (Optional) (EN)?', h2.includes('If you register for our newsletter'));
console.log('Has Login authentication (EN)?', h2.includes('Login authentication via email'));
console.log('Has We DO NOT (EN)?', h2.includes('We <strong>DO NOT</strong>'));
console.log('Has You can request (EN)?', h2.includes('You can request access'));
console.log('Has Questions? Email us (EN)?', h2.includes('Questions? Email us at'));
console.log('Has PlantGlow provides (EN)?', h2.includes('PlantGlow provides an online plant'));
console.log('Has You may log in (EN)?', h2.includes('You may log in using your WhatsApp'));
console.log('Has We value your feedback (EN)?', h2.includes('We value your feedback!'));
console.log('Has Questions about these terms (EN)?', h2.includes('Questions about these terms'));