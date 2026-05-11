const fs = require('fs');
const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check the lucide CDN script
const lucideIdx = html.indexOf('unpkg.com/lucide');
const srcStart = html.indexOf('src="', lucideIdx);
const srcEnd = html.indexOf('">', srcStart);
console.log('Lucide CDN src:', html.substring(srcStart + 5, srcEnd));

const lucideScriptEnd = html.indexOf('</script>', lucideIdx);
console.log('Lucide script end at:', lucideScriptEnd);

// Now check if lucide.createIcons() call in the main script would work
// The problem might be that the browser loads the CDN script asynchronously
// and lucide.createIcons() is called BEFORE the icons are loaded

// Check what happens when the browser encounters the main script
// The main script is at the end of the body, AFTER the lucide CDN script
// So the CDN script loads and parses first, then the main script runs

// The real issue: lucide.createIcons() finds elements by their data-lucide attribute
// But the elements have Unicode chars in their IDs like "nav-user-status"
// Let me check the nav HTML
const navIdx = html.indexOf('nav-user-status');
console.log('nav-user-status in HTML at:', navIdx);
console.log('Around that:', JSON.stringify(html.substring(navIdx - 30, navIdx + 100)));

// Check what the DOM looks like for the nav badge
const badgeIdx = html.indexOf('nav-user-badge');
console.log('nav-user-badge at:', badgeIdx);
console.log('Around that:', JSON.stringify(html.substring(badgeIdx - 50, badgeIdx + 200)));
