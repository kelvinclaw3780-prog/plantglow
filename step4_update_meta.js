const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Update meta description
const oldMeta = 'Get personalized plant care advice and watering reminders right on WhatsApp. Subscribe to PlantGlow for $8/month.';
const newMeta = 'All-in-one plant database with care guides, space matching, and growing tips — help urban plant owners save time and grow thriving indoor plants.';
if (c.indexOf(oldMeta) !== -1) { c = c.replace(oldMeta, newMeta); console.log('Meta description updated'); }

// Update title
const oldTitle = 'PlantGlow — Your Personal Plant Advisor';
const newTitle = 'PlantGlow — Indoor Growing, Simplified';
if (c.indexOf(oldTitle) !== -1) { c = c.replace(oldTitle, newTitle); console.log('Title updated'); }

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('Done');