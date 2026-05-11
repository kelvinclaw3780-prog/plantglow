const fs = require('fs');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const pos = 17504;

// Check around the script tag at 17504
console.log('=== Script tag at 17504 ===');
console.log('Chars at 17500-17520:', JSON.stringify(h.substring(17500, 17520)));

// Find the src attribute in this script tag
const srcIdx = h.indexOf('src="', 17504);
const srcEnd = h.indexOf('"', srcIdx + 5);
const srcVal = h.substring(srcIdx + 5, srcEnd);
console.log('src attr at:', srcIdx, '-', srcEnd);
console.log('src value:', srcVal);

// Check what's after the script close tag (53029)
console.log('\n=== After script close (53029-53050) ===');
console.log(JSON.stringify(h.substring(53029, 53050)));

// Check if there's ANOTHER script after this
const nextScript = h.indexOf('<script', 53029 + 9);
console.log('\n=== Next script tag after 53029 ===');
console.log('Next script at:', nextScript);
if (nextScript !== -1) {
  console.log('Content:', JSON.stringify(h.substring(nextScript, nextScript + 100)));
}

// Also check the lucide icon rendering issue
// The lucide CDN script creates icons from <i data-lucide="..."> elements
// But our HTML uses custom SVG or other elements
console.log('\n=== Lucide icon check ===');
const lucideElements = h.match(/data-lucide="[^"]*"/g);
console.log('Lucide elements found:', lucideElements ? lucideElements.length : 0);
if (lucideElements) {
  console.log('First 5:', lucideElements.slice(0, 5));
}

// Check the nav icons specifically
const navIdx = h.indexOf('nav-toggle');
const menuIdx = h.indexOf('nav-menu');
console.log('\nNav toggle at:', navIdx);
console.log('Nav menu at:', menuIdx);

// Find all data-lucide in nav section
const navSection = h.substring(navIdx - 200, menuIdx + 500);
const navIcons = navSection.match(/data-lucide="[^"]*"/g);
console.log('Nav icons:', navIcons);