const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Manual script block analysis
const blocks = [
  { pos: c.indexOf('<script src="https://cdn.tailwindcss.com"'), label: 'Tailwind CDN' },
  { pos: c.indexOf('<script src="https://unpkg.com/lucide'), label: 'Lucide CDN' },
  { pos: c.indexOf('<script>\n    tailwind.config'), label: 'Tailwind Config' },
  { pos: c.indexOf('<script>\n    // ==='), label: 'Main JS' },
];

console.log('Script tag positions:');
blocks.forEach(b => console.log(`  ${b.label}: ${b.pos}`));

// Check what's between tailwind config close and main JS open
const configClose = c.indexOf('</script>', c.indexOf('tailwind.config'));
const mainJsOpen = c.indexOf('<script>\n    // ===');
console.log('\nConfig closes at:', configClose);
console.log('Main JS opens at:', mainJsOpen);
console.log('Between:', JSON.stringify(c.substring(configClose + 9, mainJsOpen + 8)));