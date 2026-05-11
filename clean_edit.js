const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

console.log('File size:', c.length);

// ===== 1. Remove PRICING section =====
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
if (pricingStart !== -1 && pricingEnd !== -1) {
  c = c.substring(0, pricingStart) + c.substring(pricingEnd);
  console.log('1. Pricing section removed');
}

// ===== 2. Hero section updates =====
const heroReplacements = [
  ['Your Personal<br class="sm:hidden"> Plant Advisor', 'Indoor Growing,<br class="sm:hidden"> Simplified'],
  ['Get plant care tips, identify species, and watering reminders — all through WhatsApp.', 'All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your plants.'],
  ['No credit card required to start', 'Free to browse • No credit card required'],
  ['href="#pricing"', 'href="#plants"'],
  ['<i data-lucide="message-circle" class="w-5 h-5"></i>\n      Get Started', '<i data-lucide="leaf" class="w-5 h-5"></i>\n      Explore Plants'],
];
heroReplacements.forEach(([old, val]) => {
  if (c.indexOf(old) !== -1) { c = c.replace(old, val); console.log('2. Replaced:', old.substring(0, 40)); }
  else console.log('2. NOT FOUND:', old.substring(0, 40));
});

// ===== 3. Features section =====
const featureReplacements = [
  ['Everything your plants need', 'Everything you need to grow thriving plants'],
  ['Built for plant lovers who want real results', 'All-in-one plant database — no more searching everywhere'],
  ['Browse 50+ plants with detailed care guides, light needs, and growth tips.', '20 plants with detailed care guides, all in one place. No more searching everywhere.'],
  ['Not sure if your space suits a plant? We\'ll tell you what thrives there.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['Ask anything about your plants via WhatsApp. Instant, personal replies.', 'Clear, actionable tips for watering, light, humidity, and more — all in one place.'],
  ['<i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>', '<i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>'],
  ['Never forget to water or fertilize. We send you timed reminders.', 'Stop guessing. Get clear guidance on exactly what your plants need to thrive.'],
  ['<i data-lucide="bell" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>', '<i data-lucide="sparkles" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Grow with Confidence</h3>'],
];
featureReplacements.forEach(([old, val]) => {
  if (c.indexOf(old) !== -1) { c = c.replace(old, val); console.log('3. Replaced:', old.substring(0, 40)); }
  else console.log('3. NOT FOUND:', old.substring(0, 40));
});

// ===== 4. How It Works =====
const howReplacements = [
  ['Browse our database or snap a photo. We\'ll identify it and show you care details.', 'Browse 20 plants with detailed care guides. Search by name or filter by what thrives in your space.'],
  ['Tell us your space — light, humidity, pets. We\'ll match you with plants that thrive.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['<h3 class="font-semibold text-lg mb-1">Subscribe on WhatsApp</h3>\n            <p class="text-forest-200 text-sm">Unlock unlimited plant advice and reminders for just $8/month.</p>', '<h3 class="font-semibold text-lg mb-1">Follow care guides</h3>\n            <p class="text-forest-200 text-sm">Get clear tips on watering, light, humidity, and more — all in one place.</p>'],
  ['<h3 class="font-semibold text-lg mb-1">Get personalized care</h3>\n            <p class="text-forest-200 text-sm">Watering alerts, fertilizer tips, and real answers — right when you need them.</p>', '<h3 class="font-semibold text-lg mb-1">Watch them thrive</h3>\n            <p class="text-forest-200 text-sm">Less time researching, more time enjoying. Your plants will thank you.</p>'],
];
howReplacements.forEach(([old, val]) => {
  if (c.indexOf(old) !== -1) { c = c.replace(old, val); console.log('4. Replaced:', old.substring(0, 40)); }
  else console.log('4. NOT FOUND:', old.substring(0, 40));
});

// ===== 5. Remove premium field from each plant in plantData =====
const plants = ['monstera', 'snake', 'pothos', 'fiddle', 'peace', 'spider', 'zz', 'aloe', 'jade', 'calathea', 'birdOfParadise', 'rubberPlant', 'orchid', 'fern', 'philodendron', 'chineseEvergreen', 'dracaena', 'mint', 'basil'];
plants.forEach(p => {
  const plantIdx = c.indexOf(p + ': {');
  if (plantIdx === -1) { console.log('5. Plant not found:', p); return; }
  const premiumIdx = c.indexOf('premium: "', plantIdx);
  if (premiumIdx === -1 || premiumIdx > plantIdx + 500) { console.log('5. premium not found in', p); return; }
  const lineStart = c.lastIndexOf('\n', premiumIdx - 1) + 1;
  const stringStart = premiumIdx + 'premium: "'.length;
  const stringEnd = c.indexOf('"', stringStart);
  const commaIdx = c.indexOf(',', stringEnd);
  const lineEnd = c.indexOf('\n', commaIdx) + 1;
  c = c.substring(0, lineStart) + c.substring(lineEnd);
  console.log('5. Removed premium from', p);
});

// ===== 6. Remove isSubscribed function =====
const isSubStart = c.indexOf('function isSubscribed()');
if (isSubStart !== -1) {
  const fnStart = c.lastIndexOf('\n    ', isSubStart);
  const fnEnd = c.indexOf('\n    function', isSubStart);
  c = c.substring(0, fnStart) + c.substring(fnEnd);
  console.log('6. isSubscribed removed');
}

// ===== 7. Update showLoginToast =====
const toastOld = `if (!isLoggedIn()) return;
      var subscribed = isSubscribed();
      var msg = subscribed
        ? 'Welcome back! You have Premium access *'
        : 'Welcome back! Upgrade to Premium for 500-char guides';
      showToast(msg, 'success');`;
const toastNew = `if (!isLoggedIn()) return;
      showToast('Welcome back!', 'success');`;
if (c.indexOf(toastOld) !== -1) { c = c.replace(toastOld, toastNew); console.log('7. showLoginToast updated'); }

// ===== 8. Update nav user status =====
if (c.indexOf("subscribed ? 'Premium *' : 'Free Plan'") !== -1) {
  c = c.replace("subscribed ? 'Premium *' : 'Free Plan'", "'Logged in'");
  console.log('8. Nav status updated');
}

// ===== 9. Remove premium HTML from plant modal =====
const pmIdx = c.indexOf('id="plant-modal-premium"');
if (pmIdx !== -1) {
  const divStart = c.lastIndexOf('<div', pmIdx);
  const divEnd = c.indexOf('</div>', pmIdx) + 6;
  c = c.substring(0, divStart) + c.substring(divEnd);
  console.log('9. Premium modal HTML removed');
}

// ===== 10. Remove premium JS from openPlantModal =====
const premiumJS = `var premiumEl = document.getElementById('plant-modal-premium');
      var premiumTextEl = document.getElementById('plant-modal-premium-text');
      if (subscribed) {
        premiumTextEl.textContent = plant.premium;
        premiumEl.classList.remove('hidden');
      } else {
        premiumEl.classList.add('hidden');
      }`;
if (c.indexOf(premiumJS) !== -1) { c = c.replace(premiumJS, ''); console.log('10. Premium JS removed'); }

// ===== 11. Update handlePlantClick - require login =====
const hpcOld = `if (!isLoggedIn()) {
        openLoginRequiredModal();
        return;
      }
      openPlantModal(plantId);`;
const hpcNew = `openPlantModal(plantId);`;
if (c.indexOf(hpcOld) !== -1) { c = c.replace(hpcOld, hpcNew); console.log('11. handlePlantClick updated'); }

// ===== 12. Update login required modal text =====
if (c.indexOf('Unlock 500-char premium care guides') !== -1) {
  c = c.replace('Unlock 500-char premium care guides', 'Login to see full plant details and save favorites');
  console.log('12. Modal text updated');
}

// ===== 13. Update login required modal subtitle =====
const oldSub = "Create a free account to save favorites and unlock 500-char premium care guides";
const newSub = "Create a free account to save favorites and access all plant details";
if (c.indexOf(oldSub) !== -1) { c = c.replace(oldSub, newSub); console.log('13. Modal subtitle updated'); }

// ===== 14. Remove subscribed variable from openPlantModal =====
const subVar = `var subscribed = isSubscribed();
      `;
if (c.indexOf(subVar) !== -1) { c = c.replace(subVar, ''); console.log('14. subscribed var removed'); }

// ===== 15. Update modal premium toggle text =====
const premiumToggleOld = `if (subscribed) {
          modalPremiumToggle.classList.add('hidden');
        } else {
          modalPremiumToggle.classList.remove('hidden');
        }`;
if (c.indexOf(premiumToggleOld) !== -1) { c = c.replace(premiumToggleOld, ''); console.log('15. Premium toggle removed'); }

// ===== 16. Update how it works step 3 icon =====
const how3Icon = '<i data-lucide="message-circle" class="w-6 h-6 text-lime-400"></i>';
const how3New = '<i data-lucide="book-open" class="w-6 h-6 text-lime-400"></i>';
if (c.indexOf(how3Icon) !== -1) { c = c.replace(how3Icon, how3New); console.log('16. How it works step 3 icon updated'); }

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nAll done! File saved.');