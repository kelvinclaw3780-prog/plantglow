const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

const lines = scriptContent.split('\n');
console.log('Total lines:', lines.length);

// Find where plantData is defined
let plantDataLine = -1;
let objectKeysLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('var plantData') || lines[i].includes('const plantData')) plantDataLine = i;
  if (lines[i].includes('Object.keys(plantData)')) objectKeysLine = i;
}
console.log('plantData def at line:', plantDataLine + 1, '|', lines[plantDataLine].substring(0, 50));
console.log('Object.keys(plantData) at line:', objectKeysLine + 1, '|', lines[objectKeysLine].substring(0, 50));

// Check: maybe there's a function declaration issue?
// When vm.runInContext runs the whole script, it should hoist functions
// But let me check what renderPlants looks like and if plantData is in a different scope

// Check the structure: is plantData inside a function or at top level?
console.log('\n--- Lines around plantData ---');
for (let i = 195; i <= 210; i++) {
  if (lines[i]) console.log(i + ':', lines[i].substring(0, 80));
}

// Check for any IIFE or function wrappers
console.log('\n--- First 10 lines (are they all at top level?) ---');
for (let i = 0; i < 10; i++) {
  if (lines[i]) console.log(i + ':', lines[i].substring(0, 80));
}

// Now let's try running the script in a more isolated way
// Let's create a fresh vm context and run the full script
const sandbox = {
  document: {
    getElementById: function(id) {
      return {
        innerHTML: '', className: '', style: {display:''}, textContent: '', value: '',
        classList: { add:function(){}, remove:function(){}, toggle:function(){}, contains:function(){return false;} },
        appendChild:function(){}, remove:function(){}, removeChild:function(){}, getContext:function(){return{};}, drawImage:function(){}
      };
    },
    querySelectorAll: function() { return []; },
    createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
    body: { style: {}, appendChild: function(){}, removeChild: function(){} }
  },
  localStorage: {
    data: {},
    getItem: function(k) { return this.data[k]; },
    setItem: function(k, v) { this.data[k] = v; },
    removeItem: function(k) { delete this.data[k]; }
  },
  console: console,
  lucide: { createIcons: function() { console.log('createIcons called'); } },
  setTimeout: function(fn, ms) { setTimeout(fn, ms); },
  XMLHttpRequest: function() {}
};

vm.createContext(sandbox);

try {
  vm.runInContext(scriptContent, sandbox, {filename: 'main.js'});
  console.log('\nFULL EXEC: OK');
  console.log('plantData type:', typeof sandbox.plantData);
  console.log('plantData keys:', Object.keys(sandbox.plantData || {}).length);
  console.log('renderPlants type:', typeof sandbox.renderPlants);
} catch(e) {
  console.log('\nFULL EXEC ERROR:', e.message);
  console.log('Error line:', e.stack.split('\n')[0]);
  
  // Find the line number in the original content
  const errorLine = e.lineNumber || 0;
  if (errorLine > 0) {
    console.log('Near line', errorLine, ':', lines[errorLine - 1]);
  }
}

// Now try to understand: if plantData is defined at line 200+ in the script,
// but the code at line 74 calls Object.keys(plantData), when the script runs
// from top to bottom, plantData should be defined by the time we reach line 74
// UNLESS there's a function at line 74 that gets called BEFORE line 200 is reached

console.log('\n--- Checking what calls renderPlants ---');
let renderPlantsCallLine = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('renderPlants()')) {
    console.log('renderPlants() called at line:', i + 1);
    console.log('  Context:', lines[i].substring(0, 80));
  }
}