const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// 1. Update hero headline
const old1 = 'Your Personal<br class="sm:hidden"> Plant Advisor';
const new1 = 'Indoor Growing,<br class="sm:hidden"> Simplified';
const idx1 = c.indexOf(old1);
console.log('Hero headline at:', idx1);
if (idx1 !== -1) c = c.replace(old1, new1);

// 2. Update hero sub-headline
const old2 = 'Get plant care tips, identify species, and watering reminders — all through WhatsApp.';
const new2 = 'All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your plants.';
const idx2 = c.indexOf(old2);
console.log('Sub-headline at:', idx2);
if (idx2 !== -1) c = c.replace(old2, new2);

// 3. Update Get Started CTA href to #plants instead of #pricing
const old3 = 'href="#pricing" class="fade-up delay-200 btn-primary mt-4 inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-forest-200/60 hover:bg-forest-700">\n      <i data-lucide="message-circle" class="w-5 h-5"></i>\n      Get Started';
const new3 = 'href="#plants" class="fade-up delay-200 btn-primary mt-4 inline-flex items-center gap-2 bg-forest-600 text-white font-semibold px-7 py-4 rounded-2xl shadow-lg shadow-forest-200/60 hover:bg-forest-700">\n      <i data-lucide="leaf" class="w-5 h-5"></i>\n      Explore Plants';
const idx3 = c.indexOf(old3);
console.log('CTA at:', idx3);
if (idx3 !== -1) c = c.replace(old3, new3);

// 4. Update "No credit card required" text
const old4 = 'No credit card required to start';
const new4 = 'Free to browse • No credit card required';
const idx4 = c.indexOf(old4);
if (idx4 !== -1) c = c.replace(old4, new4);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Hero section updated!');