const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Replace checkbox links to call popup functions instead of window.open
c = c.replace(
  'href="javascript:void(window.open(\'privacy.html\',\'_blank\',\'width=600,height=700\'))"',
  'href="javascript:openPrivacyPopup()"'
);
c = c.replace(
  'href="javascript:void(window.open(\'terms.html\',\'_blank\',\'width=600,height=700\'))"',
  'href="javascript:openTermsPopup()"'
);

// Add popup HTML before </body>
const privacyPopup = `
  <!-- Privacy Policy Popup -->
  <div id="privacy-popup" class="fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onclick="closePrivacyPopup()">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <img src="kelvin_logo_transparent.png" alt="PlantGlow" class="w-8 h-8 object-contain glow-leaf">
          <h2 class="text-lg font-bold text-forest-900">Privacy Policy</h2>
        </div>
        <button onclick="closePrivacyPopup()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed flex-1">
        <p class="text-xs text-gray-400 mb-4">Last updated: May 11, 2026</p>
        <p class="mb-4">PlantGlow is operated by <strong>Tradex Dev. Co.</strong> ("we", "our", or "us"). We are committed to protecting your privacy.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Information We Collect</h3>
        <p class="mb-2"><strong>WhatsApp Login:</strong> Your WhatsApp phone number is used solely for login authentication. We send a <strong>verification code</strong> via WhatsApp — no password required.</p>
        <p class="mb-4"><strong>Email (Optional):</strong> If you register for our newsletter, we collect your email to send service updates and promotions.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">2. How We Use Your Information</h3>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Login authentication via WhatsApp verification code</li>
          <li>Service updates about PlantGlow</li>
          <li>Promotions about Tradex Dev. Co.</li>
        </ul>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">3. Data Sharing</h3>
        <p class="mb-2">We <strong>DO NOT</strong>:</p>
        <ul class="list-disc pl-5 mb-4 space-y-1 text-red-600">
          <li>Share your WhatsApp number with any third party</li>
          <li>Share your email with any third party</li>
          <li>Sell or rent your contact information</li>
        </ul>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">4. Your Rights</h3>
        <p class="mb-4">You can request access, correction, or deletion of your data at any time. To unsubscribe, contact <strong>hello@plantglow.com</strong>.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Contact</h3>
        <p>Questions? Email us at <strong>hello@plantglow.com</strong></p>
      </div>
    </div>
  </div>
`;

const termsPopup = `
  <!-- Terms and Conditions Popup -->
  <div id="terms-popup" class="fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onclick="closeTermsPopup()">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <img src="kelvin_logo_transparent.png" alt="PlantGlow" class="w-8 h-8 object-contain glow-leaf">
          <h2 class="text-lg font-bold text-forest-900">Terms and Conditions</h2>
        </div>
        <button onclick="closeTermsPopup()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed flex-1">
        <p class="text-xs text-gray-400 mb-4">Last updated: May 11, 2026</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Acceptance of Terms</h3>
        <p class="mb-4">By using PlantGlow, you agree to these Terms and Conditions. If you do not agree, please do not use our service.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">2. Description of Service</h3>
        <p class="mb-4">PlantGlow provides an online plant database and care guides to help users grow plants successfully. The service is provided by <strong>Tradex Dev. Co.</strong></p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">3. User Accounts</h3>
        <p class="mb-2"><strong>WhatsApp Login:</strong> You may log in using your WhatsApp phone number. A verification code will be sent to your WhatsApp to verify your identity.</p>
        <p class="mb-4">You must be at least 18 years old to create an account.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">4. User Feedback and Data Usage</h3>
        <p class="mb-2">Any information, suggestions, or data you provide through PlantGlow may be used by <strong>Tradex Dev. Co.</strong> to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Improve and enhance plant information in our database</li>
          <li>Improve the way we help users grow plants</li>
          <li>Develop new features and services</li>
        </ul>
        <p class="mb-4">By submitting feedback, you grant us permission to use your input for these purposes without compensation.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Acceptable Use</h3>
        <p class="mb-4">You agree not to misuse the service, attempt unauthorized access, or disrupt the platform.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">6. Disclaimer</h3>
        <p class="mb-4">PlantGlow provides plant care information for reference purposes. While we strive for accuracy, we cannot guarantee that all information is completely error-free.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">7. Privacy</h3>
        <p class="mb-4">Your use of PlantGlow is also governed by our Privacy Policy.</p>
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">8. Contact</h3>
        <p>Questions about these terms? Contact us at <strong>hello@plantglow.com</strong></p>
      </div>
    </div>
  </div>

  <script>
    function openPrivacyPopup() {
      document.getElementById('privacy-popup').classList.remove('hidden');
      document.getElementById('privacy-popup').classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }
    function closePrivacyPopup() {
      document.getElementById('privacy-popup').classList.add('hidden');
      document.getElementById('privacy-popup').classList.remove('flex');
      document.body.style.overflow = '';
    }
    function openTermsPopup() {
      document.getElementById('terms-popup').classList.remove('hidden');
      document.getElementById('terms-popup').classList.add('flex');
      document.body.style.overflow = 'hidden';
      lucide.createIcons();
    }
    function closeTermsPopup() {
      document.getElementById('terms-popup').classList.add('hidden');
      document.getElementById('terms-popup').classList.remove('flex');
      document.body.style.overflow = '';
    }
  </script>
`;

c = c.replace('</body>', privacyPopup + termsPopup + '</body>');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done. Links updated and popups added.');