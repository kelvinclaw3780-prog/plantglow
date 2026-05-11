const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');
if (c.charCodeAt(0) === 0xFEFF) c = c.slice(1);

// Find renderPlantCard function
const rpcIdx = c.indexOf('function renderPlantCard');
console.log('renderPlantCard at:', rpcIdx);

// Get the section from renderPlantCard to end of the PLANT GRID section
// Find the next function after renderPlantCard
const afterRPC = c.substring(rpcIdx);
const nextFuncMatch = afterRPC.match(/function \w+\(/);
const nextFuncPos = nextFuncMatch ? rpcIdx + afterRPC.indexOf(nextFuncMatch[0]) : -1;
console.log('Next function at:', nextFuncPos);

const rpcContent = c.substring(rpcIdx, nextFuncPos);
console.log('renderPlantCard length:', rpcContent.length);
console.log('\nFull content:');
console.log(rpcContent);