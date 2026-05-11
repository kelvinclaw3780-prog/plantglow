const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update features section headline
const old1 = 'Everything your plants need';
const new1 = 'Everything you need to grow thriving plants';
const idx1 = c.indexOf(old1);
console.log('Features headline at:', idx1);
if (idx1 !== -1) c = c.replace(old1, new1);

// Update features sub-headline
const old2 = 'Built for plant lovers who want real results';
const new2 = 'All-in-one plant database — no more searching everywhere';
const idx2 = c.indexOf(old2);
if (idx2 !== -1) c = c.replace(old2, new2);

// Update feature card 1
const old3 = '<h3 class="font-semibold text-gray-900 mb-1">Plant Database</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Browse 50+ plants with detailed care guides, light needs, and growth tips.</p>';
const new3 = '<h3 class="font-semibold text-gray-900 mb-1">Plant Database</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">20+ plants with detailed care guides, all in one place. No more searching everywhere.</p>';
const idx3 = c.indexOf(old3);
console.log('Card 1 at:', idx3);
if (idx3 !== -1) c = c.replace(old3, new3);

// Update feature card 2
const old4 = '<h3 class="font-semibold text-gray-900 mb-1">Space Checker</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Not sure if your space suits a plant? We\'ll tell you what thrives there.</p>';
const new4 = '<h3 class="font-semibold text-gray-900 mb-1">Space Checker</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Tell us your light, humidity, and room size — we\'ll match you with plants that thrive.</p>';
const idx4 = c.indexOf(old4);
if (idx4 !== -1) c = c.replace(old4, new4);

// Update feature card 3
const old5 = '<h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Ask anything about your plants via WhatsApp. Instant, personal replies.</p>';
const new5 = '<h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Clear, actionable tips for watering, light, humidity, and more — all in one place.</p>';
const idx5 = c.indexOf(old5);
if (idx5 !== -1) c = c.replace(old5, new5);

// Update feature card 4
const old6 = '<h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Never forget to water or fertilize. We send you timed reminders.</p>';
const new6 = '<h3 class="font-semibold text-gray-900 mb-1">Grow with Confidence</h3>\n          <p class="text-sm text-gray-500 leading-relaxed">Stop guessing. Get clear guidance on exactly what your plants need to thrive.</p>';
const idx6 = c.indexOf(old6);
if (idx6 !== -1) c = c.replace(old6, new6);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Features updated!');