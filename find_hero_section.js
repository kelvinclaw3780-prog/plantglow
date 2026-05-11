const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the section right after the hero
const heroEnd = c.indexOf('<!-- FEATURES -->');
const heroStart = c.lastIndexOf('<section', heroEnd);
console.log('Hero section:');
console.log(JSON.stringify(c.substring(heroStart, heroEnd)));