const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Check renderPlantCard function - the onclick and how it's structured
const idx = c.indexOf('function renderPlantCard');
console.log('renderPlantCard:');
console.log(JSON.stringify(c.substring(idx, idx + 600)));

// Check if there's any issue with how the card div is built
const cardReturn = c.indexOf("return '<div class=\"plant-card");
console.log('\nCard return at:', cardReturn);
console.log(JSON.stringify(c.substring(cardReturn, cardReturn + 500)));

// Check if onclick has proper escaping
const onclickCheck = c.indexOf("onclick=\"handlePlantClick");
console.log('\nonclick handlePlantClick at:', onclickCheck);
if (onclickCheck !== -1) {
  console.log(JSON.stringify(c.substring(onclickCheck - 20, onclickCheck + 150)));
}