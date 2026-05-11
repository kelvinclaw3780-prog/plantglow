const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// ===== STEP 1: Remove pricing section =====
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
if (pricingStart !== -1 && pricingEnd !== -1) {
  c = c.substring(0, pricingStart) + c.substring(pricingEnd);
  console.log('1. Pricing section removed');
}

// ===== STEP 2: Update hero =====
const replacements2 = [
  ['href="#pricing"', 'href="#plants"'],
  ['Your Personal<br class="sm:hidden"> Plant Advisor', 'Indoor Growing,<br class="sm:hidden"> Simplified'],
  ['Get plant care tips, identify species, and watering reminders — all through WhatsApp.', 'All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your plants.'],
  ['No credit card required to start', 'Free to browse • No credit card required'],
];
replacements2.forEach(([old, val]) => {
  const idx = c.indexOf(old);
  if (idx !== -1) { c = c.replace(old, val); console.log('2. Replaced:', old.substring(0, 30)); }
  else console.log('2. NOT FOUND:', old.substring(0, 30));
});

// Update CTA icon and text
const ctaOld = '<i data-lucide="message-circle" class="w-5 h-5"></i>\n      Get Started';
const ctaNew = '<i data-lucide="leaf" class="w-5 h-5"></i>\n      Explore Plants';
if (c.indexOf(ctaOld) !== -1) { c = c.replace(ctaOld, ctaNew); console.log('2. CTA button updated'); }

// ===== STEP 3: Features section =====
const featuresOld = [
  ['Everything your plants need', 'Everything you need to grow thriving plants'],
  ['Built for plant lovers who want real results', 'All-in-one plant database — no more searching everywhere'],
  ['Browse 50+ plants with detailed care guides, light needs, and growth tips.', '20 plants with detailed care guides, all in one place. No more searching everywhere.'],
  ['Not sure if your space suits a plant? We\'ll tell you what thrives there.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['Ask anything about your plants via WhatsApp. Instant, personal replies.', 'Clear, actionable tips for watering, light, humidity, and more — all in one place.'],
  ['<i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>', '<i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>'],
  ['Never forget to water or fertilize. We send you timed reminders.', 'Stop guessing. Get clear guidance on exactly what your plants need to thrive.'],
  ['<i data-lucide="bell" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>', '<i data-lucide="sparkles" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Grow with Confidence</h3>'],
];
featuresOld.forEach(([old, val]) => {
  const idx = c.indexOf(old);
  if (idx !== -1) { c = c.replace(old, val); console.log('3. Replaced:', old.substring(0, 30)); }
  else console.log('3. NOT FOUND:', old.substring(0, 30));
});

// ===== STEP 4: How It Works =====
const howOld = [
  ['Browse our database or snap a photo. We\'ll identify it and show you care details.', 'Browse 20 plants with detailed care guides. Search by name or filter by what thrives in your space.'],
  ['Tell us your space — light, humidity, pets. We\'ll match you with plants that thrive.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['<h3 class="font-semibold text-lg mb-1">Subscribe on WhatsApp</h3>\n            <p class="text-forest-200 text-sm">Unlock unlimited plant advice and reminders for just $8/month.</p>', '<h3 class="font-semibold text-lg mb-1">Follow care guides</h3>\n            <p class="text-forest-200 text-sm">Get clear tips on watering, light, humidity, and more — all in one place.</p>'],
  ['<h3 class="font-semibold text-lg mb-1">Get personalized care</h3>\n            <p class="text-forest-200 text-sm">Watering alerts, fertilizer tips, and real answers — right when you need them.</p>', '<h3 class="font-semibold text-lg mb-1">Watch them thrive</h3>\n            <p class="text-forest-200 text-sm">Less time researching, more time enjoying. Your plants will thank you.</p>'],
];
howOld.forEach(([old, val]) => {
  const idx = c.indexOf(old);
  if (idx !== -1) { c = c.replace(old, val); console.log('4. Replaced:', old.substring(0, 30)); }
  else console.log('4. NOT FOUND:', old.substring(0, 30));
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', c, 'utf8');
console.log('\nHTML changes done!');