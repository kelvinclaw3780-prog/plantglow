const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// 1. Update "How It Works" - change step 3 and 4
const oldHowItWorks = `        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center font-bold text-lime-400">3</div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Subscribe on WhatsApp</h3>
            <p class="text-forest-200 text-sm">Unlock unlimited plant advice and reminders for just $8/month.</p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center font-bold text-lime-400">4</div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Get personalized care</h3>
            <p class="text-forest-200 text-sm">Watering alerts, fertilizer tips, and real answers — right when you need them.</p>
          </div>
        </div>`;

const newHowItWorks = `        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center font-bold text-lime-400">3</div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Save your favorites</h3>
            <p class="text-forest-200 text-sm">Create a free account to save plants and build your collection.</p>
          </div>
        </div>

        <div class="flex gap-4 items-start">
          <div class="flex-shrink-0 w-10 h-10 bg-forest-600 rounded-full flex items-center justify-center font-bold text-lime-400">4</div>
          <div>
            <h3 class="font-semibold text-lg mb-1">Get detailed care guides</h3>
            <p class="text-forest-200 text-sm">Light, water, humidity, and temperature — everything you need to know.</p>
          </div>
        </div>`;

const idx1 = c.indexOf(oldHowItWorks);
if (idx1 !== -1) {
  c = c.replace(oldHowItWorks, newHowItWorks);
  console.log('1. How It Works updated!');
} else {
  console.log('1. How It Works NOT found');
}

// 2. Remove pricing section
const pricingStart = c.indexOf('  <!-- PRICING -->');
const pricingEnd = c.indexOf('  <!-- EMAIL CAPTURE -->');
console.log('\nPricing section: from', pricingStart, 'to', pricingEnd);
if (pricingStart !== -1 && pricingEnd !== -1) {
  c = c.substring(0, pricingStart) + c.substring(pricingEnd);
  console.log('2. Pricing removed!');
} else {
  console.log('2. Pricing section not found');
}

// 3. Change footer pricing link to signup
const footerPricing = '<a href="#pricing"';
const footerSignup = '<a href="#signup"';
const idx3 = c.indexOf(footerPricing);
if (idx3 !== -1) {
  c = c.replace(footerPricing, footerSignup);
  console.log('3. Footer pricing link changed!');
} else {
  console.log('3. Footer pricing link not found');
}

// 4. Change mobile nav pricing link
const navPricing = 'href="#pricing" onclick="closeMobileMenu()"';
const navSignup = 'href="#signup" onclick="closeMobileMenu()"';
const idx4 = c.indexOf(navPricing);
if (idx4 !== -1) {
  c = c.replace(navPricing, navSignup);
  console.log('4. Mobile nav pricing link changed!');
} else {
  console.log('4. Mobile nav pricing link not found');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');