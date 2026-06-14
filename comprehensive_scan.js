const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

console.log('=== COMPREHENSIVE ENGLISH SCAN ===\n');

// Scan key UI sections
const sections = [
  { name: 'Plant modal (95536-97000)', start: 95536, end: 97000 },
  { name: 'Login modal (99300-100000)', start: 99300, end: 100000 },
  { name: 'Cookie banner (108300-108800)', start: 108300, end: 108800 },
  { name: 'Footer (end of file)', start: h.length - 3000, end: h.length },
];

for (const s of sections) {
  const text = h.substring(s.start, s.end);
  console.log('--- ' + s.name + ' ---');
  // Find English words (ASCII letters only, not part of code)
  const englishWords = text.match(/[A-Z][a-z]+ [A-Z][a-z]+/g) || [];
  const unique = [...new Set(englishWords)];
  if (unique.length > 0) {
    console.log('English phrases:', unique.join(', '));
  } else {
    console.log('(all Chinese/clean)');
  }
  console.log('');
}

// Check the entire file for common English UI phrases
console.log('=== GLOBAL ENGLISH CHECK ===');
const englishPhrases = [
  'Login to view',
  'Login to save',
  'Get started',
  'Learn more',
  'Subscribe',
  'Get WhatsApp',
  'WhatsApp',
  'Get care tips',
  'Already have',
  'Create account',
  'Sign up',
  'Sign in',
  'Premium',
  'Free',
  'Contact us',
  'Send message',
  'Submit',
  'Close',
  'Back',
  'Next',
  'Previous',
];

for (const phrase of englishPhrases) {
  const idx = h.indexOf(phrase);
  if (idx >= 0) {
    // Only report if it's in visible content (not JS code)
    const before = h.substring(Math.max(0, idx - 20), idx);
    const after = h.substring(idx + phrase.length, idx + phrase.length + 30);
    const isVisible = before.includes('>') && !before.includes('onclick') && !before.includes('function') && !before.includes('return');
    if (isVisible) {
      console.log('VISIBLE:', phrase, 'at', idx, '→', JSON.stringify(h.substring(idx - 15, idx + phrase.length + 15)));
    }
  }
}

// Check for any remaining English in the plant modal content area
console.log('\n=== PLANT MODAL FULL SCAN ===');
const plantModalText = h.substring(95536, 99000);
const visibleEnglish = plantModalText.match(/>[A-Z][a-z ]+</g) || [];
console.log('English tags in plant modal:', visibleEnglish.slice(0, 10));

// Check for plant name display
console.log('\n=== PLANT NAME IN MODAL ===');
const nameIdx = h.indexOf('plant-modal-name');
console.log('plant-modal-name found at:', nameIdx);
if (nameIdx >= 0) {
  console.log(h.substring(nameIdx - 50, nameIdx + 200));
}

// Check what plant.name looks like in renderPlantCard
const cardSearch = 'alt="';
const cardIdx = h.indexOf(cardSearch + "' + plant.name");
if (cardIdx >= 0) {
  console.log('\nPlant card name display:');
  console.log(h.substring(cardIdx - 30, cardIdx + 80));
}