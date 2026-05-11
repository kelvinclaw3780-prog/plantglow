const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update How It Works section
const old1 = 'How PlantGlow Works';
const new1 = 'How It Works';
const idx1 = c.indexOf(old1);
console.log('How it works headline at:', idx1);
if (idx1 !== -1) c = c.replace(old1, new1);

// Step 1
const old2 = '<h3 class="font-semibold text-lg mb-1">Find your plant</h3>\n            <p class="text-forest-200 text-sm">Browse our database or snap a photo. We\'ll identify it and show you care details.</p>';
const new2 = '<h3 class="font-semibold text-lg mb-1">Find your plant</h3>\n            <p class="text-forest-200 text-sm">Browse 20+ plants with detailed care guides. Search by name or filter by what thrives in your space.</p>';
const idx2 = c.indexOf(old2);
if (idx2 !== -1) c = c.replace(old2, new2);

// Step 2
const old3 = '<h3 class="font-semibold text-lg mb-1">Check your environment</h3>\n            <p class="text-forest-200 text-sm">Tell us your space — light, humidity, pets. We\'ll match you with plants that thrive.</p>';
const new3 = '<h3 class="font-semibold text-lg mb-1">Check your space</h3>\n            <p class="text-forest-200 text-sm">Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.</p>';
const idx3 = c.indexOf(old3);
if (idx3 !== -1) c = c.replace(old3, new3);

// Step 3
const old4 = '<h3 class="font-semibold text-lg mb-1">Subscribe on WhatsApp</h3>\n            <p class="text-forest-200 text-sm">Unlock unlimited plant advice and reminders for just $8/month.</p>';
const new4 = '<h3 class="font-semibold text-lg mb-1">Follow care guides</h3>\n            <p class="text-forest-200 text-sm">Get clear tips on watering, light, humidity, and more — all in one place.</p>';
const idx4 = c.indexOf(old4);
if (idx4 !== -1) c = c.replace(old4, new4);

// Step 4
const old5 = '<h3 class="font-semibold text-lg mb-1">Get personalized care</h3>\n            <p class="text-forest-200 text-sm">Watering alerts, fertilizer tips, and real answers — right when you need them.</p>';
const new5 = '<h3 class="font-semibold text-lg mb-1">Watch them thrive</h3>\n            <p class="text-forest-200 text-sm">Less time researching, more time enjoying. Your plants will thank you.</p>';
const idx5 = c.indexOf(old5);
if (idx5 !== -1) c = c.replace(old5, new5);

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('How it works updated!');