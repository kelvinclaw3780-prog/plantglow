const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Step 1: Remove the entire PRICING section
// Find pricing section start and end
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
console.log('Pricing section:', pricingStart, '-', pricingEnd);
if (pricingStart !== -1 && pricingEnd !== -1) {
  const before = c.substring(0, pricingStart);
  const after = c.substring(pricingEnd);
  c = before + after;
  console.log('Pricing removed!');
}

// Step 2: Update hero CTA from Get Started to Explore Plants
const old1 = 'href="#pricing"';
const new1 = 'href="#plants"';
let count1 = 0;
while (c.indexOf(old1) !== -1) {
  c = c.replace(old1, new1);
  count1++;
}
console.log('href updated:', count1, 'times');

// Step 3: Update CTA button text and icon
const old2 = '<i data-lucide="message-circle" class="w-5 h-5"></i>\n      Get Started';
const new2 = '<i data-lucide="leaf" class="w-5 h-5"></i>\n      Explore Plants';
const idx2 = c.indexOf(old2);
if (idx2 !== -1) {
  c = c.replace(old2, new2);
  console.log('CTA button updated!');
}

// Step 4: Update hero sub-headline for the new positioning
const old3 = 'Get plant care tips, identify species, and watering reminders — all through WhatsApp.';
const new3 = 'All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your plants.';
const idx3 = c.indexOf(old3);
if (idx3 !== -1) {
  c = c.replace(old3, new3);
  console.log('Sub-headline updated!');
}

// Step 5: Update hero headline
const old4 = 'Your Personal<br class="sm:hidden"> Plant Advisor';
const new4 = 'Indoor Growing,<br class="sm:hidden"> Simplified';
const idx4 = c.indexOf(old4);
if (idx4 !== -1) {
  c = c.replace(old4, new4);
  console.log('Headline updated!');
}

// Step 6: Update no credit card text
const old5 = 'No credit card required to start';
const new5 = 'Free to browse • No credit card required';
const idx5 = c.indexOf(old5);
if (idx5 !== -1) {
  c = c.replace(old5, new5);
  console.log('Credit card text updated!');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');