const fs = require('fs');
const vm = require('vm');
const h = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
const lastScript = h.lastIndexOf('<script>');
const scriptClose = h.indexOf('</script>', lastScript + 9);
const scriptContent = h.substring(lastScript + 9, scriptClose);

const eventListeners = {};
const mockDoc = {
  eventListeners: eventListeners,
  addEventListener: function(type, fn) {
    if (!eventListeners[type]) eventListeners[type] = [];
    eventListeners[type].push(fn);
  },
  getElementById: function(id) {
    return {
      innerHTML: '', className: '', style: {display:''}, textContent: '', value: '',
      classList: { add:function(){}, remove:function(){}, toggle:function(){}, contains:function(){return false;} },
      appendChild:function(){}, remove:function(){}, removeChild:function(){}
    };
  },
  querySelectorAll: function() { return []; },
  createElement: function() { return { style: {}, className: '', innerHTML: '', textContent: '', appendChild: function(){} }; },
  body: { style: {}, appendChild: function(){}, removeChild: function(){} }
};

const mockLS = { data: {}, getItem: function(k){return this.data[k]}, setItem: function(k,v){this.data[k]=v}, removeItem: function(k){delete this.data[k]} };
const sandbox = {
  document: mockDoc,
  localStorage: mockLS,
  console: console,
  lucide: { createIcons: function(){} },
  setTimeout: function(fn, ms){ console.log('[setTimeout] fn scheduled for', ms, 'ms'); },
  XMLHttpRequest: function(){}
};
vm.createContext(sandbox);

try {
  vm.runInContext(scriptContent, sandbox, {filename: 'main.js'});
  console.log('JS COMPILE OK');
  console.log('plantData keys:', Object.keys(sandbox.plantData || {}).length);
  console.log('renderPlants type:', typeof sandbox.renderPlants);
  console.log('isLoggedIn type:', typeof sandbox.isLoggedIn);
  
  // Now simulate DOMContentLoaded by calling the listeners
  if (eventListeners['DOMContentLoaded']) {
    console.log('\nSimulating DOMContentLoaded...');
    eventListeners['DOMContentLoaded'].forEach(fn => fn());
    console.log('DOMContentLoaded fired OK');
  } else {
    console.log('\nNo DOMContentLoaded listeners registered');
  }
} catch(e) {
  console.log('ERROR:', e.message);
  console.log('Stack:', e.stack.split('\n').slice(0, 3).join('\n'));
}