const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

console.log('Script length:', scriptContent.length, 'chars,', scriptContent.split('\n').length, 'lines');

// Split into logical sections by finding the section headers
const lines = scriptContent.split('\n');
let sections = {};
let currentSection = '';
let sectionContent = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('// INIT') || line.includes('// LOGIN STATE') || 
      line.includes('// PLANT DATA') || line.includes('// FUNCTIONS') ||
      line.includes('// UI STATE') || line.includes('// NAV')) {
    if (currentSection && sectionContent.length > 0) {
      sections[currentSection] = sectionContent.join('\n');
    }
    currentSection = line;
    sectionContent = [];
  } else {
    sectionContent.push(line);
  }
}
if (currentSection && sectionContent.length > 0) {
  sections[currentSection] = sectionContent.join('\n');
}

console.log('Sections found:', Object.keys(sections).join(' | '));

// Check if plantData section comes BEFORE the init calls in the original order
// We need to reorder so plantData is defined BEFORE renderPlants is called
// Currently init calls are at the very top

// Let's just rewrite the script with correct ordering:
// 1. DOMContentLoaded wrapper (so it runs after everything is defined)
// 2. plantData definition FIRST
// 3. All functions
// 4. Init code at the END (not at the top)

const reorderScript = `
var plantData = ${sections['// PLANT DATA'] || ''};

// LOGIN STATE
${sections['// LOGIN STATE'] || ''}

// UI STATE  
${sections['// UI STATE'] || ''}

// FUNCTIONS
${sections['// FUNCTIONS'] || ''}

// INIT (runs after everything is defined)
document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();
  updateNav();
  showLoginToast();
  renderPlants();
});
`;

// Actually let me just check the actual order issue more carefully
// The problem is that renderPlants() is called at the top (line 6)
// But plantData isn't defined until line 201

// Let's see what the INIT section looks like
const initSection = sections['// INIT'] || sections['// INIT\n    // ================='] || '';
console.log('\nInit section first 200 chars:', JSON.stringify(initSection.substring(0, 200)));

// Check if there's a DOMContentLoaded wrapper we can use
if (initSection.includes('DOMContentLoaded')) {
  console.log('Has DOMContentLoaded wrapper');
} else {
  console.log('No DOMContentLoaded - renderPlants() called immediately at top');
  console.log('This is the bug - renderPlants runs before plantData is defined');
}

// Now let's fix it properly by removing the top-level renderPlants call
// and wrapping it (along with the other init calls) in DOMContentLoaded

// First, let's just identify what needs to change
// 1. Remove the immediate renderPlants() call at line 6
// 2. Wrap all init calls in DOMContentLoaded

// The init lines are:
console.log('\n--- Lines 0-15 (init area) ---');
for (let i = 0; i <= 15; i++) {
  console.log(i + ':', lines[i]);
}