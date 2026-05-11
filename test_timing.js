const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

console.log('Script content length:', scriptContent.length);
console.log('First 200 chars:', JSON.stringify(scriptContent.substring(0, 200)));
console.log('Last 100 chars:', JSON.stringify(scriptContent.substring(scriptContent.length - 100)));

// Try to compile just the first part to see what's at line 74
const lines = scriptContent.split('\n');
console.log('\nLine 70-80:');
for (let i = 69; i <= 79; i++) {
  console.log(i + ':', lines[i].substring(0, 100));
}

// Also check: maybe the renderPlants function is being called BEFORE plantData is defined?
// Init section calls renderPlants() at line 6
// But plantData is defined at line 200
// So when renderPlants() runs at init, plantData doesn't exist yet!
console.log('\n=== TIMING ISSUE ===');
console.log('Line 6 (init calls):', lines[5]);
console.log('Line 200 (plantData):', lines[199]);

// renderPlants() is called at line 6, but plantData is defined at line 200
// This means when renderPlants runs, plantData is undefined!

console.log('\n=== Testing the timing theory ===');
// Run just the init lines
const initCode = lines.slice(0, 12).join('\n');
console.log('Init code:', JSON.stringify(initCode));

// Now try to run init with a mock localStorage
const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };

const mockDoc = {
  getElementById: function(id) {
    return {
      innerHTML: '', className: '', style: {display:''}, textContent: '', value: '',
      classList: { toggle:function(){}, add:function(){}, remove:function(){}, contains:function(){return false;} },
      appendChild:function(){}, remove:function(){}
    };
  },
  querySelectorAll: function() { return []; },
  createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
  body: { style: {}, appendChild: function(){}, removeChild: function(){} }
};

const sandbox = {
  document: mockDoc,
  localStorage: mockLS,
  console: console,
  lucide: { createIcons: function(){} },
  setTimeout: function(fn, ms){}
};

vm.createContext(sandbox);

try {
  vm.runInContext(initCode, sandbox, {filename: 'init.js'});
  console.log('INIT CODE RAN OK');
  console.log('renderPlants defined?', typeof sandbox.renderPlants);
  console.log('showLoginToast defined?', typeof sandbox.showLoginToast);
} catch(e) {
  console.log('ERROR:', e.message);
}