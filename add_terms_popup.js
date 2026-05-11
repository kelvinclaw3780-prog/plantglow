const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Terms and Conditions popup HTML
const termsPopup = `
  <!-- TERMS AND CONDITIONS POPUP -->
  <div id="terms-popup" class="fixed inset-0 z-[200] hidden items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onclick="closeTermsPopup()">
    <div class="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col" onclick="event.stopPropagation()">
      <div class="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 class="text-lg font-bold text-forest-900">Terms and Conditions</h2>
        <button onclick="closeTermsPopup()" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      <div class="p-6 overflow-y-auto text-sm text-gray-600 leading-relaxed">
        <p class="text-xs text-gray-400 mb-4">Last updated: May 11, 2026</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">1. Acceptance of Terms</h3>
        <p class="mb-4">By using PlantGlow, you agree to these Terms and Conditions. If you do not agree, please do not use our service.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">2. Description of Service</h3>
        <p class="mb-4">PlantGlow provides an online plant database and care guides to help users grow plants successfully. The service is provided by <strong>Tradex Dev. Co.</strong></p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">3. User Accounts</h3>
        <p class="mb-2"><strong>WhatsApp Login:</strong> You may log in using your WhatsApp phone number. A verification code will be sent to your WhatsApp to verify your identity. You are responsible for keeping your account credentials secure.</p>
        <p class="mb-4">You must be at least 18 years old to create an account.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">4. User Feedback and Data Usage</h3>
        <p class="mb-2">We value your feedback! Any information, suggestions, or data you provide through PlantGlow may be used by <strong>Tradex Dev. Co.</strong> to:</p>
        <ul class="list-disc pl-5 mb-4 space-y-1">
          <li>Improve and enhance plant information in our database</li>
          <li>Improve the way we help users grow plants</li>
          <li>Develop new features and services</li>
        </ul>
        <p class="mb-4">By submitting feedback, you grant us permission to use your input for these purposes without compensation.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">5. Acceptable Use</h3>
        <p class="mb-4">You agree not to misuse the service, attempt unauthorized access, or disrupt the platform. We reserve the right to suspend accounts that violate these terms.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">6. Disclaimer</h3>
        <p class="mb-4">PlantGlow provides plant care information for reference purposes. While we strive for accuracy, we cannot guarantee that all information is completely error-free. Use your own judgment when caring for your plants.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">7. Privacy</h3>
        <p class="mb-4">Your use of PlantGlow is also governed by our Privacy Policy. Please review it to understand how we handle your data.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">8. Changes to Terms</h3>
        <p class="mb-4">We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms.</p>
        
        <h3 class="font-semibold text-gray-900 mt-4 mb-2">9. Contact</h3>
        <p>Questions about these terms? Contact us at <strong>hello@plantglow.com</strong></p>
      </div>
    </div>
  </div>

  <script>
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

// Add before </body>
c = c.replace('</body>', termsPopup + '</body>');
console.log('Terms popup added:', c.includes('id="terms-popup"'));

// Update footer Terms link
c = c.replace('href="#" class="hover:text-forest-300 transition">Terms</a>', 'href="javascript:openTermsPopup()" class="hover:text-forest-300 transition">Terms</a>');
console.log('Footer link updated:', c.includes('openTermsPopup()'));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done. Length:', c.length);