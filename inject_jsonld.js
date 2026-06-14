const fs = require('fs');
let html = fs.readFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', 'utf8');

// Generate JSON-LD for each plant
let plantJsonLd = [];

// Helper to escape JSON strings
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

// Extract plant entries from plantData
const plantDataMatch = html.match(/var plantData = \{[\s\S]*?^\s{4}\}/m);
if (!plantDataMatch) {
  console.log('Could not find plantData');
  process.exit(1);
}

// Simple eval to get plant data
let plantData;
try {
  eval('plantData = ' + plantDataMatch[0].replace(/var plantData = /, ''));
} catch(e) {
  console.log('Error parsing plantData:', e.message);
  process.exit(1);
}

Object.keys(plantData).forEach(function(id) {
  const p = plantData[id];
  plantJsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'Thing',
    'name': p.name,
    'alternateName': p.scientific,
    'description': p.tips ? p.tips.join('. ') : (p.light + '. ' + p.water + '. ' + p.humidity + '. ' + p.temp),
    'url': 'https://plantglow.net/#' + id
  });
});

// Build full ItemList JSON-LD
const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  'name': 'PlantGlow Plant Database',
  'description': 'Browse and discover 30+ house plants with detailed care guides including light, water, humidity, and temperature requirements.',
  'numberOfItems': plantJsonLd.length,
  'itemListElement': plantJsonLd.map(function(p, i) {
    return {
      '@type': 'ListItem',
      'position': i + 1,
      'item': p
    };
  })
};

// Remove existing plant JSON-LD blocks
html = html.replace(/<script type="application\/ld\+json">\s*\{[\s\S]*?\}\s*<\/script>\s*/g, '');

// Inject before </head>
const jsonLdScript = '\n  <script type="application/ld+json">\n' + JSON.stringify(collectionLd, null, 2) + '\n  </script>\n';
html = html.replace('</head>', jsonLdScript + '</head>');

fs.writeFileSync('C:/Users/kelvi/.openclaw/workspace-appcreator/plantglow/index.html', html);
console.log('Done! Generated JSON-LD for ' + plantJsonLd.length + ' plants');