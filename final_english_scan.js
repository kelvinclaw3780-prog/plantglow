const fs = require('fs');
const h = fs.readFileSync('plantglow/index-zh.html', 'utf8');

// Final comprehensive scan for visible English text
console.log('=== FINAL ENGLISH TEXT SCAN ===\n');

// Scan all text between HTML tags (>) and (<)
const htmlText = h;
// Find all occurrences of text that looks like English sentences/phrases in visible content

// Common visible English patterns
const patterns = [
  /[>"][A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+/g,  // English sentences
  /[>"][A-Z][a-z]+ [a-z]+ [a-z]+/g,
];

// Scan key sections
const sections = [
  { name: 'Nav (0-5000)', start: 0, end: 5000 },
  { name: 'Hero (5000-15000)', start: 5000, end: 15000 },
  { name: 'Popular Plants (30000-40000)', start: 30000, end: 40000 },
  { name: 'Blog (40000-50000)', start: 40000, end: 50000 },
  { name: 'How It Works (55000-65000)', start: 55000, end: 65000 },
  { name: 'Instagram (70000-80000)', start: 70000, end: 80000 },
  { name: 'Footer (end)', start: h.length - 5000, end: h.length },
];

for (const s of sections) {
  const text = h.substring(s.start, s.end);
  // Find visible English words (not in onclick, not in function names)
  const matches = [];
  let idx = 0;
  while ((idx = text.indexOf('>', idx)) >= 0) {
    const end = text.indexOf('<', idx);
    if (end > idx && end - idx < 200) {
      const content = text.substring(idx + 1, end).trim();
      // Check if it's English (contains letters but not Chinese)
      if (/[A-Za-z]/.test(content) && !/[\u4e00-\u9fff]/.test(content) && content.length > 3) {
        matches.push(content);
      }
    }
    idx++;
  }
  if (matches.length > 0) {
    console.log(s.name + ':');
    console.log('  ', matches.slice(0, 5).join('\n  '));
  }
}

// Check for any remaining English button text
console.log('\n=== BUTTON TEXT CHECK ===');
const buttonText = ['Get started', 'Learn more', 'Subscribe', 'Sign up', 'Sign in', 'Send', 'Submit'];
for (const b of buttonText) {
  if (h.includes('>' + b + '</')) {
    console.log('Found button:', b, 'at', h.indexOf('>' + b + '</'));
  }
}

// Check for English in modal areas
console.log('\n=== MODAL AREAS ===');
const loginArea = h.substring(99300, 100000);
console.log('Login modal content:', loginArea.substring(0, 400));

// Check for any "Login" text in visible content
console.log('\n=== LOGIN TEXT IN CONTENT ===');
const loginVisIdx = h.indexOf('>Login<');
if (loginVisIdx >= 0) {
  console.log('Login found at:', loginVisIdx, JSON.stringify(h.substring(loginVisIdx - 30, loginVisIdx + 30)));
} else {
  console.log('No visible Login text found');
}

// Check the plant modal title area
console.log('\n=== PLANT MODAL TITLE ===');
const modalTitleIdx = h.indexOf('plant-modal-name');
if (modalTitleIdx >= 0) {
  // Show context around this
  console.log(h.substring(modalTitleIdx - 50, modalTitleIdx + 100));
}