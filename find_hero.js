const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find hero section - look for the h1 containing "Gardening Made Simple"
const heroIdx = c.indexOf('Gardening Made Simple');
console.log('Gardening Made Simple at:', heroIdx);
console.log('Context:');
console.log(JSON.stringify(c.substring(heroIdx - 100, heroIdx + 700)));