const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the peace lily section and replace its premium string
const peaceStart = content.indexOf("peace: {");
const peaceEnd = content.indexOf("spider: {");
if (peaceStart === -1 || peaceEnd === -1) { console.log('Could not find peace block'); process.exit(1); }

const peaceBlock = content.substring(peaceStart, peaceEnd);
console.log('Peace block found, length:', peaceBlock.length);

// Check for non-ASCII in the premium string
const premiumMatch = peaceBlock.match(/premium: '([^']+)'/s);
if (premiumMatch) {
  const premium = premiumMatch[1];
  console.log('Premium string length:', premium.length);
  // Check each character
  for (let i = 0; i < premium.length; i++) {
    const code = premium.charCodeAt(i);
    if (code > 127) {
      console.log(`Non-ASCII at ${i}: char='${premium[i]}' code=${code.toString(16)}`);
    }
  }
  
  // Replace with a clean version using double quotes
  const clean = "The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty - do not panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, and bloom more readily with brighter indirect light. The plant is an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips indicate fluoride sensitivity - use filtered water if possible. Peace Lilies are mildly toxic to pets if ingested. With proper care, these plants bloom multiple times per year, adding beauty to any space.";
  
  const newPeaceBlock = peaceBlock.replace(/premium: '[^']+'/s, 'premium: "' + clean + '"');
  const newContent = content.substring(0, peaceStart) + newPeaceBlock + content.substring(peaceEnd);
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Fixed!');
} else {
  console.log('Could not find premium string in peace block');
}