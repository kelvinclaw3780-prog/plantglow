const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update features section
const old1 = 'Everything your plants need';
const new1 = 'Everything you need to grow thriving plants';
const idx1 = c.indexOf(old1);
if (idx1 !== -1) { c = c.replace(old1, new1); console.log('Features headline updated!'); }

const old2 = 'Built for plant lovers who want real results';
const new2 = 'All-in-one plant database — no more searching everywhere';
const idx2 = c.indexOf(old2);
if (idx2 !== -1) { c = c.replace(old2, new2); console.log('Features sub-headline updated!'); }

// Update card 1 - Plant Database
const old3 = '<p class="text-sm text-gray-500 leading-relaxed">Browse 50+ plants with detailed care guides, light needs, and growth tips.</p>';
const new3 = '<p class="text-sm text-gray-500 leading-relaxed">20 plants with detailed care guides, all in one place. No more searching everywhere.</p>';
const idx3 = c.indexOf(old3);
if (idx3 !== -1) { c = c.replace(old3, new3); console.log('Card 1 updated!'); }

// Update card 2 - Space Checker
const old4 = '<p class="text-sm text-gray-500 leading-relaxed">Not sure if your space suits a plant? We\'ll tell you what thrives there.</p>';
const new4 = '<p class="text-sm text-gray-500 leading-relaxed">Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.</p>';
const idx4 = c.indexOf(old4);
if (idx4 !== -1) { c = c.replace(old4, new4); console.log('Card 2 updated!'); }

// Update card 3 - WhatsApp Advisor to Care Guides
const old5 = '<p class="text-sm text-gray-500 leading-relaxed">Ask anything about your plants via WhatsApp. Instant, personal replies.</p>';
const new5 = '<p class="text-sm text-gray-500 leading-relaxed">Clear, actionable tips for watering, light, humidity, and more — all in one place.</p>';
const idx5 = c.indexOf(old5);
if (idx5 !== -1) { c = c.replace(old5, new5); console.log('Card 3 text updated!'); }

// Update card 3 icon from message-circle to book-open
const oldIcon = '<i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">WhatsApp Advisor</h3>';
const newIcon = '<i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Care Guides</h3>';
const idx5b = c.indexOf(oldIcon);
if (idx5b !== -1) { c = c.replace(oldIcon, newIcon); console.log('Card 3 icon updated!'); }

// Update card 4 - Reminders to Grow with Confidence
const old6 = '<p class="text-sm text-gray-500 leading-relaxed">Never forget to water or fertilize. We send you timed reminders.</p>';
const new6 = '<p class="text-sm text-gray-500 leading-relaxed">Stop guessing. Get clear guidance on exactly what your plants need to thrive.</p>';
const idx6 = c.indexOf(old6);
if (idx6 !== -1) { c = c.replace(old6, new6); console.log('Card 4 text updated!'); }

// Update card 4 icon from bell to sparkle
const oldIcon4 = '<i data-lucide="bell" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Reminders</h3>';
const newIcon4 = '<i data-lucide="sparkles" class="w-6 h-6 text-forest-600"></i>\n          </div>\n          <h3 class="font-semibold text-gray-900 mb-1">Grow with Confidence</h3>';
const idx6b = c.indexOf(oldIcon4);
if (idx6b !== -1) { c = c.replace(oldIcon4, newIcon4); console.log('Card 4 icon updated!'); }

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');