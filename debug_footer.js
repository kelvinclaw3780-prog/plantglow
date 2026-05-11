const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find footer and show its links
const footerIdx = c.indexOf('footer');
const footerEnd = c.indexOf('</footer>');
const footer = c.substring(footerIdx, footerEnd);
console.log('Footer links:');
const links = footer.match(/href="[^"]*"/g);
console.log(links);