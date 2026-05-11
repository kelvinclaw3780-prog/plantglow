const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Add agreement checkboxes before the submit button
const checkboxHTML = `
    <!-- Agreement Checkboxes -->
    <div class="mt-4 space-y-2" id="agreement-checkboxes">
      <label class="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" id="agree-privacy" class="mt-1 w-4 h-4 rounded border-gray-300 text-forest-600 focus:ring-forest-400">
        <span class="text-xs text-gray-600">I agree to the <a href="javascript:parent.openPrivacyPopup()" class="text-forest-600 hover:underline">Privacy Policy</a></span>
      </label>
      <label class="flex items-start gap-2 cursor-pointer">
        <input type="checkbox" id="agree-terms" class="mt-1 w-4 h-4 rounded border-gray-300 text-forest-600 focus:ring-forest-400">
        <span class="text-xs text-gray-600">I agree to the <a href="javascript:parent.openTermsPopup()" class="text-forest-600 hover:underline">Terms & Conditions</a></span>
      </label>
    </div>
`;

// Insert before <!-- Submit Button -->
c = c.replace('    <!-- Submit Button -->', checkboxHTML + '\n    <!-- Submit Button -->');
console.log('Checkboxes added:', c.includes('id="agree-privacy"'));
console.log('Terms link:', c.includes('openTermsPopup()'));
console.log('Privacy link:', c.includes('openPrivacyPopup()'));

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');