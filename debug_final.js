const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check footer
const footerIdx = c.indexOf('footer');
console.log('Footer at:', footerIdx);
const footerSnippet = c.substring(footerIdx, footerIdx + 500);
console.log('Footer snippet:', footerSnippet);

// Check if pricing section still exists
const pricingIdx = c.indexOf('<!-- PRICING -->');
const pricing2Idx = c.indexOf('id="pricing"');
console.log('\nPricing comment at:', pricingIdx);
console.log('id=pricing at:', pricing2Idx);

// Check email capture section
const emailIdx = c.indexOf('Be the first to know');
console.log('Email section at:', emailIdx);

// Check browse section
const browseIdx = c.indexOf('Browse all 19 plants');
console.log('Browse all 19 plants at:', browseIdx);