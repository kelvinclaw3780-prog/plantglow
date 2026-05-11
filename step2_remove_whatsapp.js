const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

const changes = [
  // Hero section
  ['Your Personal<br class="sm:hidden"> Plant Advisor', 'Indoor Growing,<br class="sm:hidden"> Simplified'],
  ['Get plant care tips, identify species, and watering reminders — all through WhatsApp.', 'All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your plants.'],
  ['No credit card required to start', 'Free to browse • No credit card required'],
  ['href="#pricing"', 'href="#plants"'],
  ['<i data-lucide="message-circle" class="w-5 h-5"></i>\n      Get Started', '<i data-lucide="leaf" class="w-5 h-5"></i>\n      Explore Plants'],
  
  // Features
  ['Everything your plants need', 'Everything you need to grow thriving plants'],
  ['Built for plant lovers who want real results', 'All-in-one plant database — no more searching everywhere'],
  ['Browse 50+ plants with detailed care guides, light needs, and growth tips.', '20 plants with detailed care guides, all in one place. No more searching everywhere.'],
  ['Not sure if your space suits a plant? We\'ll tell you what thrives there.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['Ask anything about your plants via WhatsApp. Instant, personal replies.', 'Clear, actionable tips for watering, light, humidity, and more — all in one place.'],
  ['<i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>', '<i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>'],
  ['Never forget to water or fertilize. We send you timed reminders.', 'Stop guessing. Get clear guidance on exactly what your plants need to thrive.'],
  ['<i data-lucide="bell" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>', '<i data-lucide="sparkles" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Grow with Confidence</h3>'],
  
  // How it works
  ['Browse our database or snap a photo. We\'ll identify it and show you care details.', 'Browse 20 plants with detailed care guides. Search by name or filter by what thrives in your space.'],
  ['Tell us your space — light, humidity, pets. We\'ll match you with plants that thrive.', 'Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.'],
  ['<h3 class="font-semibold text-lg mb-1">Subscribe on WhatsApp</h3>\n            <p class="text-forest-200 text-sm">Unlock unlimited plant advice and reminders for just $8/month.</p>', '<h3 class="font-semibold text-lg mb-1">Follow care guides</h3>\n            <p class="text-forest-200 text-sm">Get clear tips on watering, light, humidity, and more — all in one place.</p>'],
  ['<h3 class="font-semibold text-lg mb-1">Get personalized care</h3>\n            <p class="text-forest-200 text-sm">Watering alerts, fertilizer tips, and real answers — right when you need them.</p>', '<h3 class="font-semibold text-lg mb-1">Watch them thrive</h3>\n            <p class="text-forest-200 text-sm">Less time researching, more time enjoying. Your plants will thank you.</p>'],
  ['<i data-lucide="message-circle" class="w-6 h-6 text-lime-400"></i>', '<i data-lucide="book-open" class="w-6 h-6 text-lime-400"></i>'],
  
  // Meta description
  ['Get personalized plant care advice and watering reminders right on WhatsApp. Subscribe to PlantGlow for $8/month.', 'All-in-one plant database with care guides, space matching, and growing tips to help urban plant owners thrive.'],
];

let applied = 0;
changes.forEach(([old, val]) => {
  if (c.indexOf(old) !== -1) { c = c.replace(old, val); applied++; console.log('Replaced:', old.substring(0, 50)); }
  else console.log('Not found:', old.substring(0, 50));
});

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nApplied ' + applied + ' changes');