const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Current state of renderPlantCard onclick
const toggleIdx = c.indexOf("handleToggleSave('' + id + '')");
console.log('handleToggleSave at:', toggleIdx);
console.log('Before:', JSON.stringify(c.substring(toggleIdx - 30, toggleIdx)));
console.log('Match:', JSON.stringify(c.substring(toggleIdx, toggleIdx + 40)));

// What we need:
// In JS source: onclick="handleToggleSave('' + id + '')"
// When JS runs: handleToggleSave('' + id + '')  <-- BROKEN, '' terminates string
// We need: onclick="handleToggleSave(\'' + id + '\')"
// When JS runs: handleToggleSave(\'' + id + '\')  --> \' becomes '
// Final JS result: handlePlantClick('monstera') for example

// The correct JS string to put in file:
const correctJS = "handleToggleSave(\\'\\' + id + \\'\\')";
console.log('\nCorrect JS string:', JSON.stringify(correctJS));

// Let's just write the correct bytes directly
const bad = "handleToggleSave('' + id + '')";
const replacement = "handleToggleSave(\"\\'\\' + id + \\'\\')";
console.log('\nReplacement:', JSON.stringify(replacement));

// Actually, let's think differently
// The onclick attribute value is: handleToggleSave('' + id + '')
// Inside the JS string, '' is two single quotes
// To get \' in the final onclick attribute, we need \' in the JS source
// In Node.js string, to get \' we write \\'

// So replacement should be: handleToggleSave(\'\' + id + \'\')
// In Node.js: "handleToggleSave(\\'\\' + id + \\'\\')"
const finalReplacement = "handleToggleSave(\\'\\' + id + \\'\\')";
console.log('Final replacement:', JSON.stringify(finalReplacement));

// Replace
const newC = c.replace(bad, finalReplacement);
console.log('Changed:', newC !== c);
if (newC !== c) {
  fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', newC, 'utf8');
  console.log('Written!');
}

// Verify
let c2 = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const newIdx = c2.indexOf('handleToggleSave');
console.log('\nNew content:', JSON.stringify(c2.substring(newIdx - 5, newIdx + 50)));