const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', 'utf8');

// Fix hero description - the "space matching" text in paragraph
c = c.replace('All-in-one plant database with care guides, space matching, and growing tips — so you spend less time researching and more time enjoying your pl', 'All-in-one plant database with care guides and growing tips — so you spend less time researching and more time enjoying your pl');

// Fix "what thrives in your space" in How It Works
c = c.replace('Search by name or filter by what thrives in your space.', 'Search by name or filter by plant type.');

// Fix "Tell us about your room — light, humidity, space" in How It Works
c = c.replace('Tell us about your room — light, humidity, space. We\'ll show you what will actually thrive there.', 'Browse our database and find plants that match your needs.');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow\index.html', c, 'utf8');
console.log('Done');

// Verify remaining mentions
let pos = 0;
let count = 0;
while ((pos = c.indexOf('space matching', pos)) !== -1) {
  console.log('space matching at:', pos, JSON.stringify(c.substring(pos - 30, pos + 60)));
  pos++;
  count++;
}
console.log('Remaining space matching mentions:', count);