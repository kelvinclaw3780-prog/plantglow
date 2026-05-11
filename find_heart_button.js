const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find where the heart icon button is and replace it
// Look for the lucide heart icon inside the button
const oldIconPart = `<i data-lucide="heart" class="w-5 h-5 text-gray-500"></i>`;

if (c.indexOf(oldIconPart) !== -1) {
  // We need to see the context to understand the replacement
  const idx = c.indexOf(oldIconPart);
  console.log('Found icon at:', idx);
  console.log('Context:', JSON.stringify(c.substring(idx - 300, idx + 200)));
} else {
  console.log('Icon pattern not found');
  // Let's find the button in renderPlantCard
  const rpIdx = c.indexOf("function renderPlantCard");
  const afterRp = c.substring(rpIdx, rpIdx + 2000);
  console.log('renderPlantCard snippet:');
  console.log(JSON.stringify(afterRp));
}