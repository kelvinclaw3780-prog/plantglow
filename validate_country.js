const fs = require('fs');
let c = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', 'utf8');

// Find the country code input and update it with validation
const oldInput = `oninput="this.value = this.value.replace(/[^0-9+]/g, '').replace(/(?!^)\+/g, '');"`;

const newInput = `oninput="validCodes=['+1','+7','+20','+27','+30','+31','+32','+33','+34','+36','+39','+40','+41','+43','+44','+45','+46','+47','+48','+49','+51','+52','+53','+54','+55','+56','+57','+58','+60','+61','+62','+63','+64','+65','+66','+81','+82','+84','+86','+90','+91','+92','+94','+95','+98','+212','+213','+216','+218','+220','+221','+222','+223','+224','+225','+226','+227','+228','+229','+230','+231','+232','+233','+234','+235','+236','+237','+238','+239','+240','+241','+242','+243','+244','+245','+246','+247','+248','+249','+250','+251','+252','+253','+254','+255','+256','+257','+258','+260','+261','+262','+263','+264','+265','+266','+267','+268','+269','+290','+291','+297','+298','+299','+350','+351','+352','+353','+354','+355','+356','+357','+358','+359','+370','+371','+372','+373','+374','+375','+376','+377','+378','+380','+381','+382','+383','+385','+386','+387','+389','+420','+421','+423','+43','+44','+852','+886','+961','+962','+963','+964','+965','+966','+967','+968','+970','+971','+972','+973','+974','+975','+976','+977','+992','+993','+994','+995','+996','+998'];v=this.value.replace(/[^0-9+]/g,'').replace(/(?!^)\+/g,'');if(v.length>4)v=v.slice(0,4);if(v.startsWith('+')){if(!validCodes.includes(v)&&v.length===4){this.classList.add('border-red-400');this.classList.remove('border-gray-200');}else{this.classList.remove('border-red-400');this.classList.add('border-gray-200');}}this.value=v;"`;

if (c.includes(oldInput)) {
  c = c.replace(oldInput, newInput);
  console.log('Updated country code validation');
} else {
  console.log('Could not find old input handler');
}

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/login.html', c, 'utf8');
console.log('Done');