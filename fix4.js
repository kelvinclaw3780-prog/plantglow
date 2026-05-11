const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
let content = fs.readFileSync(path, 'utf8');

// Replace broken peace lily premium string by replacing the whole peace block
const oldPeace = `peace: {
        name: 'Peace Lily', scientific: 'Spathiphyllum', img: 'peace-lily.png',
        light: 'Low to Medium', water: 'Weekly', humidity: 'High', temp: '18-26°C',
        tips: ['Will dramatically droop when thirsty', 'Keep soil consistently moist but not soggy', 'Thrives in low light', 'Wipe leaves to remove dust', 'Flowers turn green as they age — normal'],
        problems: ['Brown edges = dry air or fluoride', 'Wilting despite moist soil = root rot', 'No flowers = needs more light'],
        premium: 'The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes (often mistaken for petals) that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty â€" don't panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, though they'll bloom more readily with brighter indirect light. The plant is also an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips often indicate fluoride sensitivity from tap water â€" use filtered water if possible. Peace Lilies are mildly toxic to pets and humans if ingested, causing mouth pain and digestive discomfort. With proper care, these plants can bloom multiple times per year, adding beauty to any space.'
      }`;

const newPeace = `peace: {
        name: 'Peace Lily', scientific: 'Spathiphyllum', img: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&h=600&fit=crop',
        light: 'Low to Medium', water: 'Weekly', humidity: 'High', temp: '18-26°C',
        tips: ['Will dramatically droop when thirsty', 'Keep soil consistently moist but not soggy', 'Thrives in low light', 'Wipe leaves to remove dust', 'Flowers turn green as they age - normal'],
        problems: ['Brown edges = dry air or fluoride', 'Wilting despite moist soil = root rot', 'No flowers = needs more light'],
        premium: "The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty - do not panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, and bloom more readily with brighter indirect light. The plant is an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips indicate fluoride sensitivity - use filtered water if possible. Peace Lilies are mildly toxic to pets if ingested. With proper care, these plants bloom multiple times per year, adding beauty to any space."
      }`;

if (content.includes(oldPeace)) {
  content = content.replace(oldPeace, newPeace);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fixed peace lily!');
} else {
  console.log('Pattern not found');
  // Try to find where it is and what's different
  const idx = content.indexOf("peace: {");
  if (idx !== -1) {
    const snippet = content.substring(idx, idx + 800);
    fs.writeFileSync('C:/Users/kelvi/peace_snippet.txt', snippet, 'utf8');
    console.log('Saved snippet');
  }
}