const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

console.log('Has getSavedPlants:', c.includes('function getSavedPlants'));
console.log('Has handleToggleSave:', c.includes('function handleToggleSave'));
console.log('Has handlePlantSearch:', c.includes('function handlePlantSearch'));
console.log('Has VISIBLE_COUNT = 6:', c.includes('VISIBLE_COUNT = 6'));
console.log('Has Browse all 19:', c.includes('Browse all 19'));
console.log('Has search bar:', c.includes('id="plant-search"'));
console.log('Has handleToggleSave onclick:', c.includes('onclick="handleToggleSave'));
console.log('File size:', c.length);
console.log('Has pricing section:', c.includes('<!-- PRICING -->'));
console.log('Has signup section:', c.includes('id="signup"'));