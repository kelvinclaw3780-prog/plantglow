const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', 'utf8');

// Add Privacy Policy popup modal before </body>
const privacyPopup = `
  <!-- PRIVACY POLICY POPUP -->
  <div id="privacy-popup" class="fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onclick="closePrivacyPopup()">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 class="text-lg font-bold text-forest-900">Privacy Policy</h2>
        <button onclick="closePrivacyPopup()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed">
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
        <p class="mb-4">You can request access, correction, or deletion of your data at any time. To unsubscribe from emails, contact <strong>hello@plantglow.com</strong>.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Contact</h3>
        <p>Questions? Email us at <strong>hello@plantglow.com</strong></p>
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
  </script>
`;

// Insert before </body>
c = c.replace('</body>', privacyPopup + '</body>');
console.log('Added privacy popup');

// Update footer link
c = c.replace('href="#" class="hover:text-forest-300 transition">Privacy Policy', 'href="javascript:openPrivacyPopup()" class="hover:text-forest-300 transition">Privacy Policy');
console.log('Updated footer link');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator\plantglow\index.html', c, 'utf8');
console.log('Done');