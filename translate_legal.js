const fs = require('fs');
let h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Privacy policy translations
const privacyTranslations = {
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Information We Collect</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. 我們收集的資訊</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. How We Use Your Information</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. 我們如何使用您的資訊</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. Data Sharing</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. 資料分享</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. Your Rights</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. 您的權利</h3>',
  
  '<p class="mb-4">PlantGlow is operated by <strong>Tradex Dev. Co.</strong> ("we", "our", or "us"). We are committed to protecting your privacy.</p>':
    '<p class="mb-4">PlantGlow 由 <strong>Tradex Dev. Co.</strong>（「我們」或「本公司」）營運。我們致力於保護您的隱私。</p>',
  
  '<p class="mb-4"><strong>WhatsApp Login:</strong> Your WhatsApp phone number is used solely for login authentication. We send a verification code via WhatsApp — no password required.</p>':
    '<p class="mb-4"><strong>WhatsApp 登入：</strong>您的 WhatsApp 電話號碼僅用於登入驗證。我們透過 WhatsApp 發送驗證碼，無需密碼。</p>',
  
  '<p class="mb-4"><strong>Email (Optional):</strong> If you register for our newsletter, we collect your email to send service updates and promotions. You can unsubscribe anytime.</p>':
    '<p class="mb-4"><strong>電子郵件（選填）：</strong>如果您訂閱電子報，我們會收集您的電子郵件以發送服務更新和促銷資訊。您可以隨時取消訂閱。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Login authentication via email or Google</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. 透過電子郵件或 Google 登入驗證</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. Service updates about PlantGlow</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. 有關 PlantGlow 的服務更新</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. Promotions about Tradex Dev. Co.</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. 有關 Tradex Dev. Co. 的促銷資訊</h3>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. Data Sharing</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. 資料分享</h3>',
  
  '<p class="mb-4">We <strong>DO NOT</strong>:</p>':
    '<p class="mb-4">我們<strong>不會</strong>：</p>',
  
  '<li>Share your email with any third party</li>':
    '<li>與任何第三方分享您的電子郵件</li>',
  
  '<li>Sell or rent your contact information</li>':
    '<li>出售或出租您的聯絡資訊</li>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. Your Rights</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. 您的權利</h3>',
  
  '<p class="mb-4">You can request access, correction, or deletion of your data at any time. To unsubscribe from emails, click the unsubscribe link in any email or contact us directly.</p>':
    '<p class="mb-4">您可以隨時要求存取、更正或刪除您的資料。如要取消訂閱電子報，請點擊任何電子郵件中的取消訂閱連結，或直接聯絡我們。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Contact Us</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">5. 聯絡我們</h3>',
  
  '<p class="mb-4">Questions? Email us at <a href="mailto:support@plantglow.net" class="text-forest-600 hover:underline">support@plantglow.net</a></p>':
    '<p class="mb-4">問題？請寄電子郵件至 <a href="mailto:support@plantglow.net" class="text-forest-600 hover:underline">support@plantglow.net</a></p>'
};

// Terms translations
const termsTranslations = {
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Acceptance of Terms</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">1. 條款接受</h3>',
  
  '<p class="mb-4">By using PlantGlow, you agree to these 條款與條件. If you do not agree, please do not use our service.</p>':
    '<p class="mb-4">使用 PlantGlow 即表示您同意這些條款與條件。如果您不同意，請勿使用我們的服務。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. Description of Service</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">2. 服務描述</h3>',
  
  '<p class="mb-4">PlantGlow provides an online plant database and care guides to help users grow plants. We reserve the right to modify or discontinue the service at any time.</p>':
    '<p class="mb-4">PlantGlow 提供線上植物資料庫和護理指南，幫助使用者種植植物。我們保留隨時修改或停止服務的權利。</p>',
  
  '<p class="mb-4">PlantGlow is operated by <strong>Tradex Dev. Co.</strong></p>':
    '<p class="mb-4">PlantGlow 由 <strong>Tradex Dev. Co.</strong> 營運</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. User Accounts</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">3. 使用者帳戶</h3>',
  
  '<p class="mb-4"><strong>WhatsApp Login:</strong> You can create an account using your WhatsApp number. Keep your account secure and notify us immediately of any unauthorized use.</p>':
    '<p class="mb-4"><strong>WhatsApp 登入：</strong>您可以使用 WhatsApp 電話號碼建立帳戶。保持帳戶安全，如有未經授權的使用請立即通知我們。</p>',
  
  '<p class="mb-4">You must be at least 18 years old to create an account.</p>':
    '<p class="mb-4">您必須年滿 18 歲才能建立帳戶。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. User Feedback and Data Usage</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">4. 使用者回饋與資料使用</h3>',
  
  '<p class="mb-4">We value your feedback! Any information, suggestions, or data you provide through the service may be used to improve PlantGlow.</p>':
    '<p class="mb-4">我們重視您的回饋！您透過服務提供的任何資訊、建議或資料可能會被用於改進 PlantGlow。</p>',
  
  '<p class="mb-4">By submitting feedback, you grant us permission to use your input for these purposes without compensation.</p>':
    '<p class="mb-4">提交回饋即表示您授予我們出於這些目的使用您的意見的權利，無需補償。</p>',
  
  '<p class="mb-4">Examples of how we may use your feedback:</p>':
    '<p class="mb-4">我們可能使用您回饋的範例：</p>',
  
  '<li>Improve and enhance plant information in our database</li>':
    '<li>改進和增強我們資料庫中的植物資訊</li>',
  
  '<li>Improve the way we help users grow plants</li>':
    '<li>改進我們幫助使用者種植植物的方式</li>',
  
  '<li>Develop new features and services</li>':
    '<li>開發新功能和服務</li>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Acceptable Use</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">5. 可接受的使用</h3>',
  
  '<p class="mb-4">You agree not to misuse the service, attempt unauthorized access, or disrupt the platform. We reserve the right to suspend accounts that violate these terms.</p>':
    '<p class="mb-4">您同意不濫用服務、不嘗試未經授權的訪問或不干擾平台。我們保留暫停違反這些條款之帳戶的權利。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">6. Disclaimer</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">6. 免責聲明</h3>',
  
  '<p class="mb-4">PlantGlow is provided "as is." While we strive to provide accurate plant care information, we cannot guarantee the accuracy or completeness of all information. Use your own judgment when caring for plants.</p>':
    '<p class="mb-4">PlantGlow 按「現狀」提供。雖然我們致力於提供準確的植物護理資訊，但我們無法保證所有資訊的準確性或完整性。護理植物時請自行判斷。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">7. Privacy</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">7. 隱私權</h3>',
  
  '<p class="mb-4">Your privacy is important to us. Please review our <a href="#" onclick="closeTermsPopup(); openPrivacyPopup(); return false;" class="text-forest-600 hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your data.</p>':
    '<p class="mb-4">您的隱私對我們很重要。请查看我们的<a href="#" onclick="closeTermsPopup(); openPrivacyPopup(); return false;" class="text-forest-600 hover:underline">隱私權政策</a>以了解我們如何收集、使用和保護您的資料。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">8. Changes to Terms</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">8. 條款變更</h3>',
  
  '<p class="mb-4">We may update these terms from time to time. Continued use of the service after any changes constitutes acceptance of the new terms.</p>':
    '<p class="mb-4">我們可能會不時更新這些條款。在任何更改後繼續使用服務即表示接受新條款。</p>',
  
  '<h3 class="font-semibold text-gray-900 mt-4 mb-2">9. Contact Us</h3>':
    '<h3 class="font-semibold text-gray-900 mt-4 mb-2">9. 聯絡我們</h3>',
  
  '<p class="mb-4">For questions about these terms, please contact us at <a href="mailto:support@plantglow.net" class="text-forest-600 hover:underline">support@plantglow.net</a></p>':
    '<p class="mb-4">如有關於這些條款的問題，請聯絡 <a href="mailto:support@plantglow.net" class="text-forest-600 hover:underline">support@plantglow.net</a></p>'
};

// Apply privacy translations
for (const [eng, zh] of Object.entries(privacyTranslations)) {
  if (h.includes(eng)) {
    h = h.split(eng).join(zh);
    console.log('Translated privacy:', eng.substring(0, 50));
  } else {
    console.log('NOT FOUND privacy:', eng.substring(0, 50));
  }
}

// Apply terms translations
for (const [eng, zh] of Object.entries(termsTranslations)) {
  if (h.includes(eng)) {
    h = h.split(eng).join(zh);
    console.log('Translated terms:', eng.substring(0, 50));
  } else {
    console.log('NOT FOUND terms:', eng.substring(0, 50));
  }
}

fs.writeFileSync('plantglow/index-zh.html', h, 'utf8');
console.log('\nDone translating privacy and terms content');