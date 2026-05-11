const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find and show all onclick handlers in renderPlantCard
const rpcStart = c.indexOf('function renderPlantCard');
const rpcEnd = c.indexOf('function getSavedPlants');
const rpcContent = c.substring(rpcStart, rpcEnd);

// Show all onclick occurrences
const onclickMatches = [...rpcContent.matchAll(/onclick="([^"]+)"/g)];
console.log('onclick handlers found:', onclickMatches.length);
onclickMatches.forEach((m, i) => {
  console.log(i + ':', JSON.stringify(m[1]));
});

// Now fix the handlePlantClick onclick
// Current (broken): handlePlantClick('' + id + '')
// Should be: handlePlantClick(\'' + id + '\')
const broken1 = "handlePlantClick('' + id + '')";
const fixed1 = "handlePlantClick(\\'\\' + id + \\'\\')";
const idx1 = rpcContent.indexOf(broken1);
console.log('\nhandlePlantClick broken pattern at:', idx1);

// Also find handleToggleSave onclick
const toggleMatches = [...rpcContent.matchAll(/handleToggleSave\('([^']+)'/g)];
console.log('\nhandleToggleSave patterns:', toggleMatches.length);
toggleMatches.forEach((m, i) => {
  console.log(i + ':', JSON.stringify(m[0]));
});

// Now fix both - replace in main string
// Since rpcContent is a copy, we need to replace in main c
const mainBroken1 = "handlePlantClick('' + id + '')";
const mainFixed1 = "handlePlantClick(\"\\'\" + id + \"\\'\")";
const idxMain = c.indexOf(mainBroken1);
console.log('\nMain string - handlePlantClick broken at:', idxMain);
if (idxMain !== -1) {
  console.log('Context:', JSON.stringify(c.substring(idxMain - 20, idxMain + 60)));
  c = c.replace(mainBroken1, mainFixed1);
  console.log('Fixed handlePlantClick!');
}

// Check handleToggleSave
const toggleBroken = "handleToggleSave('' + id + '')";
const toggleIdx = c.indexOf(toggleBroken);
console.log('\nhandleToggleSave broken at:', toggleIdx);
if (toggleIdx !== -1) {
  console.log('Context:', JSON.stringify(c.substring(toggleIdx - 20, toggleIdx + 60)));
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', c, 'utf8');
console.log('\nDone!');