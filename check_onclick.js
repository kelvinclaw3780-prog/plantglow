const fs = require('fs');
const c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Find the onclick attribute of the button in renderPlantCard
const rpcStart = c.indexOf("function renderPlantCard");
const rpcEnd = c.indexOf("function getSavedPlants");
const rpc = c.substring(rpcStart, rpcEnd);

// Find the button's onclick
const btnOnclick = rpc.indexOf('onclick="handleToggleSave');
console.log('Button onclick in RPC:', btnOnclick);
if (btnOnclick !== -1) {
  console.log(JSON.stringify(rpc.substring(btnOnclick, btnOnclick + 80)));
}

// Also find the div's onclick
const divOnclick = rpc.indexOf('onclick="handlePlantClick');
console.log('\nDiv onclick in RPC:', divOnclick);
if (divOnclick !== -1) {
  console.log(JSON.stringify(rpc.substring(divOnclick, divOnclick + 60)));
}