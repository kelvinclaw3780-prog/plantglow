const fs = require('fs');
const path = 'C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html';
const content = fs.readFileSync(path, 'utf8');

// Fix the Peace Lily premium string - it contains apostrophes that broke JS
// Find and replace the broken section
const broken = "premium: 'The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes (often mistaken for petals) that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty ?\" don't panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, though they'll bloom more readily with brighter indirect light. The plant is also an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips often indicate fluoride sensitivity from tap water ?\" use filtered water if possible. Peace Lilies are mildly toxic to pets and humans if ingested, causing mouth pain and digestive discomfort. With proper care, these plants can bloom multiple times per year, adding beauty to any space.'";

const fixed = "premium: \"The Peace Lily, scientifically named Spathiphyllum, is a beloved houseplant known for its elegant white flowers and ability to thrive in low-light conditions. Native to the tropical Americas and Southeast Asia, this plant produces stunning white spathes (often mistaken for petals) that rise above dark green, glossy foliage. The plant is famous for its dramatic wilting when thirsty - do not panic, it revives within hours of watering. Peace Lilies prefer consistently moist soil but are forgiving if you occasionally forget to water. They excel in offices and rooms with minimal natural light, though they bloom more readily with brighter indirect light. The plant is also an excellent air purifier, removing benzene, formaldehyde, and trichloroethylene from indoor air. Brown leaf tips often indicate fluoride sensitivity from tap water - use filtered water if possible. Peace Lilies are mildly toxic to pets and humans if ingested, causing mouth pain and digestive discomfort. With proper care, these plants can bloom multiple times per year, adding beauty to any space.\"";

const newContent = content.replace(broken, fixed);
if (newContent === content) {
  console.log('Pattern not found - searching for partial match...');
  const idx = content.indexOf('The Peace Lily, scientifically named Spathiphyllum');
  if (idx !== -1) {
    console.log('Found at index', idx);
    const snippet = content.substring(idx, idx + 500);
    console.log(snippet);
  }
} else {
  fs.writeFileSync(path, newContent, 'utf8');
  console.log('Fixed!');
}