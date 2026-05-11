const fs = require('fs');
const vm = require('vm');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = h.lastIndexOf('<script>');
const scriptClose = h.indexOf('</script>', lastScript + 9);
const scriptContent = h.substring(lastScript + 9, scriptClose);

const mockDoc = {
  addEventListener: function() {},
  getElementById: function(id) { return { innerHTML: '', className: '', style: {display:''}, textContent: '', value: '', classList: { add:function(){}, remove:function(){}, toggle:function(){}, contains:function(){return false;} }, appendChild:function(){}, remove:function(){}, removeChild:function(){} }; },
  querySelectorAll: function() { return []; },
  createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
  body: { style: {}, appendChild: function(){}, removeChild: function(){} }
};
const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };
const sandbox = { document: mockDoc, localStorage: mockLS, console: console, lucide: { createIcons: function(){} }, setTimeout: function(fn, ms){}, XMLHttpRequest: function(){} };
vm.createContext(sandbox);

try {
  vm.runInContext(scriptContent, sandbox, {filename: 'main.js'});
  console.log('JS COMPILE: OK');
  console.log('plantData keys:', Object.keys(sandbox.plantData || {}).length);
  
  // Fire DOMContentLoaded to trigger renderPlants
  const listeners = sandbox.document.__listeners || {};
  Object.keys(listeners).forEach(type => listeners[type].forEach(fn => fn()));
  console.log('DOMContentLoaded fired OK');
  
  // Check title tag
  const titleIdx = h.indexOf('<title>');
  const titleEnd = h.indexOf('</title>');
  console.log('Title:', h.substring(titleIdx + 7, titleEnd));
  
  // Check for proper emojis
  console.log('🌿 in HTML:', h.includes('🌿'));
  console.log('— in HTML:', h.includes('—'));
  console.log('ðŸŒ¿ in HTML:', h.includes('ðŸŒ¿'));
} catch(e) {
  console.log('ERROR:', e.message);
}