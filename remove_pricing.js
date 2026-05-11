const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Remove WhatsApp from features (card 3 now says Care Guides)
// Check and update the icon for card 3 if it still has message-circle
const old = '<i data-lucide="message-circle" class="w-6 h-6 text-forest-600"></i>';
const newIcon = '<i data-lucide="book-open" class="w-6 h-6 text-forest-600"></i>';
const idx = c.indexOf(old);
console.log('Message-circle icon at:', idx);
if (idx !== -1) c = c.replace(old, newIcon);

// Remove pricing section entirely (no subscription)
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
console.log('Pricing section:', pricingStart, 'to', pricingEnd);
if (pricingStart !== -1 && pricingEnd !== -1) {
  c = c.substring(0, pricingStart) + c.substring(pricingEnd);
  console.log('Pricing removed!');
}

// Remove pricing from nav links
const navPricing = c.indexOf('href="#pricing"');
console.log('Nav pricing link at:', navPricing);
if (navPricing !== -1) {
  c = c.replace('href="#pricing"', 'href="#plants"');
  console.log('Nav pricing link updated!');
}

// Remove pricing from mobile menu
const mobilePricing = c.indexOf('href="#pricing"');
console.log('Mobile pricing at:', mobilePricing);
if (mobilePricing !== -1) c = c.replace('href="#pricing"', 'href="#plants"');

// Update footer pricing link
const footerPricing = c.indexOf('href="#pricing"');
if (footerPricing !== -1) c = c.replace('href="#pricing"', 'href="#plants"');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done!');