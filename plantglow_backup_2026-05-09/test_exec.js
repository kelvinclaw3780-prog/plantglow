const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = html.lastIndexOf('<script>');
const scriptClose = html.indexOf('</script>', lastScript + 9);
const scriptContent = html.substring(lastScript + 9, scriptClose);

console.log('Script content length:', scriptContent.length);
console.log('Script starts:', JSON.stringify(scriptContent.substring(0, 80)));
console.log('Script ends:', JSON.stringify(scriptContent.substring(scriptContent.length - 80)));

// Create realistic browser mock
const elements = {};
function createEl(tag) { return { tag, style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){}, remove: function(){} }; }
const mockDoc = {
  getElementById: function(id) {
    if (!elements[id]) {
      elements[id] = createEl(id);
      elements[id].style = { display: '' };
      elements[id].classList = {
        toggle: function(){}, add: function(){}, remove: function(){}, contains: function(){ return false; }
      };
    }
    return elements[id];
  },
  querySelectorAll: function() { return []; },
  createElement: createEl,
  body: { style: {}, appendChild: function(){}, removeChild: function(){} }
};
const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };

const sandbox = {
  document: mockDoc, localStorage: mockLS, console: console,
  lucide: { createIcons: function(){ console.log('[lucide] createIcons called'); } },
  setTimeout: function(fn, ms){ setTimeout(fn, ms); }
};

vm.createContext(sandbox);

try {
  vm.runInContext(scriptContent, sandbox, {filename: 'main.js'});
  console.log('EXEC OK');
  console.log('plantData type:', typeof sandbox.plantData);
  console.log('plantData keys count:', Object.keys(sandbox.plantData || {}).length);
  console.log('renderPlants type:', typeof sandbox.renderPlants);
  console.log('logout type:', typeof sandbox.logout);
  console.log('Elements mock created:', Object.keys(elements).join(', '));
} catch(e) {
  console.log('EXEC ERROR:', e.message);
  console.log('Stack first 5 lines:');
  e.stack.split('\n').slice(0, 5).forEach(l => console.log(' ', l));
}
