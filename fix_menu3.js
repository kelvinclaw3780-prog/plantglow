const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Completely rewrite the mobile menu approach
// 1. Move overlay OUTSIDE nav (end of body or after nav)
// 2. Use a simpler show/hide with classList

// First, let's check the end of the nav and beginning of hero
const navCloseIdx = c.indexOf('</nav>');
console.log('Nav ends at:', navCloseIdx);
console.log('Content after nav:');
console.log(JSON.stringify(c.substring(navCloseIdx, navCloseIdx + 200)));

// Check where the overlay is currently
const overlayIdx = c.indexOf('id="mobile-menu-overlay"');
console.log('\nOverlay current position:', overlayIdx);

// Find the start of the hero
const heroIdx = c.indexOf('<!-- HERO -->');
console.log('Hero starts at:', heroIdx);

// Strategy: move overlay to right before hero section
// Remove it from inside nav and put it before hero